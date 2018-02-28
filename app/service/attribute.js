'use strict';

const Service = require('egg').Service;

class AttributeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.attributeModel = ctx.model.Attribute;
  }

  async getList(where) {
    const { app } = this;
    const list = await this.attributeModel.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    const { app } = this;
    const attribute = await this.attributeModel.findById(id);
    return attribute;
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let attribute = {};
    if (id) {
      attribute = await this.attributeModel.findById(id);
      attribute.name = data.name;
      attribute.status = data.status;
      await attribute.save();
    } else {
      attribute = await this.attributeModel.create(data);
    }
    return attribute;
  }
}

module.exports = AttributeService;
