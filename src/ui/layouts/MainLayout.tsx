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
      <main className="w-full">
        <header className="w-full p-4 py-5 pt-6 flex justify-between items-center">
          <h1 className="uppercase font-bold text-3xl text-green-800">
            {title}
          </h1>
          <div className="flex justify-between items-center gap-4">
            <div className="w-44 bg-gray-200 h-6 rounded-2xl px-3 text-xs flex justify-between items-center">
              Search...
              <Search size={15} />
            </div>
            <Bell size={20} />
          </div>
        </header>
        <hr className="border-t-2 mx-4 border-black" />
        <body className={`p-4 ${className}`}>{children}</body>
      </main>
    </div>
  );
};

export default MainLayout;
