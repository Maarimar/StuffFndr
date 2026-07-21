import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import ItemCard from "../shared/ItemCard";
import { toast } from "react-toastify";
import "../styles/Items.css";
import { Link } from 'react-router-dom';

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJkNzAzZWJhMzJmNDFjNzg5NTIwMWIiLCJ1c2VybmFtZSI6IlRyZWVTdGFuZCIsImlhdCI6MTcxNDI2OTgwMCwiZXhwIjoxNzE2ODYxODAwfQ.v1kpMaryjcNcDq-3QT-rHXGbT-RhF2UX0oFyq7he4Pw";
const encodedToken = encodeURIComponent(token);

const Items = ({ isLoggedIn = false }) => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [lostFilter, setLostFilter] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${encodedToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      toast.error("Failed to fetch items");
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const handleLostFilter = (lostValue) => {
    setLostFilter((current) => (current === lostValue ? null : lostValue));
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => {
        const lowercaseFilter = filter.toLowerCase();
        const lowercaseTitle = item.title.toLowerCase();
        return (
          (lostFilter === null || item.lost === lostFilter) &&
          ((item._id && item._id.toLowerCase().includes(lowercaseFilter)) ||
            (item.location &&
              item.location.toLowerCase().includes(lowercaseFilter)) ||
            (item.dateReported &&
              item.dateReported.toLowerCase().includes(lowercaseFilter)) ||
            (item.title && lowercaseTitle.includes(lowercaseFilter)))
        );
      })
    : [];

  return (
    <>
      <Header pageTitle="Reported Items" isLoggedIn={isLoggedIn} />
      <main id="main-content">
        <section aria-label="Filter and search reported items">
          <div className="LostFoundButtonContainer">
            <button
              className="button"
              type="button"
              aria-pressed={lostFilter === true}
              onClick={() => handleLostFilter(true)}
            >
              Lost
            </button>
            <div className="searchContainer">
              <label className="sr-only" htmlFor="items-search">
                Search reported items by title, date, or location
              </label>
              <input
                className="searchField"
                type="search"
                id="items-search"
                placeholder="Search: Title, Date, or Location"
                value={filter}
                onChange={handleFilterChange}
              />
              {filter && (
                <button
                  className="clearFilterButton"
                  type="button"
                  onClick={handleClearFilter}
                  aria-label="Clear search filter"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              className="button"
              type="button"
              aria-pressed={lostFilter === false}
              onClick={() => handleLostFilter(false)}
            >
              Found
            </button>
          </div>
        </section>

        {filteredItems.length === 0 ? (
          <p className="noResultsMessage" role="status" aria-live="polite">
            No results found
          </p>
        ) : (
          <ul className="reportedItemsList">
            {filteredItems.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/items/${item._id}`}
                  className="itemCardLink"
                  aria-label={`View ${item.title}, ${item.lost ? "lost" : "found"} in ${item.location}`}
                >
                  <ItemCard
                    title={item.title}
                    description={item.description}
                    location={item.location}
                    lost={item.lost}
                    dateReported={item.dateReported}
                    images={item.images}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Items;
