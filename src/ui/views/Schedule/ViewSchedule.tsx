import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/SharedCompoent/Card";
import { useState } from "react";

// Data jadwal
const scheduleData = {
  "Senin": [
    { time: "07:30-08:10", subject: "PW", desc: "Pemrograman Web" },
    { time: "08:10-08:50", subject: "PW", desc: "Pemrograman Web" },
    { time: "08:50-09:30", subject: "PW", desc: "Pemrograman Web" },
    { time: "09:30-10:10", subject: "PW", desc: "Pemrograman Web" },
    { time: "10:10-10:30", subject: "Istirahat", desc: "" },
    { time: "10:30-11:10", subject: "PW", desc: "Pemrograman Web" },
    { time: "11:10-11:50", subject: "PW", desc: "Pemrograman Web" },
    { time: "11:50-12:30", subject: "PW", desc: "Pemrograman Web" },
    { time: "12:30-13:10", subject: "PW", desc: "Pemrograman Web" },
    { time: "13:10-13:30", subject: "Istirahat", desc: "" },
    { time: "13:30-14:10", subject: "Matematika", desc: "" },
    { time: "14:10-14:50", subject: "Bahasa Indonesia", desc: "" },
    { time: "14:50-15:30", subject: "Bahasa Indonesia", desc: "" },
  ],
  "Selasa": [
    { time: "07:30-08:10", subject: "PKK", desc: "Produk Kreatif dan Kewirausahaan" },
    // ... tambahkan data untuk hari Selasa
  ],
  // ... tambahkan data untuk hari lainnya
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "07:30-08:10", "08:10-08:50", "08:50-09:30", "09:30-10:10",
  "10:10-10:30", "10:30-11:10", "11:10-11:50", "11:50-12:30",
  "12:30-13:10", "13:10-13:30", "13:30-14:10", "14:10-14:50",
  "14:50-15:30"
];

const ViewSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <MainLayout title="Schedule" showSearch={false}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Hi, <span className="text-customColor-oranye">Nama</span>
        </h2>
        <p className="text-gray-600">This is the schedule for your class</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="grid grid-cols-6 gap-2">
          {/* Time Column */}
          <div className="space-y-2">
            <div className="h-12" /> {/* Empty space for header alignment */}
            {timeSlots.map((time) => (
              <div key={time} className="h-20 flex items-center text-sm text-gray-600">
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <div className="h-12 flex items-center justify-center font-semibold">
                {day}
              </div>
              {timeSlots.map((time) => {
                const subject = scheduleData["Senin"].find(s => s.time === time);
                return (
                  <Card
                    key={`${day}-${time}`}
                    className={`h-20 ${
                      subject?.subject === "Istirahat" 
                        ? "bg-gray-200" 
                        : subject 
                        ? "bg-customColor-cream hover:shadow-lg cursor-pointer" 
                        : "bg-gray-50"
                    }`}
                  >
                    {subject && (
                      <div className="text-center">
                        <h3 className="font-semibold text-sm">{subject.subject}</h3>
                        {subject.desc && (
                          <p className="text-xs text-gray-600">{subject.desc}</p>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewSchedule;
