import { NextResponse } from "next/server";
import { getAllWishes, createWish } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const wishes = await getAllWishes();
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    console.error("Error fetching wishes from MySQL database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const newWish = await createWish({
      name: name.slice(0, 100),
      message: message.slice(0, 1000),
    });

    return NextResponse.json({ success: true, data: newWish }, { status: 201 });
  } catch (error) {
    console.error("Error saving wish to SQL database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save wish to database" },
      { status: 500 }
    );
  }
}
