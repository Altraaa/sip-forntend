import { useState } from 'react'; 
interface ToggleSwitchProps {
  isChecked?: boolean; 
  isThemed?: boolean;
  onToggle?: (isEnabled: boolean) => void; 
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked = false, isThemed = false, onToggle }) => {
  const [enabled, setEnabled] = useState(isChecked);
  const [themed] = useState(isThemed);

  const toggleSwitch = () => {
    setEnabled(!enabled);
    if (onToggle) {
      onToggle(!enabled);
    }
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`relative inline-flex h-6 w-14 items-center rounded-full transition-colors ${
        enabled ? ( themed ? 'bg-[#191F31]' : 'bg-blue-700' ) : ( themed ? 'bg-[#FCECCA]' : 'bg-orange-600' ) 
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full ${ themed ? ( enabled ? 'bg-[#FCECCA]' : 'bg-[#191F31]' ) : 'bg-white '} transition-transform ${
          enabled ? 'translate-x-9' : 'translate-x-1'
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
