"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { Button } from "@/components/ui/button";
import {
  Maximize,
  Minimize,
  Save,
  Download,
  Loader2,
  Check,
} from "lucide-react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { useParams } from "next/navigation";
import { getNote, updateNote, NoteData } from "@/action/notes";

// Dynamically import Excalidraw for client-side only
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function WorkspacePage() {
  const params = useParams();
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [initialData, setInitialData] = useState<{
    elements: any[];
    appState: any;
  }>({
    elements: [],
    appState: { theme: "dark" },
  });

  const loadNote = useCallback(async () => {
    try {
      const result = await getNote(params.id as string);
      if (result.success && result.note) {
        setNoteData(result.note);
        setInitialData({
          elements: (result.note.data?.elements as any[]) || [],
          appState: {
            theme:
              (result.note.data?.appState?.theme as "light" | "dark") || "dark",
            ...result.note.data?.appState,
          },
        });
      } else {
        console.error("Error loading note:", result.error);
        // You could show an error message or redirect to dashboard
      }
    } catch (error) {
      console.error("Error loading note:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  // Load note data
  useEffect(() => {
    if (params.id) {
      loadNote();
    } else {
      setLoading(false);
    }
  }, [params.id, loadNote]);

  // Auto-save functionality
  useEffect(() => {
    if (!excalidrawAPI || !noteData) return;

    const autoSave = async () => {
      try {
        const elements = excalidrawAPI.getSceneElements();
        const appState = excalidrawAPI.getAppState();
        const files = excalidrawAPI.getFiles();

        const updatedData = {
          elements: Array.from(elements),
          appState,
          files,
        };

        await updateNote(noteData._id, {
          data: updatedData,
        });
      } catch (error) {
        console.error("Auto-save error:", error);
      }
    };

    // Auto-save every 30 seconds
    const interval = setInterval(autoSave, 30000);

    // Save on page unload
    const handleBeforeUnload = () => {
      autoSave();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [excalidrawAPI, noteData]);

  // Save handler
  const handleSave = async () => {
    if (!excalidrawAPI || !noteData) return;

    setIsSaving(true);
    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      const updatedData = {
        elements: Array.from(elements),
        appState,
        files,
      };

      const result = await updateNote(noteData._id, {
        data: updatedData,
      });

      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 1500);
      } else {
        console.error("Error saving note:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Export handler (downloads .excalidraw file)
  const handleExport = async () => {
    if (!excalidrawAPI) return;
    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const files = excalidrawAPI.getFiles();
    const sceneData = {
      type: "excalidraw",
      version: 2,
      source: "excalidraw-draw",
      elements: Array.from(elements),
      appState,
      files,
    };
    const blob = new Blob([JSON.stringify(sceneData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${noteData?.title || "drawing"}.excalidraw`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#10131A]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#10131A]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 px-6 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white">
            {noteData?.title || "Untitled"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={isSaving}
            onClick={handleSave}
            className={saveSuccess ? "text-green-400" : ""}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saveSuccess ? "Saved!" : "Save"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {/* Excalidraw Canvas */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="h-full w-full rounded-lg overflow-hidden border border-white/10">
          <Excalidraw
            excalidrawAPI={setExcalidrawAPI}
            theme="dark"
            viewModeEnabled={false}
            zenModeEnabled={true}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}
