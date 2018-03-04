'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productService = ctx.service.product;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    const { name, code } = ctx.query;
    const where = {};
    if (name) {
      where.name = { $like: `%${name}%` };
    }
    if (code) {
      where.code = code;
    }

    list = await this.productService.getList(where);
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
    const product = await this.productService.update(data);
    if (product) {
      ctx.body = product;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = ProductController;
