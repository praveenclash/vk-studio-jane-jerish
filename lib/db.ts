import fs from "fs";
import path from "path";
import os from "os";

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

// Determine writable directory (/tmp on Vercel/AWS Lambda, process.cwd() locally)
const isVercel = !!process.env.VERCEL || process.env.NODE_ENV === "production";
const storageDir = isVercel ? os.tmpdir() : process.cwd();
const jsonFilePath = path.join(storageDir, "wishes-store.json");

// In-memory cache singleton
const globalStore = globalThis as unknown as {
  wishesCache: Wish[] | undefined;
};

function loadWishesFromFile(): Wish[] {
  try {
    if (fs.existsSync(jsonFilePath)) {
      const data = fs.readFileSync(jsonFilePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to read wishes from JSON file:", err);
  }

  // Also check if local wedding.db exists and can be read safely
  try {
    const Database = require("better-sqlite3");
    const dbPath = path.join(process.cwd(), "wedding.db");
    if (fs.existsSync(dbPath)) {
      const db = new Database(dbPath, { readonly: true });
      const rows = db.prepare("SELECT * FROM wishes ORDER BY id DESC").all() as Wish[];
      db.close();
      if (rows && rows.length > 0) {
        saveWishesToFile(rows);
        return rows;
      }
    }
  } catch {
    // SQLite not available or readonly error
  }

  return [...defaultSeedWishes];
}

function saveWishesToFile(wishes: Wish[]) {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(wishes, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not persist wishes to disk:", err);
  }
}

function getStore(): Wish[] {
  if (!globalStore.wishesCache) {
    globalStore.wishesCache = loadWishesFromFile();
  }
  return globalStore.wishesCache;
}

export function getAllWishes(): Wish[] {
  const store = getStore();
  return [...store].sort((a, b) => b.id - a.id);
}

export function createWish(data: { name: string; message: string }): Wish {
  const store = getStore();
  const nextId = store.length > 0 ? Math.max(...store.map((w) => w.id)) + 1 : 1;

  const newWish: Wish = {
    id: nextId,
    name: data.name.trim(),
    message: data.message.trim(),
    created_at: new Date().toISOString().replace("T", " ").slice(0, 19),
    likes: 0,
  };

  store.unshift(newWish);
  saveWishesToFile(store);

  // Also try to insert into SQLite if running locally with write permissions
  try {
    const Database = require("better-sqlite3");
    const dbPath = path.join(process.cwd(), "wedding.db");
    const db = new Database(dbPath);
    db.prepare(`
      INSERT INTO wishes (name, message, created_at, likes)
      VALUES (?, ?, ?, 0)
    `).run(newWish.name, newWish.message, newWish.created_at);
    db.close();
  } catch {
    // Ignore SQLite errors in serverless
  }

  return newWish;
}

export function toggleLikeWish(id: number): Wish | null {
  const store = getStore();
  const wish = store.find((w) => w.id === id);
  if (!wish) return null;

  wish.likes = (wish.likes || 0) + 1;
  saveWishesToFile(store);
  return wish;
}

export function deleteWish(id: number): boolean {
  const store = getStore();
  const idx = store.findIndex((w) => w.id === id);
  if (idx === -1) return false;

  store.splice(idx, 1);
  saveWishesToFile(store);
  return true;
}
