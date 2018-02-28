'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.categoryService = ctx.service.category;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    list = await this.categoryService.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Category get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const category = await this.categoryService.update(data);
    if (category) {
      ctx.body = category;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = CategoryController;
