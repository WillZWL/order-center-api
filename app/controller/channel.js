'use strict';

const Controller = require('egg').Controller;

class ChannelController extends Controller {
  async index() {
    const { ctx } = this;
    let list = [];
    list = await ctx.service.channel.getList();
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    this.ctx.body = 'Channel get';
  }

  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const channel = await ctx.service.channel.update(data);
    if (channel) {
      ctx.body = channel;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = ChannelController;
