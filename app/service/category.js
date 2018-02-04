'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  async getList() {
    const { app } = this;
    const list = await app.model.Category.findAll();
    return list;
  }

  async get() {

  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let category = false;
    if (id) {
      category = await app.model.Category.findById(id);
      category.name = data.name;
      category.status = data.status;
      await category.save();
    } else {
      category = await app.model.Category.create(data);
    }
    return category;
  }
}

module.exports = CategoryService;
