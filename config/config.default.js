/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    /* 数据库 */
    mysql: {
      // database configuration
      client: {
        // host
        host: '47.98.55.236',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'root',
        // database
        database: 'egg',
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },

  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645672039376_6484';

  /* 跨域 */
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    /* 配置白名单 */
    domainWhiteList: ['*'] // 例：http://${myHost}:7001
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 开启中间件，登录页不需要权限认证
  config.middleware = ['authorization', 'errorHandler'];
  /* 统一错误处理 */
  config.errorHandler = {
    enable: true,
    match: '/api',
  }
  /* 登录鉴权 */
  config.authorization = {
    enable: true,
    // ignore: '/list', // 这里可以忽略免token接口库，例如下载文件
    match (ctx) {
      const url = ctx.request.url;
      /* 配置除login外都开启登录校验 */
      if (url.startsWith('/login')) {
        return false;
      } else {
        return true;
      }
    }
  };

  /* 自定义加密字符串 */
  config.jwt = {
    secret: 'wuwei',
  };

  return {
    ...config,
    ...userConfig,
  };
};