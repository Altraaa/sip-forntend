import Sidebar from "../layouts/Sidebar";

const ViewDashboard = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <h1 className="text-2xl font-bold text-red-600">DASHBOARD</h1>
      </div>
    </>
  );
};

export default ViewDashboard;
