/*
  Warnings:

  - Made the column `discountPercentage` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `discountPercentage` INTEGER NOT NULL DEFAULT 0;
