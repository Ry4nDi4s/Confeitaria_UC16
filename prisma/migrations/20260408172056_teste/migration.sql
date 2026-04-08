/*
  Warnings:

  - You are about to drop the column `orderId` on the `carts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `category_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "orders_user_id_created_at_idx";

-- DropIndex
DROP INDEX "products_category_id_idx";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "cartId" INTEGER;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
