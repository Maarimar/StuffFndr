import Header from "../shared/header";
import "../styles/homePage.css";
import { Link } from "react-router-dom";

export function Home({ isLoggedIn = false }) {

    return (
        <>
            <Header pageTitle="StuffFindr" isLoggedIn={isLoggedIn} />
            <main id="main-content" className="homePageContainer">
                <h1>Welcome to Stuff<span className="findrAccent">Findr</span></h1>
                <p className="about">Your go-to solution for swiftly reuniting with your cherished belongings!
                    Seamlessly report lost items and connect with a finder when a match is found.
                    StuffFindr is here to make the journey of reclaiming lost items easy and all at your fingertips!</p>
                <div className="homePageBtns">
                    <Link to="/LoginPage" className="logInBtn">Log In</Link>
                    <Link to="/SignUpPage" className="signUpBtn">Sign Up</Link>
                </div>
            </main>
        </>
    );
}
