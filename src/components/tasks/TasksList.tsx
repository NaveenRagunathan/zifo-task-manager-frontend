
import { useMemo, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MessageSquare, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskStatus = "backlog" | "in-progress" | "validation" | "done";
type TaskPriority = "urgent" | "high" | "normal" | "low";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  comments: number;
  assignees: string[];
}

const priorityStyles = {
  urgent: "bg-priority-urgent/10 text-priority-urgent",
  high: "bg-priority-high/10 text-priority-high",
  normal: "bg-priority-normal/10 text-priority-normal",
  low: "bg-priority-low/10 text-priority-low",
};

const statusStyles = {
  backlog: "bg-status-backlog/10 text-status-backlog border-status-backlog",
  "in-progress": "bg-status-progress/10 text-status-progress border-status-progress",
  validation: "bg-status-validation/10 text-status-validation border-status-validation",
  done: "bg-status-done/10 text-status-done border-status-done",
};

const TASKS: Task[] = [
  {
    id: "TASK-1234",
    title: "Update landing page design",
    status: "in-progress",
    priority: "high",
    dueDate: "2025-04-28",
    comments: 5,
    assignees: ["AL", "BM"],
  },
  {
    id: "TASK-1235",
    title: "Fix authentication bug",
    status: "backlog",
    priority: "urgent",
    dueDate: "2025-04-25",
    comments: 3,
    assignees: ["CL"],
  },
  {
    id: "TASK-1236",
    title: "Create user onboarding flow",
    status: "validation",
    priority: "normal",
    dueDate: "2025-05-02",
    comments: 8,
    assignees: ["DK", "EF", "GM"],
  },
  {
    id: "TASK-1237",
    title: "Improve API response time",
    status: "done",
    priority: "high",
    dueDate: "2025-04-20",
    comments: 2,
    assignees: ["AL"],
  },
  {
    id: "TASK-1238",
    title: "Write API documentation",
    status: "backlog",
    priority: "low",
    dueDate: "2025-05-10",
    comments: 0,
    assignees: ["BM", "CL"],
  },
  {
    id: "TASK-1239",
    title: "Implement dark mode",
    status: "in-progress",
    priority: "normal",
    dueDate: "2025-04-30",
    comments: 4,
    assignees: ["DK"],
  },
  {
    id: "TASK-1240",
    title: "Refactor backend services",
    status: "backlog",
    priority: "high",
    dueDate: "2025-05-15",
    comments: 7,
    assignees: ["EF"],
  },
  {
    id: "TASK-1241",
    title: "Update privacy policy",
    status: "validation",
    priority: "urgent",
    dueDate: "2025-04-26",
    comments: 1,
    assignees: ["GM", "AL"],
  },
];

const TasksList = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  
  const filteredTasks = useMemo(() => {
    if (statusFilter === "all") return TASKS;
    return TASKS.filter(task => task.status === statusFilter);
  }, [statusFilter]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };
  
  const isOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };
  
  return (
    <div className="rounded-md border">
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
            onClick={() => setStatusFilter("backlog")}
            className={cn(
              "text-sm",
              statusFilter === "backlog" && "bg-secondary"
            )}
          >
            Backlog
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
            onClick={() => setStatusFilter("validation")}
            className={cn(
              "text-sm",
              statusFilter === "validation" && "bg-secondary"
            )}
          >
            Validation
          </Button>
          <Button
            variant="outline" 
            size="sm" 
            onClick={() => setStatusFilter("done")}
            className={cn(
              "text-sm",
              statusFilter === "done" && "bg-secondary"
            )}
          >
            Done
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Task</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="w-[120px]">Due Date</TableHead>
            <TableHead className="w-[80px] text-center">Comments</TableHead>
            <TableHead className="w-[120px]">Assignees</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-mono text-sm">{task.id}</TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn("font-normal border-l-4 pl-2", statusStyles[task.status])}
                >
                  {task.status.replace("-", " ")}
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
                      isOverdue(task.dueDate) && task.status !== "done" && "text-destructive"
                    )}
                  >
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <MessageSquare size={14} className="text-muted-foreground" />
                  <span>{task.comments}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {task.assignees.map((assignee, index) => (
                    <Avatar key={index} className="h-7 w-7 border-2 border-background">
                      <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-xs font-medium">
                        {assignee}
                      </div>
                    </Avatar>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
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
