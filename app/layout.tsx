import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohana Prasath — Software Engineer',
  description:
    'Portfolio of Mohana Prasath — a software engineer who builds systems that are fast, reliable, and a pleasure to use.',
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
    title: 'Mohana Prasath — Software Engineer',
    description: 'Building software that feels effortless.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohana Prasath — Software Engineer',
    description: 'Building software that feels effortless.',
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#050505" />
      </head>
      <body
        className="bg-bg text-white-primary antialiased"
        style={{ fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)' }}
      >
        {children}
      </body>
    </html>
  );
}
