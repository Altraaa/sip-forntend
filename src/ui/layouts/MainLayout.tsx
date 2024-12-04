import { Bell, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";

interface MainLayoutTypes {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

const MainLayout = ({ children, title, className }: MainLayoutTypes) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full overflow-y-scroll">
        <header className="w-full md:p-4 md:py-6 md:px-10 md:pt-6 flex justify-between items-center">
          <h1 className="uppercase font-bold text-3xl text-black">{title}</h1>
          <div className="flex justify-between items-center gap-4">
            <div className="md:w-44 w-auto bg-gray-200 h-6 rounded-2xl px-3 text-xs flex justify-between items-center">
              <p className="hidden md:flex">Search...</p>
              <Search size={15} />
            </div>
            <Bell size={20} />
          </div>
        </header>
        <hr className="border-t-2 border-black" />
        <body className={`p-4 px-10 flex flex-col ${className}`}>
          {children}
        </body>
      </main>
    </div>
  );
};

export default MainLayout;
