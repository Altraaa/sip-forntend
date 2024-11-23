import {
  ChevronLeft,
  LogOut,
  LifeBuoy,
  GraduationCap,
  Boxes,
  UserCircle,
  Layers3,
  LayoutDashboard,
  Settings,
  Calendar,
} from "lucide-react";
import Avatars from "./../../assets/images/dummyAvatar.png";
import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: false,
});

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside
      className={`flex flex-col border-r-2 shadow-2xl transition-all ${
        expanded ? "w-16" : "w-64"
      }`}
    >
      <nav className="flex flex-col h-full justify-between">
        <div>
          <div className="p-4 bg-emerald-200 flex justify-between items-center">
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
              onClick={() => setExpanded((curr) => !curr)}
            >
              <div
                className={`transition-transform duration-300 ease-in-out ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <ChevronLeft size={20} />
              </div>
            </button>
          </div>
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex flex-col px-3">
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                alert
              />
              <SidebarItem icon={<Layers3 size={20} />} text="Class" active />
              <SidebarItem icon={<UserCircle size={20} />} text="Users" />
              <SidebarItem icon={<Boxes size={20} />} text="Major" />
              <SidebarItem
                icon={<Calendar size={20} />}
                text="Schedule"
                alert
              />
              <SidebarItem icon={<GraduationCap size={20} />} text="Teacher" />
              <hr className="my-3" />
              <SidebarItem icon={<Settings size={20} />} text="Settings" />
              <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            </ul>
          </SidebarContext.Provider>
        </div>
        <div className="border-t flex items-center p-3 px-4 transition-all ease-in-out">
          <img
            src={Avatars}
            alt="User Avatar"
            className={`rounded-md transition-all ease-in-out ${
              expanded ? "w-8" : "w-8"
            }`}
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
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center gap-2 py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 group ${
        active
          ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
          : "hover:bg-green-50 text-gray-700"
      }`}
    >
      <div className="shrink-0">{icon}</div>
      <span
        className={`transition-all duration-300 ease-in-out transform origin-left ${
          expanded
            ? "opacity-0 -translate-x-10 w-0 gap-2"
            : "opacity-100 translate-x-0 w-full gap-0"
        } overflow-hidden group-hover:opacity-100 group-hover:translate-x-0`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute w-2 h-2 bg-green-500 rounded-full right-2 top-1/2 transform -translate-y-1/2 ${
            expanded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
      {expanded && (
        <div className="absolute -z-50 left-full rounded-md px-2 py-1 ml-6 bg-green-100 text-green-800 text-sm transform origin-left transition-all duration-200 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
