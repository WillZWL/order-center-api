'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const InvoiceType = app.model.define('invoice_types', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return InvoiceType;
};
