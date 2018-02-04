'use strict';

const Service = require('egg').Service;

class AttributeValueService extends Service {
  async getList(data = {}) {
    const { app } = this;
    console.log(data.attribute_id);
    const list = await app.model.AttributeValue.findAll({
      where: {
        attribute_id: data.attribute_id,
      },
    });
    return list;
  }

  async get(where = {}) {
    const { app } = this;
    const value = await app.model.findOne({ where });

    return value;
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let attributeValue = {};
    if (id) {
      attributeValue = await app.model.AttributeValue.findById(id);
      attributeValue.value = data.value;
      attributeValue.status = data.status;
      await attributeValue.save();
    } else {
      attributeValue = await app.model.AttributeValue.create(data);
    }
    return attributeValue;
  }
}

module.exports = AttributeValueService;
