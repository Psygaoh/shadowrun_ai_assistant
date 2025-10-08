import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';

interface CreateUserPayload {
  username?: string;
  password?: string;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const body = (await request.json()) as CreateUserPayload;
  const username = body.username?.trim();
  const password = body.password?.trim();

  if (!username || !password) {
    return NextResponse.json({ error: 'Identifiant et mot de passe requis.' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: 'Le mot de passe doit contenir au moins 6 caractères.' },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: 'Cet identifiant est déjà utilisé.' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { username, passwordHash }
  });

  return NextResponse.json({ ok: true });
}
