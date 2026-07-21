import React, { useState } from "react";
import Header from "../../shared/header";
import "../../styles/SignUpPage.css";
import { Link } from "react-router-dom";
import ImageUpload from "./imageUpload";
import { useNavigate } from "react-router-dom";

function SignupPage({ setUserInfo }) {
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const [usernameValid, setUsernameValid] = useState(false);
  const [contactNumberValid, setContactNumberValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameValid(/^[a-zA-Z0-9]+$/.test(event.target.value));
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
    setContactNumberValid(event.target.value.trim() !== "");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value.trim()));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordValid(
      event.target.value.length >= 8 &&
        /[a-z]/.test(event.target.value) &&
        /[A-Z]/.test(event.target.value) &&
        /[0-9]/.test(event.target.value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usernameValid && contactNumberValid && emailValid && passwordValid) {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, contactNumber, email, password }),
          }
        );

        if (response.ok) {
          const body = await response.json();
          setUserInfo(body);
          navigateTo("/indexPage");
        } else {
          const errorMessage = await response.text();
          console.error("Signup Failed:", errorMessage);
        }
      } catch (error) {
        console.error("Signup Failed:", error.message);
      }
    }
  };

  const formReady = usernameValid && contactNumberValid && emailValid && passwordValid;

  return (
    <>
      <Header pageTitle="StuffFindr" isLoggedIn={false} />
      <main id="main-content" className="signUpPageContainer">
        <h1>Sign up</h1>
        <ImageUpload />
        <form onSubmit={handleSubmit} aria-describedby={!formReady ? "signup-requirements" : undefined}>
          <p id="signup-requirements" className="sr-only">
            All fields must be valid before you can submit the form.
          </p>
          <div className="inputContainer">
            <label className="fieldLabel" htmlFor="signup-username">Username</label>
            <input
              className="inputUsername"
              type="text"
              id="signup-username"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="username"
              aria-invalid={username.length > 0 && !usernameValid}
              aria-describedby="username-error"
              required
            />
            {username.length > 0 && !usernameValid && (
              <p id="username-error" className="error" role="alert">Username must be alphanumeric</p>
            )}

            <label className="fieldLabel" htmlFor="signup-contact">Contact Number</label>
            <input
              className="inputNumber"
              type="tel"
              id="signup-contact"
              value={contactNumber}
              onChange={handleContactNumberChange}
              autoComplete="tel"
              aria-invalid={contactNumber.length > 0 && !contactNumberValid}
              aria-describedby="contact-error"
              required
            />
            {contactNumber.length > 0 && !contactNumberValid && (
              <p id="contact-error" className="error" role="alert">Please enter a contact number</p>
            )}

            <label className="fieldLabel" htmlFor="signup-email">Email</label>
            <input
              className="inputEmail"
              type="email"
              id="signup-email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              aria-invalid={email.length > 0 && !emailValid}
              aria-describedby="email-error"
              required
            />
            {email.length > 0 && !emailValid && (
              <p id="email-error" className="error" role="alert">Please enter a valid email</p>
            )}

            <label className="fieldLabel" htmlFor="signup-password">Password</label>
            <input
              className="inputPassword"
              type="password"
              id="signup-password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              aria-invalid={password.length > 0 && !passwordValid}
              aria-describedby="password-error"
              required
            />
            {password.length > 0 && !passwordValid && (
              <p id="password-error" className="error" role="alert">
                Password must be at least 8 characters long and contain at least
                one digit, one lowercase letter, and one uppercase letter
              </p>
            )}
          </div>
          <p className="linkToLogIn">
            Already have an account? <Link to="/LoginPage">Log In</Link>
          </p>
          <div className="buttonContainer">
            <button
              className="submitBtn"
              type="submit"
              disabled={!formReady}
              aria-disabled={!formReady}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default SignupPage;
