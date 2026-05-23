/*
  Warnings:

  - You are about to drop the column `product_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,phone_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,phone_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_id` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PhoneCondition" AS ENUM ('NEW', 'USED');

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_product_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_id_fkey";

-- DropIndex
DROP INDEX "cart_user_id_product_id_key";

-- DropIndex
DROP INDEX "favorites_user_id_product_id_key";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "product_id",
ADD COLUMN     "phone_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "product_id",
ADD COLUMN     "phone_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "product_id",
ADD COLUMN     "phone_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "product_id",
ADD COLUMN     "phone_id" UUID NOT NULL;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ram" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "specs" JSONB,
    "condition" "PhoneCondition" NOT NULL DEFAULT 'NEW',
    "defectDetails" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brand_id" UUID NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "phones_slug_key" ON "phones"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_phone_id_key" ON "cart"("user_id", "phone_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_phone_id_key" ON "favorites"("user_id", "phone_id");

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_phone_id_fkey" FOREIGN KEY ("phone_id") REFERENCES "phones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
