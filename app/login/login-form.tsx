'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
      callbackUrl: searchParams.get('callbackUrl') ?? '/'
    });

    setIsSubmitting(false);

    if (!result) {
      setError('Réponse inattendue du serveur.');
      return;
    }

    if (result.error) {
      setError('Identifiants invalides');
      return;
    }

    router.push(result.url ?? '/');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        backgroundColor: '#111c33',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.3)',
        maxWidth: '420px',
        margin: '0 auto'
      }}
    >
      <div>
        <h1 style={{ marginBottom: '0.75rem', fontSize: '1.75rem', fontWeight: 700 }}>
          Connexion
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
          Entrez vos identifiants partagés pour accéder à l’assistant.
        </p>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>Identifiant</span>
        <input
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: '#0b1529',
            color: '#f4f4f5'
          }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: '#0b1529',
            color: '#f4f4f5'
          }}
        />
      </label>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.95rem' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: '0.9rem 1rem',
          borderRadius: '0.75rem',
          border: 'none',
          background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
          color: '#0b1120',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}
