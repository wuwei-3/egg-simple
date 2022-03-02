'use strict';

const { Controller } = require('egg');


/**
 * BaseController 这里需要注意，所有错误日志必须打出来，否则看不出来日式
 * @class
 * @author wuwei3
 */
class BaseController extends Controller {
  get user () {
    return this.ctx.session.user;
  }
  /* 统一成功回调 */
  success (data, message = '请求成功', status = 200) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data, message };
    this.ctx.status = status;
  }
  /* 统一失败回调 */
  fail (message = '请求失败') {
    /* 可能没有code直接返回message */
    this.ctx.body = { code: 400, message };
    this.ctx.status = 200;
  }
  /* 统一404 */
  notFound (msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
