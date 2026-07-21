import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HamburgerMenu.css"

const MENU_ID = "main-navigation";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <nav className="hamburger-menu" aria-label="Main navigation">
      <button
        type="button"
        className="hamburger-icon"
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={toggleMenu}
      >
        <span aria-hidden="true">{isOpen ? "\u2715" : "\u2630"}</span>
      </button>
      <ul id={MENU_ID} className={`list ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/reportedItems" onClick={closeMenu}>Reported Items</Link></li>
        <li><Link to="/reportNewItem" onClick={closeMenu}>Report an Item</Link></li>
      </ul>
    </nav>
  );
};

export default HamburgerMenu;
