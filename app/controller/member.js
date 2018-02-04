'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    const type = ctx.queries.type;
    let where = {};
    console.log(type);
    if (Array.isArray(type)) {
      where = {
        type: { $in: type },
      };
    } else {
      where = {
        type,
      };

    }
    list = await ctx.service.member.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Member get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const member = await ctx.service.member.update(data);
    if (member) {
      ctx.body = member;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = MemberController;
