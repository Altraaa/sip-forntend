import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileData } from "@/utils/hooks/userProfile";
import { userEditProfile } from "@/utils/hooks/userProfile";
import { IStudent } from "@/utils/models/Student";
import Loading from "@/ui/components/SharedCompoent/Loading";
import FormLayout from "../../layouts/FormLayout";
import { showModernToast } from "@/ui/components/SharedCompoent/ModernToastContainer";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, loading } = useProfileData();
  const [userName, setUserName] = useState(user?.name);
  const [userNis, setUserNis] = useState(user?.nis);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState(
    user?.profile_picture || ""
  );
  const [error, setError] = useState<string | null>(null);

  const { mutate: editProfile } = userEditProfile();

  useEffect(() => {
    if (user) {
      setUserPhoneNumber(user.phone_number?.toString() || "");
      setUserDescription(user.description || "");
      setUserProfilePicture(user.profile_picture || "");
    }
  }, [user]);

  const handleImageChange = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserProfilePicture(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      if (!userName || !userNis || !userPhoneNumber || !userDescription) {
        setError("All fields are required.");
        return;
      }

      if (!/^\d+$/.test(userPhoneNumber)) {
        setError("Phone number must contain only numbers.");
        return;
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
        profile_picture: userProfilePicture,
        created_at: user?.created_at,
        updated_at: new Date().toISOString(),
      };

      editProfile(dataProfile, {
        onSuccess: () => {
          showModernToast.success("Profile updated successfully!");
          navigate("/profile");
        },
        onError: () => {
          setError("An error occurred while submitting the form.");
          showModernToast.error("Failed to update profile.");
        },
      });
    } catch (error) {
      setError("An unexpected error occurred.");
      showModernToast.error("An unexpected error occurred.");
    }
  };

  return (
    <MainLayout title="Edit Profile">
      <Loading open={loading} />
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
                disabled: true,
              },
              {
                label: "NIS",
                placeholder: "Enter NIS",
                type: "text",
                value: userNis,
                onChange: setUserNis,
                disabled: true,
              },
              {
                label: "Phone Number",
                placeholder: "Enter Phone Number",
                type: "number",
                value: userPhoneNumber,
                onChange: setUserPhoneNumber,
                required: true,
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
              {
                label: "Profile Picture",
                type: "image",
                value: userProfilePicture,
                onChange: handleImageChange,
              },
            ]}
            onSubmit={handleSubmit}
            buttonLabel="Update Profile"
            error={error}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileEdit;
