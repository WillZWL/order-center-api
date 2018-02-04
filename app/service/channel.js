'use strict';

const Service = require('egg').Service;

class ChannelService extends Service {
  async getList(where = {}) { 
    const { app } = this;
    const list = await app.model.Channel.findAll({
      where,
    });
    return list;
  }

  async get() {
  }

  async update(data) {
    const { app } = this;
    const id = data.id;
    let channel = false;
    if (id) {
      channel = await app.model.Channel.findById(id);
      channel.name = data.name;
      channel.status = data.status;
      await channel.save();
    } else {
      channel = await app.model.Channel.create(data);
    }
    return channel;
  }
}

module.exports = ChannelService;
