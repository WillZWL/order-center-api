'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.product.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Product get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const product = await ctx.service.product.update(data);
    if (product) {
      ctx.body = product;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = ProductController;
