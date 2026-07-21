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

Create a `.env` file in the backend folder with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=30d
PORT=8000
```

For local MongoDB, `MONGO_URI` is often `mongodb://127.0.0.1:27017/stufffindr`. For a free cloud database, create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

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

## Demo Test Account

Use this demo account to explore the app without creating your own user.

| Field | Value |
|-------|-------|
| Username | `demoUser` |
| Password | `DemoPass1` |
| Email | `demo@stufffindr.test` |

### Create the demo user in your local database

After the backend is running, open a third terminal from this repo and run:

```bash
npm run seed:test-user
```

This script creates the demo user in **your** local MongoDB. If the user already exists, it verifies login instead of failing.

Then log in at [http://localhost:5173/LoginPage](http://localhost:5173/LoginPage) with the credentials above.

> **Note:** This account exists only in the database you connect to locally (or in whatever environment you seed). It is meant for testing and demos, not production.

---

## Available Scripts (Front-end)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run seed:test-user` | Create or verify the demo test user in your local backend |

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
