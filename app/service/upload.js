/*
 * @Author: wuwei
 * @Date: 2022-03-03 11:13:14
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:25:44
 * @FilePath: \egg-simple\app\service\upload.js
 */
'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

let uploadPath = '../../app/public/upload'; // 默认存储路径

class UploadService extends Service {
  /* service层处理文件 */
  async uploadFile (ctx) {
    const stream = await ctx.getFileStream(); // multipart() 接收多个文件
    const filename = stream.filename;
    const target2 = path.join(__dirname, uploadPath);
    const target = path.join(__dirname, uploadPath, filename);
    /* 判断文件夹是否存在 */
    if (!fs.existsSync(target2)) {
      fs.mkdirSync(target2);
    }
    // 写入流
    let res = ''
    let writeStream = ''
    try {
      writeStream = fs.createWriteStream(target);
      res = await this.saveStream(stream, writeStream);
      writeStream.end(); // 保存后关闭流
      if (res) {
        return filename
      }
    } catch (error) {
      writeStream.end(); // 保存后关闭流
      return false
    }
  }
  /* 判断文件是否存在 */
  async isFileExisted (target) {
    return new Promise(function (resolve, reject) {
      fs.access(target, (err) => {
        if (err) {
          reject();
        } else {
          resolve('existed');
        }
      });
    });
  }

  /* 文件上传 */
  async saveStream (stream, writeStream) {
    return new Promise((res, rej) => {
      stream
        .pipe(writeStream)
        .on('finish', () => {
          res(true);
        })
        .on('error', () => {
          rej(false);
        });
    });
  }
}

module.exports = UploadService;
