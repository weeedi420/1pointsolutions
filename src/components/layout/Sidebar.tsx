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
  Menu,
  X,
  Target,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Phone, label: "Calls", path: "/calls" },
    { icon: MessageSquare, label: "Content", path: "/content" },
    { icon: Image, label: "Images", path: "/images" },
    { icon: Search, label: "Keywords", path: "/keywords" },
    { icon: LineChart, label: "Analytics", path: "/analytics" },
    { icon: Target, label: "Ads", path: "/ads" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-[#222222]" />
        ) : (
          <Menu className="h-6 w-6 text-[#222222]" />
        )}
      </button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-[#0FA0CE]">1Point Solutions</h1>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(false)}
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;