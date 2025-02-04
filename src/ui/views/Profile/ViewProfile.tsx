import {Edit} from "lucide-react";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiRequest } from "@/utils/services/Api.service";

const ViewProfile = () => {
  const [user] = useState({
    firstName: "Nama",
    lastName: "Siswa",
    email: "email@gmail.com",
    phone: "+62 785237996698",
    class: "XII RPL 3",
    photo: "src/assets/images/dummyAvatar.png",
    academicStatus: "Active",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit voluptas ipsum provident veniam nihil animi maiores iste, ratione inventore aliquam distinctio, atque non esse consectetur quibusdam at praesentium voluptatum in.",
    firstAccess: "Thursday, 28 November 2024, 7:50 AM",
    lastAccess: "Friday, 10 January 2025, 1:59 PM",
    firstAccessDuration: "43 days 6 hours",
    lastAccessDuration: "10 secs",
  });

  const getCurrentTimestamp = () => {
    const now = new Date();
    return (
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(now.getDate()).padStart(2, "0")} ` +
      `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
          console.error("No username found in localStorage");
          return;
        }
        const response = await ApiRequest({ url: "students", method: "GET" });

        const loggedInUser = response.find(
          (student: any) => student.nis === storedUsername
        );
        console.log("loggedInUser", loggedInUser);
        if (loggedInUser) {
          setUser(loggedInUser);
        } else {
          console.error("User not found in students data");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message || error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserClass();
    }
  }, [user]);

  useEffect(() => {
    const previousAccess = localStorage.getItem("lastAccess");
    if (previousAccess) {
      setLastAccess(previousAccess);
    }

    const currentTimestamp = getCurrentTimestamp();
    localStorage.setItem("lastAccess", currentTimestamp);
  }, []);

  return (
    <MainLayout title="Profile">
      <div className="flex flex-col md:flex-row p-2">
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-medium text-center">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-300 mb-5 mt-4">
            <img
              src={user.photo} 
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
              <Link
                className="mt-2 px-5 py-2 bg-customColor-darkBlue text-white rounded-xl flex items-center justify-center gap-2"
                to="/profile/edit"
              >
                <Edit size={22} />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Detail Information */}
          <div className="w-full md:w-3/4 bg-gray-50 p-8 rounded-xl shadow-lg ml-0 md:ml-4">
            <h2 className="text-2xl font-semibold mb-5">User Details</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">
                  NIS : <span className="font-normal">{user?.nis}</span>
                </p>

                <p className="font-semibold text-lg">
                  Name : <span className="font-normal">{user?.name}</span>
                </p>

                <p className="font-semibold text-lg">
                  Class : <span className="font-normal">{userClass?.name}</span>
                </p>

                <p className="font-semibold text-lg">
                  Attendance Number :{" "}
                  <span className="font-normal">{user?.attendance_number}</span>
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-5">Login Activity</h3>
              <p className="font-semibold text-lg">Last access to site </p>
              <p>{lastAccess ? lastAccess : "First time accessing the site"}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewProfile;
