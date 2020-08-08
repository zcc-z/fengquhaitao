/*
Navicat MySQL Data Transfer

Source Server         : haha
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : mydb2004

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-08-06 17:53:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `reg`
-- ----------------------------
DROP TABLE IF EXISTS `reg`;
CREATE TABLE `reg` (
  `id` tinyint(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reg
-- ----------------------------
INSERT INTO `reg` VALUES ('31', 'zhangsan', '121212a', '13633333333', '1515245@qq.com');
INSERT INTO `reg` VALUES ('29', 'zhangsan1', '1212121a', '13855026574', '1728851643@qq.com');
INSERT INTO `reg` VALUES ('30', 'zhangsan2', '121212a', '13655018404', '143141212@qq.com');
