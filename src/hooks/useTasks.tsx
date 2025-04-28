import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// API Functions for task operations
const fetchTasks = async (): Promise<Task[]> => {
  try {
    // Prepend the base URL
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error fetching tasks';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the text as is
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Fetch tasks error:', error);
    throw error;
  }
};

const createTaskApi = async (task: Omit<Task, "id" | "created_at">): Promise<Task> => {
  try {
    console.log("Creating task with data:", task);
    // Prepend the base URL
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error creating task';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the text as is
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Create task error:', error);
    throw error;
  }
};

const updateTaskApi = async ({ id, ...task }: Partial<Task> & { id: string }): Promise<Task> => {
  try {
    // Prepend the base URL
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error updating task';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the text as is
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Update task error:', error);
    throw error;
  }
};

const deleteTaskApi = async (id: string): Promise<void> => {
  try {
    // Prepend the base URL
    const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error deleting task';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the text as is
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
};

export function useTasks() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const createTask = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create task",
      });
      console.error("Error creating task:", error);
    },
  });

  const updateTask = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update task",
      });
      console.error("Error updating task:", error);
    },
  });

  const deleteTask = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete task",
      });
      console.error("Error deleting task:", error);
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };
}
