import { Link } from "react-router-dom"
import Header from "../shared/header";

export function Index({ isLoggedIn = false }) {
    return (
        <>
            <Header pageTitle="StuffFindr" isLoggedIn={isLoggedIn} />
            <main id="main-content">
                <h1>Welcome</h1>
                <p>This is the index page after sign up.</p>
                <Link to="/">Back to Home Page</Link>
            </main>
        </>
    )
}
