'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const PurchaseOrderItem = app.model.define('purchase_order_items', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    po_id: INTEGER,
    type: INTEGER,
    product_id: INTEGER,
    product_name: STRING,
    product_code: STRING,
    cate_id: INTEGER,
    cate_name: STRING,
    color_id: INTEGER,
    color_name: STRING,
    price: INTEGER,
    ss_quantity: INTEGER,
    s_quantity: INTEGER,
    m_quantity: INTEGER,
    l_quantity: INTEGER,
    xl_quantity: INTEGER,
    xxl_quantity: INTEGER,
    xxxl_quantity: INTEGER,
    xxxxl_quantity: INTEGER,
    amount: INTEGER,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return PurchaseOrderItem;
};
