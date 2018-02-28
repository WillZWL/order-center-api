'use strict';

const Service = require('egg').Service;

class ChannelService extends Service {
  constructor(ctx) {
    super(ctx);
    this.channelModel = ctx.model.Channel;
  }

  async getList(where = {}) { 
    const list = await this.channelModel.findAll({
      where,
    });
    return list;
  }

  async get() {
  }

  async update(data) {
    const id = data.id;
    let channel = false;
    if (id) {
      channel = await this.channelModel.findById(id);
      channel.name = data.name;
      channel.status = data.status;
      await channel.save();
    } else {
      channel = await this.channelModel.create(data);
    }
    return channel;
  }
}

module.exports = ChannelService;
