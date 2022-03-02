'use strict';

const { v1 } = require('uuid');
const md5 = require('md5');

/* 这里处理一些复杂的方法，作为独立函数抽离 */
module.exports = {
  /* 生成uuid */
  uuid () {
    return v1()
  },
  /* md5加密 */
  md5 (val) {
    return md5(val)
  },
};
