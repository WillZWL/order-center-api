'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const OrderAddress = app.model.define('order_addresses', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_id: INTEGER,
    order_sn: STRING,
    contacts_name: STRING,
    contacts_tel: STRING,
    province: STRING,
    city: STRING,
    district: STRING,
    address: STRING,            
  });

  return OrderAddress;
};