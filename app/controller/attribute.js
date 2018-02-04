'use strict';

const Controller = require('egg').Controller;

class AttributeController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.attribute.getList();
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
    const attribute = await ctx.service.attribute.update(data);
    if (attribute) {
      ctx.body = attribute;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = AttributeController;
