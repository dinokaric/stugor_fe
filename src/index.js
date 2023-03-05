import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import Error from './routes/error';
import { getRoute as getBookingRoute } from './routes/booking';
import { getRoute as getStartRoute } from './routes/start';
import { getRoute as getAdminBooking } from './routes/admin.booking';
// import getMockBookingService from './services/mockBookingService';
// const bookingService = getMockBookingService();
import getBookingService from './services/bookingService';

const bookingService = getBookingService('http://localhost:3001');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, ...getStartRoute(bookingService) },
          { path: '/booking/:id', ...getBookingRoute(bookingService) },
          { path: '/admin', ...getAdminBooking(bookingService) }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
