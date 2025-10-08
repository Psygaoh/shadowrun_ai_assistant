import { prisma } from './prisma';

export async function getHelloMessage(): Promise<string> {
  const record = await prisma.testHello.findFirst({
    orderBy: { createdAt: 'desc' }
  });

  if (!record) {
    return 'Aucun message trouvé dans la base, ajoutez-en un via Prisma ✨';
  }

  return record.content;
}
