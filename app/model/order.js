'use strict';

const statusArr = [ '已删除', '已驳回', '待审核', '已审核', '已派单', '已发货' ];

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Order = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_sn: STRING,
    user_id: INTEGER,
    creator: STRING,
    channel_id: INTEGER,
    channel_name: STRING,
    order_date: DATE,
    client_id: INTEGER,
    client_name: STRING,
    invoice_type: INTEGER,
    delivery_time: DATE,
    delivery_company_id: INTEGER,
    delivery_company_name: STRING,
    account_id: INTEGER,
    account_name: STRING,
    payment_amount: INTEGER,
    payment_remark: STRING,
    amount: INTEGER,
    item_quantity: INTEGER,
    is_print: INTEGER,
    print_cost: INTEGER,
    deadline: DATE,
    overdue_reason: STRING,
    status: INTEGER,
    remark: STRING,
    note: STRING,
  }, {
    getterMethods: {
      statusStr() {
        return statusArr[this.status];
      }
    }
  });

  Order.prototype.associate = function() {
    app.model.Order.hasMany(app.model.OrderItem, { as: 'order_item', foreignKey: 'order_id' });
    app.model.Order.hasMany(app.model.OrderAttachment, { as: 'order_attachment', foreignKey: 'order_id' });
    app.model.Order.hasOne(app.model.Receipt, { as: 'receipt', foreignKey: 'order_id' });
  };

  return Order;
};
