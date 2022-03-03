/*
 * @Description: 定时任务
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-10-22 14:52:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:36:51
 */
const Subscription = require('egg').Subscription;

class CleanDB extends Subscription {
  /* 自定义定时器，可用于静态资源无用去除 */
  static get schedule () {
    return {
      type: 'worker',
      // cron: '0 0 3 * * *',
      interval: '10m',
      immediate: true,
    };
  }

  async subscribe () {
    console.log('定时任务开始,10分钟一次');
  }
}

module.exports = CleanDB;
