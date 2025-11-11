"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import {
  Checkbox,
  Button,
  Tile,
  Modal,
  TextInput,
  TextArea,
  Tag,
} from "@carbon/react";
import { TrashCan, Edit } from "@carbon/react/icons";

interface TaskItemProps {
  task: Task;
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

export function TaskItem({
  task,
  onToggle,
  onDelete,
  isUpdating,
  onEdit,
  isEditing,
}: TaskItemProps) {
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );

  const handleDeleteTask = (id: number) => {
    onDelete(id);
    setTimeout(() => setShowDeleteSuccess(false), 3000);
  };

  const validationDeleteSuccess = (taskStatus: boolean, id: number) => {
    if (taskStatus) {
      handleDeleteTask(id);
    } else {
      setShowDeleteSuccess(true);
    }
  };

  const handleEditTask = () => {
    onEdit({
      id: Number(task.id),
      updates: {
        title: editTitle,
        description: editDescription,
      },
    });
    setShowEditModal(false);
  };

  const openEditModal = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setShowEditModal(true);
  };

  return (
    <Tile style={{ marginBottom: "1rem", padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <div style={{ paddingTop: "2px" }}>
          <Checkbox
            id={`checkbox-task-${task.id}`}
            data-testid={`checkbox-task-${task.id}`}
            labelText=""
            checked={task.done}
            onChange={() => onToggle(Number(task.id), task.done)}
            disabled={isUpdating}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: "0 0 0.25rem 0",
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#8d8d8d" : "inherit",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              style={{
                margin: "0 0 0.5rem 0",
                color: task.done ? "#8d8d8d" : "#525252",
                fontSize: "0.875rem",
                lineHeight: "1.4",
              }}
            >
              {task.description}
            </p>
          )}
          <Tag type={task.done ? "green" : "red"}>
            {task.done ? "Completada" : "Pendiente"}
          </Tag>
        </div>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <Button
            size="sm"
            kind="danger--ghost"
            renderIcon={TrashCan}
            iconDescription="Eliminar tarea"
            hasIconOnly
            onClick={() => validationDeleteSuccess(task.done, Number(task.id))}
          />
          <Button
            size="sm"
            kind="ghost"
            renderIcon={Edit}
            iconDescription="Editar tarea"
            hasIconOnly
            onClick={() => openEditModal()}
          />
        </div>
      </div>
      <Modal
        open={showDeleteSuccess}
        danger
        modalHeading="Desea eliminar la tarea?"
        primaryButtonText="Eliminar"
        onRequestClose={() => setShowDeleteSuccess(false)}
        onRequestSubmit={() => {
          handleDeleteTask(Number(task.id));
        }}
      >
        <p>
          La tarea aun esta en estado pendiente , Si elminas la tarea, no podrás
          recuperarla.
        </p>
      </Modal>

      <Modal
        open={showEditModal}
        modalHeading="Editar tarea"
        primaryButtonText="Guardar"
        secondaryButtonText="Cancelar"
        onRequestClose={() => setShowEditModal(false)}
        onRequestSubmit={handleEditTask}
        primaryButtonDisabled={!editTitle.trim() || isEditing}
      >
        <div style={{ marginBottom: "1rem" }}>
          <TextInput
            id="edit-title"
            labelText="Título"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <TextArea
            id="edit-description"
            labelText="Descripción"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={4}
          />
        </div>
      </Modal>
    </Tile>
  );
}
