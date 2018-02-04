'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async index() {
    const { ctx } = this;
    const type = ctx.query.type;
    const where = {
      type,
    };
    const list = await ctx.service.account.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.body = await ctx.service.account.get({ id });
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await ctx.service.account.update(data);
  }
}

module.exports = AccountController;
