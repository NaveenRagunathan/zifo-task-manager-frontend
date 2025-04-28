import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Calendar = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Calendar</h1>
          <div className="bg-card rounded-lg p-6">
            <p>Calendar view coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 