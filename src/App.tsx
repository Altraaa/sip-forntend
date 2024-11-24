import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewDashboard from "./ui/views/ViewDashboard";
import ViewClass from "./ui/views/Class/ViewClass";
import ViewSchedule from "./ui/views/Schedule/ViewSchedule";
import ViewTeacher from "./ui/views/Teacher/ViewTeacher";
import { SidebarProvider } from "./ui/components/Sidebar";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ViewDashboard />} />
          <Route path="/class" element={<ViewClass />} />
          <Route path="/schedule" element={<ViewSchedule />} />
          <Route path="/teacher" element={<ViewTeacher />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
