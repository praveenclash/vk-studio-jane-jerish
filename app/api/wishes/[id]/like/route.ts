import { NextResponse } from "next/server";
import { toggleLikeWish } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const wishId = parseInt(id, 10);
    if (isNaN(wishId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const updated = toggleLikeWish(wishId);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Wish not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error liking wish:", error);
    return NextResponse.json(
      { success: false, error: "Failed to like wish" },
      { status: 500 }
    );
  }
}
