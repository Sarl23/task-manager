"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTaskCompleted,
  deleteTask,
} from "../lib/api/task";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, done }: { id: number; done: boolean }) =>
      updateTaskCompleted(id, done),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTaskMutation.mutate({
      title,
      description,
      done: false,
    });
  };

  const handleToggleComplete = (id: number, currentStatus: boolean) => {
    updateTaskMutation.mutate({ id, done: !currentStatus });
  };

  const handleDeleteTask = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) return <div>Cargando tareas...</div>;
  if (error)
    return <div>Error al cargar tareas: {(error as Error).message}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
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
          disabled={createTaskMutation.isPending}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          {createTaskMutation.isPending ? "Agregando..." : "Agregar Tarea"}
        </button>
        {createTaskMutation.isError && (
          <div style={{ color: "red", marginTop: "10px" }}>
            Error al crear tarea: {(createTaskMutation.error as Error).message}
          </div>
        )}
      </form>
      <div>
        <h2>Tareas ({tasks?.length || 0})</h2>
        {tasks && tasks.length === 0 && (
          <p>No hay tareas. ¡Agrega una nueva!</p>
        )}
        {tasks?.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "4px",
              backgroundColor: task.done ? "#f0f0f0" : "white",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  handleToggleComplete(Number(task.id), task.done)
                }
                disabled={updateTaskMutation.isPending}
                style={{ marginTop: "5px", cursor: "pointer" }}
              />
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 5px 0",
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "#999" : "black",
                  }}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    style={{
                      margin: 0,
                      color: task.done ? "#999" : "#666",
                    }}
                  >
                    {task.description}
                  </p>
                )}
                <small style={{ color: "#999" }}>
                  Estado: {task.done ? "Completada" : "Pendiente"}
                </small>
              </div>
              <div>
                <button onClick={() => handleDeleteTask(Number(task.id))}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
