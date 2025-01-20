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
  ChevronDown,
  ListTodo,
  BookOpen,
} from "lucide-react";
import Avatars from "../../assets/images/dummyAvatar.png";
import { createContext, useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarContextType {
  expanded: boolean;
  toggleSidebar: () => void;
}

// Data menu untuk sidebar
const menuItems = [
  { icon: <LayoutDashboard size={20} />, text: "Dashboard", link: "/" },
  {
    icon: <Layers3 size={20} />,
    text: "Class",
    link: "/class",
    alert: true,
    hasDropdown: true,
    dropdownItems: [
      {
        icon: <BookOpen size={20} />,
        text: "Class Detail",
        link: "/class",
      },
      { icon: <Calendar size={20} />, text: "Schedule", link: "/schedule" },
      { icon: <ListTodo size={20} />, text: "Add Task", link: "/addtask" },
    ],
  },
  { icon: <GraduationCap size={20} />, text: "Teacher", link: "/teacher" },
  {
    icon: <User size={20} />,
    text: "Profile",
    link: "/profile",
    divider: true,
  },
  { icon: <Settings size={20} />, text: "Settings", link: "/settings" },
  { icon: <CircleHelp size={20} />, text: "Help", link: "/help" },
];

const SidebarContext = createContext<SidebarContextType>({
  expanded: false,
  toggleSidebar: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

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

const SidebarItem = ({
  icon,
  text,
  active,
  alert,
  link = "/",
  hasDropdown,
  dropdownItems,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  link?: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{ icon: React.ReactNode; text: string; link: string }>;
}) => {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();

  // Gunakan localStorage untuk menyimpan state dropdown
  const [isOpen, setIsOpen] = useState(() => {
    if (hasDropdown) {
      const savedState = localStorage.getItem("dropdownState");
      return savedState === "true";
    }
    return false;
  });

  // Update localStorage saat dropdown state berubah
  useEffect(() => {
    if (hasDropdown) {
      localStorage.setItem("dropdownState", isOpen.toString());
    }
  }, [isOpen, hasDropdown]);

  // Reset dropdown hanya saat sidebar collapse
  useEffect(() => {
    if (expanded) {
      setIsOpen(false);
      localStorage.setItem("dropdownState", "false");
    }
  }, [expanded]);

  const toggleDropdown = (e: React.MouseEvent) => {
    if (hasDropdown) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Cek apakah item ini atau salah satu dari dropdown itemnya aktif
  const isActiveItem =
    active ||
    (hasDropdown &&
      dropdownItems?.some((item) => item.link === location.pathname));

  return (
    <div>
      <Link
        to={hasDropdown ? "#" : link}
        onClick={toggleDropdown}
        className={hasDropdown ? "cursor-pointer" : ""}
      >
        <li
          className={`
            relative flex items-center gap-3 py-2.5 px-3 my-0.5 font-medium rounded-md 
            transition-all duration-300 group
            ${
              isActiveItem
                ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-customColor-darkBlue"
                : "hover:bg-gray-50 text-gray-700"
            }
          `}
        >
          <div className="min-w-[20px] flex justify-center">{icon}</div>
          <span
            className={`transition-all duration-300 ease-in-out transform origin-left ${
              expanded
                ? "md:opacity-0 md:-translate-x-10 md:w-0"
                : "md:opacity-100 md:translate-x-0 md:w-full"
            } overflow-hidden flex-1`}
          >
            {text}
          </span>

          <div className="flex items-center gap-2">
            {alert && (
              <div className="w-2 h-2 bg-customColor-lightBlue rounded-full" />
            )}
            {hasDropdown && !expanded && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </li>
      </Link>

      {/* Dropdown Items */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${hasDropdown && !expanded ? "ml-4" : ""}
          ${
            isOpen && !expanded
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        {dropdownItems?.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`
                flex items-center gap-3 py-2.5 px-3 rounded-md text-sm
                transition-colors duration-200
                ${
                  location.pathname === item.link
                    ? "bg-blue-50 text-customColor-darkBlue"
                    : "hover:bg-gray-50 text-gray-600"
                }
              `}
            >
              <div className="min-w-[20px] flex justify-center">
                {item.icon}
              </div>
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { expanded, toggleSidebar } = useSidebar();
  const location = useLocation();

  return (
    <>
      {/* Overlay untuk mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${
          expanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleSidebar}
      />

      {/* Desktop Sidebar */}
      <aside
        className={`hidden fixed md:relative z-50 md:z-0 bg-white flex-col border-r-2 shadow-2xl h-screen md:flex rounded-r-2xl transition-all ${
          expanded ? "w-16" : "w-80"
        }`}
      >
        <nav className="flex flex-col h-full relative">
          {/* Fixed Header */}
          <div className="sticky top-0 z-10 bg-white">
            <div className="p-4 flex justify-between items-center rounded-r-2xl bg-customColor-blue">
              <img
                src={Avatars}
                className={`overflow-hidden transition-all ${
                  expanded ? "hidden" : "w-8"
                }`}
                alt="Skensa Logo"
              />
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                aria-label="Toggle Menu"
              >
                <ChevronLeft
                  size={20}
                  className={`transition-transform duration-500 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Scrollable Menu Area */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-2">
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.link}>
                  {item.divider && <hr className="mb-3" />}
                  <SidebarItem
                    icon={item.icon}
                    text={item.text}
                    link={item.link}
                    alert={item.alert}
                    active={location.pathname === item.link}
                    hasDropdown={item.hasDropdown}
                    dropdownItems={item.dropdownItems}
                  />
                </div>
              ))}
            </ul>
          </div>

          {/* Fixed Footer */}
          <div className="sticky bottom-0 bg-white border-t mt-auto">
            <div className="p-3 px-4 flex items-center">
              <img src={Avatars} alt="User Avatar" className="rounded-md w-7" />
              <div
                className={`flex justify-between items-center w-full ml-3 ${
                  expanded ? "md:hidden" : "flex"
                }`}
              >
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm">John De</h4>
                  <span className="text-xs text-gray-400">
                    johnde@gmail.com
                  </span>
                </div>
                <button
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar - Gunakan struktur yang sama */}
      <aside
        className={`fixed md:hidden flex flex-col z-50 w-64 bg-white shadow-xl h-full rounded-r-2xl transition-transform duration-300 ${
          expanded ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col h-full relative">
          {/* Fixed Header */}
          <div className="sticky top-0 z-10 bg-white">
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
          </div>

          {/* Scrollable Menu Area */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-3 py-2">
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.link}>
                  {item.divider && <hr className="mb-3" />}
                  <SidebarItem
                    icon={item.icon}
                    text={item.text}
                    link={item.link}
                    alert={item.alert}
                    active={location.pathname === item.link}
                    hasDropdown={item.hasDropdown}
                    dropdownItems={item.dropdownItems}
                  />
                </div>
              ))}
            </ul>
          </div>

          {/* Fixed Footer */}
          <div className="sticky bottom-0 bg-white border-t mt-auto">
            <div className="p-3 px-4 flex items-center">
              <img src={Avatars} alt="User Avatar" className="rounded-md w-7" />
              <div className="flex justify-between items-center w-full ml-3">
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm">John De</h4>
                  <span className="text-xs text-gray-400">
                    johnde@gmail.com
                  </span>
                </div>
                <button
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
