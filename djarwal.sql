/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : 127.0.0.1:3306
 Source Schema         : djarwal

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 14/01/2023 20:13:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for additional_items
-- ----------------------------
DROP TABLE IF EXISTS `additional_items`;
CREATE TABLE `additional_items`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `harga` int NULL DEFAULT NULL,
  `jumlah` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of additional_items
-- ----------------------------
INSERT INTO `additional_items` VALUES (1, 'Extra Bed', 100000, 99, '2022-12-18 12:09:44', '2022-12-18 12:02:17');

-- ----------------------------
-- Table structure for adonis_schema
-- ----------------------------
DROP TABLE IF EXISTS `adonis_schema`;
CREATE TABLE `adonis_schema`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `batch` int NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of adonis_schema
-- ----------------------------
INSERT INTO `adonis_schema` VALUES (1, 'database/migrations/1663061323440_roles', 1, '2022-12-16 11:28:33');
INSERT INTO `adonis_schema` VALUES (2, 'database/migrations/1663062741177_tipe_kamars', 1, '2022-12-16 11:28:34');
INSERT INTO `adonis_schema` VALUES (3, 'database/migrations/1663063658824_tamus', 1, '2022-12-16 11:28:34');
INSERT INTO `adonis_schema` VALUES (4, 'database/migrations/1663230295582_additional_items', 1, '2022-12-16 11:28:35');
INSERT INTO `adonis_schema` VALUES (5, 'database/migrations/1664603644393_aulas', 1, '2022-12-16 11:28:35');
INSERT INTO `adonis_schema` VALUES (6, 'database/migrations/1665912826608_diskons', 1, '2022-12-16 11:28:37');
INSERT INTO `adonis_schema` VALUES (7, 'database/migrations/1667105019678_kamars', 1, '2022-12-16 11:28:38');
INSERT INTO `adonis_schema` VALUES (8, 'database/migrations/1667105135936_resepsis', 1, '2022-12-16 11:28:40');
INSERT INTO `adonis_schema` VALUES (9, 'database/migrations/1667455197231_users', 1, '2022-12-16 11:28:42');
INSERT INTO `adonis_schema` VALUES (10, 'database/migrations/1667570043493_booking_aulas', 1, '2022-12-16 11:28:42');
INSERT INTO `adonis_schema` VALUES (11, 'database/migrations/1671369932309_bookings', 2, '2022-12-18 20:55:20');
INSERT INTO `adonis_schema` VALUES (12, 'database/migrations/1672561027514_reports', 3, '2023-01-01 15:33:05');

-- ----------------------------
-- Table structure for adonis_schema_versions
-- ----------------------------
DROP TABLE IF EXISTS `adonis_schema_versions`;
CREATE TABLE `adonis_schema_versions`  (
  `version` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of adonis_schema_versions
-- ----------------------------
INSERT INTO `adonis_schema_versions` VALUES (2);

-- ----------------------------
-- Table structure for aulas
-- ----------------------------
DROP TABLE IF EXISTS `aulas`;
CREATE TABLE `aulas`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deskripsi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `harga` int NULL DEFAULT NULL,
  `kapasitas` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of aulas
-- ----------------------------
INSERT INTO `aulas` VALUES (1, 'Tipe A', 'null', 1000000, 50, 0, '2022-12-20 23:43:29', '2022-12-20 23:08:01');
INSERT INTO `aulas` VALUES (2, 'B', 'Setengah Hari', 750000, 50, 0, '2022-12-29 10:23:26', '2022-12-29 10:23:26');

-- ----------------------------
-- Table structure for booking_aulas
-- ----------------------------
DROP TABLE IF EXISTS `booking_aulas`;
CREATE TABLE `booking_aulas`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `aula` int NULL DEFAULT NULL,
  `nama` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_ktp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jumlah_tamu` int NULL DEFAULT NULL,
  `no_hp` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mulai` date NULL DEFAULT NULL,
  `akhir` date NULL DEFAULT NULL,
  `total` int NULL DEFAULT NULL,
  `status_pembayaran` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of booking_aulas
-- ----------------------------
INSERT INTO `booking_aulas` VALUES (1, '', 1, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, 15, NULL, '2022-12-21', '2022-12-23', 3000000, 1, '2023-01-01 18:15:55', '2022-12-21 00:24:23');
INSERT INTO `booking_aulas` VALUES (3, '', 1, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, NULL, '2022-12-21', '2022-12-21', 1000000, 1, '2023-01-01 18:15:52', '2022-12-21 01:06:16');
INSERT INTO `booking_aulas` VALUES (5, '3/DH/XII/2022', 1, 'Said Jumadil Akbar', '1174030609980005', 'gilangkilaman@gmail.com', 'Banda Aceh', 15, NULL, '2022-12-29', '2022-12-29', 1000000, 1, '2023-01-01 18:31:12', '2022-12-29 10:20:47');
INSERT INTO `booking_aulas` VALUES (6, '1/DH/I/2023', 1, 'Kiki', '1174030609980005', NULL, 'Banda Aceh', 40, NULL, '2023-01-01', '2023-01-01', 1000000, 1, '2023-01-01 22:54:17', '2023-01-01 18:14:55');

-- ----------------------------
-- Table structure for bookings
-- ----------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kamar` int UNSIGNED NULL DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_ktp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jumlah_tamu` int NULL DEFAULT NULL,
  `id_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jumlah_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `check_in` date NULL DEFAULT NULL,
  `check_out` date NULL DEFAULT NULL,
  `diskon` int UNSIGNED NULL DEFAULT NULL,
  `total` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `resepsis_kamar_foreign`(`kamar` ASC) USING BTREE,
  INDEX `resepsis_diskon_foreign`(`diskon` ASC) USING BTREE,
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`diskon`) REFERENCES `diskons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`kamar`) REFERENCES `kamars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bookings
-- ----------------------------
INSERT INTO `bookings` VALUES (5, NULL, 21, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, '081354132223', 3, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 450000, 1, '2022-12-19 00:19:23', '2022-12-19 00:12:23');
INSERT INTO `bookings` VALUES (6, NULL, 22, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 3, NULL, NULL, '2022-12-22', '2022-12-24', NULL, 900000, 1, '2022-12-19 00:41:28', '2022-12-19 00:24:21');
INSERT INTO `bookings` VALUES (7, NULL, 9, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 2, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 400000, 1, '2022-12-19 00:45:48', '2022-12-19 00:45:38');
INSERT INTO `bookings` VALUES (8, NULL, 1, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 1, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 380000, 1, '2022-12-19 00:50:38', '2022-12-19 00:50:29');
INSERT INTO `bookings` VALUES (11, NULL, 9, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 1, NULL, NULL, '2022-12-19', '2022-12-20', NULL, 400000, 1, '2022-12-19 11:07:42', '2022-12-19 11:07:25');
INSERT INTO `bookings` VALUES (12, NULL, 12, 'Muliadi', '1174030609980005', NULL, 'jalan malahayati KM 1.5', NULL, 2, NULL, NULL, '2022-12-30', '2022-12-31', NULL, 380000, 0, '2022-12-29 09:21:20', '2022-12-29 09:21:20');

-- ----------------------------
-- Table structure for diskons
-- ----------------------------
DROP TABLE IF EXISTS `diskons`;
CREATE TABLE `diskons`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mulai` date NULL DEFAULT NULL,
  `akhir` date NULL DEFAULT NULL,
  `potong` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of diskons
-- ----------------------------

-- ----------------------------
-- Table structure for kamars
-- ----------------------------
DROP TABLE IF EXISTS `kamars`;
CREATE TABLE `kamars`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nomor` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipe` int UNSIGNED NULL DEFAULT NULL,
  `nama_tipe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `harga` int NULL DEFAULT NULL,
  `tempat_tidur` int NULL DEFAULT NULL,
  `lantai` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `kamars_tipe_foreign`(`tipe` ASC) USING BTREE,
  CONSTRAINT `kamars_tipe_foreign` FOREIGN KEY (`tipe`) REFERENCES `tipe_kamars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of kamars
-- ----------------------------
INSERT INTO `kamars` VALUES (1, '102', 1, 'Standart', 380000, 2, 1, 2, '2022-12-21 12:24:40', '2022-12-18 11:34:45');
INSERT INTO `kamars` VALUES (2, '103', 1, 'Standart', 380000, 4, 1, 0, '2023-01-01 15:38:28', '2022-12-18 11:44:32');
INSERT INTO `kamars` VALUES (3, '201', 1, 'Standart', 400000, 6, 2, 0, '2022-12-18 11:46:02', '2022-12-18 11:46:02');
INSERT INTO `kamars` VALUES (5, '204', 1, 'Standart', 350000, 3, 2, 0, '2022-12-18 11:47:14', '2022-12-18 11:47:14');
INSERT INTO `kamars` VALUES (6, '301', 1, 'Standart', 330000, 4, 3, 0, '2022-12-18 11:48:13', '2022-12-18 11:48:13');
INSERT INTO `kamars` VALUES (7, '303', 1, 'Standart', 330000, 4, 3, 0, '2022-12-18 11:48:39', '2022-12-18 11:48:39');
INSERT INTO `kamars` VALUES (8, '304', 1, 'Standart', 330000, 2, 3, 0, '2022-12-18 11:49:02', '2022-12-18 11:49:02');
INSERT INTO `kamars` VALUES (9, '101', 2, 'Superior', 400000, 2, 1, 0, '2022-12-21 20:41:00', '2022-12-18 11:49:34');
INSERT INTO `kamars` VALUES (10, '106', 2, 'Superior', 400000, 4, 1, 0, '2022-12-18 11:50:21', '2022-12-18 11:50:21');
INSERT INTO `kamars` VALUES (11, '107', 2, 'Superior', 400000, 4, 1, 0, '2022-12-18 11:51:07', '2022-12-18 11:51:07');
INSERT INTO `kamars` VALUES (12, '206', 2, 'Superior', 380000, 4, 2, 0, '2022-12-29 09:12:43', '2022-12-18 11:51:33');
INSERT INTO `kamars` VALUES (13, '207', 2, 'Superior', 380000, 4, 2, 0, '2022-12-18 11:52:04', '2022-12-18 11:52:04');
INSERT INTO `kamars` VALUES (14, '209', 2, 'Superior', 380000, 4, 2, 0, '2022-12-18 11:53:49', '2022-12-18 11:53:49');
INSERT INTO `kamars` VALUES (15, '210', 2, 'Superior', 380000, 4, 2, 0, '2022-12-18 11:54:15', '2022-12-18 11:54:15');
INSERT INTO `kamars` VALUES (16, '302', 2, 'Superior', 350, 4, 2, 0, '2022-12-18 11:54:46', '2022-12-18 11:54:46');
INSERT INTO `kamars` VALUES (17, '306', 2, 'Superior', 350000, 4, 3, 0, '2022-12-18 11:55:15', '2022-12-18 11:55:15');
INSERT INTO `kamars` VALUES (18, '307', 2, 'Superior', 350000, 4, 3, 0, '2022-12-18 11:55:37', '2022-12-18 11:55:37');
INSERT INTO `kamars` VALUES (19, '309', 2, 'Superior', 350000, 4, 3, 0, '2022-12-18 11:55:58', '2022-12-18 11:55:58');
INSERT INTO `kamars` VALUES (20, '310', 2, 'Superior', 350000, 4, 3, 0, '2022-12-18 11:56:51', '2022-12-18 11:56:51');
INSERT INTO `kamars` VALUES (21, '104', 3, 'Deluxe', 450000, 3, 1, 0, '2022-12-18 11:57:27', '2022-12-18 11:57:27');
INSERT INTO `kamars` VALUES (22, '105', 3, 'Deluxe', 450000, 3, 1, 0, '2022-12-18 11:57:47', '2022-12-18 11:57:47');
INSERT INTO `kamars` VALUES (23, '108', 3, 'Deluxe', 450000, 3, 1, 0, '2022-12-18 11:58:05', '2022-12-18 11:58:05');
INSERT INTO `kamars` VALUES (24, '109', 3, 'Deluxe', 450000, 3, 1, 0, '2022-12-18 11:58:26', '2022-12-18 11:58:26');
INSERT INTO `kamars` VALUES (25, '202', 3, 'Deluxe', 400000, 2, 2, 0, '2022-12-18 11:58:45', '2022-12-18 11:58:45');
INSERT INTO `kamars` VALUES (26, '205', 3, 'Deluxe', 500000, 6, 2, 0, '2022-12-18 11:59:14', '2022-12-18 11:59:14');
INSERT INTO `kamars` VALUES (27, '208', 3, 'Deluxe', 500000, 5, 2, 0, '2022-12-18 11:59:43', '2022-12-18 11:59:43');
INSERT INTO `kamars` VALUES (28, '211', 3, 'Deluxe', 400000, 3, 2, 0, '2022-12-18 12:00:08', '2022-12-18 12:00:08');
INSERT INTO `kamars` VALUES (29, '305', 3, 'Deluxe', 380000, 4, 3, 0, '2022-12-18 12:00:35', '2022-12-18 12:00:35');
INSERT INTO `kamars` VALUES (30, '308', 3, 'Deluxe', 380000, 4, 3, 0, '2022-12-18 12:00:54', '2022-12-18 12:00:54');
INSERT INTO `kamars` VALUES (31, '311', 3, 'Deluxe', 380000, 3, 3, 0, '2022-12-18 12:01:15', '2022-12-18 12:01:15');

-- ----------------------------
-- Table structure for reports
-- ----------------------------
DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `tanggal` date NULL DEFAULT NULL,
  `status` int NULL DEFAULT 0,
  `tipe` int NULL DEFAULT NULL,
  `total` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reports
-- ----------------------------
INSERT INTO `reports` VALUES (1, '2022-12-31', 0, NULL, 1140000, '2023-01-02 23:49:45', '2023-01-02 23:49:45');

-- ----------------------------
-- Table structure for resepsis
-- ----------------------------
DROP TABLE IF EXISTS `resepsis`;
CREATE TABLE `resepsis`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `serial` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kamar` int UNSIGNED NULL DEFAULT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_ktp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `no_hp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jumlah_tamu` int NULL DEFAULT NULL,
  `id_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jumlah_item` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `check_in` date NULL DEFAULT NULL,
  `check_out` date NULL DEFAULT NULL,
  `diskon` int UNSIGNED NULL DEFAULT NULL,
  `total` int NULL DEFAULT NULL,
  `status_pembayaran` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `resepsis_kamar_foreign`(`kamar` ASC) USING BTREE,
  INDEX `resepsis_diskon_foreign`(`diskon` ASC) USING BTREE,
  CONSTRAINT `resepsis_diskon_foreign` FOREIGN KEY (`diskon`) REFERENCES `diskons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `resepsis_kamar_foreign` FOREIGN KEY (`kamar`) REFERENCES `kamars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of resepsis
-- ----------------------------
INSERT INTO `resepsis` VALUES (2, '19-12-22/DH/2', 1, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 1, NULL, NULL, '2022-12-18', '2022-12-19', NULL, 380000, 1, '2022-12-19 00:43:48', '2022-12-18 12:46:02');
INSERT INTO `resepsis` VALUES (3, '19-12-22/DH/3', 2, 'Said Jumadil Akbar', '1174030609980005', 's.jumadil.akbar@gmail.com', NULL, '081354546565', 2, NULL, NULL, '2022-12-18', '2022-12-19', NULL, 380000, 1, '2022-12-19 00:43:52', '2022-12-18 20:07:07');
INSERT INTO `resepsis` VALUES (4, '22-12-22/DH/4', 21, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, '081354132223', 3, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 450000, 1, '2022-12-19 00:53:10', '2022-12-19 00:19:22');
INSERT INTO `resepsis` VALUES (5, '24-12-22/DH/5', 22, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 3, NULL, NULL, '2022-12-22', '2022-12-24', NULL, 900000, 1, '2022-12-19 09:40:04', '2022-12-19 00:41:28');
INSERT INTO `resepsis` VALUES (6, '22-12-22/DH/6', 9, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 2, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 400000, 1, '2022-12-19 00:53:06', '2022-12-19 00:45:48');
INSERT INTO `resepsis` VALUES (7, '22-12-22/DH/7', 1, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, NULL, 1, NULL, NULL, '2022-12-21', '2022-12-22', NULL, 380000, 1, '2022-12-19 00:53:16', '2022-12-19 00:50:37');
INSERT INTO `resepsis` VALUES (8, '20-12-22/DH/8', 9, 'Said Jumadil Akbar', '1174030609980005', '', NULL, '', 3, NULL, NULL, '2022-12-19', '2022-12-20', NULL, 400000, 1, '2022-12-21 20:41:00', '2022-12-19 11:07:41');
INSERT INTO `resepsis` VALUES (9, '23-12-22/DH/9', 2, 'Said Jumadil Akbar', '1174030609980005', NULL, NULL, '081354546565', 1, NULL, NULL, '2022-12-22', '2022-12-23', NULL, 380000, 1, '2022-12-28 09:45:19', '2022-12-22 18:07:43');
INSERT INTO `resepsis` VALUES (10, '29-12-22/DH/10', 2, 'Kiki', '1174030609980005', NULL, NULL, '081354546565', 2, NULL, NULL, '2022-12-28', '2022-12-29', NULL, 380000, 1, '2022-12-28 10:19:11', '2022-12-28 10:02:53');
INSERT INTO `resepsis` VALUES (11, '29-12-22/DH/11', 2, 'Said Jumadil Akbar', '1174030609980005', 's.jumadil.akbar@gmail.com', NULL, '081354132223', 1, '1', '1', '2022-12-28', '2022-12-29', NULL, 480000, 1, '2022-12-29 01:12:34', '2022-12-28 23:00:00');
INSERT INTO `resepsis` VALUES (12, '30-12-22/DH/12', 2, 'Said Jumadil Akbar', '1174030609980005', NULL, 'Jakarta', NULL, 2, NULL, NULL, '2022-12-29', '2022-12-30', NULL, 380000, 1, '2022-12-29 01:24:34', '2022-12-29 01:18:27');
INSERT INTO `resepsis` VALUES (13, '31-12-22/DH/13', 12, 'Said Jumadil Akbar', '1174030609980005', 's.jumadil.akbar@gmail.com', 'jalan malahayati KM 1.5, kec syiah kuala', NULL, 2, '1', '1', '2022-12-29', '2022-12-31', NULL, 760000, 1, '2022-12-29 09:12:43', '2022-12-29 09:08:21');
INSERT INTO `resepsis` VALUES (14, '31-12-22/DH/14', 2, 'Said Jumadil Akbar', '1174030609980005', NULL, 'Jl. Rw. Sakti V No.122B, Jeulingke, Kec. Syiah Kuala, Kota Banda Aceh, Aceh 23116', NULL, 2, NULL, NULL, '2022-12-30', '2022-12-31', NULL, 380000, 1, '2023-01-01 15:38:28', '2022-12-29 09:28:21');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'Admin', '2022-12-18 11:00:55', '2022-12-18 11:00:55');
INSERT INTO `roles` VALUES (2, 'Karyawan', '2022-12-18 11:00:55', '2022-12-18 11:00:55');

-- ----------------------------
-- Table structure for tamus
-- ----------------------------
DROP TABLE IF EXISTS `tamus`;
CREATE TABLE `tamus`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tamus
-- ----------------------------

-- ----------------------------
-- Table structure for tipe_kamars
-- ----------------------------
DROP TABLE IF EXISTS `tipe_kamars`;
CREATE TABLE `tipe_kamars`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deskripsi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lemari` int NULL DEFAULT 0,
  `kulkas` int NULL DEFAULT 0,
  `tv` int NULL DEFAULT 0,
  `interior` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tipe_kamars_tipe_unique`(`tipe` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tipe_kamars
-- ----------------------------
INSERT INTO `tipe_kamars` VALUES (1, 'Standart', 'Ini Adalah Deskripsi Tipe Kamar Standart', 1, 0, 1, '', '2022-12-18 11:21:43', '2022-12-18 11:19:12');
INSERT INTO `tipe_kamars` VALUES (2, 'Superior', 'Ini Adalah Deskripsi Tipe Kamar Superior', 1, 1, 1, '', '2022-12-18 11:23:08', '2022-12-18 11:23:08');
INSERT INTO `tipe_kamars` VALUES (3, 'Deluxe', 'Ini Adalah Deskripsi Tipe Kamar Deluxe', 1, 1, 1, '', '2022-12-18 11:23:39', '2022-12-18 11:23:39');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `ktp` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `no_hp` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` int UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_username_unique`(`username` ASC) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE,
  INDEX `users_role_foreign`(`role` ASC) USING BTREE,
  CONSTRAINT `users_role_foreign` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '1174030609980005', 'Said Jumadil Akbar', 'f43a2ac7de436a780c107bc12cd951bd', '1174030609980005', '081354132223', NULL, 's.jumadil.akbar@gmail.com', 2, '2022-12-22 17:53:16', '2022-12-18 11:00:55');

SET FOREIGN_KEY_CHECKS = 1;
