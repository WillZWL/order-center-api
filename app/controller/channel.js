'use strict';

const Controller = require('egg').Controller;

class ChannelController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.channelService = ctx.service.channel;
  }

  async index() {
    const { ctx } = this;
    let list = [];
    list = await this.channelService.getList();
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
    const channel = await this.channelService.update(data);
    if (channel) {
      ctx.body = channel;
    } else {
      ctx.body = {};
    }
  }
}

module.exports = ChannelController;
