'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;

class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.orderService = ctx.service.order;
  }

  async index() {
    const { ctx } = this;
    const perPage = 20;
    const { status, page, order_sn, client_name, start_date, end_date } = ctx.query;
    const where = {
      status,
    };
    if (order_sn) {
      where.order_sn = order_sn;
    }
    if (client_name) {
      where.client_name = { $like: `%${client_name}%` };
    }
    if (start_date) {
      where.created_at = { $gte: start_date };
    }
    if (end_date) {
      where.created_at = { $lte: end_date };
    }
    if (start_date && end_date) {
      where.created_at = { $between: [ start_date + ' 00:00:00', end_date + ' 23:59:59' ]};
    }
    const option = {
      order: [
        ['created_at', 'DESC'],
      ],
      offset: (page - 1) * perPage,
      limit: perPage,
    }
    const list = await this.orderService.getList(where, option);
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
    const order = await this.orderService.getDetail(where);
    ctx.body = {
      status: 0,
      data: order,
    };
  }

  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const order = await this.orderService.update(data);
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
    const order = await this.orderService.updateStatus(data);
    ctx.body = {
      order,
    }
  }

  async orderPrint() {
    const { ctx } = this;
    const data = ctx.request.body;
    const order = await this.orderService.orderPrint(data);
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

  async orderReceipt() {
    const { ctx } = this;
    const data = ctx.request.body;
    const receipt = await this.orderService.orderReceipt(data);
    if (receipt) {
      ctx.body = {
        receipt
      }
    } else {
      ctx.body = {};
    }
  }
}

module.exports = OrderController;
