import fs from "fs";
import path from "path";

const wishesFilePath = path.join(process.cwd(), "data", "wishes.txt");

console.log("\n========================================================");
console.log("       TEXT FILE STORAGE - DATA/WISHES.TXT              ");
console.log("========================================================\n");

if (!fs.existsSync(wishesFilePath)) {
  console.log("data/wishes.txt file does not exist yet.");
} else {
  try {
    const raw = fs.readFileSync(wishesFilePath, "utf-8");
    const wishes = JSON.parse(raw);

    if (!Array.isArray(wishes) || wishes.length === 0) {
      console.log("No wishes in data/wishes.txt yet.");
    } else {
      console.table(
        wishes.map((r) => ({
          ID: r.id,
          Name: r.name,
          Likes: r.likes,
          Date: r.created_at,
          Message: r.message.length > 50 ? r.message.substring(0, 47) + "..." : r.message,
        }))
      );
      console.log(`\nTotal records in data/wishes.txt: ${wishes.length}\n`);
    }
  } catch (error) {
    console.error("❌ Failed to parse data/wishes.txt:", error.message);
  }
}
