'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  /* 数据库插件 */
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  /* 登录鉴权 */
  jwt: {
    enable: true,
    package: "egg-jwt"
  }
};
