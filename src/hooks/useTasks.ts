import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskCompleted,
    updateTask,
} from "@/lib/api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTasks() {
    const queryClient = useQueryClient();
    const tasksQuery = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
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

    const editTaskMutation = useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: { title?: string; description?: string } }) =>
        updateTask(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    return {
        tasks: tasksQuery.data,
        isLoading: tasksQuery.isLoading,
        error: tasksQuery.error,
        createTask: createTaskMutation.mutate,
        isCreating: createTaskMutation.isPending,
        createError: createTaskMutation.error,
        createSuccess: createTaskMutation.isSuccess,
        updateTask: updateTaskMutation.mutate,
        isUpdating: updateTaskMutation.isPending,
        updateError: updateTaskMutation.error,
        deleteTask: deleteTaskMutation.mutate,
        isDeleting: deleteTaskMutation.isPending,
        deleteSuccess: deleteTaskMutation.isSuccess,
        deleteError: deleteTaskMutation.error,
        editTask: editTaskMutation.mutate,
        isEditing: editTaskMutation.isPending,
        editError: editTaskMutation.error,
    }
}
