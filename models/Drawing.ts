import mongoose, { Schema, Document, Types } from "mongoose";

export interface DrawingDocument extends Document {
  title: string;
  data: any; // excalidraw JSON data
  user: Types.ObjectId;
  starred: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DrawingSchema = new Schema<DrawingDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {
        elements: [],
        appState: { theme: "dark" },
      },
    }, // excalidraw JSON
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
DrawingSchema.index({ user: 1, archived: 1 });
DrawingSchema.index({ user: 1, starred: 1 });
DrawingSchema.index({ updatedAt: -1 });

export default mongoose.models.Drawing ||
  mongoose.model<DrawingDocument>("Drawing", DrawingSchema);
