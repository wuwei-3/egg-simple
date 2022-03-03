/*
 * @Description:
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-10-22 15:48:00
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:27:51
 */
'use strict';

const Controller = require('../core/base_controller');
class HomeController extends Controller {
  /* 删除文件 */
  async deleteFile () { }

  /* 文件保存 */
  async saveFile () {
    const { ctx } = this;
    let res = await ctx.service.upload.uploadFile(ctx)
    return res == false ? this.fail('上传文件失败') : this.success(res)
  }

}

module.exports = HomeController;
