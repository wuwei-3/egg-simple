/*
 * @Author: wuwei
 * @Date: 2022-03-03 11:40:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:44:25
 * @FilePath: \egg-simple\app\router\index.js
 */
module.exports = (app) => {
  /* 测试用户进入 */
  app.router.get('/index', app.controller.home.index);
};