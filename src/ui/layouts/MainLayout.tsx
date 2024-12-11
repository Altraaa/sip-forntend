import { Bell, Search, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../components/Sidebar";
import { useState, useCallback } from "react";

interface MainLayoutProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  toggleSidebar: () => void;
}

// Memisahkan Header sebagai komponen terpisah dengan memo
const Header = ({ 
  title, 
  showSearch, 
  onSearchChange, 
  searchQuery,
  toggleSidebar 
}: HeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(e);
  };

  return (
    <header className="w-full md:p-4 md:py-6 md:px-10 xl:px-12 2xl:px-24 md:pt-6 py-3 p-2 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-md md:hidden hover:bg-gray-100"
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
        {showSearch && (
          <div className="relative md:w-44 w-auto">
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full bg-gray-200 h-8 rounded-2xl px-4 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-customColor-blue"
              autoComplete="off"
            />
            <Search 
              size={15} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        )}
        <div className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300">
          <Bell 
            size={25} 
            className="cursor-pointer text-gray-700 hover:text-black" 
          />
        </div>
      </div>
    </header>
  );
};

const MainLayout = ({ 
  children, 
  title, 
  className,
  showSearch = true,
  onSearch 
}: MainLayoutProps) => {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="w-full overflow-y-scroll scrollbar-none">
        <Header 
          title={title}
          showSearch={showSearch}
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          toggleSidebar={toggleSidebar}
        />
        <hr className="border border-black" />
        <div className={`md:p-4 md:px-10 xl:px-12 2xl:px-24 p-2 px-5 flex flex-col ${className}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
