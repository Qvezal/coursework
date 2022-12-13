-- AlterTable
ALTER TABLE "Sell" ADD COLUMN     "buyer" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "manager" TEXT NOT NULL DEFAULT '-';
