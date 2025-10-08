import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.INITIAL_ADMIN_USERNAME;
  const password = process.env.INITIAL_ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'INITIAL_ADMIN_USERNAME and INITIAL_ADMIN_PASSWORD must be set before running the seed.'
    );
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log(`User "${username}" already exists. Skipping creation.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      passwordHash
    }
  });

  console.log(`Seeded initial user "${username}".`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
