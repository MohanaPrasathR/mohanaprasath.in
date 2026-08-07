import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohana Prasath',
  description:
    'Portfolio of Mohana Prasath — CS Undergrad, AI & Full Stack Developer.',
  keywords: [
    'Mohana Prasath',
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Python',
    'Portfolio',
  ],
  authors: [{ name: 'Mohana Prasath' }],
  creator: 'Mohana Prasath',
  openGraph: {
    title: 'Mohana Prasath',
    description: 'Engineering is my medium. Intelligence is my standard.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohana Prasath',
    description: 'Engineering is my medium. Intelligence is my standard.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#050505" />
      </head>
      <body
        className="bg-bg text-white-primary antialiased"
        style={{
          backgroundColor: '#050505',
          color: '#F7F7F5',
          fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
        }}
      >
        {children}
      </body>
    </html>
  );
}
