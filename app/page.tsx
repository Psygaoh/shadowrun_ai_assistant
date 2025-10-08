'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface HelloResponse {
  message: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [message, setMessage] = useState<string>('Chargement...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error('Réponse du serveur invalide');
        }
        const data: HelloResponse = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error(err);
        setError("Impossible de contacter l'API");
      }
    }

    loadMessage();
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}
    >
      <div
        style={{
          backgroundColor: '#111c33',
          borderRadius: '1rem',
          padding: '2.5rem',
          boxShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.3)'
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Bienvenue, {session?.user?.name ?? 'runner'} !
        </h1>
        <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
          Ceci est une première pierre : la page récupère et affiche la réponse minimaliste du
          backend. Nous pouvons maintenant bâtir des fonctionnalités authentifiées.
        </p>
        <div
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
            borderRadius: '0.75rem',
            padding: '1rem 1.5rem',
            marginTop: '1.5rem'
          }}
        >
          <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 600 }}>
            {error ?? message}
          </span>
        </div>
      </div>
    </section>
  );
}
