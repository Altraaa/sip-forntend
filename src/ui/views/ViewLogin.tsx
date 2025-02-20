import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuth } from "@/utils/services/Auth.service"; // Sesuaikan dengan path ke ApiAuth service
import { showModernToast } from "../components/SharedCompoent/ModernToastContainer";
import FormLayout from "../layouts/FormLayout";
import LoginImage from "../../assets/images/skensa.png";

const ViewLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pemeriksaan waktu login saat komponen dimuat
  useEffect(() => {
    const loginTime = localStorage.getItem("lastAccess");
    const currentTime = Date.now();

    if (loginTime) {
      // Mengecek apakah sudah lebih dari 6 jam
      const timeElapsed = currentTime - new Date(loginTime).getTime();
      const sixHours = 6 * 60 * 60 * 1000; // 6 jam dalam milidetik

      if (timeElapsed > sixHours) {
        // Jika lebih dari 6 jam, reset localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("studentId");
        localStorage.removeItem("lastAccess");

        showModernToast.error("Session expired, please log in again!");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiAuth.loginUser({ username, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", username);
      const currentTime = Date.now();
      localStorage.setItem("lastAccess", currentTime.toString()); // Menyimpan waktu login

      // Tampilkan toast sukses
      showModernToast.success("Login Successfully");

      // Tunggu 500ms sebelum redirect
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/"); // Redirect ke halaman utama setelah login sukses
    } catch (err: any) {
      if (err?.response?.status === 401) {
        showModernToast.error("Username atau password salah!");
      } else {
        showModernToast.error(err.message || "Terjadi kesalahan saat login");
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
