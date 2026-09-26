import { NextResponse } from "next/server";
import { getAllWishes, createWish } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const wishes = getAllWishes();
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    console.error("Error fetching wishes from SQL database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch wishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, relation, message, attendance, guests_count } = body;

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

    const newWish = createWish({
      name: name.slice(0, 100),
      relation: relation ? String(relation).slice(0, 50) : "Friend",
      message: message.slice(0, 1000),
      attendance: ["attending", "regretfully_decline", "undecided"].includes(attendance)
        ? attendance
        : "attending",
      guests_count: Number(guests_count) > 0 ? Math.min(Number(guests_count), 20) : 1,
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
