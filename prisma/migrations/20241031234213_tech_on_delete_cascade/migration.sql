/*
  Warnings:

  - A unique constraint covering the columns `[project_id]` on the table `Tech` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tech" DROP CONSTRAINT "Tech_project_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Tech_project_id_key" ON "Tech"("project_id");

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
