'use strict';

const Service = require('egg').Service;

class PurchaseOrderService extends Service {
  constructor(ctx) {
    super(ctx);
    this.purchaseOrderModel = ctx.model.PurchaseOrder;
    this.productModel = ctx.model.Product;
    this.attributeValueModel = ctx.model.AttributeValue;
  }

  async getList() {
    const list = await this.purchaseOrderModel.findAll();
    return list;
  }

  async get() {
  }

  async update(data = {}) {
    const { ctx } = this;
    const id = data.id;
    const productId = data.product_id;
    const stockList = data.stock_list;
    const type = data.type ? data.type: 1;
    let purchaseOrder = false;
    if (id) {
      purchaseOrder = await this.purchaseOrderModel.findById(id);
      purchaseOrder.ss_quantity = data.ss_quantity;
      purchaseOrder.s_quantity = data.s_quantity;
      purchaseOrder.m_quantity = data.m_quantity;
      purchaseOrder.l_quantity = data.l_quantity;
      purchaseOrder.xl_quantity = data.xl_quantity;
      purchaseOrder.xxl_quantity = data.xxl_quantity;
      purchaseOrder.xxxl_quantity = data.xxxl_quantity;
      purchaseOrder.xxxxl_quantity = data.xxxxl_quantity;
      purchaseOrder.amount = purchaseOrder.price * (parseInt(data.ss_quantity, 10) + parseInt(data.s_quantity, 10) + parseInt(data.m_quantity, 10) + parseInt(data.l_quantity, 10)
      + parseInt(data.xl_quantity, 10) + parseInt(data.xxl_quantity, 10) + parseInt(data.xxxl_quantity, 10) + parseInt(data.xxxxl_quantity, 10)),
      purchaseOrder.status = data.status;
      await purchaseOrder.save();
    } else {
      const product = await this.productModel.findById(productId);
      const base = {
        
      };
      const productColor = product.color.split(',');
      const colorList = await this.attributeValueModel.findAll({
        where: {
          attribute_id: 1,
          value: { $in: productColor },
        }
      });
      const poList = [];
      stockList.forEach(stock => {
        const color = ctx.helper.reducedFilter(colorList, ['id', 'value'], item => item.value === stock.color);
        const total = parseInt(stock.ss_quantity, 10) + parseInt(stock.s_quantity, 10) + parseInt(stock.m_quantity, 10) + parseInt(stock.l_quantity, 10)
                + parseInt(stock.xl_quantity, 10) + parseInt(stock.xxl_quantity, 10) + parseInt(stock.xxxl_quantity, 10) + parseInt(stock.xxxxl_quantity, 10);
        const po = {
          type,
          product_id: productId,
          product_name: product.name,
          product_code: product.code,
          cate_id: product.cate_id,
          cate_name: product.cate_name,
          price: product.price,
          color_id: color[0].id,
          color_name: color[0].value,
          ss_quantity: stock.ss_quantity,
          s_quantity: stock.ss_quantity,
          m_quantity: stock.m_quantity,
          l_quantity: stock.l_quantity,
          xl_quantity: stock.xl_quantity,
          xxl_quantity: stock.xxl_quantity,
          xxxl_quantity: stock.xxxl_quantity,
          xxxxl_quantity: stock.xxxxl_quantity,
          amount: product.price * (parseInt(stock.ss_quantity, 10) + parseInt(stock.s_quantity, 10) + parseInt(stock.m_quantity, 10) + parseInt(stock.l_quantity, 10)
          + parseInt(stock.xl_quantity, 10) + parseInt(stock.xxl_quantity, 10) + parseInt(stock.xxxl_quantity, 10) + parseInt(stock.xxxxl_quantity, 10)),
        }
        poList.push(po);
      });
      await this.purchaseOrderModel.bulkCreate(poList);
    }
    return purchaseOrder;
  }
}

module.exports = PurchaseOrderService;
