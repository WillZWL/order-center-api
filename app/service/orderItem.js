'use strict';

const Service = require('egg').Service;

class OrderItemService extends Service {
  async createOrderItem(order = {}, itemData = []) {
    const { app } = this;
    const orderItems = [];
    itemData.forEach(item => {
      const orderItem = {
        order_id: order.id,
        order_sn: order.order_sn,
        product_id: item.product_id,
        product_name: item.product_name,
        color_id: item.color_id,
        color_name: item.color_name,
        ss_quantity: item.ss_quantity,
        s_quantity: item.s_quantity,
        m_quantity: item.m_quantity,
        l_quantity: item.l_quantity,
        xl_quantity: item.xl_quantity,
        xxl_quantity: item.xxl_quantity,
        xxxl_quantity: item.xxxl_quantity,
        xxxxl_quantity: item.xxxxl_quantity,
        price: item.price,
        total_quantity: item.total,
        amount: item.amount,
      };

      orderItems.push(orderItem);
    });

    await app.model.OrderItem.bulkCreate(orderItems);
  }
}

module.exports = OrderItemService;
