import PageLayout from '@/layouts/PageLayout';
import Home from '@/pages/Home';
import Patients from '@/pages/Patients';
import Users from '@/pages/Users'
import NewPatient from '@/pages/NewPatient';

import { createBrowserRouter } from 'react-router-dom';

export const AppRoutes = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/patients/:id', element: <Patients /> },
      { path: '/users', element: <Users />},
      {path: '/novo', element: <NewPatient />}
    ],
  },
]);

export default AppRoutes;
