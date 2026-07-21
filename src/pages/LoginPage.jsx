import React, { useState } from "react";
import { Link } from "react-router-dom"
import Header from "../shared/header";
import "../styles/LoginPage.css";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage({ setUserInfo }) {

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const navigateTo = useNavigate();

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const body = await response.json()
                setUserInfo(body)
                navigateTo("/reportedItems");
            } else {
                const errorMessage = await response.text();
                if (errorMessage.includes('username')) {
                    toast.error("Username or password is incorrect");
                }
            }

        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <>
            <Header isLoggedIn={false} />
            <main id="main-content">
                <p className="greetingContainer">Welcome Back!</p>
                <div className="LoginPageContainer">
                    <h1 className="LoginHeader">Log In</h1>

                    <form className="loginForm" onSubmit={handleLogin}>
                        <div className="loginField">
                            <label className="fieldLabel" htmlFor="username">Username</label>
                            <input
                                className="inputField"
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="loginField">
                            <label className="fieldLabel" htmlFor="password">Password</label>
                            <div className="passwordInputContainer">
                                <input
                                    className="inputField inputField--password"
                                    type={type}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="eye"
                                    onClick={handleToggle}
                                    aria-label={type === 'password' ? 'Show password' : 'Hide password'}
                                    aria-pressed={type === 'text'}
                                >
                                    <Icon className="eyeIcon" icon={icon} size={25} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <p className="signUpBlurb">Don't have an account? <Link to="/SignUpPage">Sign up</Link></p>
                        <button className="logInBtn" type="submit">Log In</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default LoginPage;
