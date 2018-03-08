'use strict';

const Controller = require('egg').Controller;

class ProductInventoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.productInventoryService = ctx.service.productInventory;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    const { name, code, product_id } = ctx.query;
    let where = {};
    if (name) {
      where.product_name = { $like: `%${name}%` };
    }
    if (code) {
      where.code = code;
    }
    if (product_id) {
      where.product_id = product_id;
    }
    list = await this.productInventoryService.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {

  }
}

module.exports = ProductInventoryController;
