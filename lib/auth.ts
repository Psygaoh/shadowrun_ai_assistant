import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Identifiant', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.username
        };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        session.user.name = token.name ?? session.user.name;
      }
      return session;
    }
  }
};
