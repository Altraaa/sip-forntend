import MainLayout from "../layouts/MainLayout";
import {Mail, Phone, MessageCircleMore, MessageCircle} from "lucide-react";

const ViewHelp = () => {
  return (
      <MainLayout title="Help">
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-3">Help Center</h1>
          
          {/* Pengantar */}
          <section className="mb-6 p-4 rounded-lg">
            <p className="text-gray-700">      
              This page is designed to provide a comprehensive guide for users of the <strong>Learning Information System</strong>. 
              Here, you will find various useful information on how to access and utilize each feature in the system, 
              such as viewing and managing class schedules, accessing class details, and adding or managing assignments 
              given by instructors.
            </p>
            <p className="text-gray-700 mt-4">
              Additionally, this page provides detailed explanations on how to access information related to classrooms, 
              including schedules and locations for each attended class. We also offer information on settings and the use 
              of other features in the system, specifically designed to support a smooth learning process, whether it’s viewing 
              teacher details or utilizing various learning resources available on this platform. All this information is structured 
              to help you experience a more effective, organized, and productive learning journey.
            </p>
          </section>

          {/* Panduan Pengguna */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">User Guide</h2>
            
            {/* Login dan Registrasi */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Login</h3>
              <p className="text-gray-700">
                If you are using the system for the first time, ask your instructor about the 
                login process and the required credentials. After that, you can log in using the 
                registered email and password.
              </p>
            </div>
            
            {/* Navigasi Menu */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Menu Navigation</h3>
              <p className="text-gray-700">
                The system has a main menu on the left side, allowing you to access various features 
                such as the dashboard, classes, teachers, and more.
              </p>
            </div>

            {/* Tugas */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Add Task</h3>
              <p className="text-gray-700">
                You can add tasks through the <strong>Add Task</strong> menu by managing assignments from instructors and setting reminders.              
              </p>
            </div>

            {/* Kelas dan Jadwal */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Classes and Schedule</h3>
              <p className="text-gray-700">
                In the <strong>Class</strong> menu, you can view the classes you are enrolled in, including meeting schedules and classroom locations.              
              </p>            
            </div>

            {/* Teacher */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Teacher Menu</h3>
              <p className="text-gray-700">
                Displays complete information about the teachers of each class you attend. You can view the list of teachers and their contact details.              
              </p>            
            </div>

            {/* Profile */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Profile Menu</h3>
              <p className="text-gray-700">
                Manage your personal data such as name, email, profile picture, and other information. You can also update your personal details if needed.              
              </p>            
            </div>

            {/* Setting */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Settings Menu</h3>
              <p className="text-gray-700">
                Provides various account and display settings, including user preferences and notification settings to enable or disable all notifications.
              </p>            
            </div>

            {/* Pencarian dan Notifikasi */}
            <div className="mb-4 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Additional Features</h3>
              <p className="text-gray-700">
                Includes extra features such as Search and Notifications.
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Search: </strong>A search box in the top right corner to find information within the system.
              </p>    
              <p className="text-gray-700">
                <strong>Notifications: </strong>A bell icon in the top right corner to view the latest notifications.
              </p>        
            </div>
          </section>

          {/* Kontak Bantuan */}
          <section className="mb-6 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Chat Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="bg-teal-50 p-6 rounded-lg shadow-lg border-2 border-customColor-blue flex flex-col items-center text-center w-full h-64">
                <Mail 
                  className="text-customColor-darkBlue mb-3" 
                  size={50}
                />
                <h3 className="text-xl font-semibold text-customColor-darkBlue mb-2">Email</h3>
                <p className="text-gray-700">
                  Reach us via email at:
                </p>
                <p className="text-teal-600 mt-2">support@domain.com</p>
              </div>

              {/* Telepon */}
              <div className="bg-teal-50 p-6 rounded-lg shadow-lg border-2 border-customColor-blue flex flex-col items-center text-center w-full h-64">
                <Phone 
                  className="text-customColor-darkBlue mb-3" 
                  size={50}
                />
                <h3 className="text-xl font-semibold text-customColor-darkBlue mb-2">Telepon</h3>
                <p className="text-gray-700">Call us at:</p>
                <p className="text-teal-600 mt-2">+1 234 567 890</p>
              </div>

              {/* Chat Support */}
              <div className="bg-teal-50 p-6 rounded-lg shadow-lg border-2 border-customColor-blue flex flex-col items-center text-center w-full h-64">
                <MessageCircleMore 
                  className="text-customColor-darkBlue mb-3" 
                  size={50}
                />
                <h3 className="text-xl font-semibold text-customColor-darkBlue mb-2">Chat Support</h3>
                <p className="text-gray-700">
                  Contact our support team through the chat icon at the bottom right corner.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Icon Chat */}
        <div className="fixed bottom-6 right-6 group">
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white border text-gray-700 text-sm px-3 py-2 rounded-md 
                        opacity-0 scale-95 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 whitespace-nowrap">            
              Contact our support team.
          </div>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
            >
              <MessageCircle size={30} />
            </a>
        </div>
      </MainLayout>
  );
};

export default ViewHelp;
