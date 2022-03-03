/*
 Navicat MySQL Data Transfer

 Source Server         : 47.98.55.236
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 47.98.55.236:3306
 Source Schema         : egg

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 02/03/2022 19:59:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `uuid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户唯一标识，外键',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` int(1) NULL DEFAULT NULL COMMENT '性别，1：男，2：女',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `type` int(11) NULL DEFAULT NULL COMMENT '用户类型，提供自定义类型',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `money` int(11) NULL DEFAULT NULL COMMENT '余额',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '店名',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '门店地址',
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录成功后的令牌，用作淡点登录',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `remark1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备用字段1',
  `remark2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备用字段2',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '4461ec40-9a1d-11ec-9fdf-4f0a4bce6ed9', 'admin', NULL, '21232f297a57a5a743894a0e4a801fc3', 1, '19955797645', 10000, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiJ9.NDQ2MWVjNDAtOWExZC0xMWVjLTlmZGYtNGYwYTRiY2U2ZWQ5.ddqo5peXKjFCvnJgyxaJUrGMV73nLMhaWz5W1gsGo8c', '超级管理员账号', NULL, NULL);
INSERT INTO `users` VALUES (7, '89ca84d0-9a1e-11ec-9cce-9da383496b16', '位伍', NULL, '202cb962ac59075b964b07152d234b70', 2, '19955797444', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
