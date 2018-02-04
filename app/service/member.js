'use strict';

const Service = require('egg').Service;

class MemberService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.Member.findAll({
      where,
    });
    return list;
  }

  async get(id) {
    const { app } = this;
    return await app.model.Member.findOne({
      where: {
        id,
      },
    });
  }

  async update(data = {}) {
    const { app } = this;
    const id = data.id;
    let member = false;
    if (id) {
      member = await app.model.Member.findOne({
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
      member.save();
    } else {
      member = await app.model.Member.create(data);
    }
    return member;
  }
}

module.exports = MemberService;
