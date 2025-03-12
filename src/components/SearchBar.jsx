import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="text-center">
      <input
        type="text"
        placeholder="Enter stock ticker..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        className="w-80 px-4 py-2 rounded-lg border border-gray-400 bg-gray-800 text-white focus:outline-none"
      />
    </div>
  );
}
