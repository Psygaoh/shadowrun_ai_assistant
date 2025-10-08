'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export function TopNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#0f1729',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Link href="/" style={{ fontWeight: 700, letterSpacing: '0.03em' }}>
        Shadowrun Assistant
      </Link>

      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {session && (
          <Link href="/users/new" style={{ fontSize: '0.95rem' }}>
            Nouvel utilisateur
          </Link>
        )}
        {session ? (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/login' })}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '999px',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer'
            }}
          >
            Se déconnecter
          </button>
        ) : (
          !isLoginPage && (
            <Link href="/login" style={{ fontSize: '0.95rem' }}>
              Se connecter
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
