import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IndexPage from './pages';
import WebLayout from './components/WebLayout';
import TVLayout from './components/TVLayout';
import TVEPGPage from './pages/TVEPG';
import WebEPGPage from './pages/WebEPG';

const queryClient = new QueryClient();

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
