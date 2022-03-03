/*
 * @Author: wuwei
 * @Date: 2022-03-02 09:24:25
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:51:01
 * @FilePath: \egg-simple\app.js
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  beforeStart () {
    console.log('服务器已成功启动');
  }
}

module.exports = AppBootHook;