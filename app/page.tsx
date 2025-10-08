'use client';

import { useEffect, useState } from 'react';

interface HelloResponse {
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('…');

  useEffect(() => {
    async function loadMessage() {
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error('Réponse du serveur invalide');
        }
        const data: HelloResponse = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage("Impossible de contacter l'API");
      }
    }

    loadMessage();
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        backgroundColor: '#111722',
        borderRadius: '1rem',
        padding: '2.5rem',
        maxWidth: '28rem',
        textAlign: 'center',
        boxShadow: '0 1.5rem 3rem rgba(0, 0, 0, 0.35)'
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Shadowrun Assistant</h1>
      <p style={{ lineHeight: 1.5 }}>
        Ceci est une première pierre : la page récupère et affiche la réponse minimaliste du backend.
      </p>
      <div
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
          width: '100%'
        }}
      >
        <span style={{ display: 'block', fontSize: '1.125rem', fontWeight: 600 }}>{message}</span>
      </div>
    </main>
  );
}
