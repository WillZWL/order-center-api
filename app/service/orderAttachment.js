'use strict';

const Service = require('egg').Service;

class OrderAttachmentService extends Service {
  async createOrderAttachment(attachments = []) {
    const { app } = this;
    await app.model.OrderAttachment.bulkCreate(attachments);
  }
}

module.exports = OrderAttachmentService;
