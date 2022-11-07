/*
  Warnings:

  - Added the required column `siteName` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Recommendation` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Recommendation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recommendation" ADD COLUMN     "imageHeight" TEXT,
ADD COLUMN     "imageWidth" TEXT,
ADD COLUMN     "siteName" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "locationAddress" DROP NOT NULL,
ALTER COLUMN "locationLat" DROP NOT NULL,
ALTER COLUMN "locationLng" DROP NOT NULL;
