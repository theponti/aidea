/*
  Warnings:

  - The primary key for the `ListInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ListInvite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListInvite" DROP CONSTRAINT "ListInvite_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ListInvite_pkey" PRIMARY KEY ("listId", "invitedUserEmail");
