'use strict';

const Service = require('egg').Service;

class ReceiptService extends Service {
  constructor(ctx) {
    super(ctx);
    this.receiptModel = ctx.model.Receipt;
  }

  async createOrderReceipt(order = {}, receiptData = {}) {
    if (order.invoice_type > 0) {
      receiptData.order_id = order.id;
      receiptData.order_sn = order.order_sn;
      receiptData.creator = order.creator;
    }
    const receipt = await this.receiptModel.create(receiptData);
    return receipt;
  } 
}

module.exports = ReceiptService;
