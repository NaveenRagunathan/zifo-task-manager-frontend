import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTaskStats } from "@/hooks/useTaskStats";
import { TaskStats } from "@/types/task";

interface TaskProgressBarProps {
  taskStats: TaskStats;
}

export const TaskProgressBar = ({ taskStats }: TaskProgressBarProps) => {
  const total = taskStats.total || 1;

  const percentages = {
    'not-started': Math.round((taskStats['not-started'] / total) * 100),
    'in-progress': Math.round((taskStats['in-progress'] / total) * 100),
    'completed': Math.round((taskStats.completed / total) * 100),
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span>Not Started</span>
          <span>{percentages['not-started']}%</span>
        </div>
        <div className="h-2 bg-[#7C3AED]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#7C3AED]" 
            style={{ width: `${percentages['not-started']}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span>In Progress</span>
          <span>{percentages['in-progress']}%</span>
        </div>
        <div className="h-2 bg-[#3B82F6]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3B82F6]" 
            style={{ width: `${percentages['in-progress']}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span>Completed</span>
          <span>{percentages.completed}%</span>
        </div>
        <div className="h-2 bg-[#10B981]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#10B981]" 
            style={{ width: `${percentages.completed}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const TaskProgressBarContainer = () => {
  const { taskStats, isLoading, error } = useTaskStats();
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="text-base font-medium">Task Distribution</CardTitle>
          <div className="mt-4">Loading task distribution data...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="text-base font-medium">Task Distribution</CardTitle>
          <div className="mt-4 text-destructive">Error loading task distribution</div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <CardTitle className="text-base font-medium">Task Distribution</CardTitle>
        <div className="mt-4">
          <TaskProgressBar taskStats={taskStats} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskProgressBarContainer;
