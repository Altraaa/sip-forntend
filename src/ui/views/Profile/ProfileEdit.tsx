import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "@/utils/hooks/userProfile";
import { userEditProfile } from "@/utils/hooks/userProfile";
import { IStudent } from "@/utils/models/Student";
import Loading from "@/ui/components/SharedCompoent/Loading";
import FormLayout from "../../layouts/FormLayout";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, loading } = useProfileData();
  const [userName, setUserName] = useState(user?.name);
  const [userNis, setUserNis] = useState(user?.nis);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userDescription, setUserDescription] = useState("");
  // const [userProfilePicture, setUserProfilePicture] = useState(user?.profile_picture);
  const [error, setError] = useState<string | null>(null);

  const { mutate: editProfile } = userEditProfile();

  const handleSubmit = async () => {
    try {
      if (
        !userName || !userNis || !userPhoneNumber || !userDescription 
      ) {
        setError("All fields are required.");
      }

      if (!/^\d+$/.test(userPhoneNumber)) {
        setError("Phone number must contain only numbers.")
      }

      const dataProfile: IStudent = {
        id: user?.id,
        nis: userNis,
        name: userName,
        user_id: user?.user_id,
        classroom_id: user?.classroom_id,
        attendance_number: user?.attendance_number,
        phone_number: Number(userPhoneNumber),
        description: userDescription,
        created_at: user?.created_at,
        updated_at: new Date().toISOString(),
      }
      editProfile(dataProfile);
      navigate("/profile");
    } catch (error) {
      setError("An error uccurred while submitting the form.")
    }
  }

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUserProfilePicture((prev) => ({
  //         ...prev,
  //         profilePicture: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleCancel = () => {
  //   navigate("/profile");
  // };

  return (
    <MainLayout title="Edit Profile">
      <Loading open={loading}/>
      <div className="w-full flex justify-center">
        <div className="w-full">
          <FormLayout
            title="Edit Your Profile"
            description="Fill out the details of your profile below."
            fields={[
              {
                label: "Name",
                placeholder: "Enter Name",
                type: "text",
                value: userName,
                onChange: setUserName,
                disabled: true
              },
              {
                label: "NIS",
                placeholder: "Enter NIS",
                type: "text",
                value: userNis,
                onChange: setUserNis,
                disabled: true
              },
              {
                label: "Phone Number",
                placeholder: "Enter Phone Number",
                type: "number",
                value: userPhoneNumber,
                onChange: setUserPhoneNumber,
                required: true
              },
              {
                label: "Description",
                placeholder: "Enter Description",
                type: "textarea",
                value: userDescription,
                onChange: setUserDescription,
                required: true,
                rows: 4,
              },
            ]}
            onSubmit={handleSubmit}
            buttonLabel="Update Profile"
            error={error}
          />
        </div>
      </div>

          {/* Bagian Ganti Foto Profil
          <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-8">
            <img
              src={userProfilePicture}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-5"
            />
            <label className="bg-customColor-blue text-white px-8 py-2 flex items-center justify-center gap-2 rounded-md cursor-pointer">
            <ImageUp size={25} />
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div> */}

    </MainLayout>
  );
};

export default ProfileEdit;
