import React, { useState } from "react";
import Header from "../shared/header";
import "../styles/ProfilePage.css"
import DefaultImage from "../assets/profilePicture.svg";


const profiles = [
  {
    profilePicture: false,
    name: "John Doe",
    contactNumber: "+1234567890",
    email: "john.doe@example.com",
  },
];


const ProfilePage = ({ isLoggedIn = false }) => {
  const [currentProfile] = useState(profiles[0])

  return (
    <>
      <Header pageTitle={'Profile Information'} isLoggedIn={isLoggedIn} />
      <main id="main-content" className="profileInfoContainer">
        <h1 className="sr-only">Profile Information</h1>
        <img
          className="imgProfile"
          src={currentProfile.profilePicture || DefaultImage}
          alt={`Profile photo for ${currentProfile.name}`}
        />
        <dl className="profileDetails">
          <dt className="profileLabel">Name</dt>
          <dd className="profileInfo">{currentProfile.name}</dd>
          <dt className="profileLabel">Contact Number</dt>
          <dd className="profileInfo">{currentProfile.contactNumber}</dd>
          <dt className="profileLabel">Email</dt>
          <dd className="profileInfo">{currentProfile.email}</dd>
        </dl>
        <button className="updateButton" type="button" disabled aria-disabled="true">
          Update Info
        </button>
      </main>
    </>
  );
}


export default ProfilePage
