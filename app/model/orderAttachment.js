'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const OrderAttachment = app.model.define('order_attachments', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    order_id: INTEGER,
    order_sn: STRING,
    path: STRING,
  });

  return OrderAttachment;
};