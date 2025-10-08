-- Prisma migration for initial TestHello table
CREATE TABLE "TestHello" (
  "id" SERIAL PRIMARY KEY,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "content" TEXT NOT NULL
);
