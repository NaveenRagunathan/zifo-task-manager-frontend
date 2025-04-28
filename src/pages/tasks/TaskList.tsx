import TasksList from "@/components/tasks/TasksList";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus } from "@/types/task";
import { useParams } from "react-router-dom";

const TaskList = () => {
  const { status } = useParams<{ status: TaskStatus }>();
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredTasks = tasks?.filter(task => 
    status ? task.status === status : true
  ) || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {status ? `${status.charAt(0).toUpperCase() + status.slice(1)} Tasks` : 'All Tasks'}
      </h1>
      <TasksList tasks={filteredTasks} />
    </div>
  );
};

export default TaskList; 