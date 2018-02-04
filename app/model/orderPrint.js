'use strict';

const typeArr = [ '', '丝网印', '热转印', '刺绣' ];

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const OrderPrints = app.model.define('order_prints', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    order_id: INTEGER,
    order_sn: STRING,
    type: INTEGER,
    printshop_id: INTEGER,
    printshop_name: STRING,
    printcost: INTEGER,
  }, {
    getterMethods: {
        typeStr() {
          return typeArr[this.type];
        }
      }
  });

  return OrderPrints;
};
