import Sidebar from "../components/Sidebar";
import Avatars from "./../../assets/images/dummyAvatar.png";
import { Bell, Search } from "lucide-react";

const ViewDashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="w-full">
          <section className="w-full border-gray-700 border-b p-4 flex justify-between items-center">
            <h1 className="uppercase font-bold text-2xl text-green-900">Dashboard</h1>
            <div className="flex justify-between items-center w-1/4">
              <div className="w-44 bg-gray-200 h-6 rounded-2xl px-3 text-xs flex justify-between items-center">
                Search...
                <Search size={15}/>
              </div>
              <Bell size={20}/>
              <img
                src={Avatars}
                className={`overflow-hidden transition-all w-8`}
                alt="Skensa Logo"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ViewDashboard;
