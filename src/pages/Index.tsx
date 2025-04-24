
import { 
  Layers, 
  MessageSquare, 
  Calendar, 
  Users 
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import TaskStatCard from "@/components/dashboard/TaskStatCard";
import TaskProgressBar from "@/components/dashboard/TaskProgressBar";
import ProgressChart from "@/components/dashboard/ProgressChart";
import TasksList from "@/components/tasks/TasksList";
import MetricCard from "@/components/dashboard/MetricCard";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TaskStatCard 
              title="Backlog" 
              count={24} 
              type="backlog" 
              percentage={{ value: 12.2, increase: true }}
            />
            <TaskStatCard 
              title="In Progress" 
              count={4} 
              type="progress" 
            />
            <TaskStatCard 
              title="Validation" 
              count={7} 
              type="validation" 
              percentage={{ value: 2.5, increase: true }}
            />
            <TaskStatCard 
              title="Completed" 
              count={13} 
              type="done" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TaskProgressBar />
            </div>
            <div>
              <MetricCard 
                title="Total Tasks" 
                value={109} 
                icon={<Layers size={18} />} 
              />
              <div className="h-4" />
              <MetricCard 
                title="Comments" 
                value={27} 
                icon={<MessageSquare size={18} />} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <ProgressChart />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
