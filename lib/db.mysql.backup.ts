import mysql, { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

const defaultSeedWishes: Wish[] = [
  {
    id: 1,
    name: "Dr. Aravind & Family",
    message: "Wishing Jane & Jerish an eternity of unconditional love, joy, and blessed companionship! Can't wait to celebrate your special day!",
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString().replace("T", " ").slice(0, 19),
    likes: 12,
  },
  {
    id: 2,
    name: "Sowmya & Karthik",
    message: "Two beautiful souls meant for each other. May your life together be filled with laughter, adventures, and endless happiness!",
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString().replace("T", " ").slice(0, 19),
    likes: 8,
  },
  {
    id: 3,
    name: "Praveen Kumar",
    message: "Heartiest congratulations to the gorgeous couple! So happy to see you both embark on this wonderful journey together.",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString().replace("T", " ").slice(0, 19),
    likes: 5,
  },
  {
    id: 4,
    name: "Revathy Auntie",
    message: "May God bless this holy union with abundant grace and joy. Counting down the days to the grand celebration!",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString().replace("T", " ").slice(0, 19),
    likes: 15,
  },
];

// Singleton storage in globalThis for Next.js hot-reloads
const globalStore = globalThis as unknown as {
  mysqlPool?: Pool;
  dbInitialized?: boolean;
  localFallbackWishes?: Wish[];
};

/**
 * Returns or creates the MySQL connection pool
 */
export function getPool(): Pool {
  if (!globalStore.mysqlPool) {
    const connectionUri = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;

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
 * Ensures the `wishes` table exists in MySQL and seeds initial records if empty
 */
export async function initDb(): Promise<void> {
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

  const [rows] = await pool.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM wishes");
  const count = rows[0]?.count ?? 0;
  if (count === 0) {
    for (const wish of defaultSeedWishes) {
      await pool.query(
        "INSERT INTO wishes (name, message, created_at, likes) VALUES (?, ?, ?, ?)",
        [wish.name, wish.message, wish.created_at, wish.likes]
      );
    }
  }

  globalStore.dbInitialized = true;
}

/**
 * Helper to get in-memory fallback list if running locally without Railway private network access
 */
function getFallbackStore(): Wish[] {
  if (!globalStore.localFallbackWishes) {
    globalStore.localFallbackWishes = [...defaultSeedWishes];
  }
  return globalStore.localFallbackWishes;
}

/**
 * Retrieve all wishes from MySQL (sorted by newest first)
 */
export async function getAllWishes(): Promise<Wish[]> {
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
    console.warn(
      "⚠️ MySQL Query Note (using fallback):",
      error?.message || error
    );
    const store = getFallbackStore();
    return [...store].sort((a, b) => b.id - a.id);
  }
}

/**
 * Create a new wish in MySQL
 */
export async function createWish(data: { name: string; message: string }): Promise<Wish> {
  const cleanName = data.name.trim();
  const cleanMessage = data.message.trim();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

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
    console.warn("⚠️ MySQL Insert Note (using fallback):", error?.message || error);
    const store = getFallbackStore();
    const nextId = store.length > 0 ? Math.max(...store.map((w) => w.id)) + 1 : 1;
    const newWish: Wish = {
      id: nextId,
      name: cleanName,
      message: cleanMessage,
      created_at: createdAt,
      likes: 0,
    };
    store.unshift(newWish);
    return newWish;
  }
}

/**
 * Increment the like count for a wish in MySQL
 */
export async function toggleLikeWish(id: number): Promise<Wish | null> {
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
    console.warn("⚠️ MySQL Like Note (using fallback):", error?.message || error);
    const store = getFallbackStore();
    const wish = store.find((w) => w.id === id);
    if (!wish) return null;
    wish.likes = (wish.likes || 0) + 1;
    return wish;
  }
}

/**
 * Delete a wish by ID from MySQL
 */
export async function deleteWish(id: number): Promise<boolean> {
  try {
    await initDb();
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM wishes WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error: any) {
    console.warn("⚠️ MySQL Delete Note (using fallback):", error?.message || error);
    const store = getFallbackStore();
    const idx = store.findIndex((w) => w.id === id);
    if (idx === -1) return false;
    store.splice(idx, 1);
    return true;
  }
}
