'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Category = app.model.define('categorys', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    parent_id: INTEGER,
    level: INTEGER,
    status: INTEGER,
  }, {
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return Category;
};
