import React, { useState, useMemo } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { Home } from './pages/home';
import NewItemPage from './pages/NewItemPage';
import { Index } from './pages/indexPage';
import ItemDetails from './pages/itemDetails';
import Items from './pages/Items'
import ItemClaim from './pages/ItemClaim';
import ProfilePage from './pages/ProfilePage';

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

  const router = useMemo(() => createBrowserRouter([

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
      element: <Navigate to="/lostItems" replace />
    },
    {
      path: "/lostItems",
      element: <Items isLoggedIn={!!token} itemType="lost" token={token} />
    },
    {
      path: "/foundItems",
      element: <Items isLoggedIn={!!token} itemType="found" token={token} />
    },
    {
      path: "/reportNewItem",
      element: <NewItemPage isLoggedIn={!!token} token={token} />
    },
    {
      path: "/SignUpPage",
      element: <SignupPage setUserInfo={updateUserInfo} />
    },
    {
      path: "/items/:id/claim",
      element: <ItemClaim isLoggedIn={!!token} token={token} />
    },
    {
      path: "/profilePage",
      element: <ProfilePage isLoggedIn={!!token} />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]), [token]);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <RouterProvider router={router} key={token || "guest"} />
    </div>
  );
}

export default App;
