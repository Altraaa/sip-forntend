import { useState, useMemo } from "react";
import { ApiAuth } from "@/utils/services/Auth.service"; // Sesuaikan dengan path ke ApiAuth service
import FormLayout from "../layouts/FormLayout";
import LoginImage from "../../assets/images/skensa.png";

const ViewLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiAuth.loginUser({ username, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", username);
      window.location.href = "/dashboard";
    } catch (err: any) {
      // Cek status code dan sesuaikan pesan error
      if (err.response?.status === 401) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const shapes = useMemo(() => {
    const generatedShapes = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 50 + 10; // Ukuran shape antara 10px hingga 60px
      const left = Math.random() * 100; // Posisi horizontal random
      const duration = Math.random() * 5 + 5; // Durasi animasi 5-10 detik

      generatedShapes.push(
        <div
          key={i}
          className="shape"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            animationDuration: `${duration}s`,
          }}
        ></div>
      );
    }
    return generatedShapes;
  }, []); // Hanya dibuat sekali saat komponen pertama kali dirender

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Blue */}
        <div className="absolute inset-0 bg-blue-400">
          {/* Floating Shapes */}
          {shapes}
        </div>

        {/* Login Form */}
        <div className="relative z-10 flex w-full h-full xl:px-32 xl:py-20 px-4 py-12 justify-center items-center">
          <div className="w-full h-full md:justify-center rounded-2xl shadow-2xl border-2 border-customColor-cream bg-white flex">
            <div className="hidden md:flex w-1/2 h-full rounded-2xl">
              <img
                src={LoginImage}
                alt="Login Illustration"
                className="h-full object-cover rounded-l-2xl"
              />
            </div>
            <div className="md:w-1/2 w-full md:px-10 px-6 rounded-2xl h-full flex md:justify-center">
              <FormLayout
                title="Welcome back Student!"
                description="Sign in with your username"
                fields={[
                  {
                    name: "username",
                    label: "Username",
                    placeholder: "Enter your username",
                    type: "text",
                    value: username,
                    onChange: setUsername,
                    required: true,
                  },
                  {
                    name: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    type: "password",
                    value: password,
                    onChange: setPassword,
                    required: true,
                  },
                ]}
                onSubmit={handleLogin}
                buttonLabel="Login"
                loadingLabel="Logging in..."
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Shapes Animation */}
      <style>{`
        .shape {
          position: absolute;
          bottom: -60px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ViewLogin;
