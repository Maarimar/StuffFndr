/**
 * Creates (or verifies) the demo test user in your local backend database.
 *
 * Prerequisites:
 * - Backend running at http://localhost:8000
 * - MongoDB connected via backend .env
 *
 * Usage: npm run seed:test-user
 */

const API_BASE = process.env.API_URL || "http://localhost:8000/api/v1";

const TEST_USER = {
  username: "demoUser",
  email: "demo@stufffindr.test",
  password: "DemoPass1",
  phoneNumber: "5551234567",
  location: "Demo City, USA",
};

async function seedTestUser() {
  const signupResponse = await fetch(`${API_BASE}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(TEST_USER),
  });

  if (signupResponse.ok) {
    console.log("Demo user created successfully.");
    printCredentials();
    return;
  }

  const signupError = await signupResponse.text();

  if (
    signupResponse.status === 400 &&
    signupError.toLowerCase().includes("already exists")
  ) {
    const loginResponse = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: TEST_USER.username,
        password: TEST_USER.password,
      }),
    });

    if (loginResponse.ok) {
      console.log("Demo user already exists. Login verified.");
      printCredentials();
      return;
    }
  }

  console.error("Failed to create demo user.");
  console.error(`Status: ${signupResponse.status}`);
  console.error(signupError);
  console.error(
    "\nMake sure the backend is running and MongoDB is configured in the backend .env file."
  );
  process.exit(1);
}

function printCredentials() {
  console.log("\nUse these credentials to log in:");
  console.log(`  Username: ${TEST_USER.username}`);
  console.log(`  Password: ${TEST_USER.password}`);
  console.log(`  Email:    ${TEST_USER.email}`);
  console.log("\nOpen http://localhost:5173/LoginPage to sign in.");
}

seedTestUser().catch((error) => {
  console.error("Could not reach the backend API.");
  console.error(error.message);
  console.error(
    "\nStart the backend first: cd ffprac-StuffFindr-backend && npm run dev"
  );
  process.exit(1);
});
