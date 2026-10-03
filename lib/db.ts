import fs from "fs";
import path from "path";
import os from "os";
import mysql, { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

// 1. Primary local workspace text file (used in local development)
const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_WISHES_FILE = path.join(LOCAL_DATA_DIR, "wishes.txt");

// 2. Production fallback text file (Vercel serverless /tmp)
const TMP_WISHES_FILE = path.join(os.tmpdir(), "wishes.txt");

// Global store to cache connection pool and in-memory wishes across hot-reloads
const globalStore = globalThis as unknown as {
  __wishesCache?: Wish[];
  mysqlPool?: Pool;
  dbInitialized?: boolean;
};

/**
 * Checks whether MySQL configuration is present in environment variables
 */
function isCloudDbConfigured(): boolean {
  return Boolean(
    process.env.MYSQL_PUBLIC_URL ||
    process.env.MYSQL_URL ||
    process.env.DATABASE_URL ||
    process.env.MYSQLHOST ||
    process.env.MYSQLHOST_PUBLIC
  );
}

/**
 * Returns or creates the MySQL connection pool
 */
function getPool(): Pool {
  if (!globalStore.mysqlPool) {
    const connectionUri =
      process.env.MYSQL_PUBLIC_URL ||
      process.env.MYSQL_URL ||
      process.env.DATABASE_URL;

    if (connectionUri && !process.env.MYSQLHOST_PUBLIC) {
      globalStore.mysqlPool = mysql.createPool({
        uri: connectionUri,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
      });
    } else {
      globalStore.mysqlPool = mysql.createPool({
        host: process.env.MYSQLHOST_PUBLIC || process.env.MYSQLHOST || "mysql.railway.internal",
        port: Number(process.env.MYSQLPORT_PUBLIC || process.env.MYSQLPORT || 3306),
        user: process.env.MYSQLUSER || "root",
        password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "railway",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
      });
    }
  }
  return globalStore.mysqlPool;
}

/**
 * Ensures the `wishes` table exists in MySQL
 */
async function initDb(): Promise<void> {
  if (globalStore.dbInitialized) return;

  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wishes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      likes INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  globalStore.dbInitialized = true;
}

/* =========================================================================
   FILE-BASED STORAGE (For Local Development)
   ========================================================================= */

async function readWishesFromFile(): Promise<Wish[]> {
  // 1. Return in-memory cache if available
  if (globalStore.__wishesCache !== undefined) {
    return globalStore.__wishesCache;
  }

  // 2. Try reading from project data/wishes.txt
  if (fs.existsSync(LOCAL_WISHES_FILE)) {
    try {
      const content = await fs.promises.readFile(LOCAL_WISHES_FILE, "utf-8");
      if (content.trim()) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          globalStore.__wishesCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from local wishes file:", e);
    }
  }

  // 3. Try reading from /tmp/wishes.txt (on Vercel serverless)
  if (fs.existsSync(TMP_WISHES_FILE)) {
    try {
      const content = await fs.promises.readFile(TMP_WISHES_FILE, "utf-8");
      if (content.trim()) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          globalStore.__wishesCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from tmp wishes file:", e);
    }
  }

  // 4. Default fallback is empty array
  globalStore.__wishesCache = [];
  return globalStore.__wishesCache;
}

async function writeWishesToFile(wishes: Wish[]): Promise<void> {
  globalStore.__wishesCache = [...wishes];
  const content = JSON.stringify(wishes, null, 2);

  let wroteLocally = false;
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    const tempPath = `${LOCAL_WISHES_FILE}.tmp`;
    await fs.promises.writeFile(tempPath, content, "utf-8");
    await fs.promises.rename(tempPath, LOCAL_WISHES_FILE);
    wroteLocally = true;
  } catch {
    wroteLocally = false;
  }

  if (!wroteLocally) {
    try {
      const tmpPath = `${TMP_WISHES_FILE}.tmp`;
      await fs.promises.writeFile(tmpPath, content, "utf-8");
      await fs.promises.rename(tmpPath, TMP_WISHES_FILE);
    } catch (e) {
      console.warn("Could not write to tmp wishes file, saved in memory cache:", e);
    }
  }
}

/* =========================================================================
   PUBLIC DATABASE API (Auto-detects Cloud MySQL vs Local File)
   ========================================================================= */

/**
 * Retrieve all wishes (sorted by newest first)
 */
export async function getAllWishes(): Promise<Wish[]> {
  if (isCloudDbConfigured()) {
    try {
      await initDb();
      const pool = getPool();
      const [rows] = await pool.query<RowDataPacket[]>(`
        SELECT 
          id, 
          name, 
          message, 
          DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, 
          likes 
        FROM wishes 
        ORDER BY id DESC
      `);

      return rows.map((r) => ({
        id: Number(r.id),
        name: String(r.name),
        message: String(r.message),
        created_at: String(r.created_at || new Date().toISOString()),
        likes: Number(r.likes || 0),
      }));
    } catch (error: any) {
      console.error("Cloud DB query error, falling back to local file:", error?.message || error);
    }
  }

  // Local file fallback
  const wishes = await readWishesFromFile();
  return [...wishes].sort((a, b) => b.id - a.id);
}

/**
 * Create a new wish
 */
export async function createWish(data: { name: string; message: string }): Promise<Wish> {
  const cleanName = data.name.trim();
  const cleanMessage = data.message.trim();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

  if (isCloudDbConfigured()) {
    try {
      await initDb();
      const pool = getPool();
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO wishes (name, message, created_at, likes) VALUES (?, ?, ?, 0)",
        [cleanName, cleanMessage, createdAt]
      );

      return {
        id: result.insertId,
        name: cleanName,
        message: cleanMessage,
        created_at: createdAt,
        likes: 0,
      };
    } catch (error: any) {
      console.error("Cloud DB insert error, saving to local file fallback:", error?.message || error);
    }
  }

  // Local file fallback
  const wishes = await readWishesFromFile();
  const nextId = wishes.length > 0 ? Math.max(...wishes.map((w) => w.id)) + 1 : 1;

  const newWish: Wish = {
    id: nextId,
    name: cleanName,
    message: cleanMessage,
    created_at: createdAt,
    likes: 0,
  };

  wishes.push(newWish);
  await writeWishesToFile(wishes);
  return newWish;
}

/**
 * Increment like count
 */
export async function toggleLikeWish(id: number): Promise<Wish | null> {
  if (isCloudDbConfigured()) {
    try {
      await initDb();
      const pool = getPool();
      await pool.query("UPDATE wishes SET likes = likes + 1 WHERE id = ?", [id]);

      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, name, message, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at, likes FROM wishes WHERE id = ?",
        [id]
      );

      if (!rows || rows.length === 0) return null;

      const row = rows[0];
      return {
        id: Number(row.id),
        name: String(row.name),
        message: String(row.message),
        created_at: String(row.created_at),
        likes: Number(row.likes || 0),
      };
    } catch (error: any) {
      console.error("Cloud DB like error, using local file fallback:", error?.message || error);
    }
  }

  // Local file fallback
  const wishes = await readWishesFromFile();
  const wish = wishes.find((w) => w.id === id);
  if (!wish) return null;

  wish.likes = (wish.likes || 0) + 1;
  await writeWishesToFile(wishes);
  return wish;
}

/**
 * Delete a wish by ID
 */
export async function deleteWish(id: number): Promise<boolean> {
  if (isCloudDbConfigured()) {
    try {
      await initDb();
      const pool = getPool();
      const [result] = await pool.query<ResultSetHeader>("DELETE FROM wishes WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error: any) {
      console.error("Cloud DB delete error, using local file fallback:", error?.message || error);
    }
  }

  // Local file fallback
  const wishes = await readWishesFromFile();
  const index = wishes.findIndex((w) => w.id === id);
  if (index === -1) return false;

  wishes.splice(index, 1);
  await writeWishesToFile(wishes);
  return true;
}