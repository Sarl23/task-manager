import {
    createTask,
    deleteTask,
    getTasks,
    updateTaskCompleted,
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

    return {
        tasks: tasksQuery.data,
        isLoading: tasksQuery.isLoading,
        error: tasksQuery.error,
        createTask: createTaskMutation.mutate,
        isCreating: createTaskMutation.isPending,
        createError: createTaskMutation.error,
        updateTask: updateTaskMutation.mutate,
        isUpdating: updateTaskMutation.isPending,
        updateError: updateTaskMutation.error,
        deleteTask: deleteTaskMutation.mutate,
        isDeleting: deleteTaskMutation.isPending,
        deleteError: deleteTaskMutation.error,
    }
}
