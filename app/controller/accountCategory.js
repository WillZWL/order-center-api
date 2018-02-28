'use strict';

const Controller = require('egg').Controller;

class AccountCategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.accountCategoryService = ctx.service.accountCategory;
  }

  async index() {
    const { ctx } = this;
    const type = ctx.query.type;
    const where = {
      type,
    };
    const list = await this.accountCategoryService.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.body = await this.accountCategoryService.get({ id });
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await this.accountCategoryService.update(data);
  }
}

module.exports = AccountCategoryController;
