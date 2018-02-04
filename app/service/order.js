'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getList(where = {}) {
    const { app } = this;
    const list = await app.model.Order.findAll({
      where,
    });
    return list;
  }

  async getDetail(where = {}) {
    const { app } = this;
    const order = await app.model.Order.findOne({
      where,
    });
    const orderItem = await app.model.OrderItem.findAll({
      where: {
        order_id: order.id,
      }
    });
    const orderAttachment = await app.model.OrderAttachment.findAll({
      where: {
        order_id: order.id,
      }
    });
    const orderReceipt = await app.model.Receipt.findAll({
      where: {
        order_id: order.id,
      }
    });
    let orderPrint = [];
    if (order.status === 4) {
      orderPrint = await app.model.OrderPrint.findAll({
        where: {
          order_id: order.id,
        }
      });
    }
    // console.log(await order.orderItem);
    return {
      order,
      orderItem,
      orderAttachment,
      orderReceipt,
      orderPrint
    };
  }

  async update(data = {}) {
    const { ctx } = this;
    const orderBaseData = data.orderData;
    const orderItemData = data.orderItemData;
    const receiptData = data.orderReceiptData;

    try {
      const order = await this.createOrder(orderBaseData);
      const orderItem = await ctx.service.orderItem.createOrderItem(order, orderItemData);
      await this.createOrderAttachment(order, orderBaseData);
      await this.createOrderReceipt(order, receiptData);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createOrderAttachment(order = {}, orderBaseData = {}) {
    const { ctx, app } = this;
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
    if (attachments.length > 0) {
      await ctx.service.orderAttachment.createOrderAttachment(attachments);
    }
  }

  async createOrderReceipt(order = {}, receiptData = {}) {
    const { ctx } = this;

    if (order.invoice_type > 0) {
      receiptData.order_id = order.id;
      receiptData.order_sn = order.order_sn;
      receiptData.creator = order.creator;
      const receipt = await ctx.service.receipt.createReceipt(receiptData);
      return receipt;
    }
  }

  async createOrder(data = {}) {
    const { ctx, app } = this;
    const orderSn = await this.generateOrderSn();
    const user = await ctx.service.user.get(data.user_id);
    const client = await ctx.service.member.get(data.client_id);
    const delivery = await ctx.service.member.get(data.delivery_company_id);
    const account = await app.model.Account.findById(data.account_id);
    const channel = await app.model.Channel.findById(data.channel_id);
    const orderData = {
      order_sn: orderSn,
      user_id: data.user_id,
      creator: user.name,
      channel_id: data.channel_id,
      order_date: data.order_date,
      client_id: data.client_id,
      client_name: client.name,
      invoice_type: data.invoice_type,
      delivery_time: data.delivery_time,
      delivery_company_id: data.delivery_company_id,
      delivery_company_name: delivery.name,
      account_id: data.account_id,
      account_name: account.subject,
      payment_amount: data.pay_amount,
      payment_remark: data.payment_remark,
      amount: data.item_amount,
      item_quantity: data.item_total,
      is_print: data.isPrint,
      remark: data.remark,
      status: 2,
    };
    const order = await app.model.Order.create(orderData);

    return order;
  }

  async generateOrderSn() {
    const { ctx } = this;    
    const orderSn = ctx.helper.dateFormat('YYYYMMDDHHmmss') + ctx.helper.randomNum(3);
    return orderSn;
  }

  async updateStatus(data = {}) {
    const { app } = this;
    const id = data.id;
    const order = await app.model.Order.findById(id);
    order.status = data.status;
    await order.save();
    return order;
  }

  async orderPrint(data = {}) {
    const { app } = this;

    const order_id = data.order_id;
    const order_sn = data.order_sn;

    const printshops = data.orderPrintData.printshop;
    const printCosts = data.orderPrintData.printshopCost;

    let order = [];
    if (printshops.length > 0) {
      const orderPrints = [];
      for (const key in printshops) {
        if (printshops[key]) {
          const printshop_id = printshops[key];
          const shop = await app.model.Member.findById(printshop_id); 
          console.log(printCosts[key]);
          const orderPrint = {
            order_id,
            order_sn,
            type: key,
            printshop_id,
            printshop_name: shop.name,
            printcost: printCosts[key],
          };
          orderPrints.push(orderPrint);
        }
      }
      await app.model.OrderPrint.bulkCreate(orderPrints);

      order = await app.model.Order.findById(order_id);
      order.status = 4;
      await order.save();
    }
    return order;
  }
}

module.exports = OrderService;
