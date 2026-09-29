import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const connectionUri = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

console.log("\n========================================================");
console.log("       RAILWAY MYSQL DATABASE - WISHES TABLE            ");
console.log("========================================================\n");

try {
  const connection = connectionUri
    ? await mysql.createConnection(connectionUri)
    : await mysql.createConnection({
        host: process.env.MYSQLHOST_PUBLIC || process.env.MYSQLHOST || "mysql.railway.internal",
        port: Number(process.env.MYSQLPORT_PUBLIC || process.env.MYSQLPORT || 3306),
        user: process.env.MYSQLUSER || "root",
        password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "railway",
      });

  console.log(" Connected to MySQL database successfully!\n");

  const [rows] = await connection.query(
    "SELECT id, name, likes, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, message FROM wishes ORDER BY id ASC"
  );

  if (!rows || rows.length === 0) {
    console.log("No wishes in the database yet.");
  } else {
    console.table(
      rows.map((r) => ({
        ID: r.id,
        Name: r.name,
        Likes: r.likes,
        Date: r.created_at,
        Message: r.message.length > 50 ? r.message.substring(0, 47) + "..." : r.message,
      }))
    );
    console.log(`\nTotal records in database: ${rows.length}\n`);
  }

  await connection.end();
} catch (error) {
  console.error("❌ Failed to query MySQL database:", error.message);
  console.log("\nNote: 'mysql.railway.internal' is only accessible inside Railway's private cloud network.");
  console.log("For local machine access, enable TCP Proxy in Railway MySQL settings and set MYSQL_PUBLIC_URL in .env.local.\n");
}
