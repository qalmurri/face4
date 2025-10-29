import { useEffect, useState } from "react";
import api from "../../../../../Services/APIs/Data";
import type { Note } from "./Types/Notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadNotes() {
    try {
      setLoading(true);
      const res = await api.get("notes/");
      setNotes(res.data);
    } catch (err: any) {
      console.error("Error loading notes:", err);
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">My Notes</h1>

        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h2>
                <p className="text-gray-600 mt-2 whitespace-pre-line">
                  {note.content}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
