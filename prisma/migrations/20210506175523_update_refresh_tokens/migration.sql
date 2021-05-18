/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeviceType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `reservationId` on the `Shipping` table. All the data in the column will be lost.
  - Added the required column `uuid` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exportId` to the `Shipping` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Device.macAddress_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Device";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DeviceType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reservation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Export" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reservationNo" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "closedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macAddress" TEXT,
    "serialNo" TEXT,
    "barcode" TEXT,
    "location" TEXT,
    "status" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "itemTypeId" INTEGER NOT NULL,
    "exportId" INTEGER NOT NULL,
    FOREIGN KEY ("itemTypeId") REFERENCES "ItemType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("exportId") REFERENCES "Export" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CorporationToItemType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Corporation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "ItemType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefreshToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RefreshToken" ("id", "expiresAt", "createdAt", "userId") SELECT "id", "expiresAt", "createdAt", "userId" FROM "RefreshToken";
DROP TABLE "RefreshToken";
ALTER TABLE "new_RefreshToken" RENAME TO "RefreshToken";
CREATE UNIQUE INDEX "RefreshToken.uuid_unique" ON "RefreshToken"("uuid");
CREATE TABLE "new_Shipping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shippingNo" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" BOOLEAN NOT NULL,
    "exportId" INTEGER NOT NULL,
    FOREIGN KEY ("exportId") REFERENCES "Export" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Shipping" ("id", "shippingNo", "type", "status", "createdAt") SELECT "id", "shippingNo", "type", "status", "createdAt" FROM "Shipping";
DROP TABLE "Shipping";
ALTER TABLE "new_Shipping" RENAME TO "Shipping";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Item.macAddress_unique" ON "Item"("macAddress");

-- CreateIndex
CREATE UNIQUE INDEX "_CorporationToItemType_AB_unique" ON "_CorporationToItemType"("A", "B");

-- CreateIndex
CREATE INDEX "_CorporationToItemType_B_index" ON "_CorporationToItemType"("B");
