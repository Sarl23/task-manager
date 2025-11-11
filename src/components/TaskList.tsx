"use client";

import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
  onDeleteSuccess?: boolean;
  onEdit: (data: {
    id: number;
    updates: { title?: string; description?: string };
  }) => void;
  isEditing?: boolean;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  isUpdating,
  onEdit,
  isEditing,
}: TaskListProps) {
  return (
    <>
      <h2 style={{ marginBottom: "1rem" }}>Tareas ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p style={{ color: "#525252" }}>No hay tareas. ¡Agrega una nueva!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            isUpdating={isUpdating}
            onEdit={onEdit}
            isEditing={isEditing}
          />
        ))
      )}
    </>
  );
}
