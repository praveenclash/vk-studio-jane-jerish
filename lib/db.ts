import Database from "better-sqlite3";
import path from "path";

export interface Wish {
  id: number;
  name: string;
  relation: string;
  message: string;
  attendance: "attending" | "regretfully_decline" | "undecided";
  guests_count: number;
  created_at: string;
  likes: number;
}

// Global singleton to prevent multiple connections in dev mode
const globalForDb = globalThis as unknown as {
  dbInstance: Database.Database | undefined;
};

function getDb(): Database.Database {
  if (!globalForDb.dbInstance) {
    const dbPath = path.join(process.cwd(), "wedding.db");
    const db = new Database(dbPath);

    // Optimize SQLite for high performance and integrity
    db.pragma("journal_mode = WAL");

    // Create wishes table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS wishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        relation TEXT DEFAULT 'Friend',
        message TEXT NOT NULL,
        attendance TEXT DEFAULT 'attending',
        guests_count INTEGER DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now', 'localtime')),
        likes INTEGER DEFAULT 0
      );
    `);

    // Check if table is empty and seed demo wishes
    const countResult = db.prepare("SELECT COUNT(*) as count FROM wishes").get() as { count: number };
    if (countResult.count === 0) {
      const seedInsert = db.prepare(`
        INSERT INTO wishes (name, relation, message, attendance, guests_count, created_at, likes)
        VALUES (@name, @relation, @message, @attendance, @guests_count, @created_at, @likes)
      `);

      const seedWishes = [
        {
          name: "Dr. Aravind & Family",
          relation: "Family",
          message: "Wishing Jane & Jerish an eternity of unconditional love, joy, and blessed companionship! Can't wait to celebrate your special day!",
          attendance: "attending",
          guests_count: 3,
          created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString().replace("T", " ").slice(0, 19),
          likes: 12,
        },
        {
          name: "Sowmya & Karthik",
          relation: "Friend",
          message: "Two beautiful souls meant for each other. May your life together be filled with laughter, adventures, and endless happiness!",
          attendance: "attending",
          guests_count: 2,
          created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString().replace("T", " ").slice(0, 19),
          likes: 8,
        },
        {
          name: "Praveen Kumar",
          relation: "Colleague",
          message: "Heartiest congratulations to the gorgeous couple! So happy to see you both embark on this wonderful journey together.",
          attendance: "attending",
          guests_count: 1,
          created_at: new Date(Date.now() - 3600000 * 5).toISOString().replace("T", " ").slice(0, 19),
          likes: 5,
        },
        {
          name: "Revathy Auntie",
          relation: "Family",
          message: "May God bless this holy union with abundant grace and joy. Counting down the days to the grand celebration!",
          attendance: "attending",
          guests_count: 2,
          created_at: new Date(Date.now() - 3600000 * 2).toISOString().replace("T", " ").slice(0, 19),
          likes: 15,
        },
      ];

      const insertMany = db.transaction((wishes: typeof seedWishes) => {
        for (const wish of wishes) seedInsert.run(wish);
      });

      insertMany(seedWishes);
    }

    globalForDb.dbInstance = db;
  }

  return globalForDb.dbInstance;
}

export function getAllWishes(): Wish[] {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM wishes ORDER BY id DESC");
  return stmt.all() as Wish[];
}

export function createWish(data: {
  name: string;
  relation?: string;
  message: string;
  attendance?: string;
  guests_count?: number;
}): Wish {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO wishes (name, relation, message, attendance, guests_count, created_at, likes)
    VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'), 0)
  `);

  const result = stmt.run(
    data.name.trim(),
    data.relation?.trim() || "Friend",
    data.message.trim(),
    data.attendance || "attending",
    data.guests_count || 1
  );

  const getStmt = db.prepare("SELECT * FROM wishes WHERE id = ?");
  return getStmt.get(result.lastInsertRowid) as Wish;
}

export function toggleLikeWish(id: number): Wish | null {
  const db = getDb();
  const updateStmt = db.prepare("UPDATE wishes SET likes = likes + 1 WHERE id = ?");
  updateStmt.run(id);

  const getStmt = db.prepare("SELECT * FROM wishes WHERE id = ?");
  const updated = getStmt.get(id) as Wish | undefined;
  return updated || null;
}

export function deleteWish(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM wishes WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

