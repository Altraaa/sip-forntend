import {
  ChevronLeft,
  LogOut,
  CircleHelp,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  Settings,
  Calendar,
  User,
} from "lucide-react";
import Avatars from "../../assets/images/dummyAvatar.png";
import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean;
  toggleSidebar: () => void;
}

// Data menu untuk sidebar
const menuItems = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", link: "/" },
  { icon: <Layers3 size={20} />, text: "Class", link: "/class", alert: true },
  { icon: <Calendar size={20} />, text: "Schedule", link: "/schedule" },
  { icon: <GraduationCap size={20} />, text: "Teacher", link: "/teacher" },
  { icon: <User size={20} />, text: "Profile", link: "/profile", divider: true },
  { icon: <Settings size={20} />, text: "Settings", link: "/settings" },
  { icon: <CircleHelp size={20} />, text: "Help", link: "/help" },
];

const SidebarContext = createContext<SidebarContextType>({
  expanded: false,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleSidebar = () => setExpanded(prev => !prev);

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  link = "/",
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  link?: string;
}) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={link}>
      <li
        className={`
          relative flex items-center gap-2 py-2 px-2 my-1 font-medium rounded-md 
          cursor-pointer transition-all duration-300 group
          ${active 
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-customColor-darkBlue" 
            : "hover:bg-gray-50 text-gray-700"
          }
        `}
      >
        <div className="min-w-[20px] flex justify-center">
          {icon}
        </div>
        <span
          className={`transition-all duration-300 ease-in-out transform origin-left ${
            expanded ? "md:opacity-0 md:-translate-x-10 md:w-0" : "md:opacity-100 md:translate-x-0 md:w-full"
          } overflow-hidden`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute w-2 h-2 bg-customColor-lightBlue rounded-full right-2 top-1/2 transform -translate-y-1/2 ${
              expanded ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </li>
    </Link>
  );
};

const Sidebar = () => {
  const { expanded, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${
          expanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      />

      <aside
        className={`hidden fixed md:relative z-50 md:z-0 bg-white flex-col border-r-2 shadow-2xl h-screen md:flex rounded-r-2xl transition-all ${
          expanded ? "w-16" : "w-80"
        }`}
      >
        <nav className="flex flex-col h-full space-y-3">
          <div className="p-4 flex justify-between items-center rounded-r-2xl bg-customColor-blue">
            <img
              src={Avatars}
              className={`overflow-hidden transition-all ${expanded ? "hidden" : "w-8"}`}
              alt="Skensa Logo"
            />
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              <ChevronLeft
                size={20}
                className={`transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          <ul className="flex flex-col px-3 h-full space-y-2">
            {menuItems.map((item) => (
              <div key={item.link}>
                {item.divider && <hr />}
                <SidebarItem
                  icon={item.icon}
                  text={item.text}
                  link={item.link}
                  alert={item.alert}
                  active={location.pathname === item.link}
                />
              </div>
            ))}
          </ul>

          <div className="border-t flex items-center p-3 px-4">
            <img
              src={Avatars}
              alt="User Avatar"
              className="rounded-md w-7"
            />
            <div className={`flex justify-between items-center w-full ml-3 ${expanded ? "md:hidden" : "flex"}`}>
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm">John De</h4>
                <span className="text-xs text-gray-400">johnde@gmail.com</span>
              </div>
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <aside
        className={`fixed md:hidden flex flex-col z-50 w-64 bg-white shadow-xl h-full rounded-r-2xl transition-transform duration-300 ${
          expanded ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center rounded-r-2xl bg-customColor-blue">
            <img src={Avatars} className="w-8" alt="Skensa Logo" />
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <ul className="flex flex-col px-3 h-full space-y-2">
            {menuItems.map((item) => (
              <div key={item.link}>
                {item.divider && <hr />}
                <SidebarItem
                  icon={item.icon}
                  text={item.text}
                  link={item.link}
                  alert={item.alert}
                  active={location.pathname === item.link}
                />
              </div>
            ))}
          </ul>

          <div className="border-t flex items-center p-3 px-4">
            <img src={Avatars} alt="User Avatar" className="rounded-md w-7" />
            <div className="flex justify-between items-center w-full ml-3">
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm">John De</h4>
                <span className="text-xs text-gray-400">johnde@gmail.com</span>
              </div>
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
