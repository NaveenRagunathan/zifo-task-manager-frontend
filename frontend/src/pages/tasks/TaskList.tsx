import TasksList from "@/components/tasks/TasksList";
import { useTasks } from "@/hooks/useTasks";
import { useParams } from "react-router-dom";

const TaskList = () => {
  const { status } = useParams();
  const { tasks, isLoading } = useTasks();

  const filteredTasks = tasks?.filter(task => 
    status === "in-progress" ? task.status === "in-progress" :
    status === "done" ? task.status === "done" :
    task.status === "not-started"
  ) || [];

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  const statusTitle = status?.split("-").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ") || "Not Started";

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">{statusTitle} Tasks</h1>
      <TasksList tasks={filteredTasks} showFilters={false} />
    </>
  );
};

export default TaskList; 