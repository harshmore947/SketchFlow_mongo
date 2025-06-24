"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote,
  NoteData,
} from "@/action/notes";

const tabs = [
  { key: "all", label: "All Notes" },
  { key: "starred", label: "Starred" },
  { key: "archived", label: "Archived" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingNote, setCreatingNote] = useState(false);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const fetchNotes = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      const result = await getUserNotes(session.user.id);
      if (result.success && result.notes) {
        setNotes(result.notes);
      } else {
        console.error("Error fetching notes:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  // Fetch user notes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchNotes();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, fetchNotes, router]);

  const handleCreateNote = async () => {
    if (!session?.user?.id) return;

    setCreatingNote(true);
    try {
      const result = await createNote({
        title: "Untitled",
        data: {
          elements: [],
          appState: { theme: "dark" },
        },
        userId: session.user.id,
      });

      if (result.success && result.note) {
        router.push(`/workspace/${result.note._id}`);
      } else {
        console.error("Error creating note:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setCreatingNote(false);
    }
  };

  const handleStarNote = async (noteId: string, starred: boolean) => {
    try {
      const result = await updateNote(noteId, { starred });
      if (result.success) {
        setNotes(
          notes.map((note) =>
            note._id === noteId ? { ...note, starred } : note
          )
        );
      } else {
        console.error("Error updating note:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleArchiveNote = async (noteId: string, archived: boolean) => {
    try {
      const result = await updateNote(noteId, { archived });
      if (result.success) {
        setNotes(
          notes.map((note) =>
            note._id === noteId ? { ...note, archived } : note
          )
        );
      } else {
        console.error("Error archiving note:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const result = await deleteNote(noteId);
      if (result.success) {
        setNotes(notes.filter((note) => note._id !== noteId));
      } else {
        console.error("Error deleting note:", result.error);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleStartEditTitle = (noteId: string, currentTitle: string) => {
    setEditingTitle(noteId);
    setEditingValue(currentTitle);
  };

  const handleSaveTitle = async (noteId: string) => {
    if (!editingValue.trim()) {
      setEditingTitle(null);
      return;
    }

    try {
      const result = await updateNote(noteId, { title: editingValue.trim() });
      if (result.success) {
        setNotes(
          notes.map((note) =>
            note._id === noteId ? { ...note, title: editingValue.trim() } : note
          )
        );
      } else {
        console.error("Error updating title:", result.error);
      }
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setEditingTitle(null);
      setEditingValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingTitle(null);
    setEditingValue("");
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const filteredNotes = notes.filter((note) => {
    // Hide archived notes from All Notes and Starred tabs
    if (activeTab === "all" && note.archived) return false;
    if (activeTab === "starred" && (note.archived || !note.starred))
      return false;
    if (activeTab === "archived" && !note.archived) return false;

    // Apply search filter
    if (search && !note.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const formatTime = (date: string | Date) => {
    const now = new Date();
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const diff = now.getTime() - dateObj.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return dateObj.toLocaleDateString();
  };

  return (
    <div className="rounded-2xl mx-4 my-5 flex min-h-screen bg-[#F8FAFC] text-[#1E293B] dark:bg-[#10131A] dark:text-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 rounded-l-2xl  bg-white border-r border-[#E5E7EB] flex flex-col justify-between py-6 px-4 dark:bg-[#181A20] dark:border-[#23262F]">
        <div>
          {/* User Info */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#E0E7EF] flex items-center justify-center text-2xl font-bold text-[#3B82F6] dark:bg-[#23262F] dark:text-[#60A5FA]">
              <span>{session.user.name?.[0]?.toUpperCase() || "U"}</span>
            </div>
            <div>
              <div className="font-semibold text-lg text-[#2563EB] dark:text-[#60A5FA]">
                {session.user.name || "User"}
              </div>
              <div className="text-xs text-[#64748B] dark:text-[#A3A9B7]">
                {session.user.email}
              </div>
            </div>
          </div>

          {/* New Note Button */}
          <Button
            onClick={handleCreateNote}
            disabled={creatingNote}
            className="w-full mb-6 flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] dark:text-[#F8FAFC]"
          >
            {creatingNote ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
            {creatingNote ? "Creating..." : "New Note"}
          </Button>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${
                activeTab === "all"
                  ? "bg-[#3B82F6] text-white dark:bg-[#2563EB]"
                  : "text-[#1E293B] hover:bg-[#E0E7EF] dark:text-[#F8FAFC] dark:hover:bg-[#23262F]"
              }`}
            >
              <span>All Notes</span>
            </button>
            <button
              onClick={() => setActiveTab("starred")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${
                activeTab === "starred"
                  ? "bg-[#3B82F6] text-white dark:bg-[#2563EB]"
                  : "text-[#1E293B] hover:bg-[#E0E7EF] dark:text-[#F8FAFC] dark:hover:bg-[#23262F]"
              }`}
            >
              <span>Starred</span>
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium ${
                activeTab === "archived"
                  ? "bg-[#3B82F6] text-white dark:bg-[#2563EB]"
                  : "text-[#1E293B] hover:bg-[#E0E7EF] dark:text-[#F8FAFC] dark:hover:bg-[#23262F]"
              }`}
            >
              <span>Archived</span>
            </button>
          </nav>
        </div>

        {/* Settings & Sign Out */}
        <div className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#E0E7EF] transition-colors text-[#1E293B] dark:hover:bg-[#23262F] dark:text-[#F8FAFC]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m0-8v2m-6 4a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            Settings
          </Link>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 justify-start text-[#1E293B] hover:bg-[#E0E7EF] dark:text-[#F8FAFC] dark:hover:bg-[#23262F]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2563EB] mb-1 dark:text-[#60A5FA]">
              My Notes
            </h1>
            <p className="text-[#64748B] dark:text-[#A3A9B7]">
              Create and manage your drawings
            </p>
          </div>
          <Button
            onClick={handleCreateNote}
            disabled={creatingNote}
            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] dark:text-[#F8FAFC]"
          >
            {creatingNote ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
            {creatingNote ? "Creating..." : "New Note"}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-md font-medium border transition-colors ${
                activeTab === tab.key
                  ? "bg-[#3B82F6] text-white border-[#2563EB] dark:bg-[#2563EB] dark:text-[#F8FAFC] dark:border-[#3B82F6]"
                  : "bg-white text-[#1E293B] border-[#E5E7EB] hover:bg-[#E0E7EF] dark:bg-[#181A20] dark:text-[#F8FAFC] dark:border-[#23262F] dark:hover:bg-[#23262F]"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & View Toggle */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-[#E5E7EB] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B] placeholder-[#64748B] dark:bg-[#181A20] dark:border-[#23262F] dark:text-[#F8FAFC] dark:placeholder-[#A3A9B7] dark:focus:ring-[#3B82F6]"
          />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 text-[#2563EB] hover:bg-[#E0E7EF] dark:text-[#60A5FA] dark:hover:bg-[#23262F]"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <rect
                width="8"
                height="8"
                x="3"
                y="3"
                rx="2"
                fill="currentColor"
              />
              <rect
                width="8"
                height="8"
                x="9"
                y="9"
                rx="2"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#2563EB] hover:bg-[#E0E7EF] dark:text-[#60A5FA] dark:hover:bg-[#23262F]"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <rect
                width="14"
                height="4"
                x="3"
                y="3"
                rx="2"
                fill="currentColor"
              />
              <rect
                width="14"
                height="4"
                x="3"
                y="13"
                rx="2"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              {notes.length === 0 ? (
                // Empty state with SVG
                <div className="flex flex-col items-center gap-4">
                  <svg
                    className="w-32 h-32 text-[#64748B] dark:text-[#A3A9B7]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-[#1E293B] dark:text-[#F8FAFC] mb-2">
                      No notes yet
                    </h3>
                    <p className="text-[#64748B] dark:text-[#A3A9B7] mb-4">
                      Create your first drawing to get started
                    </p>
                    <Button
                      onClick={handleCreateNote}
                      disabled={creatingNote}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]"
                    >
                      {creatingNote ? "Creating..." : "Create Your First Note"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-[#64748B] dark:text-[#A3A9B7]">
                  No notes found matching your search.
                </div>
              )}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm flex flex-col gap-2 relative dark:bg-[#181A20] dark:border-[#23262F] hover:shadow-md transition-shadow"
              >
                {/* Action buttons - always visible */}
                <div className="flex justify-between items-start mb-2">
                  {/* Archived indicator */}
                  {note.archived && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      Archived
                    </span>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {note.archived ? (
                      // Archived note actions: Unarchive and Delete
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveNote(note._id, false);
                          }}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Unarchive
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note._id);
                          }}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      // Non-archived note actions: Star and Archive
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStarNote(note._id, !note.starred);
                          }}
                          className={
                            note.starred
                              ? "text-yellow-600 dark:text-yellow-400"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        >
                          {note.starred ? "★ Starred" : "☆ Star"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchiveNote(note._id, true);
                          }}
                          className="text-gray-600 hover:text-gray-700 dark:text-gray-400"
                        >
                          Archive
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Title - clickable to edit */}
                <div className="text-lg font-semibold mb-1 text-[#2563EB] dark:text-[#60A5FA]">
                  {editingTitle === note._id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={() => handleSaveTitle(note._id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveTitle(note._id);
                        } else if (e.key === "Escape") {
                          handleCancelEdit();
                        }
                      }}
                      autoFocus
                      className="w-full px-2 py-1 rounded border border-[#3B82F6] bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-[#1E293B] dark:bg-[#181A20] dark:border-[#3B82F6] dark:text-[#F8FAFC]"
                    />
                  ) : (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEditTitle(note._id, note.title);
                      }}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 px-2 py-1 rounded -mx-2 transition-colors"
                      title="Click to edit title"
                    >
                      {note.title}
                    </div>
                  )}
                </div>

                {/* Note info */}
                <div className="text-sm text-[#64748B] mb-2 dark:text-[#A3A9B7]">
                  {note.data?.elements?.length || 0} elements
                </div>
                <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#A3A9B7]">
                  <span>
                    <svg
                      className="inline w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 5h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatTime(note.updatedAt)}
                  </span>
                </div>

                {/* Open note button */}
                <Button
                  onClick={() => router.push(`/workspace/${note._id}`)}
                  className="w-full mt-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white dark:bg-[#2563EB] dark:hover:bg-[#3B82F6]"
                >
                  Open Note
                </Button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
