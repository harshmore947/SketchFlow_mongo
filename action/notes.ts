"use server";

import Drawing, { DrawingDocument } from "@/models/Drawing";
import { connectToDatabase } from "@/lib/db";
import { Types } from "mongoose";

// Type for the plain object returned to client
export interface NoteData {
  _id: string;
  title: string;
  data: {
    elements: any[];
    appState: any;
  };
  starred: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  user: string;
}

// Helper function to convert Mongoose document to plain object
function convertToPlainObject(doc: any): NoteData {
  const plain = doc.toObject ? doc.toObject() : doc;
  return {
    _id: plain._id.toString(),
    title: plain.title,
    data: plain.data,
    starred: plain.starred,
    archived: plain.archived,
    createdAt: plain.createdAt.toISOString(),
    updatedAt: plain.updatedAt.toISOString(),
    user: plain.user.toString(),
  };
}

// Create a new note (drawing)
export async function createNote({
  title,
  data,
  userId,
}: {
  title: string;
  data: any;
  userId: string;
}): Promise<{ success: boolean; note?: NoteData; error?: string }> {
  try {
    await connectToDatabase();

    const drawing = await Drawing.create({
      title,
      data,
      user: new Types.ObjectId(userId),
      starred: false,
      archived: false,
    });

    // Convert to plain object with proper serialization
    const plainDrawing = convertToPlainObject(drawing);

    return { success: true, note: plainDrawing };
  } catch (error) {
    console.error("Error creating note:", error);
    return { success: false, error: "Failed to create note" };
  }
}

// Fetch a note (drawing) by id
export async function getNote(
  id: string
): Promise<{ success: boolean; note?: NoteData; error?: string }> {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(id)) {
      return { success: false, error: "Invalid note ID" };
    }

    const drawing = await Drawing.findById(id);
    if (!drawing) {
      return { success: false, error: "Note not found" };
    }

    // Convert to plain object with proper serialization
    const plainDrawing = convertToPlainObject(drawing);

    return { success: true, note: plainDrawing };
  } catch (error) {
    console.error("Error fetching note:", error);
    return { success: false, error: "Failed to fetch note" };
  }
}

// Fetch all notes for a user
export async function getUserNotes(
  userId: string
): Promise<{ success: boolean; notes?: NoteData[]; error?: string }> {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(userId)) {
      return { success: false, error: "Invalid user ID" };
    }

    const drawings = await Drawing.find({
      user: new Types.ObjectId(userId),
    }).sort({ updatedAt: -1 });

    // Convert all documents to plain objects with proper serialization
    const plainDrawings = drawings.map((drawing) =>
      convertToPlainObject(drawing)
    );

    return { success: true, notes: plainDrawings };
  } catch (error) {
    console.error("Error fetching user notes:", error);
    return { success: false, error: "Failed to fetch notes" };
  }
}

// Update note (star/unstar, archive, etc.)
export async function updateNote(
  id: string,
  updates: Partial<{
    title: string;
    data: any;
    starred: boolean;
    archived: boolean;
  }>
): Promise<{ success: boolean; note?: NoteData; error?: string }> {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(id)) {
      return { success: false, error: "Invalid note ID" };
    }

    const drawing = await Drawing.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!drawing) {
      return { success: false, error: "Note not found" };
    }

    // Convert to plain object with proper serialization
    const plainDrawing = convertToPlainObject(drawing);

    return { success: true, note: plainDrawing };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, error: "Failed to update note" };
  }
}

// Delete a note
export async function deleteNote(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(id)) {
      return { success: false, error: "Invalid note ID" };
    }

    const drawing = await Drawing.findByIdAndDelete(id);

    if (!drawing) {
      return { success: false, error: "Note not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting note:", error);
    return { success: false, error: "Failed to delete note" };
  }
}
