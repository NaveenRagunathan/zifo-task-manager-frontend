
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Home,
  Inbox,
  Layers,
  MessageSquare,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";

type SidebarItem = {
  title: string;
  icon: JSX.Element;
  href: string;
  badge?: number;
  children?: {
    title: string;
    href: string;
    badge?: number;
  }[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    icon: <Home size={18} />,
    href: "/",
  },
  {
    title: "Calendar",
    icon: <CalendarDays size={18} />,
    href: "/calendar",
  },
  {
    title: "Tasks",
    icon: <CheckCircle size={18} />,
    href: "/tasks",
    children: [
      { title: "Backlog", href: "/tasks/backlog", badge: 24 },
      { title: "In progress", href: "/tasks/in-progress", badge: 4 },
      { title: "Validation", href: "/tasks/validation", badge: 7 },
      { title: "Done", href: "/tasks/done", badge: 13 },
    ],
  },
  {
    title: "Tools",
    icon: <Layers size={18} />,
    href: "/tools",
    children: [
      { title: "Notification", href: "/tools/notification", badge: 2 },
      { title: "Inbox", href: "/tools/inbox" },
      { title: "Integration", href: "/tools/integration" },
      { title: "Reporting", href: "/tools/reporting" },
    ],
  },
  {
    title: "Metrics",
    icon: <BarChart3 size={18} />,
    href: "/metrics",
    children: [
      { title: "Active", href: "/metrics/active", badge: 16 },
      { title: "Past", href: "/metrics/past" },
    ],
  },
];

const bottomItems: SidebarItem[] = [
  {
    title: "Help Center",
    icon: <HelpCircle size={18} />,
    href: "/help",
  },
  {
    title: "Settings",
    icon: <Settings size={18} />,
    href: "/settings",
  },
  {
    title: "Invite teams",
    icon: <Users size={18} />,
    href: "/invite",
  },
];

const Sidebar = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Tasks: true, // Open by default
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const renderSidebarItems = (items: SidebarItem[]) => {
    return items.map((item) => (
      <div key={item.title} className="mb-1">
        {item.children ? (
          <div>
            <button
              onClick={() => toggleSection(item.title)}
              className="flex items-center w-full p-2 rounded-md text-sm font-medium hover:bg-sidebar-accent group"
            >
              <span className="mr-2 text-sidebar-foreground/70 group-hover:text-sidebar-foreground">
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
              <ChevronDown
                size={16}
                className={cn(
                  "ml-2 text-sidebar-foreground/50",
                  openSections[item.title] && "transform rotate-180"
                )}
              />
            </button>

            {openSections[item.title] && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.title}
                    to={child.href}
                    className="flex items-center p-2 rounded-md text-sm hover:bg-sidebar-accent"
                  >
                    <span className="flex-1">{child.title}</span>
                    {child.badge && (
                      <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                        {child.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.href}
            className="flex items-center w-full p-2 rounded-md text-sm font-medium hover:bg-sidebar-accent group"
          >
            <span className="mr-2 text-sidebar-foreground/70 group-hover:text-sidebar-foreground">
              {item.icon}
            </span>
            <span>{item.title}</span>
            {item.badge && (
              <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-sidebar h-screen flex flex-col py-5 border-r">
      <div className="px-5 mb-6 flex items-center">
        <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
          <Inbox className="h-5 w-5 text-white" />
        </div>
        <h1 className="ml-2 font-semibold text-lg">RelatedLab</h1>
      </div>
      
      <div className="px-3 mb-2">
        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white p-2 rounded-md text-sm font-medium">
          <PlusCircle size={16} />
          <span>Create task</span>
        </button>
      </div>
      
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        {renderSidebarItems(sidebarItems)}
      </div>
      
      <div className="mt-auto px-3 pt-3 border-t">
        {renderSidebarItems(bottomItems)}
      </div>
    </div>
  );
};

export default Sidebar;
