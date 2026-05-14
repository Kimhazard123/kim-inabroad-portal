import { adminAuth } from "../lib/firebase-admin";

async function main() {
  const email = process.env.ADMIN_EMAIL || "kimhazard25@gmail.com";
  const password = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@12345";
  try {
    await adminAuth().getUserByEmail(email);
    console.log(`Admin user already exists: ${email}`);
  } catch {
    await adminAuth().createUser({ email, password, emailVerified: true, displayName: "InAbroad Admin" });
    console.log(`Admin user created: ${email}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
