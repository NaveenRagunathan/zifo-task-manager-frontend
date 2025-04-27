import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo } from "react";

interface TaskStatCardProps {
  title: string;
  count: number;
  type: "backlog" | "progress" | "validation" | "done";
  percentage?: {
    value: number;
    increase: boolean;
  };
}

const TaskStatCard = ({ title, count, type, percentage }: TaskStatCardProps) => {
  const typeStyles = useMemo(() => {
    switch (type) {
      case "backlog":
        return "bg-status-backlog/10 text-status-backlog";
      case "progress":
        return "bg-status-progress/10 text-status-progress";
      case "validation":
        return "bg-status-validation/10 text-status-validation";
      case "done":
        return "bg-status-done/10 text-status-done";
    }
  }, [type]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-5 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className={cn("text-3xl font-bold", typeStyles)}>
              {count}
            </div>
            {percentage && (
              <div className="flex items-center text-xs font-medium">
                {percentage.increase ? (
                  <>
                    <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">
                      {percentage.value}%
                    </span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
                    <span className="text-rose-500">
                      {percentage.value}%
                    </span>
                  </>
                )}
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-secondary md:flex">
            <div 
              className={cn(
                "h-7 w-7 rounded-full",
                type === "backlog" && "bg-status-backlog",
                type === "progress" && "bg-status-progress",
                type === "validation" && "bg-status-validation",
                type === "done" && "bg-status-done"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStatCard;
