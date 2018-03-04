'use strict';

const Service = require('egg').Service;

class ProductInventoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productInventoryModel = ctx.model.ProductInventory;
  }

  async getList(where = {}, option = {}) {
    const list = await this.productInventoryModel.findAndCountAll({ 
      where 
    });
    return list;
  }

  async update() {

  }
}

module.exports = ProductInventoryService;
