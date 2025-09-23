import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote, deleteNote, me } from "../api";

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return navigate("/");
    async function load() {
      try {
        const u = await me(token);
        setUser(u);
        const n = await getNote(token, id);
        setNote(n);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, id, navigate]);

  async function onEdit() {
    const newTitle = prompt("Edit title:", note.title);
    const newContent = prompt("Edit content:", note.content);
    if (!newTitle || !newContent) return;
    try {
      const updated = await updateNote(token, id, {
        title: newTitle,
        content: newContent,
      });
      setNote(updated);
    } catch (err) {
      setError(err.message);
    }
  }

  async function onDelete() {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(token, id);
      navigate("/notes");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div>Loading note...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate("/notes")}>← Back</button>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <div style={{ marginTop: 10 }}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete} style={{ marginLeft: 5 }}>
          Delete
        </button>
      </div>
    </div>
  );
}
