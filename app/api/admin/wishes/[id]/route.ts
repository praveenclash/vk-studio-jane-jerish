import { NextResponse } from "next/server";
import { deleteWish } from "@/lib/db";

export async function DELETE(
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

    const success = await deleteWish(wishId);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting wish:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}
