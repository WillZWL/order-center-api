'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514983311991_2624';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'order-center',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
  };

  config.security = {
    domainWhiteList: [ 'http://127.0.0.1:8080', 'http://localhost:8080' ],
    csrf: {
      enable: false,
    },
  };

  // add your config here
  config.middleware = [ 'errorHandler' ];

  return config;
};
