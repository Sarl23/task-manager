"use client";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { Loading } from "@carbon/react";

export default function Home() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    isCreating,
    createSuccess,
    createError,
    updateTask,
    isUpdating,
    deleteTask,
    deleteSuccess,
    editTask,
    isEditing,
  } = useTasks();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "3rem",
          margin: "3rem",
        }}
      >
        <Loading description="Cargando tareas..." withOverlay={false} />
      </div>
    );
  if (error)
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        Error al cargar tareas: {(error as Error).message}
      </div>
    );

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "5rem auto",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Mis Tareas</h1>
      <TaskForm
        onSubmit={createTask}
        isLoading={isCreating}
        onSuccess={createSuccess}
        error={createError as Error | null}
      />

      <TaskList
        tasks={tasks || []}
        onToggle={(id: number, currentStatus: boolean) =>
          updateTask({ id, done: !currentStatus })
        }
        onDelete={deleteTask}
        onDeleteSuccess={deleteSuccess}
        isUpdating={isUpdating}
        onEdit={editTask}
        isEditing={isEditing}
      />
    </div>
  );
}
