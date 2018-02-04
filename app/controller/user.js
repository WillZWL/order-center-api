'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.user.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    if (id) {
      const user = await ctx.service.user.get(id);
      ctx.body = {
        status: 0,
        data: user,
      };
    } else {
      ctx.body = {
        status: 1,
        message: '',
      };
    }

  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const user = await ctx.service.user.update(data);
    if (user) {
      ctx.body = {
        id: user.id,
        name: user.name,
        mobilephone: user.mobilephone,
      };
    } else {
      ctx.body = {};
    }
  }

  async updatePassword() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.service.user.updatePassword(data);
    ctx.body = res;
  }

  async userRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const user = await ctx.service.user.userRole(data);
    ctx.body = user;
  }
}

module.exports = UserController;
