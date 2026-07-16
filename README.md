# StuffFindr

**StuffFindr** is a lost-and-found platform that helps people report missing items, browse items others have found, and submit claims to reunite belongings with their owners.

Users can sign up, log in, post lost or found items with details like location and date, search and filter reported items, view item details, and start a claim flow when they believe an item belongs to them.

---

## Project Background

This project was originally built in collaboration with my **Code the Dream practicum team** (Ferret/Flamingo, Team 7) as part of the Node/React practicum. I contributed as a front-end developer on the original codebase.

I later created this repository as a personal continuation of that work. My goal is to use **AI-assisted development** to refactor, improve, and modernize the app while preserving the original product vision from the practicum project.

### Original Repositories

| Repo | Link |
|------|------|
| Team front-end (CTD) | [Code-the-Dream-School/ffprac-team7-front](https://github.com/Code-the-Dream-School/ffprac-team7-front) |
| Team back-end (CTD) | [Code-the-Dream-School/ffprac-team7-back](https://github.com/Code-the-Dream-School/ffprac-team7-back) |
| My front-end fork | [Maarimar/ffprac-StuffFindr](https://github.com/Maarimar/ffprac-StuffFindr) |
| My back-end fork | [Maarimar/ffprac-StuffFindr-backend](https://github.com/Maarimar/ffprac-StuffFindr-backend) |

---

## Tech Stack

**Front-end (this repo)**
- React 18
- Vite
- React Router
- Axios
- React Toastify

**Back-end (separate repo)**
- Node.js
- Express
- MongoDB + Mongoose

---

## Features

- User sign-up and login
- Report lost or found items
- Browse reported items with search and filters
- View item details
- Claim item flow (in progress)
- Profile page (in progress)

---

## Getting the App Running Locally

StuffFindr is a full-stack app. You need **both** the back-end API and this front-end app running at the same time.

- Back-end: `http://localhost:8000`
- Front-end (Vite): `http://localhost:5173`

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local install or MongoDB Atlas)

### 1) Set up the back-end

```bash
git clone https://github.com/Maarimar/ffprac-StuffFindr-backend.git
cd ffprac-StuffFindr-backend
npm install
```

Configure your environment variables (create a `.env` file based on the backend repo requirements, usually including MongoDB connection details and JWT secret).

Start the API server:

```bash
npm run dev
```

Verify the API is running by opening:

`http://localhost:8000/api/v1/`

### 2) Set up the front-end (this repo)

In a second terminal:

```bash
git clone https://github.com/Maarimar/StuffFndr.git
cd StuffFndr
npm install
npm run dev
```

Open the app in your browser:

`http://localhost:5173`

### 3) Run both servers together

Keep both terminals open:

1. Terminal 1: backend (`npm run dev` in backend folder)
2. Terminal 2: frontend (`npm run dev` in this repo)

The front-end currently calls the API at `http://localhost:8000/api/v1`.

---

## Available Scripts (Front-end)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Roadmap (AI-Assisted Improvements)

This fork is actively being improved with AI support. Planned work includes:

- Centralized authentication and protected routes
- API client + environment-based configuration
- Bug fixes in item card props, claim flow, and form handling
- Better loading/error states and accessibility
- README, testing, and deployment updates

---

## Acknowledgments

Thank you to **Code the Dream** and my practicum teammates for the original collaboration, mentorship, and foundation this project was built on.
