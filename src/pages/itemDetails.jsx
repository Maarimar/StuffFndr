import Header from "../shared/header";
import "../styles/itemDetails.css";
import placeHolder from "../assets/placeholder.svg";
import mapPin from "../assets/mapPin.svg";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const theToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkNzAzZWJhMzJmNDFjNzg5NTIwMWIiLCJ1c2VybmFtZSI6IlRyZWVTdGFuZCIsImlhdCI6MTcxNDI2OTgwMCwiZXhwIjoxNzE2ODYxODAwfQ.v1kpMaryjcNcDq-3QT-rHXGbT-RhF2UX0oFyq7he4Pw";
const token = encodeURIComponent(theToken);

function ItemDetails({ isLoggedIn = false }) {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/items/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const itemDetails = await response.json();
        setCurrentItem(itemDetails.item);
      } catch (error) {
        toast.error("Failed to fetch item details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header pageTitle="Item Details" isLoggedIn={isLoggedIn} />
        <main id="main-content">
          <p role="status" aria-live="polite">Loading item details...</p>
        </main>
      </>
    );
  }

  if (!currentItem) {
    return (
      <>
        <Header pageTitle="Item Details" isLoggedIn={isLoggedIn} />
        <main id="main-content">
          <p role="alert">Item not found.</p>
          <Link to="/reportedItems">Back to reported items</Link>
        </main>
      </>
    );
  }

  const statusLabel = currentItem.lost ? "Lost" : "Found";

  return (
    <>
      <Header pageTitle="Item Details" isLoggedIn={isLoggedIn} />
      <main id="main-content" className="itemDetailsContainer">
        <div className="itemImgContainer">
          <img
            className="itemImage"
            src={placeHolder}
            alt={currentItem.title ? `Photo of ${currentItem.title}` : "Item photo unavailable"}
          />
        </div>
        <h1 className="itemName">{currentItem.title}</h1>
        <h2 className="description">Description</h2>
        <p className="descriptionBox">{currentItem.description}</p>

        <dl className="itemDetailsList">
          <div className="itemDetailRow">
            <dt className="descriptionDetail">Date Reported</dt>
            <dd className="descriptionValue">{currentItem.dateReported}</dd>
          </div>
          <div className="itemDetailRow">
            <dt className="descriptionDetail">Location</dt>
            <dd className="descriptionValue">
              {currentItem.location}
              <img src={mapPin} alt="" aria-hidden="true" className="mapPin" />
            </dd>
          </div>
          <div className="itemDetailRow">
            <dt className="descriptionDetail">Status</dt>
            <dd className="lostFound descriptionValue">{statusLabel}</dd>
          </div>
        </dl>

        <div className="claimButtonContainer">
          <Link to={`/items/${currentItem._id}/claim`} className="button">
            Claim this item
          </Link>
        </div>
      </main>
    </>
  );
}

export default ItemDetails;
