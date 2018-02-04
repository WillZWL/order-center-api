'use strict';
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async index() {
    const { ctx } = this;
    const status = ctx.query.status;
    const where = {
      status,
    };
    const list = await ctx.service.order.getList(where);
    ctx.body = {
      status: 0,
      data: list,
    };
  }

  async get() {
    const { ctx } = this;
    const id = ctx.query.id;
    const where = {
      id
    };
    const order = await ctx.service.order.getDetail(where);
    ctx.body = {
      status: 0,
      data: order,
    };
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const order = await ctx.service.order.update(data);
    if (order) {
      ctx.body = {
        order,
      };
    } else {
      ctx.body = {};
    }
  }

  async updateStatus() {
    const { ctx } = this;
    const data = ctx.request.body;
    const order = await ctx.service.order.updateStatus(data);
    ctx.body = {
      order,
    }
  }

  async orderPrint() {
    const { ctx } = this;
    const data = ctx.request.body;
    const order = await ctx.service.order.orderPrint(data);
    ctx.body = {
      status: 0,
      order
    }
  }

  async printImgUpload() {
    const { ctx } = this;
    const date = ctx.helper.dateFormat();
    const randomNum = ctx.helper.randomNum(3);
    const filepath = `print-img/${date}/`;
    const name = ctx.helper.dateFormat('HHmmss') + randomNum;
    const file = await this.upload(filepath, name);
    ctx.body = {
      type: 1,
      path: file 
    };
  }

  async invoiceUpload() {
    const { ctx } = this;
    const date = ctx.helper.dateFormat();
    const randomNum = ctx.helper.randomNum(3);
    const filepath = `invoice/${date}/`;
    const name = ctx.helper.dateFormat('HHmmss') + randomNum;
    const file = await this.upload(filepath, name);
    ctx.body = {
      type: 2,
      path: file 
    };
  }

  async upload(filepath = '', name = '') {
    const { ctx } = this;
    const targetDir = path.join(this.config.baseDir, 'app/public/' + filepath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    const stream = await this.ctx.getFileStream();
    const ext = path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/' + filepath + name + ext);
    const writeStream = fs.createWriteStream(target);
    let file = '';
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    file = '/public/' + filepath + name + ext;
    return file;
  }
}

module.exports = OrderController;
