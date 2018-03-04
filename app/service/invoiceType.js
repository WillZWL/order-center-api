'use strict';

const Service = require('egg').Service;

class InvoiceTypeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.invoiceTypeModel = ctx.model.InvoiceType;
  }

  async getList(where = {}) { 
    const list = await this.invoiceTypeModel.findAll({
      where,
    });
    return list;
  }

  async update(data) {
    const id = data.id;
    let invoiceType = {};
    if (id) {
      invoiceType = await this.invoiceTypeModel.findById(id);
      invoiceType.name = data.name;
      invoiceType.status = data.status;
      await invoiceType.save();
    } else {
      invoiceType = await this.invoiceTypeModel.create(data);
    }
    return invoiceType;
  }
}

module.exports = InvoiceTypeService;
