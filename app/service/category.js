'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.categoryModel = ctx.model.Category;
  }

  async getList() {
    const list = await this.categoryModel.findAll();
    return list;
  }

  async get() {

  }

  async update(data = {}) {
    const id = data.id;
    let category = false;
    if (id) {
      category = await this.categoryModel.findById(id);
      category.name = data.name;
      category.status = data.status;
      await category.save();
    } else {
      category = await this.categoryModel.create(data);
    }
    return category;
  }
}

module.exports = CategoryService;
