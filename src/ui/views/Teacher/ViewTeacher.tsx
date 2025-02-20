import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/SharedCompoent/Card";
import { ITeacher } from "../../../utils/models/Teacher";
import { ISchedules } from "@/utils/models/Schedules";
import Loading from "@/ui/components/SharedCompoent/Loading";
import { useTeachersData } from "@/utils/hooks/useTeacher";

const ViewTeachers = () => {
  const { teachers, schedules, userData, loading } = useTeachersData(); // Menggunakan hook gabungan
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(null);

  // Ambil classroom_id dari userData
  const classroomId = userData?.classroom_id;

  // Filter schedules berdasarkan classroom_id
  const filteredSchedules = schedules?.filter(
    (schedule: ISchedules) => schedule.classroom_id === classroomId
  );

  // Ambil daftar teacher_id yang terdaftar pada jadwal yang telah difilter
  const teacherIds = Array.from(
    new Set(
      filteredSchedules?.map((schedule: ISchedules) => schedule.teacher_id)
    )
  );

  // Filter teachers berdasarkan teacher_id yang terdaftar di jadwal
  const filteredTeachers = teachers?.filter((teacher: ITeacher) =>
    teacherIds.includes(teacher.id)
  );

  return (
    <MainLayout title="Teachers">
      {loading && <Loading open={loading} />}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Hi, <span className="text-customColor-oranye">{userData?.name}</span>
        </h2>
        <p className="text-gray-600">This is the teacher page</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredTeachers?.map((teacher: ITeacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            schedules={schedules}
            onClick={() => setSelectedTeacher(teacher)}
          />
        ))}
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
      <p className="text-xs text-center">Teacher Code: {teacher.nip || "Unknown"}</p>
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
      <div className="bg-customColor-blue text-white py-6 px-10 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Detail Guru</h2>
        <div className="flex">
          <div className="flex flex-col w-1/2 justify-start items-start">
            <p className="font-semibold">Nama Guru</p>
            <h3 className="font-bold text-lg">{teacher.name}</h3>
            <p className="font-semibold mt-4">Mata Pelajaran</p>
            <p>{`${teacher.subject?.name}`}</p>
            <p className="mt-2">
              <span className="font-semibold">Teacher Code:</span>{" "}
              {teacher.nip || "Unknown"}
            </p>
            <p className="font-semibold mt-2">Kontak:</p>
            <p>Belum tersedia</p>
          </div>
          <div className="flex flex-col w-1/2 justify-start items-start">
            <p className="font-semibold">Jadwal Hari Ini:</p>
            {Object.keys(groupedSchedule).length > 0 ? (
              <ul>
                {Object.entries(groupedSchedule).map(([room, time], idx) => (
                  <li key={idx}>
                    Ruangan {room} Jam {time.start_time.slice(0, 5)} -{" "}
                    {time.end_time.slice(0, 5)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada jadwal hari ini.</p>
            )}
          </div>
        </div>

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
