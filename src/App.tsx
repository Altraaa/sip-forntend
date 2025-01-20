import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./ui/components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import ClassPage from "./pages/ClassPage";
import SchedulePage from "./pages/SchedulePage";
import TeacherPage from "./pages/TeacherPage";
import ProfilePage from "./pages/Profile";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import AddTaskPage from "./pages/AddTaskPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <main className="font-poppins">
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/class" element={<ClassPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </main>
  );
}

export default App;
