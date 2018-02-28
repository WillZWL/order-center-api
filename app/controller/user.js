'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.user;
  }
  async index() {
    const { ctx } = this;
    let list = [];
    list = await this.userService.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    if (id) {
      const user = await this.userService.get(id);
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
    const user = await this.userService.update(data);
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
    const res = await this.userService.updatePassword(data);
    ctx.body = res;
  }

  async userRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const user = await this.userService.userRole(data);
    ctx.body = user;
  }
}

module.exports = UserController;
