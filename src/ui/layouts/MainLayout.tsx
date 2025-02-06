import { Bell, Search, Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../components/Sidebar";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useProfileData } from "@/utils/hooks/userProfile";

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

interface Notification {
  id: string;
  message: string;
  time: string;
  isRead?: boolean;
  detail?: string;
  deadline?: string;
}

interface NotificationPopupProps {
  onClose: () => void;
  notifications?: Notification[];
  onMarkAsRead: (id: string) => void;
  onViewDetail: (notification: Notification) => void;
  onDeleteOne: (id: string) => void;
  onDeleteAll: () => void;
}
const ProfileIcon = () => {
  const { user, userClass, error } = useProfileData();
  const [showProfile, setShowProfile] = useState(false);

  if (error) {
    return (
      <div className="relative">
        <button className="p-2">
          <span>Error loading profile</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setShowProfile((prev) => !prev)}>
        <img
          src={user?.photo || "src/assets/images/dummyAvatar.png"} // Gambar default jika tidak ada
          alt="Profile"
          className="cursor-pointer w-10 h-10 rounded-full"
        />
      </button>

      {showProfile && user && (
        <div className="absolute right-0 top-10 max-w-screen-lg bg-white rounded-xl shadow-2xl border p-4 z-50">
          <div className="flex justify-end">
            <button onClick={() => setShowProfile(false)}>
              <X
                size={18}
                className="text-gray-700 hover:text-gray-800 hover:bg-gray-200 rounded-full"
              />
            </button>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold w-72 text-black rounded">
              {user?.name} - {userClass?.name || ""}
            </p>
          </div>
          <hr className="my-2" />
          <div>
            <Link
              className="hover:text-blue-600 text-sm hover:underline transition duration-300"
              to="/profile"
            >
              See more...
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationPopup = ({
  onClose,
  notifications = [],
  onMarkAsRead,
  onViewDetail,
  onDeleteOne,
  onDeleteAll,
}: NotificationPopupProps) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border p-4 z-50">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">Notifications</h3>
      <div className="flex items-center gap-2">
        {notifications.length > 0 && (
          <button
            onClick={onDeleteAll}
            className="text-xs text-red-600 hover:text-red-800"
          >
            Clear all
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    </div>
    <div
      className="max-h-80 overflow-y-auto 
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-customColor-blue
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:hover:bg-customColor-blue/80"
    >
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 hover:bg-gray-50 rounded-lg mb-2 border-b relative cursor-pointer group ${
              !notif.isRead ? "bg-blue-50" : ""
            }`}
            onClick={() => onViewDetail(notif)}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm">{notif.message}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOne(notif.id);
                }}
                className="p-1 hover:bg-red-100 rounded-full text-red-600"
              >
                <X size={14} />
              </button>
            </div>
            <span className="text-xs text-gray-500">{notif.time}</span>
            <div className="flex gap-2 mt-2">
              {!notif.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notif.id);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark as read
                </button>
              )}
              <span className="text-xs text-blue-600 group-hover:text-blue-800">
                See Details
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No notifications</div>
      )}
    </div>
  </div>
);

const Header = ({
  title,
  showSearch,
  onSearchChange,
  searchQuery,
  toggleSidebar,
}: HeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Data notifikasi default
  const defaultNotifications = [
    {
      id: "1",
      message: "New task has been posted",
      time: "5 minutes ago",
      isRead: false,
      detail:
        "The teacher has posted a new task for the subject Discrete Mathematics.",
      deadline: "7 days away",
    },
    {
      id: "2",
      message: "Class announcement",
      time: "1 hour ago",
      isRead: false,
      detail: "The class tomorrow will be held online via Zoom.",
    },
    {
      id: "4",
      message: "Assignment reminder",
      time: "2 hours ago",
      isRead: false,
      detail: "You have a pending assignment for Database Management System.",
      deadline: "3 days away",
    },
    {
      id: "5",
      message: "Assignment reminder",
      time: "2 hours ago",
      isRead: false,
      detail: "You have a pending assignment for Database Management System.",
      deadline: "3 days away",
    },
    {
      id: "6",
      message: "Assignment reminder",
      time: "2 hours ago",
      isRead: false,
      detail: "You have a pending assignment for Database Management System.",
      deadline: "3 days away",
    },
    {
      id: "7",
      message: "Assignment reminder",
      time: "2 hours ago",
      isRead: false,
      detail: "You have a pending assignment for Database Management System.",
      deadline: "3 days away",
    },
    {
      id: "8",
      message: "Assignment reminder",
      time: "2 hours ago",
      isRead: false,
      detail: "You have a pending assignment for Database Management System.",
      deadline: "3 days away",
    },
  ];

  const [notifications, setNotifications] =
    useState<Notification[]>(defaultNotifications);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange(e);
  };

  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleViewDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleDeleteAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="w-full md:p-4 md:py-6 md:px-10 xl:px-12 2xl:px-24 md:pt-6 py-3 px-2">
      {showMobileSearch && (
        <div className="absolute top-0 left-0 right-0 bg-white z-50 p-2 md:hidden shadow-lg">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2">
            <button onClick={toggleMobileSearch} className="p-2">
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
          <h1 className="uppercase font-bold md:text-3xl xl:text-4xl text-lg text-black">
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

          <div className="flex items-center gap-4">
            <button
              onClick={toggleNotifications}
              className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 relative"
            >
              <Bell
                size={25}
                className="cursor-pointer text-gray-700 hover:text-black"
              />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
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
                  onMarkAsRead={handleMarkAsRead}
                  onViewDetail={handleViewDetail}
                  onDeleteOne={handleDeleteNotification}
                  onDeleteAll={handleDeleteAllNotifications}
                />
              </>
            )}
            <ProfileIcon />
          </div>
        </div>
      </div>

      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Detail Notifikasi</h3>
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm mb-2">{selectedNotification.message}</p>
            <p className="text-sm text-gray-600 mb-4">
              {selectedNotification.detail}
            </p>
            {selectedNotification.deadline && (
              <p className="text-xs text-orange-600 mb-2">
                Deadline: {selectedNotification.deadline}
              </p>
            )}
            <p className="text-xs text-gray-500">{selectedNotification.time}</p>
          </div>
        </div>
      )}
    </header>
  );
};

const MainLayout = ({
  children,
  title,
  className,
  showSearch = true,
  onSearch,
}: MainLayoutProps) => {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch]
  );

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
        <div
          className={`md:p-4 md:px-10 xl:px-12 2xl:px-24 p-2 px-5 flex flex-col ${className}`}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
