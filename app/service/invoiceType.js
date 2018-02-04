'use strict';

const Service = require('egg').Service;

class InvoiceTypeService extends Service {
  async getList(where = {}) { 
    const { app } = this;
    const list = await app.model.InvoiceType.findAll({
      where,
    });
    return list;
  }

  async update(data) {
    const { app } = this;
    const id = data.id;
    let invoiceType = false;
    if (id) {
      invoiceType = await app.model.InvoiceType.findById(id);
      invoiceType.name = data.name;
      invoiceType.status = data.status;
      await invoiceType.save();
    } else {
      invoiceType = await app.model.InvoiceType.create(data);
    }
    return invoiceType;
  }
}

module.exports = InvoiceTypeService;
