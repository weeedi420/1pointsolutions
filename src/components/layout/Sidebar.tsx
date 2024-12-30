import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  MessageSquare,
  Image,
  Search,
  Settings,
  LogOut,
  LineChart,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Phone, label: "Call Management", path: "/calls" },
    { icon: MessageSquare, label: "Content Generator", path: "/content" },
    { icon: Image, label: "Image Tools", path: "/images" },
    { icon: Search, label: "Keyword Research", path: "/keywords" },
    { icon: LineChart, label: "Analytics", path: "/analytics" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#0FA0CE]">1Point Solutions</h1>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors",
              isActive(item.path)
                ? "bg-[#0FA0CE]/10 text-[#0FA0CE]"
                : "text-[#222222] hover:bg-gray-50"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-[#222222] hover:bg-gray-50"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-[#222222] hover:bg-gray-50 w-full">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;