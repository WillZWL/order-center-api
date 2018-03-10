'use strict';

const Service = require('egg').Service;

class ProductService extends Service {
  constructor(ctx) {
    super(ctx);
    this.productModel = ctx.model.Product;
    this.categoryModel = ctx.model.Category;
    this.memberModel = ctx.model.Member;
    this.inventoryModel = ctx.model.ProductInventory;
  }

  async getList(where = {}, option = {}) {
    const { app } = this;    
    const list = await this.productModel.findAndCountAll({
      include: [{
        model: this.inventoryModel,
        required: false,
        as: 'inventory',
        attributes:[ 
          [app.Sequelize.fn('SUM', app.Sequelize.col('ss_quantity')), 'ss_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('s_quantity')), 's_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('m_quantity')), 'm_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('l_quantity')), 'l_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('xl_quantity')), 'xl_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('xxl_quantity')), 'xxl_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('xxxl_quantity')), 'xxxl_quantity'],
          [app.Sequelize.fn('SUM', app.Sequelize.col('xxxxl_quantity')), 'xxxxl_quantity'],
        ],
      }], 
      where,
      distinct: true,
      subQuery: false,
      group: ['products.id'],
      offset: option.offset,
      limit: option.limit,
    });
    return list;
  }

  async get() {
  }

  async update(data) {
    const { app } = this;
    const id = data.id;
    let product = {};
    const category = await this.categoryModel.findById(data.cate_id);
    const supplier = await this.memberModel.findById(data.supplier_id);
    if (id) {
      product = await this.productModel.findById(id);
      product.name = data.name;
      product.code = data.code;
      product.cate_id = data.cate_id;
      product.cate_name = category.name;
      product.cost = data.cost;
      product.price = data.price;
      product.color = JSON.stringify(data.color);
      product.size = JSON.stringify(data.size);
      product.quantity = data.quantity;
      product.supplier_id = data.supplier_id;
      product.supplier_name = supplier.name;
      product.remark = data.remark;
      product.status = data.status;
      await product.save();
    } else {
      data.cate_name = category.name;
      data.color = JSON.stringify(data.color);
      data.size = JSON.stringify(data.size);
      data.supplier_name = supplier.name;
      product = await this.productModel.create(data);
    }
    return product;
  }
}

module.exports = ProductService;
