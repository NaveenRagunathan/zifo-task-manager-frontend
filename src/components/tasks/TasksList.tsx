import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useTasks } from "@/hooks/useTasks";
import { cn } from "@/lib/utils";
import { Task, TaskStatus } from "@/types/task";
import { Calendar, MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const priorityStyles = {
  urgent: "bg-priority-urgent/10 text-priority-urgent",
  high: "bg-priority-high/10 text-priority-high",
  normal: "bg-priority-normal/10 text-priority-normal",
  low: "bg-priority-low/10 text-priority-low",
};

const statusStyles = {
  "not-started": "bg-status-not-started/10 text-status-not-started border-status-not-started",
  "in-progress": "bg-status-progress/10 text-status-progress border-status-progress",
  "completed": "bg-status-completed/10 text-status-completed border-status-completed",
};

interface TasksListProps {
  tasks: Task[];
  showFilters?: boolean;
}

const TasksList = ({ tasks: initialTasks, showFilters = true }: TasksListProps) => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const { deleteTask } = useTasks();
  
  const filteredTasks = useMemo(() => {
    if (statusFilter === "all") return initialTasks;
    return initialTasks.filter(task => task.status === statusFilter);
  }, [statusFilter, initialTasks]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };
  
  const isOverdue = (dateString: string | null) => {
    if (!dateString) return false;
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      {showFilters && (
        <div className="p-4 border-b flex justify-between items-center">
          <div className="font-semibold">Tasks</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline" 
              size="sm" 
              onClick={() => setStatusFilter("all")}
              className={cn(
                "text-sm",
                statusFilter === "all" && "bg-secondary"
              )}
            >
              All
            </Button>
            <Button
              variant="outline" 
              size="sm" 
              onClick={() => setStatusFilter("not-started")}
              className={cn(
                "text-sm",
                statusFilter === "not-started" && "bg-secondary"
              )}
            >
              Not Started
            </Button>
            <Button
              variant="outline" 
              size="sm" 
              onClick={() => setStatusFilter("in-progress")}
              className={cn(
                "text-sm",
                statusFilter === "in-progress" && "bg-secondary"
              )}
            >
              In Progress
            </Button>
            <Button
              variant="outline" 
              size="sm" 
              onClick={() => setStatusFilter("completed")}
              className={cn(
                "text-sm",
                statusFilter === "completed" && "bg-secondary"
              )}
            >
              Completed
            </Button>
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="w-[120px]">Due Date</TableHead>
            <TableHead className="w-[120px]">Category</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-mono text-sm">{task.id.slice(0, 8)}</TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn("font-normal border-l-4 pl-2", statusStyles[task.status])}
                >
                  {task.status === "not-started" ? "Not Started" :
                   task.status === "in-progress" ? "In Progress" :
                   "Completed"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn("font-normal", priorityStyles[task.priority])}
                >
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span 
                    className={cn(
                      isOverdue(task.end_time) && task.status !== "completed" && "text-destructive"
                    )}
                  >
                    {task.end_time ? formatDate(task.end_time) : "No due date"}
                  </span>
                </div>
              </TableCell>
              <TableCell>{task.category || "Uncategorized"}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      deleteTask.mutate(task.id);
                    }
                  }}
                >
                  <MoreHorizontal size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TasksList;
