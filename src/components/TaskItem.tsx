"use client";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  isUpdating,
}: TaskItemProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "4px",
        backgroundColor: task.done ? "#f0f0f0" : "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(Number(task.id), task.done)}
          disabled={isUpdating}
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
            <p style={{ margin: 0, color: task.done ? "#999" : "#666" }}>
              {task.description}
            </p>
          )}
          <small style={{ color: "#999" }}>
            Estado: {task.done ? "Completada" : "Pendiente"}
          </small>
        </div>
        <button onClick={() => onDelete(Number(task.id))}>Eliminar</button>
      </div>
    </div>
  );
}
