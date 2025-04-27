import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTaskStats } from "@/hooks/useTaskStats";

const TaskProgressBar = () => {
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
  
  // Calculate total
  const total = taskStats.total || 1; // Prevent division by zero
  
  // Calculate percentages
  const percentages = {
    backlog: Math.round((taskStats.backlog / total) * 100),
    inProgress: Math.round((taskStats["in-progress"] / total) * 100),
    validation: Math.round((taskStats.validation / total) * 100),
    done: Math.round((taskStats.done / total) * 100),
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <CardTitle className="text-base font-medium">Task Distribution</CardTitle>
        <div className="mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Backlog</div>
              <div>{percentages.backlog}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-status-backlog" 
                style={{ width: `${percentages.backlog}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>In Progress</div>
              <div>{percentages.inProgress}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-status-progress" 
                style={{ width: `${percentages.inProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Validation</div>
              <div>{percentages.validation}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-status-validation" 
                style={{ width: `${percentages.validation}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Done</div>
              <div>{percentages.done}%</div>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div 
                className="h-full rounded-full bg-status-done" 
                style={{ width: `${percentages.done}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskProgressBar;
