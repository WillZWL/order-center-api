'use strict';

const Service = require('egg').Service;

class ProductInventoryService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.ProductInventory.findAll({ where });
    return list;
  }
  

  async update() {

  }
}

module.exports = ProductInventoryService;
