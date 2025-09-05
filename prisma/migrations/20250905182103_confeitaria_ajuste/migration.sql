/*
  Warnings:

  - You are about to drop the `Receita` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Receita";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Receitas" (
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
    CONSTRAINT "Receitas_receita_id_fkey" FOREIGN KEY ("receita_id") REFERENCES "ingredientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Receitas_receitas_id_fkey" FOREIGN KEY ("receitas_id") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
