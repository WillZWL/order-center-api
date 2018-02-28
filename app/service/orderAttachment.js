'use strict';

const Service = require('egg').Service;

class OrderAttachmentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.orderAttachmentModel = ctx.model.OrderAttachment;
  }

  async createOrderAttachment(attachments = []) {
    await this.orderAttachmentModel.bulkCreate(attachments);
  }
}

module.exports = OrderAttachmentService;
