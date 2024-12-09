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
import Avatars from "./../../assets/images/dummyAvatar.png";
import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
export default function Sidebar() {
  const { expanded, toggleSidebar } = useSidebar();
  const location = useLocation();
 
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${
          expanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`hidden fixed md:relative z-50 md:z-0 bg-white flex-col border-r-2 shadow-2xl h-screen md:flex rounded-r-2xl transition-all ${
          expanded ? "w-16" : "w-80"
        }`}
      >
        <nav className="flex flex-col h-full space-y-3">
          <div className="p-4 flex justify-between items-center rounded-r-2xl bg-customColor-blue">
            <img
              src={Avatars}
              className={`overflow-hidden transition-all ${
                expanded ? "hidden" : "w-8"
              }`}
              alt="Skensa Logo"
            />
            <button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              aria-label="Toggle Menu"
              onClick={toggleSidebar}
            >
              <div
                className={`transition-transform duration-500 ease-in-out ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronLeft size={20} />
              </div>
            </button>
          </div>
          <ul className="flex flex-col px-3 h-full space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              link="/"
              text="Dashboard"
              active={location.pathname === "/"}
            />
            <SidebarItem
              icon={<Layers3 size={20} />}
              link="/class"
              text="Class"
              alert
              active={location.pathname === "/class"}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              link="/schedule"
              text="Schedule"
              active={location.pathname === "/schedule"}
            />
            <SidebarItem
              icon={<GraduationCap size={20} />}
              link="/teacher"
              text="Teacher"
              active={location.pathname === "/teacher"}
            />
            <hr />
            <SidebarItem
              icon={<User size={20} />}
              link="/profile"
              text="Profile"
              active={location.pathname === "/profile"}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              link="/settings"
              text="Settings"
              active={location.pathname === "/settings"}
            />
            <SidebarItem
              icon={<CircleHelp size={20} />}
              link="/help"
              text="Help"
              active={location.pathname === "/help"}
            />
          </ul>
          <div className="border-t flex items-center p-3 px-4 transition-all ease-in-out">
            <img
              src={Avatars}
              alt="User Avatar"
              className="rounded-md w-7 transition-all ease-in-out"
            />
            <div
              className={`flex justify-between items-center w-full ml-3 overflow-hidden transition-all ${
                expanded ? "hidden" : "flex"
              }`}
            >
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm">John De</h4>
                <span className="text-xs text-gray-400">johnde@gmail.com</span>
              </div>
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                aria-label="Settings"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed md:hidden flex flex-col z-50 w-64 bg-white shadow-xl h-full rounded-r-2xl transition-transform duration-300 ${expanded
              ? "-translate-x-0"
              : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full space-y-3">
          <div className="p-4 flex justify-between items-center rounded-r-2xl bg-customColor-blue">
            <img
              src={Avatars}
              className={`overflow-hidden transition-all ${
                expanded ? "w-8" : "hidden"
              }`}
              alt="Skensa Logo"
            />
            <button
              className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${expanded ? "opacity-100" : "opacity-0"}`}
              aria-label="Toggle Menu"
              onClick={toggleSidebar}
            >
              <ChevronLeft
                size={20}
                className={`transition-transform duration-500 ease-in-out ${
                  expanded ? "rotate-0" : "rotate-180 opacity-0"
                }`}
              />
            </button>
          </div>
          <ul className="flex flex-col px-3 h-full space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              link="/"
              text="Dashboard"
              active={location.pathname === "/"}
            />
            <SidebarItem
              icon={<Layers3 size={20} />}
              link="/class"
              text="Class"
              alert
              active={location.pathname === "/class"}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              link="/schedule"
              text="Schedule"
              active={location.pathname === "/schedule"}
            />
            <SidebarItem
              icon={<GraduationCap size={20} />}
              link="/teacher"
              text="Teacher"
              active={location.pathname === "/teacher"}
            />
            <hr />
            <SidebarItem
              icon={<User size={20} />}
              link="/profile"
              text="Profile"
              active={location.pathname === "/profile"}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              link="/settings"
              text="Settings"
              active={location.pathname === "/settings"}
            />
            <SidebarItem
              icon={<CircleHelp size={20} />}
              link="/help"
              text="Help"
              active={location.pathname === "/help"}
            />
          </ul>
          <div className="border-t flex items-center p-3 px-4 transition-all ease-in-out">
            <img
              src={Avatars}
              alt="User Avatar"
              className="rounded-md w-8 h-8"
            />
            <div className="flex justify-between items-center w-full ml-3">
              <div className="flex flex-col">
                <h4 className="font-semibold text-sm">John De</h4>
                <span className="text-xs text-gray-400">johnde@gmail.com</span>
              </div>
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                aria-label="Settings"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({
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
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={link}>
      <li
        className={`relative flex items-center gap-2 py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 group ${
          active
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-customColor-darkBlue"
            : "hover:bg-gray-50 text-gray-700"
        }`}
      >
        <div className="shrink-0">{icon}</div>
        <span
          className={`transition-all duration-300 ease-in-out transform origin-left ${
            expanded
              ? "md:opacity-0 md:-translate-x-10 md:w-0 md:gap-2 opacity-100 translate-x-0 w-full gap-0"
              : "md:opacity-100 md:translate-x-0 md:w-full md:gap-0 opacity-0 -translate-x-10 w-0 gap-2"
          } overflow-hidden group-hover:opacity-100 group-hover:translate-x-0`}
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
}
