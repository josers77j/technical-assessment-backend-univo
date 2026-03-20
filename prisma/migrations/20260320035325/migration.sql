/*
  Warnings:

  - The `status` column on the `Provider` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProviderStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "status",
ADD COLUMN     "status" "ProviderStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "USER_STATUS";
