'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  constructor(ctx) {
    super(ctx);
    this.accountModel = ctx.model.Account;
  }

  async getList(where = {}) {
    const list = await this.accountModel.findAll({
      where,
    });
    return list;
  }

  async get(where = {}) {
    const account = await this.accountModel.findOne({
      where,
    });
    return account;
  }

  async update(data = {}) {
    const id = data.id;
    let account = {};
    if (id) {
      account = await this.accountModel.findById(id);
      account.category = data.category;
      account.category_name = data.category_name;      
      account.subject = data.subject;
      account.subject_code = data.subject_code;
      account.status = data.status;
      account.remark = data.remark;
      await account.save();
    } else {
      account = await this.accountModel.create(data);
    }
    return account;
  }
}

module.exports = AccountService;
