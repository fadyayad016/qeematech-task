/*
  Warnings:

  - You are about to drop the column `schoolLogo` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `schoolLogo`,
    DROP COLUMN `schoolName`;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT 'QeemaTech School',
    `logo` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
