import fs from "fs";
import path from "path";

export interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

const DATA_DIR = path.join(process.cwd(), "data");
const WISHES_FILE = path.join(DATA_DIR, "wishes.txt");

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

/**
 * Ensures data directory and wishes.txt exist.
 */
function ensureStorage(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(WISHES_FILE)) {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(defaultSeedWishes, null, 2), "utf-8");
  }
}

/**
 * Reads all wishes from data/wishes.txt
 */
async function readWishesFromFile(): Promise<Wish[]> {
  try {
    ensureStorage();
    const content = await fs.promises.readFile(WISHES_FILE, "utf-8");
    if (!content.trim()) return [];
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading wishes from text file:", error);
    return defaultSeedWishes;
  }
}

/**
 * Writes all wishes to data/wishes.txt atomically
 */
async function writeWishesToFile(wishes: Wish[]): Promise<void> {
  ensureStorage();
  const tempPath = `${WISHES_FILE}.tmp`;
  const content = JSON.stringify(wishes, null, 2);
  await fs.promises.writeFile(tempPath, content, "utf-8");
  await fs.promises.rename(tempPath, WISHES_FILE);
}

/**
 * Retrieve all wishes from text file (sorted by newest first)
 */
export async function getAllWishes(): Promise<Wish[]> {
  const wishes = await readWishesFromFile();
  return [...wishes].sort((a, b) => b.id - a.id);
}

/**
 * Create a new wish and append/save to text file
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
 * Increment the like count for a wish in the text file
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
 * Delete a wish by ID from the text file
 */
export async function deleteWish(id: number): Promise<boolean> {
  const wishes = await readWishesFromFile();
  const index = wishes.findIndex((w) => w.id === id);

  if (index === -1) return false;

  wishes.splice(index, 1);
  await writeWishesToFile(wishes);
  return true;
}