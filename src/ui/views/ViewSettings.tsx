import MainLayout from "../layouts/MainLayout";
import ToggleSwitch from "../components/SharedCompoent/ToggleSwitch";
const ViewSettings = () => {
  const handleToggle = (isEnabled: boolean) => {
    console.log("Toggle is now", isEnabled ? "ON" : "OFF");
  };
  return (
    <>
      <MainLayout title="Settings" className="my-11">
        <div className="font-bold text-3xl mb-2">Notification</div>
        <div className="flex justify-between w-full border-b-black border-b-2 pb-2">
          <div>
            <div className="font-semibold text-2xl">Enable Notification</div>
            <div>Turn on Or Turn Off all notification</div>
          </div>
          <div className="self-center ">
            <ToggleSwitch isChecked={false} isThemed={false} onToggle={handleToggle} />
          </div>
        </div>
        <div className="flex justify-between border-b-2 border-b-black mt-5 pb-2">
          <div className="font-semibold text-2xl">Upcoming Class</div>
          <ToggleSwitch isChecked={false} isThemed={false} onToggle={handleToggle} />
        </div>
        <div className="flex justify-between border-b-2 border-b-black mt-5 pb-2">
          <div className="font-semibold text-2xl">Task Due</div>
          <ToggleSwitch isChecked={false} isThemed={false} onToggle={handleToggle} />
        </div>

        <div className="font-bold text-3xl mb-2 mt-5">Appearance</div>
        <div className="flex justify-between w-full border-b-black border-b-2 pb-2">
          <div>
            <div className="font-semibold text-2xl">Theme</div>
            <div>Switch Theme Between Dark Mode or Light Mode</div>
          </div>
          <div className="self-center ">
            <ToggleSwitch isChecked={true} isThemed={true} onToggle={handleToggle} />
          </div>
        </div>

        <div className="font-bold text-3xl mb-2 mt-5">Preference</div>
        <div className="flex justify-between w-full border-b-black border-b-2 pb-2">
          <div>
            <div className="font-semibold text-2xl">Enable Notification</div>
            <div>Turn on Or Turn Off all notification</div>
          </div>
          <div className="self-center ">
            <ToggleSwitch isChecked={true} isThemed={false} onToggle={handleToggle} />
          </div>
        </div>
        <div className="flex justify-between border-b-2 border-b-black mt-5 pb-2">
          <div className="font-semibold text-2xl">Upcoming Class</div>
          <ToggleSwitch isChecked={false} isThemed={false} onToggle={handleToggle} />
        </div>
        <div className="flex justify-between border-b-2 border-b-black mt-5 pb-2">
          <div className="font-semibold text-2xl">Task Due</div>
          <ToggleSwitch isChecked={false} isThemed={false} onToggle={handleToggle} />
        </div>
      </MainLayout>
    </>
  );
};

export default ViewSettings;
