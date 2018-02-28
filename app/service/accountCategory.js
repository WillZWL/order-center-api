'use strict';

const Service = require('egg').Service;

class AccountCategoryService extends Service {
  constructor(ctx) {
    super(ctx);
    this.accountCategoryModel = ctx.model.AccountCategory;
  }

  async getList(where = {}) {
    const list = await this.accountCategoryModel.findAll({
      where,
    });
    return list;
  }

  async get(where = {}) {
  }

  async update(data = {}) {
    const id = data.id;
    let accountCategory = {};
    if (id) {
      accountCategory = await this.accountCategoryModel.findById(id);
      accountCategory.name = data.name;
      accountCategory.status = data.status;
      await accountCategory.save();
    } else {
      accountCategory = await this.accountCategoryModel.create(data);
    }
    return accountCategory;
  }
}

module.exports = AccountCategoryService;
