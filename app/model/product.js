'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Product = app.model.define('Products', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    code: STRING,
    cate_id: INTEGER,
    cate_name: STRING,
    cost: INTEGER,
    price: INTEGER,
    color: {
      type: STRING,
      get () {
        return JSON.parse(this.getDataValue('color')).toString();
      }
    },
    size: {
      type: STRING,
      get () {
        return JSON.parse(this.getDataValue('size')).toString();
      }
    },
    quantity: INTEGER,
    supplier_id: INTEGER,
    supplier_name: STRING,
    remark: STRING,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return Product;
};
