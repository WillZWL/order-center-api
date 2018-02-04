'use strict';

const Controller = require('egg').Controller;

class PurchaseOrderController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    const type = ctx.query.type;
    const where = {
      type,
    };
    list = await ctx.service.purchaseOrder.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'PurchaseOrder get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const purchaseOrder = await ctx.service.purchaseOrder.update(data);
    if (purchaseOrder) {
      ctx.body = purchaseOrder;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = PurchaseOrderController;
