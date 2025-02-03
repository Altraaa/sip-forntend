import { useState, useEffect } from "react";
import { ITeacher } from "../../../utils/models/Teacher";
import { ApiTeachers } from "../../../utils/services/Teacher.service";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/SharedCompoent/Card";
import { ISchedules } from "@/utils/models/Schedules";
import { ApiSchedules } from "@/utils/services/Schedule.service";

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [schedules, setSchedules] = useState<ISchedules[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersData = await ApiTeachers.getAll();
        const scheduleData = await ApiSchedules.getAll();
        setTeachers(teachersData);
        setSchedules(scheduleData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout title="Teachers" showSearch={false}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Hi, <span className="text-customColor-oranye">Nama</span>
        </h2>
        <p className="text-gray-600">This is the teacher page</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              schedules={schedules}
              onClick={() => setSelectedTeacher(teacher)}
            />
          ))
        )}
      </div>

      {selectedTeacher && (
        <TeacherPopup
          teacher={selectedTeacher}
          schedules={schedules}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </MainLayout>
  );
};

const getToday = () => {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date()
  );
};

const TeacherCard = ({
  teacher,
  onClick,
}: {
  teacher: ITeacher;
  schedules: ISchedules[];
  onClick: () => void;
}) => {
  return (
    <Card
      onClick={onClick}
      className="text-white flex flex-col !justify-start rounded-lg shadow-md cursor-pointer"
    >
      <div className="w-20 h-20 bg-gray-300 rounded-full mb-2"></div>
      <h3 className="font-bold text-lg text-center">{teacher.name}</h3>
      <p className="text-md text-center">{`${teacher.subject?.name}`}</p>
      <p className="text-xs text-center">NIP: {teacher.nip || "Unknown"}</p>
    </Card>
  );
};

const TeacherPopup = ({
  teacher,
  schedules,
  onClose,
}: {
  teacher: ITeacher;
  schedules: ISchedules[];
  onClose: () => void;
}) => {
  const todaySchedule = schedules.filter(
    (s) => s.teacher_id === teacher.id && s.day === getToday()
  );

  const groupedSchedule = todaySchedule.reduce((acc, curr) => {
    if (!acc[curr.room]) {
      acc[curr.room] = { start_time: curr.start_time, end_time: curr.end_time };
    } else {
      acc[curr.room].end_time = curr.end_time;
    }
    return acc;
  }, {} as Record<string, { start_time: string; end_time: string }>);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-customColor-blue text-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="font-bold text-lg">{teacher.name}</h3>
        <p>{`${teacher.subject?.name}`}</p>
        <p className="mt-2">
          <span className="font-semibold">NIP:</span> {teacher.nip || "Unknown"}
        </p>

        <p className="font-semibold mt-2">Jadwal Hari Ini:</p>
        {Object.keys(groupedSchedule).length > 0 ? (
          <ul>
            {Object.entries(groupedSchedule).map(([room, time], idx) => (
              <li key={idx}>
                - {room}, {time.start_time.slice(0, 5)} -{" "}
                {time.end_time.slice(0, 5)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada jadwal hari ini.</p>
        )}

        <p className="font-semibold mt-2">Kontak:</p>
        <p>Belum tersedia</p>

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTeachers;
