import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ErrorBoundary } from '@/components/Error';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { AuthProvider } from '@/contexts/auth';

import Home from '@/components/Home/Home';
import Directory from '@/components/Blog/Directory/Directory';
import { Post } from '@/components/Blog/Post';

function HomeWithAnimation() {
  useEffect(() => {
    import('lottie-web').then(({ default: lottie }) => {
      function runSplashAnimation() {
        lottie.loadAnimation({
          container: document.getElementById('splash-animation-root')!,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: 'assets/dotaftr-header-animation.json',
          rendererSettings: {
            className: 'splash-animation-lottie-vector'
          }
        });
      }

      runSplashAnimation();
    });
  }, []);

  return <Home />;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeWithAnimation />
  },
  {
    path: 'blog/directory',
    element: <Directory />
  },
  {
    path: 'blog/post',
    element: <Post />
  }
]);

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ErrorBoundary fallback={<p style={{ color: 'red' }}>An Error Occurred.</p>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider authState={{ _auth: {} }}>
          <Nav />
          <main>
            <RouterProvider router={routes} />
          </main>
          <Footer />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
