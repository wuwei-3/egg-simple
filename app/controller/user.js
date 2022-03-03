/*
 * @Author: wuwei
 * @Date: 2022-03-01 22:02:16
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 09:10:15
 * @FilePath: \egg-simple\app\controller\user.js
 */
'use strict';

const Controller = require('../core/base_controller');
class UserController extends Controller {
  async getUserList () {
    let { ctx, app } = this;
    try {
      /* 查询没有被删除的用户 */
      let users = await app.mysql.select('users', { where: { isDelete: ['1'] } });
      /* 不能把token返回给前端 */
      users.map(item => {
        delete item.token
        delete item.password
      });
      this.success(users, '查询所有用户成功')
    } catch (error) {
      console.log(error);
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
      await app.mysql.insert('users', add);
      return this.success('新增用户成功')
    } catch (error) {
      console.log(error);
      return this.fail('新增用户失败')
    }
  }
  /**
   * @description: 用户修改，修改用户信息，密码也可以直接修改，但密码，token等保密字段不返回给前端
   * @param {*} 修改根据uuid进行修改，并非id
   * @return {*}
   */
  async editUser () {
    const { ctx, app } = this
    const userInfo = ctx.request.body;
    if (!userInfo.id) {
      return this.fail('id字段不能为空')
    }
    /* 修改前校验 */
    let userCheck = await app.mysql.get('users', { id: userInfo.id });
    if (userCheck && userCheck.phone != userInfo.phone) {
      return this.fail('不允许修改账号，账号是唯一的')
    }
    try {
      /* 性别可能需要转换成int */
      let user = await app.mysql.update('users', { ...userInfo });
      this.success(user, '修改用户成功')
    } catch (error) {
      console.log(error);
      this.fail('修改用户失败')
    }
  }
  /**
 * @description: 用户删除，这里需要注意删除用户将用户关联逻辑删除，下次用户注册可直接看到老数据
 * @param {*}
 * @return {*}
 */
  async delUser () {
    const { ctx, app } = this
    const { id } = ctx.request.query; // 直接获取用户ID
    if (Number(id) == 1) {
      return this.fail('超级管理员不允许删除')
    }
    try {
      let user = await app.mysql.delete('users', { id: Number(id) });
      if (user.affectedRows == 0) {
        return this.fail('用户不存在')
      }
      this.success('删除用户成功')
    } catch (error) {
      this.fail('删除用户失败')
    }
  }
}

module.exports = UserController;
