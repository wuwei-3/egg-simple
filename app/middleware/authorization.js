/*
 * @Author: wuwei
 * @Date: 2022-03-01 18:41:00
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-03-02 17:13:21
 * @FilePath: \egg-simple\app\middleware\authorization.js
 */
'use strict';
module.exports = (options) => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization;
    let decode = '';
    if (token) {
      /* 实现单点登录,后面可以通过缓存实现，目前每次接口都要查询用户信息，有很多开销 */
      const user = await ctx.app.mysql.get('users', { token: token.slice(7) });
      if (!user || user.token != token.slice(7)) {
        return ctx.body = {
          status: 401,
          message: 'token已过期，请重新登录！',
        };
      }
      try {
        // 解码验证token，
        decode = ctx.app.jwt.verify(token.slice(7), options.secret);
        // 获取用户信息
        ctx.decode = decode;
      } catch (error) {
        return ctx.body = {
          status: 401,
          message: 'token已过期，请重新登录！',
        };
      }
      //切记先解析token并存储数据后再执行回调，否则解析数据获取不到
      await next();
    } else {
      return ctx.body = {
        status: 401,
        message: 'token不能为空',
      };

    }
  };
};