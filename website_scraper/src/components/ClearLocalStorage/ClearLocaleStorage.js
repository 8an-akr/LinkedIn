import "./ClearLocalStorage.css";

const ClearLocalStorage = () => {
  return (
    <button
      id="clearLocalStorage"
      onClick={() => localStorage.removeItem("list")}
    >
      Clear LocalStorage
    </button>
  );
};

export default ClearLocalStorage;
