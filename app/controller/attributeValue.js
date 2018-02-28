'use strict';

const Controller = require('egg').Controller;

class AttributeValueController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.attributeValueService = ctx.service.attributeValue;
  }

  async index() {
    const { ctx } = this;
    const attribute_id = ctx.query.attribute_id;
    let list = [];
    list = await this.attributeValueService.getList({ attribute_id });
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
    const attributeValue = await this.attributeValueService.update(data);
    if (attributeValue) {
      ctx.body = attributeValue;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = AttributeValueController;
