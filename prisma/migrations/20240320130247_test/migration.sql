/*
  Warnings:

  - You are about to drop the column `Salary` on the `JobPosting` table. All the data in the column will be lost.
  - You are about to drop the column `emplymentType` on the `JobPosting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "Salary",
DROP COLUMN "emplymentType",
ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL DEFAULT 0;
