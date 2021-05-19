/*
  Warnings:

  - Added the required column `corporationId` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "corporationId" INTEGER NOT NULL,
    FOREIGN KEY ("corporationId") REFERENCES "Corporation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Branch" ("id", "name", "address", "city", "district") SELECT "id", "name", "address", "city", "district" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
