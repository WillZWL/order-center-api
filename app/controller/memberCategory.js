'use strict';

const Controller = require('egg').Controller;

class memberCategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.memberCategoryService = ctx.service.memberCategory;
  }

  async index() {
    const { ctx } = this;
    const type = ctx.query.type;
    const where = {
      type,
    };
    const list = await this.memberCategoryService.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    ctx.body = await this.memberCategoryService.get({ id });
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.body = await this.memberCategoryService.update(data);
  }
}

module.exports = memberCategoryController;
