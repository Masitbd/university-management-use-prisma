/*
  Warnings:

  - Added the required column `title` to the `academic_semester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "academic_semester" ADD COLUMN     "title" TEXT NOT NULL;
