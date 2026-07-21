import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import ItemCard from "../shared/ItemCard";
import "../styles/Items.css";
import { Link } from "react-router-dom";
import { getReporterUsername } from "../util/getReporterUsername";

const ReportItemButton = () => (
  <div className="reportItemAction">
    <Link to="/reportNewItem" className="reportItemBtn">
      Report an Item
    </Link>
  </div>
);

const Items = ({ isLoggedIn = false, itemType = "lost", token = "" }) => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [fetchError, setFetchError] = useState("");
  const isLostPage = itemType === "lost";
  const pageTitle = isLostPage ? "Lost Items" : "Found Items";
  const searchInputId = isLostPage ? "lost-items-search" : "found-items-search";

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  const fetchItems = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/items", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setItems(data.items || []);
      setFetchError("");
    } catch (error) {
      setFetchError("Failed to fetch items. Please try again.");
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => {
        const lowercaseFilter = filter.toLowerCase();
        const lowercaseTitle = item.title.toLowerCase();
        return (
          item.lost === isLostPage &&
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
      <Header pageTitle={pageTitle} isLoggedIn={isLoggedIn} />
      <main id="main-content">
        <nav className="itemsTypeNav" aria-label="Browse lost or found items">
          <Link
            to="/lostItems"
            className={`itemsTypeNavLink ${isLostPage ? "itemsTypeNavLink--active" : ""}`}
            aria-current={isLostPage ? "page" : undefined}
          >
            Lost Items
          </Link>
          <Link
            to="/foundItems"
            className={`itemsTypeNavLink ${!isLostPage ? "itemsTypeNavLink--active" : ""}`}
            aria-current={!isLostPage ? "page" : undefined}
          >
            Found Items
          </Link>
        </nav>

        {fetchError && (
          <p className="itemsFetchError" role="alert">{fetchError}</p>
        )}

        <section aria-label={`Search ${pageTitle.toLowerCase()}`}>
          <div className="itemsSearchContainer">
            <label className="sr-only" htmlFor={searchInputId}>
              Search {pageTitle.toLowerCase()} by title, date, or location
            </label>
            <input
              className="searchField"
              type="search"
              id={searchInputId}
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
        </section>

        {isLoggedIn && filteredItems.length > 0 && <ReportItemButton />}

        {filteredItems.length === 0 ? (
          <>
            <p className="noResultsMessage" role="status" aria-live="polite">
              No {isLostPage ? "lost" : "found"} items found
            </p>
            {isLoggedIn && <ReportItemButton />}
          </>
        ) : (
          <ul className="reportedItemsList">
            {filteredItems.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/items/${item._id}`}
                  className="itemCardLink"
                  aria-label={`View ${item.title}, ${item.lost ? "lost" : "found"} in ${item.location}, reported by ${getReporterUsername(item) || "unknown user"}`}
                >
                  <ItemCard
                    title={item.title}
                    description={item.description}
                    location={item.location}
                    lost={item.lost}
                    dateReported={item.dateReported}
                    images={item.images}
                    reportedByUsername={getReporterUsername(item)}
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
