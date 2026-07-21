import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/ItemClaim.css";
import imagePlaceholder from "../assets/placeholder.svg"

const ItemClaim = ({ isLoggedIn = false }) => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const [proveOwnership, setProveOwnership] = useState("");
  const [error, setError] = useState(null);
  const encodedToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkNzAzZWJhMzJmNDFjNzg5NTIwMWIiLCJ1c2VybmFtZSI6IlRyZWVTdGFuZCIsImlhdCI6MTcxNDI2OTgwMCwiZXhwIjoxNzE2ODYxODAwfQ.v1kpMaryjcNcDq-3QT-rHXGbT-RhF2UX0oFyq7he4Pw";

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${encodedToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        const fetchedItem = data.items.find((item) => item._id === id);
        if (!fetchedItem) {
          throw new Error("Item not found");
        }
        setCurrentItem(fetchedItem);
      } catch (fetchError) {
        setError(fetchError.message);
        toast.error("Failed to fetch item");
      }
    };
    fetchItems();
  }, [id]);

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    toast.info("Claim submission is coming soon.");
  };

  return (
    <>
      <Header pageTitle="Claim Item" isLoggedIn={isLoggedIn} />
      <main id="main-content" className="claimPageContainer">
        <div className="imgItemContainer">
          <img
            className="imgItem"
            src={currentItem.images || imagePlaceholder}
            alt={currentItem.title ? `Photo of ${currentItem.title}` : "Item photo unavailable"}
          />
        </div>
        <h1 className="itemTitle">{currentItem.title || "Claim Item"}</h1>
        {error ? (
          <div className="errorContainer" role="alert">{error}</div>
        ) : (
          <form onSubmit={handleSubmitClaim}>
            <label htmlFor="claim">
              Provide some unique info about the item proving ownership
            </label>
            <textarea
              id="claim"
              value={proveOwnership}
              className="claimText"
              onChange={(e) => setProveOwnership(e.target.value)}
              required
            />
            <button type="submit" className="submitClaimButton">
              Submit Claim
            </button>
          </form>
        )}
      </main>
    </>
  );
};
export default ItemClaim;
