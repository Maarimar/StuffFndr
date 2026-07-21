import React, { useState } from "react";
import "../styles/NewItemPage.css";
import Header from "../shared/header";
import CameraIcon from "../assets/CameraIcon";
import { toast } from "react-toastify";

const theToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkNzAzZWJhMzJmNDFjNzg5NTIwMWIiLCJ1c2VybmFtZSI6IlRyZWVTdGFuZCIsImlhdCI6MTcxNDI2OTgwMCwiZXhwIjoxNzE2ODYxODAwfQ.v1kpMaryjcNcDq-3QT-rHXGbT-RhF2UX0oFyq7he4Pw";
const token = encodeURIComponent(theToken);

const NewItemPage = ({ isLoggedIn = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lost, setLost] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          lost,
          dateReported,
          location,
        }),
      });

      if (response.ok) {
        toast.success("Item posted successfully");
        setTitle("");
        setDescription("");
        setLost("");
        setDateReported("");
        setLocation("");
      } else {
        toast.error("Failed to post item. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to post item. Please try again.");
    }
  };

  return (
    <>
      <Header pageTitle="Report an Item" isLoggedIn={isLoggedIn} />
      <main id="main-content">
        <form onSubmit={handleSubmit} className="newItemFormContainer">
          <fieldset className="imageFieldset">
            <legend>Attach Image</legend>
            <div className="imgInputContainer" aria-hidden="true">
              <CameraIcon />
            </div>
            <p className="imageHelpText">Image upload coming soon.</p>
          </fieldset>

          <div className="formField">
            <label htmlFor="dateLostFound">Date</label>
            <input
              className="textInput"
              type="date"
              id="dateLostFound"
              value={dateReported}
              onChange={(e) => setDateReported(e.target.value)}
              required
            />
          </div>
          <div className="formField">
            <label htmlFor="title">Item Name</label>
            <input
              className="textInput"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="formField">
            <label htmlFor="location">Location</label>
            <input
              className="textInput"
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="formField">
            <label htmlFor="status">Item Status</label>
            <select
              id="status"
              value={lost}
              onChange={(e) => setLost(e.target.value)}
              required
            >
              <option value="">Select status</option>
              <option value="true">Lost</option>
              <option value="false">Found</option>
            </select>
          </div>
          <div className="formField">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default NewItemPage;
