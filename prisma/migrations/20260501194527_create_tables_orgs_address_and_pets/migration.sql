-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT', 'ELDER');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'LARGE');

-- CreateEnum
CREATE TYPE "ENERGY_LEVEL" AS ENUM ('SMALL', 'NORMAL', 'GREAT');

-- CreateEnum
CREATE TYPE "LEVEL_OF_INDEPENDENCE" AS ENUM ('SMALL', 'LARGE');

-- CreateEnum
CREATE TYPE "AMBIENT" AS ENUM ('SMALL', 'NORMAL', 'LARGE');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'MEMBER',
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "SIZE" NOT NULL,
    "energy_level" "ENERGY_LEVEL" NOT NULL,
    "level_of_independence" "LEVEL_OF_INDEPENDENCE" NOT NULL,
    "ambient" "AMBIENT" NOT NULL,
    "photo" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
