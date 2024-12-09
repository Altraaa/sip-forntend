import { Bell, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "./../components/Sidebar";
import { Menu } from "lucide-react";


interface MainLayoutTypes {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

const MainLayout = ({ children, title, className }: MainLayoutTypes) => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full overflow-y-scroll scrollbar-none">
        <header className="w-full md:p-4 md:py-6 md:px-10 xl:px-20 md:pt-6 py-3 p-2 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md md:hidden"
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
            >
              <Menu size={25} />
            </button>
            <h1 className="uppercase font-bold md:text-3xl text-lg text-black">
              {title}
            </h1>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="md:w-44 w-auto bg-gray-200 h-6 rounded-2xl px-3 text-xs flex justify-between items-center">
              <p className="hidden md:flex">Search...</p>
              <Search size={15} />
            </div>
            <div className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 ease-">
              <Bell size={25} className="cursor-pointer" />
            </div>
          </div>
        </header>
        <hr className="border border-black" />
        <body
          className={`md:p-4 md:px-10 xl:px-20 p-2 px-5 flex flex-col ${className}`}
        >
          {children}
        </body>
      </main>
    </div>
  );
};

export default MainLayout;
