import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AuthSessionProvider } from '../components/session-provider';
import { TopNav } from '../components/top-nav';

export const metadata: Metadata = {
  title: 'Shadowrun Assistant',
  description: 'Assistant minimal pour générer du contenu Shadowrun.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#0b1120',
          color: '#f4f4f5',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}
      >
        <AuthSessionProvider>
          <TopNav />
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
            {children}
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
