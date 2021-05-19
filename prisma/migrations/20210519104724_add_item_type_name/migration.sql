/*
  Warnings:

  - Added the required column `name` to the `ItemType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ItemType" ("id") SELECT "id" FROM "ItemType";
DROP TABLE "ItemType";
ALTER TABLE "new_ItemType" RENAME TO "ItemType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
