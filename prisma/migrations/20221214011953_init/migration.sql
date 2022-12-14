/*
  Warnings:

  - A unique constraint covering the columns `[sellId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_sellId_key" ON "Car"("sellId");
