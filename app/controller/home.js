'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    // console.log(app.model);
    this.ctx.body = ctx.helper.md5('123456' + app.config.keys);
    // console.log(app.config.keys);
    // this.ctx.body = app.config.keys;
  }
}

module.exports = HomeController;
