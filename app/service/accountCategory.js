'use strict';

const Service = require('egg').Service;

class AccountCategoryService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.AccountCategory.findAll({
      where,
    });
    return list;
  }

  async get(where = {}) {
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let accountCategory = {};
    if (id) {
      accountCategory = await app.model.AccountCategory.findById(id);
      accountCategory.name = data.name;
      accountCategory.status = data.status;
      accountCategory.save();
    } else {
      accountCategory = await app.model.AccountCategory.create(data);
    }
    return accountCategory;
  }
}

module.exports = AccountCategoryService;
