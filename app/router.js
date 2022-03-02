'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /* 登录鉴权 */
  router.post('/login', controller.login.login);
  /* 目前只对api进行全局错误拦截 */
  router.get('/api/userList', controller.user.getUserList);
  router.get('/api/addUser', controller.user.addUser);
};
