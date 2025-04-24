
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  Hourglass, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

interface TaskStatCardProps {
  title: string;
  count: number;
  type: "backlog" | "progress" | "validation" | "done";
  percentage?: {
    value: number;
    increase: boolean;
  };
}

const icons = {
  backlog: Hourglass,
  progress: Clock,
  validation: AlertCircle,
  done: CheckCircle,
};

const colors = {
  backlog: "bg-status-backlog/10 text-status-backlog",
  progress: "bg-status-progress/10 text-status-progress",
  validation: "bg-status-validation/10 text-status-validation", 
  done: "bg-status-done/10 text-status-done",
};

const TaskStatCard = ({ title, count, type, percentage }: TaskStatCardProps) => {
  const Icon = icons[type];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-md", colors[type])}>
            <Icon size={18} />
          </div>
          
          {percentage && (
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              percentage.increase 
                ? "bg-status-done/10 text-status-done" 
                : "bg-status-backlog/10 text-status-backlog"
            )}>
              {percentage.increase ? "+" : "-"}{percentage.value}%
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <h3 className="text-2xl font-semibold">{count}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStatCard;
