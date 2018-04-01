'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Member = app.model.define('members', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: INTEGER,
    category: INTEGER,
    category_name: STRING,
    name: STRING,
    code: STRING,
    contacts_name: STRING,
    mobilephone: STRING,
    telphone: STRING,
    province: STRING,
    city: STRING,
    district: STRING,
    address: STRING,
    status: INTEGER,
    remark: STRING,
  }, {
    getterMethods: {
      sys_code() {
        return 'KH' + (this.id/Math.pow(10, 4)).toFixed(4).substr(2);
      },
    },
    defaultScope: {
      where: {
        status: 1,
      },
    },
  });

  return Member;
};
