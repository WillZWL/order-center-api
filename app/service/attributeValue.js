'use strict';

const Service = require('egg').Service;

class AttributeValueService extends Service {
  constructor(ctx) {
    super(ctx);
    this.attributeValueModel = ctx.model.AttributeValue;
  }

  async getList(data = {}) {
    const list = await this.attributeValueModel.findAll({
      where: {
        attribute_id: data.attribute_id,
      },
    });
    return list;
  }

  async get(where = {}) {
    const value = await this.attributeValueModel.findOne({ where });
    return value;
  }

  async update(data = {}) {
    const id = data.id;
    let attributeValue = {};
    if (id) {
      attributeValue = await this.attributeValueModel.findById(id);
      attributeValue.value = data.value;
      attributeValue.status = data.status;
      await attributeValue.save();
    } else {
      attributeValue = await this.attributeValueModel.create(data);
    }
    return attributeValue;
  }
}

module.exports = AttributeValueService;
