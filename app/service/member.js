'use strict';

const Service = require('egg').Service;

class MemberService extends Service {
  constructor(ctx) {
    super(ctx);
    this.memberModel = ctx.model.Member;
  }

  async getList(where = {}) {
    const list = await this.memberModel.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    return await this.memberModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(data = {}) {
    const id = data.id;
    let member = {};
    if (id) {
      member = await this.memberModel.findOne({
        where: {
          id,
        },
      });
      member.name = data.name;
      member.code = data.code;
      member.contacts_name = data.contacts_name;
      member.mobilephone = data.mobilephone;
      member.province = data.province;
      member.city = data.city;
      member.district = data.district;
      member.address = data.address;
      member.remark = data.remark;
      member.status = data.status;
      await member.save();
    } else {
      member = await this.memberModel.create(data);
    }
    return member;
  }
}

module.exports = MemberService;
