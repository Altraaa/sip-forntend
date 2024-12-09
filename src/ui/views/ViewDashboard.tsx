import MainLayout from "../layouts/MainLayout";
import skensa from "../../assets/images/skensa.png";
import Calendar from "./../components/SharedCompoent/Calendar";
import { ShoppingBag } from "lucide-react";
import Card from "../components/SharedCompoent/Card";

const ViewDashboard = () => {
  return (
    <>
      <MainLayout title="Dashboard">
        <div className="w-full md:h-64 lg:h-80 xl:h-[350px] md:flex items-center shadow-2xl mt-6 rounded-2xl bg-customColor-darkBlue overflow-hidden">
          <div className="lg:px-14 px-8 py-10 md:w-1/2 md:h-auto h-1/2">
            <h2 className="lg:text-3xl xl:text-4xl text-lg font-bold text-white">
              Hi,
              <span className="text-customColor-oranye">
                {" "}
                Aldiansah Saputra
              </span>
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
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 md:bg-gradient-to-l bg-gradient-to-t from-transparent to-customColor-darkBlue"></div>
          </div>
        </div>
        <div className="flex mt-10 gap-24">
          <h1 className="mb-4 md:text-2xl text-lg font-semibold">On Going</h1>
        </div>
        <div className="w-full flex flex-col xl:grid xl:grid-cols-[2fr_1fr] justify-between gap-10">
          <div className="flex flex-col">
            <div className="w-full flex flex-col md:flex-row gap-7 mb-14">
              <Card 
                title="PKK"
                desc="(Produk Kreatif dan Kewirausahaan)"
                icon={<ShoppingBag />}
                variant="contained"
                color="primary"
                iconColor="iconPrimary"
                iconVariant="iconContained"
              />
              <div className="md:w-1/2 w-full flex gap-2 p-5 justify-center items-center rounded-xl bg-white border-2 border-customColor-blue shadow-xl h-24">
                <div className="flex text-white rounded-full justify-between items-center bg-gray-200 p-7">
                  <img src="" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold">
                    Ni Komang Dian Dianasari S.T., M.Pd.
                  </h2>
                  <p className="text-xs">NIP.8364876473614792</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="md:text-2xl text-lg font-semibold">Today's Data</h1>
              <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
                <h2 className="md:text-2xl text-lg font-medium">Total Subjects:</h2>
                <span className="md:text-8xl text-6xl">3</span>
              </div>
              <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
                <h2 className="md:text-2xl text-lg font-medium">Total Teacher:</h2>
                <span className="md:text-8xl text-6xl">5</span>
              </div>
            </div>
          </div>
          <div className="md:flex flex-col">
            <Calendar />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ViewDashboard;
