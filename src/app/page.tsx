"use client";

import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    isCreating,
    createError,
    updateTask,
    isUpdating,
    deleteTask,
  } = useTasks();

  if (isLoading) return <div>Cargando tareas...</div>;
  if (error)
    return <div>Error al cargar tareas: {(error as Error).message}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <TaskForm
        onSubmit={createTask}
        isLoading={isCreating}
        error={createError as Error | null}
      />

      <TaskList
        tasks={tasks || []}
        onToggle={(id: number, currentStatus: boolean) =>
          updateTask({ id, done: !currentStatus })
        }
        onDelete={deleteTask}
        isUpdating={isUpdating}
      />
    </div>
  );
}
