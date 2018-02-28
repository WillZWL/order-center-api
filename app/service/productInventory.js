'use strict';

const Service = require('egg').Service;

class ProductInventoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productInventoryModel = ctx.model.ProductInventory;
  }

  async getList(where = {}) {
    const list = await this.productInventoryModel.findAll({ where });
    return list;
  }

  async update() {

  }
}

module.exports = ProductInventoryService;
