'use strict';

const Controller = require('egg').Controller;

class PurchaseOrderItemController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.purchaseOrderService = ctx.service.purchaseOrder;
    this.purchaseOrderItemService = ctx.service.purchaseOrderItem;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    const { po_id } = ctx.query;
    const where = {
        po_id,
    };
    list = await this.purchaseOrderItemService.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

}

module.exports = PurchaseOrderItemController;