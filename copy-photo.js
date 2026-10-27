// Run this with: node copy-photo.js
const fs = require("fs");
const path = require("path");

const src = path.join(
  "C:\\Users\\dhay6\\.gemini\\antigravity\\brain\\7e880e23-db62-45ac-a1c6-d8ac4445cf26\\.user_uploaded",
  "media_1793037710828_37b2ec5f.png"
);
const dest = path.join(__dirname, "public", "her-photo.png");

try {
  fs.copyFileSync(src, dest);
  console.log("✅ Done! her-photo.png copied to /public successfully.");
  console.log("   Now run: npm run dev");
} catch (err) {
  console.error("❌ Error:", err.message);
}
