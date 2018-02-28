'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { app, ctx } = this;
    this.ctx.body = ctx.helper.md5('123456' + app.config.keys);
  }
}

module.exports = HomeController;
