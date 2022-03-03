/*
 * @Description: 定时任务
 * @Version: 2.0
 * @Autor: wuwei3
 * @Date: 2021-10-22 14:52:18
 * @LastEditors: OBKoro1
 * @LastEditTime: 2021-12-09 14:12:29
 */
const Subscription = require('egg').Subscription;

class CleanDB extends Subscription {
  /**
   * @property {Object} schedule
   *  - {String} type - schedule type, `worker` or `all` or your custom types.
   *  - {String} [cron] - cron expression, see [below](#cron-style-scheduling)
   *  - {Object} [cronOptions] - cron options, see [cron-parser#options](https://github.com/harrisiirak/cron-parser#options)
   *  - {String | Number} [interval] - interval expression in millisecond or express explicitly like '1h'. see [below](#interval-style-scheduling)
   *  - {Boolean} [immediate] - To run a scheduler at startup
   *  - {Boolean} [disable] - whether to disable a scheduler, usually use in dynamic schedule
   *  - {Array} [env] - only enable scheduler when match env list
   */
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
