'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Account = app.model.define('accounts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    category: INTEGER,
    category_name: STRING,
    subject: STRING,
    subject_code: STRING,
    remark: STRING,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return Account;
};
