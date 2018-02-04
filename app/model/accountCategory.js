'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const AccountCategory = app.model.define('account_categorys', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    name: STRING,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return AccountCategory;
};
