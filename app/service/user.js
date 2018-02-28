'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userModel = ctx.model.User;
  }

  async getList(where = {}) {
    const list = await this.userModel.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    return await this.userModel.findOne({
      where: {
        id,
      },
      attributes: [ 'id', 'name', 'mobilephone' ],
    });
  }

  async update(data = {}) {
    const id = data.id;
    let user = {};
    if (id) {
      user = await this.userModel.findOne({
        where: {
          id,
        },
      });
      user.name = data.name;
      user.code = data.code;
      user.mobilephone = data.mobilephone;
      user.depart = data.depart;
      user.status = data.status;
      await user.save();
    } else {
      const roles = JSON.stringify(data.roles);
      data.depart = roles;
      user = await this.userModel.create(data);
    }
    return user;
  }

  async updatePassword(data = {}) {
    const { app, ctx } = this;
    const { id, oldPass, oldPass } = data;

    if (id) {
      const user = await this.userModel.findById(id);
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
    const id = data.id;
    const roles = JSON.stringify(data.roles);
    let user = {};
    if (id) {
      user = await this.userModel.findById(id);
      user.depart = roles;
      user.save();
    }
    return user;
  }
}
module.exports = UserService;
