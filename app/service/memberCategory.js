'use strict';

const Service = require('egg').Service;

class memberCategoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.memberCategoryModel = ctx.model.MemberCategory;
  }

  async getList(where = {}) {
    const list = await this.memberCategoryModel.findAll({
      where,
    });
    return list;
  }

  async get(where = {}) {
  }

  async update(data = {}) {
    const id = data.id;
    let memberCategory = {};
    if (id) {
      memberCategory = await this.memberCategoryModel.findById(id);
      memberCategory.name = data.name;
      memberCategory.status = data.status;
      await memberCategory.save();
    } else {
      memberCategory = await this.memberCategoryModel.create(data);
    }
    return memberCategory;
  }
}

module.exports = memberCategoryService;
