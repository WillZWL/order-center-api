'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const OrderItems = app.model.define('order_items', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_id: INTEGER,
    order_sn: STRING,
    product_id: INTEGER,
    product_name: STRING,
    color_id: INTEGER,
    color_name: STRING,
    ss_quantity: INTEGER,
    s_quantity: INTEGER,
    m_quantity: INTEGER,
    l_quantity: INTEGER,
    xl_quantity: INTEGER,
    xxl_quantity: INTEGER,
    xxxl_quantity: INTEGER,
    xxxxl_quantity: INTEGER,
    price: INTEGER,
    total_quantity: INTEGER,
    amount: INTEGER,
  });

  OrderItems.prototype.associate = function() {
    app.model.OrderItems.belongsTo(app.model.Order, { as: 'order', foreignKey: 'order_id' });
  }

  return OrderItems;
};