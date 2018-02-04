'use strict';

const Service = require('egg').Service;

class AttributeService extends Service {
  async getList(where) {
    const { app } = this;
    const list = await app.model.Attribute.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    const { app } = this;
    const attribute = await app.model.Attribute.findById(id);
    return attribute;
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let attribute = {};
    if (id) {
      attribute = await app.model.Attribute.findById(id);
      attribute.name = data.name;
      attribute.status = data.status;
      await attribute.save();
    } else {
      attribute = await app.model.Attribute.create(data);
    }
    return attribute;
  }
}

module.exports = AttributeService;
