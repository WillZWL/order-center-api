'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Receipt = app.model.define('receipts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    order_id: INTEGER,
    order_sn: STRING,
    create_date: DATE,
    user_id: INTEGER,
    creator: STRING,
    client_id: INTEGER,
    client_name: STRING,
    tax_no: STRING,
    tel_and_address: STRING,
    bank_and_account: STRING,
    quantity: INTEGER,
    amount: INTEGER,
    remark: STRING,
    status: INTEGER,
  });

  return Receipt;
};