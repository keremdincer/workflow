/*
  Warnings:

  - You are about to drop the column `projectId` on the `Corporation` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_CorporationToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Corporation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Corporation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Corporation" ("id", "name") SELECT "id", "name" FROM "Corporation";
DROP TABLE "Corporation";
ALTER TABLE "new_Corporation" RENAME TO "Corporation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CorporationToProject_AB_unique" ON "_CorporationToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CorporationToProject_B_index" ON "_CorporationToProject"("B");
