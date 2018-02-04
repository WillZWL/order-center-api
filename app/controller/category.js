'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.category.getList();
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
    const category = await ctx.service.category.update(data);
    if (category) {
      ctx.body = category;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = CategoryController;
