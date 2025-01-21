import { ImageUp } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "Nama",
    lastName: "Siswa",
    email: "email@gmail.com",
    phone: "+62 785237996698",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos nulla, distinctio expedita nam iusto explicabo dicta ipsam odit quasi provident repellendus consectetur delectus! Quod fugit delectus nesciunt officia, impedit deleniti.",
    profilePicture: "src/assets/images/dummyAvatar.png",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Reset error saat user mengetik
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      firstName: userData.firstName.trim() === "" ? "First Name is required." : "",
      lastName: userData.lastName.trim() === "" ? "Last Name is required." : "",
      email: userData.email.trim() === "" ? "Email is required." : "",
      phone:
        userData.phone.trim() === ""
          ? "Phone number is required."
          : !/^\d+$/.test(userData.phone.trim())
          ? "Phone number must contain only numbers."
          : "",
      description:
        userData.description.trim() === "" ? "Description is required." : "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      console.log("Saved data:", userData);
      navigate("/profile");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <MainLayout title="Edit Profile">
      <h2 className="text-2xl font-semibold mb-6">Edit Account Information</h2>
      <div className="bg-gray-200 p-8 rounded-lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Bagian Ganti Foto Profil */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center mb-8">
            <img
              src={userData.profilePicture}
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
          </div>

          {/* Form Input untuk First Name */}
          <label className="block">
            <span className="font-semibold">First Name</span>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </label>

          {/* Form Input untuk Last Name */}
          <label className="block">
            <span className="font-semibold">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </label>

          {/* Form Input untuk Email */}
          <label className="block">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </label>

          {/* Form Input untuk Phone */}
          <label className="block">
            <span className="font-semibold">Phone</span>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </label>

          {/* Form Input untuk Description */}
          <label className="block col-span-1 md:col-span-2">
            <span className="font-semibold">Description</span>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </label>

          {/* Tombol Save & Cancel */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-customColor-darkBlue text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfileEdit;
