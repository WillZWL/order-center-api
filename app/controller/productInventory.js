'use strict';

const Controller = require('egg').Controller;

class ProductInventoryController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    const name = ctx.query.name;
    const cateId = ctx.query.cate_id;
    const code = ctx.query.code;
    let where = {};
    if (name) {
        where.product_name = name;
    }
    if (cateId) {
        where.cate_id = cateId;
    }
    if (code) {
        where.code = code;
    }
    list = await ctx.service.productInventory.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {

  }
}

module.exports = ProductInventoryController;
