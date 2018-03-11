'use strict';

const Service = require('egg').Service;

class PurchaseOrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.poModel = ctx.model.PurchaseOrder; 
    this.memberModel = ctx.model.Member;
    this.userModel = ctx.model.User;

    this.poItemService = ctx.service.purchaseOrderItem;    
  }

  async getList() {
    const list = await this.poModel.findAndCountAll();
    return list;
  }

  async get() {
  }

  async create(data = {}) {
    const { ctx } = this;
    const { product_id, po_base, po_item } = data;
    const id = data.id;
    const type = data.type ? data.type: 1;
    let purchaseOrder = false;

    if (po_base) {
      const { supplier_id, user_id, remark, note, create_date} = po_base;
      const supplier = await this.memberModel.findById(supplier_id);
      const user = await this.userModel.findById(user_id);
      const poData = {
        type,
        supplier_id,
        supplier_name: supplier.name,
        user_id,
        user_name: user.name,
        create_date,
        remark,
        note,
      };
      const po = await this.poModel.create(poData);
      const poItem = await this.poItemService.create(po, product_id, po_item);
      return {
        po, 
        poItem
      };
    }
  }
};

module.exports = PurchaseOrderService;
