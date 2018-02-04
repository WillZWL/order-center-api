'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const AttributeValue = app.model.define('attribute_value', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    attribute_id: INTEGER,
    attribute_name: STRING,
    value: STRING,
  });

  return AttributeValue;
};
