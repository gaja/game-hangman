import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { StrictMode, Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { store } from './store.ts';

import { Error } from './ErrorScreen';
import { Loader } from './components/Loader';
import { ProtectedRoute } from './ProtectedRoute/index';

const Layout = lazy(() => import('./Layout'));
const MainScreen = lazy(() => import('./MainScreen'));
const UserName = lazy(() => import('./FirstScreen/UserName'));

const router = createBrowserRouter([
  {
    path: '/username',
    element: <UserName />,
    errorElement: <Error />,
  },
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <MainScreen />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
    ],
  },
]);

let container: HTMLElement;

addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);

    root.render(
      <StrictMode>
        <Provider store={store}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </Provider>
      </StrictMode>
    );
  }
});
