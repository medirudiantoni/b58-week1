/*
  Warnings:

  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT;

-- CreateTable
CREATE TABLE "Tech" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "node_js" BOOLEAN NOT NULL DEFAULT false,
    "next_js" BOOLEAN NOT NULL DEFAULT false,
    "react_js" BOOLEAN NOT NULL DEFAULT false,
    "typescript" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
