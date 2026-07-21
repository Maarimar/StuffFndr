import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from './pages/home';
import NewItemPage from './pages/NewItemPage';
import { Index } from './pages/indexPage';
import ItemDetails from './pages/itemDetails';
import Items from './pages/Items'
import ItemClaim from './pages/ItemClaim';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

import SignupPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [userId, setUserId] = useState("");

  function updateUserInfo(profileInfo) {

    if (profileInfo.username) {
      setUsername(profileInfo.username)
    }
    if (profileInfo.token) {
      setToken(profileInfo.token)
    }
    if (profileInfo.userId) {
      setUserId(profileInfo.userId)
    }
    if (profileInfo.email) {
      setEmail(profileInfo.email)
    }
    if (profileInfo.profilePicture) {
      setProfileImgUrl(profileInfo.profilePicture)
    }
  }

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home isLoggedIn={!!token} />
    },
    {
      path: "/LoginPage",
      element: <LoginPage setUserInfo={updateUserInfo} />
    },
    {
      path: "/indexPage",
      element: <Index isLoggedIn={!!token} />
    },
    {
      path: "/items/:id",
      element: <ItemDetails token={token} isLoggedIn={!!token} />
    },
    {
      path: "/reportedItems",
      element: <Items isLoggedIn={!!token} />
    },
    {
      path: "/reportNewItem",
      element: <NewItemPage isLoggedIn={!!token} />
    },
    {
      path: "/SignUpPage",
      element: <SignupPage setUserInfo={updateUserInfo} />
    },
    {
      path: "/items/:id/claim",
      element: <ItemClaim isLoggedIn={!!token} />
    },
    {
      path: "/profilePage",
      element: <ProfilePage isLoggedIn={!!token} />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        role="alert"
        aria-live="assertive"
      />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
