import PageLayout from '@/layouts/PageLayout';
import Home from '@/pages/Home';
import Patients from '@/pages/Patients';
import Users from '@/pages/Users'

import { createBrowserRouter } from 'react-router-dom';

export const AppRoutes = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/patients/:id', element: <Patients /> },
      { path: '/users', element: <Users />},
    ],
  },
]);

export default AppRoutes;
