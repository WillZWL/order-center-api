'use strict';

const Service = require('egg').Service;

class InvoiceTypeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.invoiceTypeModel = ctx.model.InvoiceType;
  }

  async getList(where = {}) { 
    const list = await InvoiceType.findAll({
      where,
    });
    return list;
  }

  async update(data) {
    const id = data.id;
    let invoiceType = {};
    if (id) {
      invoiceType = await InvoiceType.findById(id);
      invoiceType.name = data.name;
      invoiceType.status = data.status;
      await invoiceType.save();
    } else {
      invoiceType = await InvoiceType.create(data);
    }
    return invoiceType;
  }
}

module.exports = InvoiceTypeService;
