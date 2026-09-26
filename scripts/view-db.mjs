import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "wedding.db");
const db = new Database(dbPath);

console.log("\n========================================================");
console.log("       WEDDING SQL DATABASE (wedding.db) - WISHES       ");
console.log("========================================================\n");

const rows = db.prepare("SELECT * FROM wishes ORDER BY id ASC").all();

if (rows.length === 0) {
  console.log("No wishes in the database yet.");
} else {
  console.table(
    rows.map((r) => ({
      ID: r.id,
      Name: r.name,
      Relation: r.relation,
      Attendance: r.attendance,
      Guests: r.guests_count,
      Likes: r.likes,
      Date: r.created_at,
      Message: r.message.length > 40 ? r.message.substring(0, 37) + "..." : r.message,
    }))
  );
}

console.log(`\nTotal records in database: ${rows.length}\n`);
db.close();
