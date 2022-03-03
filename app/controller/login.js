/*
 * @Author: wuwei 
 * 需要注意，密码需要加密，后面有条件可以采用验证码登录，避免服务器被攻击
 * @Date: 2022-03-01 17:50:42
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:32:36
 * @FilePath: \egg-simple\app\controller\login.js
 */
'use strict';

const Controller = require('../core/base_controller');
class LoginController extends Controller {
  /**
   * @description: 登录获取令牌
   * @param {*} 登录规定只能在一处登录，另外一处登录后将挤掉之前登录
   * @return {*}
   */
  async login () {
    const { ctx, app } = this
    /* 密码通过md5加密 */
    const body = ctx.request.body;
    let res = await ctx.service.login.login(body);
    return res == false ? this.fail('登录失败') : this.success(res)
  }

}

module.exports = LoginController;
