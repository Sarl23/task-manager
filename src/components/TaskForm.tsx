"use client";

import { useState, FormEvent } from "react";
import { Button, TextInput, TextArea, InlineNotification } from "@carbon/react";

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    done: boolean;
  }) => void;
  isLoading: boolean;
  error: Error | null;
  onSuccess?: boolean;
}

export function TaskForm({
  onSubmit,
  isLoading,
  error,
  onSuccess,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, done: false });
    setTitle("");
    setDescription("");
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <TextInput
            id="task-title"
            type="text"
            labelText="Titulo de la tarea"
            placeholder="Ingrese el titulo de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <TextArea
            id="task-description"
            labelText="Descripción de la tarea"
            placeholder="(opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "80px",
            }}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Agregando..." : "Agregar Tarea"}
        </Button>
        {error && (
          <div style={{ marginTop: "10px" }}>
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={`Error al crear la tarea: ${error.message}`}
              lowContrast
            />
          </div>
        )}
      </form>
      {onSuccess && showSuccess && (
        <div style={{ marginBottom: "1rem" }}>
          <InlineNotification
            kind="success"
            title="¡Éxito!"
            subtitle="Tarea creada correctamente"
            lowContrast
            onClose={() => setShowSuccess(false)}
          />
        </div>
      )}
    </>
  );
}
