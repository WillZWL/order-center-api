'use strict';
const Service = require('egg').Service;

class OrderAddressService extends Service {
  constructor(ctx) {
    super(ctx);
    this.orderAddressModel = ctx.model.OrderAddress;
  }

  async createOrderAddress(order = {}, addressData = {}) {
    const address = {
     order_id: order.id,
     order_sn: order.order_sn,
     contacts_name: addressData.contacts_name,
     contacts_tel: addressData.contacts_tel,
     province: addressData.province,
     city: addressData.city,
     district: addressData.district,
     address: addressData.address,
    }
    const orderAddress = await this.orderAddressModel.create(address);
    return orderAddress;
  }

}

module.exports = OrderAddressService;
