'use strict';

const Controller = require('egg').Controller;

class AttributeValueController extends Controller {
  async index() {
    const { ctx } = this;
    const attribute_id = ctx.query.attribute_id;
    let list = [];
    list = await ctx.service.attributeValue.getList({ attribute_id });
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Attribute Value get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const attributeValue = await ctx.service.attributeValue.update(data);
    if (attributeValue) {
      ctx.body = attributeValue;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = AttributeValueController;
