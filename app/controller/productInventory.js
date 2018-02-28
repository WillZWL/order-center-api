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
    const { name, cate_id, code } = ctx.query;

    let where = {};
    if (name) {
        where.product_name = name;
    }
    if (cate_id) {
        where.cate_id = cate_id;
    }
    if (code) {
        where.code = code;
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
