/*
 * @Author: wuwei
 * @Date: 2022-03-01 22:02:16
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-02 18:06:19
 * @FilePath: \egg-simple\app\controller\user.js
 */
'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  async getUserList () {
    let { ctx, app } = this;
    try {
      let users = await app.mysql.select('users');
      /* 不能把token返回给前端 */
      users.map(item => {
        delete item.token
        delete item.password
      });
      this.success(users, '查询所有用户成功')
    } catch (error) {
      this.fail('查询所有用户失败')
    }
  }
  /* 用户注册 */
  async addUser () {
    const { ctx, app } = this
    const userInfo = ctx.request.body;
    let uuid = ctx.helper.uuid()
    try {
      let userCheck = await app.mysql.get('users', { phone: userInfo.phone });
      if (userCheck) {
        return this.fail('用户已存在')
      }
      /* 默认普通用户 */
      let add = { uuid: uuid, ...userInfo, password: ctx.helper.md5(userInfo.password), type: userInfo.type || 2 }
      console.log(11, add);
      await app.mysql.insert('users', add);
      this.success('新增用户成功')
    } catch (error) {
      this.fail('新增用户失败')
    }
  }
}

module.exports = UserController;
