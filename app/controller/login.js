/*
 * @Author: wuwei 
 * 需要注意，密码需要加密，后面有条件可以采用验证码登录，避免服务器被攻击
 * @Date: 2022-03-01 17:50:42
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-02 17:41:37
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
    const { phone, password } = ctx.request.body;
    if (!phone || !password) {
      return this.fail('用户或密码不能为空！')
    }
    /* 这里需要注意，username 是手机号 */
    const user = await app.mysql.get('users', { phone });
    if (!user) {
      return this.fail('用户不存在！')
    }
    if (user.phone != phone || user.password != ctx.helper.md5(password)) {
      return this.fail('用户名或密码有误！')
    }
    let uuid = ctx.helper.uuid()
    /* 通过uuid设置唯一令牌，且用户登录只能在一处登录 */
    try {
      let token = app.jwt.sign(uuid, app.config.jwt.secret);
      /* 更新完后，其他登录人信息将无法使用 */
      app.mysql.update('users', { id: user.id, token: token, uuid: uuid });
      console.log('生成令牌', token);
      this.success(token, '获取令牌成功')
    } catch (error) {
      this.fail('获取令牌失败')
    }
  }

}

module.exports = LoginController;
