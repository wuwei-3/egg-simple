'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /* 可以使用引入方式 */
  require('./router/index')(app);
  /* 登录鉴权 */
  router.post('/login', controller.login.login);
  // 用于批量插入用户
  // router.get('/test', controller.test.index);
  /* 目前只对api进行全局错误拦截 */
  // 用户增删改查
  router.get('/api/userList', controller.user.getUserList);
  router.get('/api/addUser', controller.user.addUser);
  router.post('/api/updateUser', controller.user.editUser);
  router.get('/api/deleteUser', controller.user.delUser);
  // 商品增删改查
  // 消费增删改查
  // 大图展示接口
  // 上传文件接口
  router.post('/api/uploadFile', controller.file.saveFile);//单个上传
  router.post('/api/uploadMultipart', controller.file.saveFile); // 批量上传
};
