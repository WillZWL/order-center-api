'use strict';

const Service = require('egg').Service;

class ReceiptService extends Service {
  constructor(ctx) {
    super(ctx);
    this.receiptModel = ctx.model.Receipt;
  }

  async createReceipt(data = {}) {
    const receipt = await this.receiptModel.create(data);
    return receipt;
  } 
}

module.exports = ReceiptService;
