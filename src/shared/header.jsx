import React from "react";
import './header.css';
import HamburgerMenu from "./HamburgerMenu";

const Header = ({ pageTitle, isLoggedIn = false }) => {
    return (
        <header className="header-container">
            <div className="header-side">
                {isLoggedIn && <HamburgerMenu />}
            </div>
            <p className="logo">{pageTitle || "StuffFindr"}</p>
            <div className="header-side header-side--spacer" aria-hidden="true" />
        </header>
    )
}

export default Header;
