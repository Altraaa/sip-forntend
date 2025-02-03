import {Edit} from "lucide-react";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const [user] = useState({
    firstName: "Nama",
    lastName: "Siswa",
    email: "email@gmail.com",
    phone: "+62 785237996698",
    class: "XII RPL 3",
    academicStatus: "Active",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptas ipsum provident veniam nihil animi maiores iste, ratione inventore aliquam distinctio, atque non esse consectetur quibusdam at praesentium voluptatum in.",
    firstAccess: "Thursday, 28 November 2024, 7:50 AM",
    lastAccess: "Friday, 10 January 2025, 1:59 PM",
    firstAccessDuration: "43 days 6 hours",
    lastAccessDuration: "10 secs",
  });

  return (
    <MainLayout title="Profile">
      <div className="flex flex-col md:flex-row p-2">
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-medium text-center">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-300 mb-5 mt-4">
            <img
              src="src/assets/images/dummyAvatar.png" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-7 uppercase">{user.firstName} {user.lastName}</h2>
          <div>
            <Link
              className="mt-2 px-5 py-1 bg-customColor-darkBlue text-white rounded-lg flex items-center justify-center gap-2"
              to="/profileEdit"
            >
              <Edit size={22} />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Detail Information */}
        <div className="w-full md:w-3/4 bg-gray-100 p-8 rounded-medium ml-0 md:ml-4">
          <h2 className="text-2xl font-semibold mb-5">User Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-lg">First Name</p>
              <p className="mb-3">{user.firstName}</p>

              <p className="font-semibold text-lg">Email Address</p>
              <p className="mb-3">{user.email}</p>

              <p className="font-semibold text-lg">Class</p>
              <p className="mb-3">{user.class}</p>
            </div>

            <div>
              <p className="font-semibold text-lg">Last Name</p>
              <p className="mb-3">{user.lastName}</p>

              <p className="font-semibold text-lg">Phone Number</p>
              <p className="mb-3">{user.phone}</p>

              <p className="font-semibold text-lg">Academic Status</p>
              <p className="mb-3">{user.academicStatus}</p>
            </div>

          </div>
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <div className="text-md w-full p-4 border rounded-lg bg-white">
              {user.description}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-5">Login Activity</h3>
            <p className="font-semibold text-lg">First access to site </p>
            <p className="mb-4">{user.firstAccess} {user.firstAccessDuration}</p>

            <p className="font-semibold text-lg">Last access to site </p>
            <p >{user.lastAccess} {user.lastAccessDuration}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewProfile;