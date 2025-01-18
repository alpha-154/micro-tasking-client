import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  PlusCircle,
  CircleDollarSign,
  Clock,
  ListTodo,
  Send,
  Wallet,
  ArrowBigRight,
  X,
} from "lucide-react";

const roles = {
  admin: [
    { path: "/dashboard/admin", title: "Home" },
    { path: "/dashboard/admin/manage-user", title: "Manage Users" },
    { path: "/dashboard/admin/manage-task", title: "Manage Tasks" },
  ],
  buyer: [
    { path: "/dashboard/buyer", title: "Home" },
    { path: "/dashboard/buyer/add-task", title: "Add Task" },
    { path: "/dashboard/buyer/my-task", title: "My Task" },
    { path: "/dashboard/buyer/payment-history", title: "Payment History" },
    { path: "/dashboard/buyer/purchase-coin", title: "Purchase Coin" },
  ],
  worker: [
    { path: "/dashboard/worker", title: "Home" },
    { path: "/dashboard/worker/task-list", title: "Task List" },
    { path: "/dashboard/worker/my-submissions", title: "My Submissions" },
    { path: "/dashboard/worker/withdrawals", title: "Withdrawals" },
  ],
};

// Helper function to get icon based on menu item title
const getIcon = (title) => {
  const icons = {
    Home: <LayoutDashboard size={20} />,
    "Manage Users": <Users size={20} />,
    "Manage Tasks": <ClipboardList size={20} />,
    "Add Task": <PlusCircle size={20} />,
    "My Task": <ListTodo size={20} />,
    "Purchase Coin": <CircleDollarSign size={20} />,
    "Payment History": <Clock size={20} />,
    "Task List": <ClipboardList size={20} />,
    "My Submissions": <Send size={20} />,
    Withdrawals: <Wallet size={20} />,
  };
  return icons[title] || <LayoutDashboard size={20} />;
};

const Sidebar = ({ role }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsExpanded(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = roles[role] || [];

  return (
    <div className="sticky top-0 left-0 z-50">
      <div
        className={`relative min-h-screen bg-white shadow-lg transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        {/* Header with logo and toggle */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
            </div>
            {isExpanded && <span className="font-bold text-xl">Dashboard</span>}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            {isExpanded ? <X size={20} /> : <ArrowBigRight size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 p-4 transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {getIcon(item.title)}
                {isExpanded && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
            isExpanded ? "flex items-center gap-3" : "flex justify-center"
          }`}
        >
          <img
            src="/api/placeholder/40/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          {isExpanded && (
            <div>
              <h4 className="font-medium">Evano</h4>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
