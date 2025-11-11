"use client";

import { useState, FormEvent } from "react";

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    done: boolean;
  }) => void;
  isLoading: boolean;
  error: Error | null;
}

export function TaskForm({ onSubmit, isLoading, error }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, done: false });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            minHeight: "80px",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        {isLoading ? "Agregando..." : "Agregar Tarea"}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          Error al crear tarea: {error.message}
        </div>
      )}
    </form>
  );
}
