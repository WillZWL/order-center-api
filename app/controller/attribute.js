'use strict';

const Controller = require('egg').Controller;

class AttributeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.attributeService = ctx.service.attribute;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    list = await this.attributeService.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Attribute get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const attribute = await this.attributeService.update(data);
    if (attribute) {
      ctx.body = attribute;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = AttributeController;
