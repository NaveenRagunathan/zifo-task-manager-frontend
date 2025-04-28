import { useQuery } from "@tanstack/react-query";

// Get the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface ProgressData {
  name: string;
  hours: number;
}

const fetchProgressChartData = async (): Promise<ProgressData[]> => {
  try {
    // Prepend the base URL
    const response = await fetch(`${API_BASE_URL}/api/tasks/progress-chart`);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Error fetching progress chart data';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    // Transform the data to use hours
    return result.data.map((week: any) => ({
      name: week.name,
      hours: Math.round(week.tasks * 1.5) // Temporary: converting mock task data to hours
    }));
  } catch (error) {
    console.error('Error fetching progress chart data:', error);
    throw error;
  }
};

export function useProgressData() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["progressChart"],
    queryFn: fetchProgressChartData,
  });

  return {
    progressData: data,
    isLoading,
    error,
  };
} 