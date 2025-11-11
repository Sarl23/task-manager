"use client";

import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  isUpdating,
}: TaskListProps) {
  return (
    <div>
      <h2>Tareas ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas. ¡Agrega una nueva!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            isUpdating={isUpdating}
          />
        ))
      )}
    </div>
  );
}
