import { useState } from 'react'; 
interface ToggleSwitchProps {
  isChecked?: boolean; 
  onToggle?: (isEnabled: boolean) => void; 
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked = false, onToggle }) => {
  const [enabled, setEnabled] = useState(isChecked);

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
        enabled ? 'bg-blue-700' : 'bg-orange-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-9' : 'translate-x-1'
        }`}
      ></span>
    </button>
  );
};

export default ToggleSwitch;
