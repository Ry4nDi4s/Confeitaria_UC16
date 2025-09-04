/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingrediente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `habits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "habits_payment_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cart";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ingrediente";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Payment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "habits";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "which_product" TEXT NOT NULL,
    "who_order" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_day" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "card" TEXT NOT NULL,
    "pix" TEXT NOT NULL,
    "money" REAL NOT NULL,
    "value" REAL NOT NULL,
    "scheduling" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantify" INTEGER NOT NULL,
    "stock" REAL NOT NULL,
    "maturity" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "carts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "carts_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "carts_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ingredientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantify" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "maturity" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "receita_id" INTEGER NOT NULL,
    "receitas_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantify" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "maturity" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Receita_receita_id_fkey" FOREIGN KEY ("receita_id") REFERENCES "ingredientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Receita_receitas_id_fkey" FOREIGN KEY ("receitas_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receita" ("created_at", "description", "id", "maturity", "name", "quantify", "receita_id", "receitas_id", "stock", "updated_at") SELECT "created_at", "description", "id", "maturity", "name", "quantify", "receita_id", "receitas_id", "stock", "updated_at" FROM "Receita";
DROP TABLE "Receita";
ALTER TABLE "new_Receita" RENAME TO "Receita";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_id_key" ON "orders"("payment_id");
