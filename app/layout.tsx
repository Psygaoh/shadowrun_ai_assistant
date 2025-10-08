import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shadowrun Assistant',
  description: 'Assistant minimal pour générer du contenu Shadowrun.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
