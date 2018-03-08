'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.orderModel = ctx.model.Order;
    this.orderItemModel = ctx.model.OrderItem;
    this.orderAttachmentModel = ctx.model.OrderAttachment;
    this.receiptModel = ctx.model.Receipt; 
    this.orderPrintModel = ctx.model.OrderPrint;
    this.memberModel = ctx.model.Member;
    this.accountModel = ctx.model.Account;
    this.channelModel = ctx.model.Channel;

    this.userService = ctx.service.user;
    this.memberService = ctx.service.member;
    this.orderItemService = ctx.service.orderItem;
    this.receiptService = ctx.service.receipt;
    this.orderAttachmentService = ctx.service.orderAttachment;
    this.orderAddressService = ctx.service.orderAddress;
  }
  async getList(where = {}, option = {}) {
    const list = await this.orderModel.findAndCountAll({
      where,
      order: option.order,
      offset: option.offset,
      limit: option.limit,
    });
    return list;
  }

  async getDetail(where = {}) {
    const order = await this.orderModel.findOne({
      where,
    });
    const orderItem = await this.orderItemModel.findAll({
      where: {
        order_id: order.id,
      }
    });
    const orderAttachment = await this.orderAttachmentModel.findAll({
      where: {
        order_id: order.id,
      }
    });
    const orderReceipt = await this.receiptModel.findAll({
      where: {
        order_id: order.id,
      }
    });
    let orderPrint = [];
    if (order.status === 4) {
      orderPrint = await this.orderPrintModel.findAll({
        where: {
          order_id: order.id,
        }
      });
    }
    return {
      order,
      orderItem,
      orderAttachment,
      orderReceipt,
      orderPrint
    };
  }

  async update(data = {}) {
    const { ctx, app } = this;
    const { orderData, orderItemData, orderReceiptData } = data;
    const trans = await app.model.transaction();
    try {
      const order = await this.createOrder(orderData);
      const orderItem = await this.orderItemService.createOrderItem(order, orderItemData);
      await this.orderAttachmentService.createOrderAttachment(order, orderData);
      await this.receiptService.createOrderReceipt(order, orderReceiptData);
      await this.orderAddressService.createOrderAddress(order, orderData);
      await trans.commit();
      return order;
    } catch (error) {
      await trans.rollback();
      throw new Error(error);
    }
  }

  async createOrder(data = {}) {
    const orderSn = await this.generateOrderSn();
    const user = await this.userService.get(data.user_id);
    const client = await this.memberService.get(data.client_id);
    const delivery = await this.memberService.get(data.delivery_company_id);
    const account = await this.accountModel.findById(data.account_id);
    const channel = await this.channelModel.findById(data.channel_id);
    const orderData = {
      order_sn: orderSn,
      user_id: data.user_id,
      creator: user.name,
      channel_id: data.channel_id,
      channel_name: channel.name,
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
    const order = await this.orderModel.create(orderData);
    return order;
  }

  async generateOrderSn() {
    const { ctx } = this;    
    const orderSn = ctx.helper.dateFormat('YYYYMMDDHHmmss') + ctx.helper.randomNum(3);
    return orderSn;
  }

  async updateStatus(data = {}) {
    const id = data.id;
    const order = await this.orderModel.findById(id);
    order.status = data.status;
    await order.save();
    return order;
  }

  async orderPrint(data = {}) {
    const { order_id, order_sn } = data;
    const printshops = data.orderPrintData.printshop;
    const printCosts = data.orderPrintData.printshopCost;

    let order = [];
    if (printshops.length > 0) {
      const orderPrints = [];
      for (const key in printshops) {
        if (printshops[key]) {
          const printshop_id = printshops[key];
          const shop = await this.memberModel.findById(printshop_id); 
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
      await this.orderPrintModel.bulkCreate(orderPrints);

      order = await this.orderModel.findById(order_id);
      order.status = 4;
      await order.save();
    }
    return order;
  }

  async orderReceipt(data = {}) {
    const order_id = data.order_id;
    const order = await this.orderModel.findById(order_id);
    const receipt = await this.receiptService.createOrderReceipt(order, data);
    return receipt;
  }
}
module.exports = OrderService;
