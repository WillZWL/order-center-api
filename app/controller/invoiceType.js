'use strict';

const Controller = require('egg').Controller;

class InvoiceTypeController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.invoiceType.getList();
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
    const invoiceType = await ctx.service.invoiceType.update(data);
    if (invoiceType) {
      ctx.body = invoiceType;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = InvoiceTypeController;
