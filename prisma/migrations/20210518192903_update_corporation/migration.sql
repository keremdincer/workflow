/*
  Warnings:

  - You are about to drop the column `address` on the `Corporation` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Corporation` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Corporation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Corporation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "projectId" INTEGER,
    FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Corporation" ("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "Corporation";
DROP TABLE "Corporation";
ALTER TABLE "new_Corporation" RENAME TO "Corporation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
