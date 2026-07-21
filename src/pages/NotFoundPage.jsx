import React from 'react'
import NotFoundImage from "../assets/404.svg";
import { Link } from 'react-router-dom';
import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <main id="main-content" className="notFoundContainer">
            <img
                src={NotFoundImage}
                alt="404 page not found illustration"
                className="pageNotFoundImg"
            />
            <h1 className='oops'>Page not found</h1>
            <p className="notWorking">Seems like the link is not working.</p>
            <Link to="/" className="backToHomeBtn">Back to home page</Link>
        </main>
    )
}

export default NotFoundPage
