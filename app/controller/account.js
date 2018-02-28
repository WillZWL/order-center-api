'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.accountService = ctx.service.account;
  }

  async index() {
    const { ctx } = this;
    const type = ctx.query.type;
    const where = {
      type,
    };
    const list = await this.accountService.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.body = await this.accountService.get({ id });
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await this.accountService.update(data);
  }
}

module.exports = AccountController;
