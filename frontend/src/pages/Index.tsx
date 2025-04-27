import ProgressChart from "@/components/charts/ProgressChart";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TasksList from "@/components/tasks/TasksList";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { useTaskStats } from "@/hooks/useTaskStats";
import { Link } from "react-router-dom";

const Index = () => {
  const { tasks, isLoading } = useTasks();
  const { taskStats } = useTaskStats();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tasks Report</h1>
            <div className="flex gap-4">
              <Button variant="outline">Share</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Not Started</h3>
              <div className="text-3xl font-bold text-[#7C3AED]">{taskStats["not-started"]}</div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">In Progress</h3>
              <div className="text-3xl font-bold text-[#3B82F6]">{taskStats["in-progress"]}</div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Completed</h3>
              <div className="text-3xl font-bold text-[#10B981]">{taskStats["completed"]}</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Not Started</span>
                  <span>{Math.round((taskStats["not-started"] / (tasks?.length || 1)) * 100)}%</span>
                </div>
                <div className="h-2 bg-[#7C3AED]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#7C3AED]" 
                    style={{ width: `${(taskStats["not-started"] / (tasks?.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>In Progress</span>
                  <span>{Math.round((taskStats["in-progress"] / (tasks?.length || 1)) * 100)}%</span>
                </div>
                <div className="h-2 bg-[#3B82F6]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3B82F6]" 
                    style={{ width: `${(taskStats["in-progress"] / (tasks?.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Completed</span>
                  <span>{Math.round((taskStats["completed"] / (tasks?.length || 1)) * 100)}%</span>
                </div>
                <div className="h-2 bg-[#10B981]/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#10B981]" 
                    style={{ width: `${(taskStats["completed"] / (tasks?.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
            <div className="rounded-lg border p-4">
              <ProgressChart />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Tasks</h2>
              <Link to="/tasks/not-started">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <TasksList tasks={tasks?.slice(0, 5) || []} showFilters={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
