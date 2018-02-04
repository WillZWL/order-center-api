'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.User.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    const { app } = this;
    return await app.model.User.findOne({
      where: {
        id,
      },
      attributes: [ 'id', 'name', 'mobilephone' ],
    });
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let user = false;
    if (id) {
      user = await app.model.User.findOne({
        where: {
          id,
        },
      });
      user.name = data.name;
      user.code = data.code;
      user.mobilephone = data.mobilephone;
      user.depart = data.depart;
      user.status = data.status;
      user.save();
    } else {
      const roles = JSON.stringify(data.roles);
      data.depart = roles;
      user = await app.model.User.create(data);
    }
    return user;
  }

  async updatePassword(data = {}) {
    const { app, ctx } = this;
    const oldPass = data.oldPass;
    const newPass = data.newPass;
    const id = data.id;
    if (id) {
      const user = await app.model.User.findById(id);
      const md5Oldpwd = ctx.helper.md5(oldPass + app.config.keys);
      if (user.password === md5Oldpwd) {
        const md5NewPwd = ctx.helper.md5(newPass + app.config.keys);
        user.password = md5NewPwd;
        user.save();
        return {
          status: 0,
          message: '',
        };
      }
      return {
        status: 1,
        message: '原密码错误',
      };
    }
  }

  async userRole(data = {}) {
    const { app } = this;
    const id = data.id;
    const roles = JSON.stringify(data.roles);
    let user = {};
    if (id) {
      user = await app.model.User.findById(id);
      user.depart = roles;
      user.save();
    }
    return user;
  }
}

module.exports = UserService;
