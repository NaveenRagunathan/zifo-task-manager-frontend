import { useQuery } from "@tanstack/react-query";

interface TaskStats {
  "not-started": number;
  "in-progress": number;
  "completed": number;
  total: number;
}

export interface PriorityStats {
  urgent: number;
  high: number;
  normal: number;
  low: number;
}

// Fetch task statistics by status
const fetchTaskStats = async (): Promise<TaskStats> => {
  try {
    const response = await fetch('/api/tasks/stats');
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error fetching task statistics';
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
    console.error('Fetch task stats error:', error);
    throw error;
  }
};

// Fetch task statistics by priority
const fetchPriorityStats = async (): Promise<PriorityStats> => {
  try {
    const response = await fetch('/api/tasks/priority-stats');
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error fetching priority statistics';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Fetch priority stats error:', error);
    throw error;
  }
};

export function useTaskStats() {
  const {
    data: taskStats = {
      "not-started": 0,
      "in-progress": 0,
      "completed": 0,
      total: 0
    },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["taskStats"],
    queryFn: fetchTaskStats,
  });

  const {
    data: priorityStats = { urgent: 0, high: 0, normal: 0, low: 0 },
    isLoading: isPriorityStatsLoading,
    error: priorityStatsError,
  } = useQuery({
    queryKey: ["priorityStats"],
    queryFn: fetchPriorityStats,
  });

  return {
    taskStats,
    priorityStats,
    isLoading: isLoading || isPriorityStatsLoading,
    error: error || priorityStatsError,
  };
} 