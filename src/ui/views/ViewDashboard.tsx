import MainLayout from "../layouts/MainLayout";
import skensa from "../../assets/images/skensa.png";
import { ShoppingBag, User } from "lucide-react";
import Card from "../components/SharedCompoent/Card";
import Loading from "../components/SharedCompoent/Loading";
import { useUser } from "@/utils/hooks/useUser";
import { useSchedules } from "@/utils/hooks/useSchedule";
import { useTodayData } from "@/utils/hooks/useFilterData";
import Calendar from "../components/SharedCompoent/Calendar";
import { ISchedules } from "@/utils/models/Schedules";

// Fungsi untuk memformat waktu agar hanya menampilkan jam dan menit
const formatTime = (time: string | null | undefined) => {
  if (!time) return "-"; // Pastikan time tidak null atau undefined
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

const ViewDashboard = () => {
  // Query untuk mengambil data user
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const {
    data: schedules,
    isLoading: schedulesLoading,
    error: schedulesError,
  } = useSchedules();

  // Ambil classroom_id dari user
  const classroomId = user?.classroom_id || 0;

  // Filter schedules berdasarkan classroom_id sebelum diteruskan ke useTodayData
  const filteredSchedules =
    schedules?.filter(
      (schedule: ISchedules) => schedule.classroom_id === classroomId
    ) || [];

  // Gunakan useTodayData dengan data jadwal yang sudah difilter
  const { data: todayData, isLoading: todayDataLoading } = useTodayData(
    filteredSchedules,
    classroomId
  );

  // Mengelola kondisi loading
  const loading = userLoading || schedulesLoading || todayDataLoading;

  if (userError || schedulesError) {
    return <p>Error fetching data</p>;
  }

  const HeroSection = ({ user }: { user: any }) => (
    <div className="w-full md:h-64 lg:h-80 xl:h-[350px] md:flex items-center shadow-2xl mt-6 rounded-2xl bg-customColor-darkBlue overflow-hidden">
      <div className="lg:px-14 px-8 py-10 md:w-1/2 md:h-auto h-1/2">
        <h2 className="lg:text-3xl xl:text-4xl text-lg font-bold text-white">
          Hi,
          <span className="text-customColor-oranye"> {user?.name}</span>
        </h2>
        <p className="font-semibold lg:text-lg xl:text-xl md:text-sm text-xs text-customColor-cream">
          Welcome to S I P - SKENSA, ready to learn together?
        </p>
      </div>
      <div className="md:w-1/2 md:h-full w-full h-1/2 relative">
        <img
          src={skensa}
          alt="Skensa School"
          className="w-full h-full object-cover rounded-r-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 md:bg-gradient-to-l bg-gradient-to-t from-transparent to-customColor-darkBlue" />
      </div>
    </div>
  );

  const StatisticsSection = ({ todayData }: { todayData: any }) => (
    <div className="space-y-4">
      <h1 className="md:text-3xl text-lg font-semibold">Today's Data</h1>
      <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
        <h2 className="md:text-2xl text-lg font-medium">Total Subjects:</h2>
        <span className="md:text-8xl text-6xl">{todayData?.totalSubjects}</span>
      </div>
      <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
        <h2 className="md:text-2xl text-lg font-medium">Total Teachers:</h2>
        <span className="md:text-8xl text-6xl">{todayData?.totalTeachers}</span>
      </div>
    </div>
  );

  return (
    <MainLayout title="Dashboard" showSearch={false}>
      <Loading open={loading} />
      <HeroSection user={user} />
      <div className="w-full mt-12 md:mt-16 flex flex-col xl:grid xl:grid-cols-[2fr_1fr] justify-between gap-10">
        <div className="flex flex-col justify-between gap-5 md:gap-2 xl:gap-8">
          <div className="font-semibold text-xl md:text-3xl md:mb-5 xl:mb-0">
            On Going
          </div>
          <div className="flex flex-col md:flex-row md:gap-10 gap-6 mb-5 md:mb-10 xl:mb-0">
            <Card
              title={todayData?.subject || "No Data"}
              desc={`${formatTime(todayData?.startTime)} - ${formatTime(
                todayData?.endTime
              )}`}
              icon={<ShoppingBag size={24} />}
              iconClassName="bg-customColor-coldBlue text-white"
              color="primary"
              variant="contained"
              className="md:w-1/2 w-full !justify-start !pl-6 !gap-x-6 xl:pl-0 xl:gap-x-0"
            />
            <Card
              title={todayData?.teacher || "No Data"}
              desc={`Teacher Code: ${todayData?.nip || "-"}`}
              icon={<User size={24} />}
              iconClassName="bg-customColor-lightOranye text-white"
              color="third"
              variant="outlined"
              className="md:w-1/2 w-full !justify-start !pl-6 !gap-x-6 xl:pl-0 xl:gap-x-0"
            />
          </div>
          <StatisticsSection todayData={todayData} />
        </div>
        <div className="md:flex flex-col">
          <div>
            <h1 className="md:text-3xl text-xl font-semibold mb-5 ">
              Schedule
            </h1>
            <div className="w-full">
              <Calendar schedules={filteredSchedules} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewDashboard;
