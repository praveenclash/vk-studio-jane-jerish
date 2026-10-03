import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const musicDir = path.join(process.cwd(), "public", "music");
    if (!fs.existsSync(musicDir)) {
      return new NextResponse("Music directory not found", { status: 404 });
    }

    const files = fs.readdirSync(musicDir);
    // Find the uploaded mp3 file
    const songFile = files.find((f) => f.toLowerCase().endsWith(".mp3"));

    if (!songFile) {
      return new NextResponse("No mp3 found", { status: 404 });
    }

    const sourcePath = path.join(musicDir, songFile);
    const cleanPath = path.join(musicDir, "wedding-song.mp3");

    // Ensure clean copy exists
    if (!fs.existsSync(cleanPath) || fs.statSync(cleanPath).size !== fs.statSync(sourcePath).size) {
      try {
        fs.copyFileSync(sourcePath, cleanPath);
      } catch (err) {
        console.error("Failed to copy clean wedding song:", err);
      }
    }

    const targetFile = fs.existsSync(cleanPath) ? cleanPath : sourcePath;
    const fileBuffer = fs.readFileSync(targetFile);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": fileBuffer.length.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Error serving wedding song:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
