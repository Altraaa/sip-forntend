import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import Loading from "@/ui/components/SharedCompoent/Loading";
import { useProfileData } from "@/utils/hooks/userProfile";

const ViewProfile = () => {
  const { user, userClass, lastAccess, loading, error } = useProfileData();

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <MainLayout title="Profile" showSearch={false}>
      <Loading open={loading} />
      <div className="flex flex-col md:flex-row p-2">
        <div className="w-full mb-5 md:mb-0 md:w-1/3 bg-gray-50 border-2 border-customColor-darkBlue shadow-2xl rounded-lg p-4 rounded-medium text-center">
          <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-5 mt-4">
            <img
              src="src/assets/images/dummyAvatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-7">{user?.name}</h2>
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
        <div className="w-full md:w-3/4 bg-gray-50 border-2 border-customColor-darkBlue shadow-2xl p-8 rounded-xl ml-0 md:ml-4">
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
    </MainLayout>
  );
};

export default ViewProfile;
