import MainLayout from "../layouts/MainLayout";
import skensa from "../../assets/images/skensa.png";
import Calendar from "../components/SharedCompoent/Calendar";
import { ShoppingBag } from "lucide-react";

const ViewDashboard = () => {
  return (
    <>
      <MainLayout title="Dashboard">
        <div className="w-full h-64 flex items-center shadow-2xl mt-6 rounded-2xl bg-customColor-darkBlue overflow-hidden">
          <div className="px-14 w-1/2">
            <h2 className="text-3xl font-bold text-white">
              Hi,
              <span className="text-customColor-oranye">
                {" "}
                Aldiansah Saputra
              </span>
            </h2>
            <p className="font-semibold text-lg text-customColor-cream">
              Welcome to S I P - SKENSA, ready to learn together?
            </p>
          </div>
          <div className="w-1/2 h-full relative">
            <img
              src={skensa}
              alt="Skensa School"
              className="w-full h-full object-cover rounded-r-2xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-customColor-darkBlue"></div>
          </div>
        </div>
        <div className="flex mt-10 gap-24">
          <h1 className="mb-4 text-2xl font-semibold w-1/2">On Going</h1>
        </div>
        <div className="w-full flex justify-between gap-10">
          <div className="flex flex-col w-2/3">
            <div className="w-full flex gap-7 mb-14">
              <div className="w-1/2 flex gap-2 p-5 justify-center items-center rounded-xl bg-customColor-blue shadow-xl h-24">
                <div className="flex text-white rounded-xl justify-between items-center p-4 bg-customColor-coldBlue">
                  <ShoppingBag />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">PKK</h2>
                  <p className="text-xs">(Produk Kreatif dan Kewirausahaan)</p>
                  <p className="text-xs text-customColor-cream">
                    07.00 - 09.20 WITA
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex gap-2 p-5 justify-center items-center rounded-xl bg-white border-2 border-customColor-blue shadow-xl h-24">
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
              <h1 className="text-2xl font-semibold">Today's Data</h1>
              <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
                <h2 className="text-2xl font-medium">Total Subjects:</h2>
                <span className="text-8xl">3</span>
              </div>
              <div className="flex justify-between items-baseline border-b-2 border-b-customColor-lightBlue">
                <h2 className="text-2xl font-medium">Total Teacher:</h2>
                <span className="text-8xl">5</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Calendar />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ViewDashboard;
