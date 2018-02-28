'use strict';

const Controller = require('egg').Controller;

class PurchaseOrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.purchaseOrderService = ctx.service.purchaseOrder;
  }
  async index() {
    const { ctx } = this;
    let list = [];
    const { type } = ctx.query;
    const where = {
      type,
    };
    list = await this.purchaseOrderService.getList(where);
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
    const purchaseOrder = await this.purchaseOrderService.update(data);
    if (purchaseOrder) {
      ctx.body = purchaseOrder;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = PurchaseOrderController;
