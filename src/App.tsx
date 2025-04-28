import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Index from "./pages/Index";
import MetricsLayout from "./pages/metrics/MetricsLayout";
import MetricsPage from "./pages/metrics/MetricsPage";
import NotFound from "./pages/NotFound";
import TaskList from "./pages/tasks/TaskList";
import TasksLayout from "./pages/tasks/TasksLayout";
import ToolPage from "./pages/tools/ToolPage";
import ToolsLayout from "./pages/tools/ToolsLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          
          {/* Tasks Routes */}
          <Route path="/tasks" element={<TasksLayout />}>
            <Route path="not-started" element={<TaskList />} />
            <Route path="in-progress" element={<TaskList />} />
            <Route path="done" element={<TaskList />} />
          </Route>

          {/* Tools Routes */}
          <Route path="/tools" element={<ToolsLayout />}>
            <Route path=":tool" element={<ToolPage />} />
          </Route>

          {/* Metrics Routes */}
          <Route path="/metrics" element={<MetricsLayout />}>
            <Route path=":type" element={<MetricsPage />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
