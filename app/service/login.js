/*
 * @Author: wuwei
 * @Date: 2022-03-03 11:28:52
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:33:03
 * @FilePath: \egg-simple\app\service\login.js
 */
'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  /* 统一登录处理 */
  async login ({ phone, password }) {
    const { ctx, app } = this
    if (!phone || !password) {
      console.log('用户或密码不能为空！');
      return false
    }
    /* 这里需要注意，username 是手机号 */
    const user = await app.mysql.get('users', { phone });
    if (!user) {
      console.log('用户不存在！');
      return false
    }
    if (user.phone != phone || user.password != password) {
      console.log('用户名或密码有误！');
      return false
    }
    let uuid = ctx.helper.uuid()
    /* 通过uuid设置唯一令牌，且用户登录只能在一处登录 */
    try {
      let token = app.jwt.sign(uuid, app.config.jwt.secret);
      /* 更新完后，其他登录人信息将无法使用 */
      app.mysql.update('users', { id: user.id, token: token, uuid: uuid });
      console.log('生成令牌', token);
      return token
    } catch (error) {
      console.log('获取令牌失败:', error);
      return false
    }
  }
}

module.exports = LoginService;
