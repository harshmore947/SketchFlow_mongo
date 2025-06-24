import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Drawing from "@/models/Drawing";

export async function GET() {
  try {
    await connectToDatabase();

    // Test database connection
    const count = await Drawing.countDocuments();

    // Test fetching a sample document to ensure serialization works
    const sampleDrawing = await Drawing.findOne();
    let sampleData = null;

    if (sampleDrawing) {
      sampleData = {
        _id: sampleDrawing._id.toString(),
        title: sampleDrawing.title,
        user: sampleDrawing.user.toString(),
        createdAt: sampleDrawing.createdAt.toISOString(),
        updatedAt: sampleDrawing.updatedAt.toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      drawingCount: count,
      sampleDrawing: sampleData,
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
