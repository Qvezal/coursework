-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "car_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "sellId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sell" (
    "id" SERIAL NOT NULL,
    "selled" BOOLEAN NOT NULL DEFAULT false,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "Sell_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_sellId_fkey" FOREIGN KEY ("sellId") REFERENCES "Sell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
