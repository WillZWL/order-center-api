'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx, app } = this;
    const { userName, password } =  ctx.request.body;
    const user = await app.model.User.findOne({
      where: {
        name: userName,
      },
    });
    if (user) {
      const md5pwd = ctx.helper.md5(password + app.config.keys);
      if (md5pwd === user.password) {
        ctx.body = {
          status: 1,
          data: {
            id: user.id,
            name: user.name,
            code: user.code,
          },
          message: '登陆成功',
        };
      } else {
        ctx.body = {
          status: 0,
          message: '登陆失败',
        };
      }
    } else {
      ctx.body = {
        status: 0,
        message: '登陆失败',
      };
    }
  }
}

module.exports = LoginController;
