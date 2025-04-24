
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { 
  Bell, 
  ChevronDown, 
  ExternalLink, 
  MessageSquare, 
  Search, 
  Share2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const viewOptions = [
  { id: "spreadsheet", label: "Spreadsheet" },
  { id: "board", label: "Board" },
  { id: "calendar", label: "Calendar" },
  { id: "timeline", label: "Timeline" },
];

const Header = () => {
  const [activeView, setActiveView] = useState("spreadsheet");
  
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 w-full bg-secondary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground border px-1.5 py-0.5 rounded">/</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageSquare size={18} />
          </Button>
          <Avatar className="h-8 w-8">
            <div className="bg-primary/10 text-primary rounded-full h-full w-full flex items-center justify-center font-medium">
              JD
            </div>
          </Avatar>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h1 className="text-xl font-semibold">Tasks Report</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Stay on top of your tasks, monitor progress, and track status. 
            Streamline your workflow and transform how you deliver results.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center px-5 py-2 border-t">
        <div className="flex">
          {viewOptions.map((view) => (
            <button
              key={view.id}
              className={cn(
                "px-4 py-2 text-sm font-medium",
                activeView === view.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => setActiveView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <span>Filter</span>
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
