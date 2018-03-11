'use strict';

const Service = require('egg').Service;

class PurchaseOrderItemService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productModel = ctx.model.Product;
    this.attributeValueModel = ctx.model.AttributeValue;
    this.poItemModel = ctx.model.PurchaseOrderItem;
  }

  async create(po = {}, productId, itemList = []) {
    const { ctx } = this;    
    if (itemList.length > 0) {
      const product = await this.productModel.findById(productId);
      const productColor = product.color.split(',');
      const colorList = await this.attributeValueModel.findAll({
        where: {
          attribute_id: 1,
          value: { $in: productColor },
        }
      });
      const poItemList = [];
      let poTotal = 0;
      let poAmount = 0;
      itemList.forEach(item => {
        const color = ctx.helper.reducedFilter(colorList, ['id', 'value'], ele => ele.value === item.color);
        const poItem = {
          type: po.type,
          po_id: po.id,
          product_id: productId,
          product_name: product.name,
          product_code: product.code,
          cate_id: product.cate_id,
          cate_name: product.cate_name,
          price: product.price,
          color_id: color[0].id,
          color_name: color[0].value,
          ss_quantity: item.ss_quantity,
          s_quantity: item.s_quantity,
          m_quantity: item.m_quantity,
          l_quantity: item.l_quantity,
          xl_quantity: item.xl_quantity,
          xxl_quantity: item.xxl_quantity,
          xxxl_quantity: item.xxxl_quantity,
          xxxxl_quantity: item.xxxxl_quantity,
          amount: product.price * (parseInt(item.ss_quantity, 10) + parseInt(item.s_quantity, 10) + parseInt(item.m_quantity, 10) + parseInt(item.l_quantity, 10)
          + parseInt(item.xl_quantity, 10) + parseInt(item.xxl_quantity, 10) + parseInt(item.xxxl_quantity, 10) + parseInt(item.xxxxl_quantity, 10)),
        };
        const itemTotal = parseInt(item.ss_quantity, 10) + parseInt(item.s_quantity, 10) + parseInt(item.m_quantity, 10) + parseInt(item.l_quantity, 10)
                + parseInt(item.xl_quantity, 10) + parseInt(item.xxl_quantity, 10) + parseInt(item.xxxl_quantity, 10) + parseInt(item.xxxxl_quantity, 10);
        poTotal += itemTotal;
        poAmount += poItem.amount;
        poItemList.push(poItem);
      });
      po.quantity = poTotal;
      po.amount = poAmount;
      await po.save();
      await this.poItemModel.bulkCreate(poItemList);
      return await this.poItemModel.findAll({
        where: {
          po_id: po.id,
        },
      });
    } else {
      return [];
    }
  }
}

module.exports = PurchaseOrderItemService;
