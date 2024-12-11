import MainLayout from "../layouts/MainLayout";
import skensa from "../../assets/images/skensa.png";
import Calendar from "../components/SharedCompoent/Calendar";
import { ShoppingBag, User } from "lucide-react";
import Card from "../components/SharedCompoent/Card";
import { useCallback } from "react";


const statisticsData = [
  { label: "Total Subjects", value: 3 },
  { label: "Total Teacher", value: 5 },
];  

const cardsData = {
  subject: {
    title: "PKK",
    desc: "(Produk Kreatif dan Kewirausahaan)",
    icon: <ShoppingBag size={24} />,
    iconClassName: "bg-customColor-coldBlue text-white",
    color: "primary" as const,
    variant: "contained" as const,
  },
  teacher: {
    title: "Ni Komang Dian Dianasari S.T., M.Pd.",
    desc: "NIP.8364876473614792",
    icon: <User size={24} />,
    iconClassName: "bg-customColor-cream text-black",
    color: "third" as const,
    variant: "outlined" as const,
  },
};

const ViewDashboard = () => {
  const handleSearch = useCallback((query: string) => {
    console.log('Searching for:', query);
  }, []);

  // Komponen untuk Hero Section
  const HeroSection = () => (
    <div className="w-full md:h-64 lg:h-80 xl:h-[350px] md:flex items-center shadow-2xl mt-6 rounded-2xl bg-customColor-darkBlue overflow-hidden">
      <div className="lg:px-14 px-8 py-10 md:w-1/2 md:h-auto h-1/2">
        <h2 className="lg:text-3xl xl:text-4xl text-lg font-bold text-white">
          Hi,
          <span className="text-customColor-oranye"> Aldiansah Saputra</span>
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

  // Komponen untuk Statistics Section
  const StatisticsSection = () => (
    <div className="space-y-4">
      <h1 className="md:text-2xl text-lg font-semibold">Today's Data</h1>
      {statisticsData.map((stat, index) => (
        <div
          key={index}
          className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue"
        >
          <h2 className="md:text-2xl text-lg font-medium">{stat.label}:</h2>
          <span className="md:text-8xl text-6xl">{stat.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout 
      title="Dashboard" 
      showSearch={false}
      onSearch={handleSearch}
    >
      <HeroSection />
      
      <div className="flex mt-10 gap-24">
        <h1 className="mb-4 md:text-2xl text-lg font-semibold">On Going</h1>
      </div>

      <div className="w-full flex flex-col xl:grid xl:grid-cols-[2fr_1fr] justify-between gap-10">
        <div className="flex flex-col">
          <div className="w-full flex flex-col md:flex-row gap-7 mb-14">
            <Card
              {...cardsData.subject}
              className="md:w-1/2 w-full"
            />
            <Card
              {...cardsData.teacher}
              className="md:w-1/2 w-full"
            />
          </div>
          <StatisticsSection />
        </div>
        
        <div className="md:flex flex-col">
          <Calendar />
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewDashboard;
