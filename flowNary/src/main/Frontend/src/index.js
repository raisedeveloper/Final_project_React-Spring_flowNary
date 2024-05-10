import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import NotFound from './sections/NotFound';
import Home from './sections/home/Home/Home';
import Login from './sections/sign/Login';
import Register from './sections/sign/Register';
import Follower from './sections/follower/Follow/Follower';
import Mypage from './sections/profile/Profile/Mypage';
import Profile from './sections/profile/Profile/Profile';
import Setting from './sections/setting/Setting/Setting';
import Search from './sections/search/Search/Search';
import ChangePwd from './sections/setting/ChangePassword';
// import Chat from '.sections/test/Chat';
// import Join from '.sections/test/Join';


// Create browser router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'follower', element: <Follower /> },
      { path: 'profile/mypage', element: <Mypage /> },
      { path: 'profile', element: <Profile /> },
      { path: 'setting', element: <Setting /> },
      { path: 'search', element: <Search /> },
      { path: 'profile/changePwd', element: <ChangePwd /> },
      { path: 'board/:url', element: <Home /> },
      // { path: 'chat', element: <Chat /> },
      // { path: 'join', element: <Join /> },
      
    ]
  }
]);

// Render the app
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Performance measurement
reportWebVitals();
