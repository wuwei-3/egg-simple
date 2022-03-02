'use strict';

/* 这里对应ctx值
 * application.js —— this指向：app对象
 * context.js —— this指向：ctx对象
 * request.js —— this指向：ctx.request对象
 * response.js —— this指向：ctx.response对象
 * helper.js —— this指向：ctx.helper对象
*/
module.exports = {
  SUCCESS_CODE: 200, // 成功
  NO_LOGIN_CODE: 401, // 未登录
  UNIQUE_CODE: 400, // 唯一性冲突
  ERROR_CODE: 500, // 失败
};
