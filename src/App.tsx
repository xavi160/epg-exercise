import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WebLayout from './components/WebLayout';
import TVLayout from './components/TVLayout';

const queryClient = new QueryClient();

const IndexPage = React.lazy(() => import('./pages'));
const WebEPGPage = React.lazy(() => import('./pages/WebEPG'));
const TVEPGPage = React.lazy(() => import('./pages/TVEPG'));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route
              path="/web"
              element={
                <WebLayout>
                  <WebEPGPage />
                </WebLayout>
              }
            />
            <Route
              path="/tv"
              element={
                <TVLayout>
                  <TVEPGPage />
                </TVLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
