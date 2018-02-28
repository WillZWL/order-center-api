'use strict';

const Controller = require('egg').Controller;

class InvoiceTypeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.invoiceTypeService = ctx.service.invoiceType;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    list = await this.invoiceTypeService.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'invoiceType get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const invoiceType = await this.invoiceTypeService.update(data);
    if (invoiceType) {
      ctx.body = invoiceType;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = InvoiceTypeController;
