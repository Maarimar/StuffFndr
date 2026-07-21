import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import { useParams } from "react-router-dom";
import "../styles/ItemClaim.css";
import imagePlaceholder from "../assets/placeholder.svg"

const ItemClaim = ({ isLoggedIn = false, token = "" }) => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState({});
  const [proveOwnership, setProveOwnership] = useState("");
  const [error, setError] = useState(null);
  const [claimMessage, setClaimMessage] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
      }
    };
    fetchItems();
  }, [id, token]);

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    setClaimMessage("Claim submission is coming soon.");
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
            {claimMessage && (
              <p className="claimMessage" role="status">{claimMessage}</p>
            )}
          </form>
        )}
      </main>
    </>
  );
};
export default ItemClaim;
