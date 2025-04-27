import { useQuery } from "@tanstack/react-query";

export interface ChartDataPoint {
  name: string;
  tasks: number;
}

// Fetch progress chart data
const fetchProgressChartData = async (): Promise<ChartDataPoint[]> => {
  try {
    const response = await fetch('/api/tasks/progress-chart');
    
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
    return result.data;
  } catch (error) {
    console.error('Fetch progress chart error:', error);
    throw error;
  }
};

export function useProgressData() {
  const {
    data: progressData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["progressChartData"],
    queryFn: fetchProgressChartData,
  });

  return {
    progressData,
    isLoading,
    error,
  };
} 