import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./ui/components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ClassPage from "./pages/ClassPage";
import SchedulePage from "./pages/SchedulePage";
import TeacherPage from "./pages/TeacherPage";
import ProfilePage from "./pages/Profile";
import ProfileEditPage from "./pages/ProfileEdit";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import AddTaskPage from "./pages/AddTaskPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/routes/ProtectedRoutes";

function App() {
  return (
    <main className="font-poppins">
      <SidebarProvider>
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/class"
              element={
                <ProtectedRoute>
                  <ClassPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <SchedulePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher"
              element={
                <ProtectedRoute>
                  <TeacherPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addtask"
              element={
                <ProtectedRoute>
                  <AddTaskPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileEdit"
              element={
                <ProtectedRoute>
                  <ProfileEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <HelpPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </main>
  );
}

export default App;
