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

// 1. Primary local workspace text file (used in development)
const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_WISHES_FILE = path.join(LOCAL_DATA_DIR, "wishes.txt");

// 2. Production fallback text file (Vercel serverless /tmp which is writable)
const TMP_WISHES_FILE = path.join(os.tmpdir(), "wishes.txt");

const defaultSeedWishes: Wish[] = [
  {
    id: 1,
    name: "Dr. Aravind & Family",
    message: "Wishing Jane & Jerish an eternity of unconditional love, joy, and blessed companionship! Can't wait to celebrate your special day!",
    created_at: "2026-09-28 16:30:00",
    likes: 12,
  },
  {
    id: 2,
    name: "Sowmya & Karthik",
    message: "Two beautiful souls meant for each other. May your life together be filled with laughter, adventures, and endless happiness!",
    created_at: "2026-09-29 16:30:00",
    likes: 8,
  },
  {
    id: 3,
    name: "Praveen Kumar",
    message: "Heartiest congratulations to the gorgeous couple! So happy to see you both embark on this wonderful journey together.",
    created_at: "2026-10-01 17:00:00",
    likes: 5,
  },
  {
    id: 4,
    name: "Revathy Auntie",
    message: "May God bless this holy union with abundant grace and joy. Counting down the days to the grand celebration!",
    created_at: "2026-09-30 16:30:00",
    likes: 15,
  },
];

// Global in-memory cache to share wishes across serverless invocations and hot-reloads
const globalStore = globalThis as unknown as {
  __wishesCache?: Wish[];
};

/**
 * Reads wishes from the text file or falls back to seed data.
 */
async function readWishesFromFile(): Promise<Wish[]> {
  // 1. Return in-memory cache if available
  if (globalStore.__wishesCache && globalStore.__wishesCache.length > 0) {
    return globalStore.__wishesCache;
  }

  // 2. Try reading from /tmp/wishes.txt (on Vercel if updated)
  if (fs.existsSync(TMP_WISHES_FILE)) {
    try {
      const content = await fs.promises.readFile(TMP_WISHES_FILE, "utf-8");
      if (content.trim()) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          globalStore.__wishesCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from tmp wishes file:", e);
    }
  }

  // 3. Try reading from project data/wishes.txt
  if (fs.existsSync(LOCAL_WISHES_FILE)) {
    try {
      const content = await fs.promises.readFile(LOCAL_WISHES_FILE, "utf-8");
      if (content.trim()) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          globalStore.__wishesCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read from local wishes file:", e);
    }
  }

  // 4. Default seed fallback
  globalStore.__wishesCache = [...defaultSeedWishes];
  return globalStore.__wishesCache;
}

/**
 * Saves wishes to text file (handles both local development and Vercel read-only filesystem).
 */
async function writeWishesToFile(wishes: Wish[]): Promise<void> {
  // Always update in-memory cache first
  globalStore.__wishesCache = [...wishes];
  const content = JSON.stringify(wishes, null, 2);

  // Attempt 1: Write to local workspace data/wishes.txt (works in local development)
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
    // EROFS / read-only filesystem on Vercel production serverless
    wroteLocally = false;
  }

  // Attempt 2: Write to /tmp/wishes.txt (permitted on Vercel serverless)
  if (!wroteLocally) {
    try {
      const tmpPath = `${TMP_WISHES_FILE}.tmp`;
      await fs.promises.writeFile(tmpPath, content, "utf-8");
      await fs.promises.rename(tmpPath, TMP_WISHES_FILE);
    } catch (e) {
      console.warn("Could not write to tmp wishes file, stored in memory cache:", e);
    }
  }
}

/**
 * Retrieve all wishes from text file (sorted by newest first)
 */
export async function getAllWishes(): Promise<Wish[]> {
  const wishes = await readWishesFromFile();
  return [...wishes].sort((a, b) => b.id - a.id);
}

/**
 * Create a new wish and save to text file
 */
export async function createWish(data: { name: string; message: string }): Promise<Wish> {
  const cleanName = data.name.trim();
  const cleanMessage = data.message.trim();
  const createdAt = new Date().toISOString().replace("T", " ").slice(0, 19);

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
 * Increment like count in text file
 */
export async function toggleLikeWish(id: number): Promise<Wish | null> {
  const wishes = await readWishesFromFile();
  const wish = wishes.find((w) => w.id === id);

  if (!wish) return null;

  wish.likes = (wish.likes || 0) + 1;
  await writeWishesToFile(wishes);
  return wish;
}

/**
 * Delete a wish by ID from text file
 */
export async function deleteWish(id: number): Promise<boolean> {
  const wishes = await readWishesFromFile();
  const index = wishes.findIndex((w) => w.id === id);

  if (index === -1) return false;

  wishes.splice(index, 1);
  await writeWishesToFile(wishes);
  return true;
}