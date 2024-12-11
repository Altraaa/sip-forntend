import { Bell, Search, Menu, X } from "lucide-react";
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

interface NotificationPopupProps {
  onClose: () => void;
  notifications?: Array<{
    id: string;
    message: string;
    time: string;
  }>;
}

const NotificationPopup = ({ onClose, notifications = [] }: NotificationPopupProps) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border p-4 z-50">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Notifications</h3>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
    <div className="max-h-80 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div 
            key={notif.id} 
            className="p-3 hover:bg-gray-50 rounded-lg mb-2 border-b"
          >
            <p className="text-sm">{notif.message}</p>
            <span className="text-xs text-gray-500">{notif.time}</span>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          There are no notifications for you
        </div>
      )}
    </div>
  </div>
);

const Header = ({ 
  title, 
  showSearch, 
  onSearchChange, 
  searchQuery,
  toggleSidebar 
}: HeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(e);
  };

  const toggleMobileSearch = () => setShowMobileSearch(prev => !prev);
  const toggleNotifications = () => setShowNotifications(prev => !prev);

  // Dummy notifications - replace with real data
  const notifications = [
    {
      id: '1',
      message: 'New assignment has been posted',
      time: '5 minutes ago'
    },
  ];

  return (
    <header className="w-full md:p-4 md:py-6 md:px-10 xl:px-12 2xl:px-24 md:pt-6 py-3 p-2">
      {/* Mobile Search Overlay yang lebih compact */}
      {showMobileSearch && (
        <div className="absolute top-0 left-0 right-0 bg-white z-50 p-2 md:hidden shadow-lg">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2">
            <button
              onClick={toggleMobileSearch}
              className="p-2"
            >
              <X size={20} />
            </button>
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
              className="w-full bg-transparent h-10 text-sm focus:outline-none"
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
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
            <>
              <div className="relative hidden md:block md:w-44">
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
              <button
                onClick={toggleMobileSearch}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <Search size={20} />
              </button>
            </>
          )}
          
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300"
            >
              <Bell 
                size={25} 
                className="cursor-pointer text-gray-700 hover:text-black" 
              />
            </button>
            
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <NotificationPopup 
                  onClose={() => setShowNotifications(false)}
                  notifications={notifications}
                />
              </>
            )}
          </div>
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
