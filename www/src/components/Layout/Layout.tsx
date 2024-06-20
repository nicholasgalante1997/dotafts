import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ErrorBoundary } from '@/components/Error';
import { AuthProvider } from '@/contexts/auth';

import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

import LayoutProps from './types';

function mapCSSToLink(css: string) {
  const href = `/css/${css}.css`;
  return (
    <>
      <link rel="preload" as="style" href={href}></link>
      <link rel="stylesheet" href={href}></link>
    </>
  );
}

function Layout({
  children,
  description,
  title,
  css = [],
  theme = 'light',
  authState
}: LayoutProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://css.gg/css" />
        <link href="https://css.gg/css" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="preload" as="style" href="/css/index.css"></link>
        <link rel="stylesheet" href="/css/index.css"></link>
        {css.map(mapCSSToLink)}
      </head>
      <body data-theme={theme}>
        <ErrorBoundary fallback={<p style={{ color: 'red' }}>An Error Occurred.</p>}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider authState={authState}>
              <Nav />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export default Layout;
