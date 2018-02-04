'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.Account.findAll({
      where,
    });
    return list;
  }

  async get(where = {}) {
    const { app } = this;
    const account = await app.model.findOne({
      where,
    });
    return account;
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let account = {};
    if (id) {
      account = await app.model.Account.findById(id);
      account.category = data.category;
      account.category_name = data.category_name;      
      account.subject = data.subject;
      account.subject_code = data.subject_code;
      account.status = data.status;
      account.remark = data.remark;
      await account.save();
    } else {
      account = await app.model.Account.create(data);
    }
    return account;
  }
}

module.exports = AccountService;
