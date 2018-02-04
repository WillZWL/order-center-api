'use strict';

const Service = require('egg').Service;

class ReceiptService extends Service {
  async createReceipt(data = {}) {
    const { app } = this;
    const receipt = await app.model.Receipt.create(data);
    return receipt;
  } 
}

module.exports = ReceiptService;
