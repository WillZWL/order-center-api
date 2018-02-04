'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Attribute = app.model.define('attributes', {
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

  return Attribute;
};
