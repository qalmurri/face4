import { useEffect, useState } from "react";
import dataApi from "./dataApi";
import type { Note } from "./Types/Notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await dataApi.get<Note[]>("notes/");
      setNotes(res.data);
    } catch (err: any) {
      console.error("Error fetching notes:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) return setMessage("Judul tidak boleh kosong!");
    try {
      await dataApi.post("notes/", newNote);
      setNewNote({ title: "", content: "" });
      setMessage("Catatan berhasil ditambahkan ✅");
      fetchNotes();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;
    try {
      await dataApi.patch(`notes/${editingNote.id}/`, editingNote);
      setEditingNote(null);
      setMessage("Catatan berhasil diperbarui ✅");
      fetchNotes();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus catatan ini?")) return;
    try {
      await dataApi.delete(`notes/${id}/`);
      setMessage("Catatan berhasil dihapus 🗑️");
      fetchNotes();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📘 Catatan Saya</h1>

      {/* Form Tambah / Edit */}
      <form
        onSubmit={editingNote ? handleUpdate : handleAdd}
        className="bg-white shadow-md rounded-lg p-4 mb-6">
        <input
          type="text"
          placeholder="Judul catatan"
          className="border w-full p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500"
          value={editingNote ? editingNote.title : newNote.title}
          onChange={(e) =>
            editingNote
              ? setEditingNote({ ...editingNote, title: e.target.value })
              : setNewNote({ ...newNote, title: e.target.value })
          }
        />
        <textarea
          placeholder="Isi catatan..."
          className="border w-full p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={editingNote ? editingNote.content : newNote.content}
          onChange={(e) =>
            editingNote
              ? setEditingNote({ ...editingNote, content: e.target.value })
              : setNewNote({ ...newNote, content: e.target.value })
          }
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            {editingNote ? "Simpan Perubahan" : "Tambah Catatan"}
          </button>
          {editingNote && (
            <button
              type="button"
              onClick={() => setEditingNote(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Notifikasi */}
      {message && (
        <div className="mb-4 text-green-600 font-medium text-center">
          {message}
        </div>
      )}

      {/* Daftar Catatan */}
      {loading ? (
        <p className="text-center">⏳ Memuat catatan...</p>
      ) : notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition">
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-600 mb-3">{note.content}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingNote(note)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500 text-center">Belum ada catatan 😅</p>
      )}
    </div>
  );
}
