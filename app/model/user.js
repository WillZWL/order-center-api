'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('Users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    code: STRING,
    password: STRING,
    mobilephone: STRING,
    depart: STRING,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return User;
};
