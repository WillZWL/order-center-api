'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const PurchaseOrder = app.model.define('purchase_orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    supplier_id: INTEGER,
    supplier_name: STRING,
    user_id: INTEGER,
    user_name: STRING,
    create_date: DATE,
    quantity: INTEGER,
    amount: INTEGER,
    status: INTEGER,
    remark: STRING,
    note: STRING,
  });

  PurchaseOrder.associate = function () {
    app.model.PurchaseOrder.hasMany(app.model.PurchaseOrderItem, { as: 'po_item', foreignKey: 'po_id' });
  };  
  return PurchaseOrder;  
};