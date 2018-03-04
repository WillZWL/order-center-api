'use strict';

const Service = require('egg').Service;

class OrderAttachmentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.orderAttachmentModel = ctx.model.OrderAttachment;
  }

  async createOrderAttachment(order = {}, orderBaseData = {}) {
    const attachments = [];
    if (orderBaseData.printImgs.length > 0) {
      orderBaseData.printImgs.forEach(item => {
        const print = {
          type: 1,
          order_id: order.id,
          order_sn: order.order_sn,
          path: item,
        };
        attachments.push(print);
      });
    }
    if (orderBaseData.invoiceImgs.length > 0) {
      orderBaseData.invoiceImgs.forEach(item => {
        const invoice = {
          type: 2,
          order_id: order.id,
          order_sn: order.order_sn,
          path: item,
        };
        attachments.push(invoice);
      });
    }
    await this.orderAttachmentModel.bulkCreate(attachments);
  }
}

module.exports = OrderAttachmentService;
