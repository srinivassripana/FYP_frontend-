import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Interface() {
  const [stage, setStage] = useState(0); // Controls animation stages
  const [inputValue, setInputValue] = useState("");

  const internationalStocks = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT"];
  const nseStocks = ["RELIANCE", "TCS", "INFY", "HDFC", "WIPRO"];

  useEffect(() => {
    setTimeout(() => setStage(1), 2000); // Logo ripple effect
    setTimeout(() => setStage(2), 3500); // Move logo to top-right & fix
    setTimeout(() => setStage(3), 4000); // Show background image
    setTimeout(() => setStage(4), 4500); // Show search bar
    setTimeout(() => setStage(5), 5000); // Show stock tickers
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendToBackend = () => {
    console.log("Sending to RL backend:", inputValue);
    // Implement backend API call here
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image Appears After Logo Settles */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/buysell.png')" }}
        />
      )}

      {/* Bear-Bull Logo Animation */}
      <motion.img
        src="/bear-bull.png"
        alt="Logo"
        className="w-24 h-24 absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: stage === 0 ? [0, 1.5, 1] : 1,
          opacity: 1,
          x: stage >= 2 ? "40vw" : 0,
          y: stage >= 2 ? "-40vh" : 0,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ position: stage >= 2 ? "fixed" : "absolute", top: 20, right: 20 }}
      />

      {/* Search Bar */}
      {stage >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-20 text-center relative z-10"
        >
          <input
            type="text"
            placeholder="Enter stock ticker..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && sendToBackend()}
            className="w-80 px-4 py-2 rounded-lg border border-gray-400 bg-gray-800 text-white focus:outline-none"
          />
        </motion.div>
      )}

      {/* International & NSE Stocks */}
      {stage >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 flex gap-6 z-10"
        >
          {/* International Stocks */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg w-48 text-center"
          >
            <h2 className="text-lg font-bold mb-2">International Stocks</h2>
            {internationalStocks.map((stock) => (
              <p key={stock} className="bg-gray-700 px-3 py-1 mt-1">
                {stock}
              </p>
            ))}
          </motion.div>

          {/* NSE Stocks */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg w-48 text-center"
          >
            <h2 className="text-lg font-bold mb-2">NSE Stocks</h2>
            {nseStocks.map((stock) => (
              <p key={stock} className="bg-gray-700 px-3 py-1 mt-1">
                {stock}
              </p>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Full Stock List Hyperlink */}
      {stage >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-blue-400 underline cursor-pointer z-10"
        >
          <a href="/all-stocks" target="_blank" rel="noopener noreferrer">
            View All Ticker Symbols →
          </a>
        </motion.div>
      )}
    </div>
  );
}
