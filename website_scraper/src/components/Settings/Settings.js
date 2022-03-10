import ClearLocalStorage from "../ClearLocalStorage/ClearLocaleStorage";
import MakeTable from "../MakeTable/MakeTable";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <MakeTable />
      <ClearLocalStorage />
    </div>
  );
};

export default Settings;
