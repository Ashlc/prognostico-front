import locales from '@/utils/locale.json';
import { qc } from '@/utils/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider, addLocale } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from 'routes/routes';
import { ThemeProvider } from './context/themeContext';
import './index.css';

addLocale('pt', locales.pt);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PrimeReactProvider>
        <QueryClientProvider client={qc}>
          <RouterProvider router={AppRoutes} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </ThemeProvider>
  </StrictMode>,
);
