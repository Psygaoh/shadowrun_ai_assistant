'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function NewUserForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError(null);

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? 'Création impossible');
      setStatus('error');
      return;
    }

    setStatus('success');
    setUsername('');
    setPassword('');
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: '#111c33',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.3)',
        maxWidth: '480px'
      }}
    >
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Créer un utilisateur</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>
        Ajoute un identifiant et un mot de passe simples pour partager l’accès à l’outil en petit
        comité.
      </p>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span>Identifiant</span>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
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
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          required
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

      {status === 'success' && (
        <p style={{ color: '#34d399', fontSize: '0.95rem' }}>
          Utilisateur créé. Communique-lui le mot de passe choisi.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
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
        {status === 'submitting' ? 'Création...' : 'Ajouter'}
      </button>
    </form>
  );
}
