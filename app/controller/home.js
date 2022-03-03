/*
 * @Author: wuwei
 * @Date: 2022-03-03 11:41:01
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-03 11:41:01
 * @FilePath: \egg-simple\app\controller\home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    return 'Hello egg.js'
  }
}

module.exports = HomeController;
