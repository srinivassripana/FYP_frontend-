

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";

export default function Interface() {
  const [stage, setStage] = useState(0);
  const [selectedStock, setSelectedStock] = useState(""); // State to track the selected stock
  const internationalStocks = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT"];
  const nseStocks = ["RELIANCE", "TCS", "INFY", "HDFC", "WIPRO"];

  useEffect(() => {
    setTimeout(() => setStage(1), 2000);
    setTimeout(() => setStage(2), 3500);
    setTimeout(() => setStage(3), 4000);
    setTimeout(() => setStage(4), 4500);
    setTimeout(() => setStage(5), 5000);
  }, []);

  const sendToBackend = (inputValue) => {
    console.log("Sending to backend:", inputValue);
  };

  // Callback function to handle stock selection
  const handleStockClick = (stock) => {
    setSelectedStock(stock); // Update the selected stock
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            filter: stage === 5 ? "blur(5px)" : "blur(0px)", // Blur effect applied when stage is 5
          }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/buysell.png')" }}
        />
      )}

      {/* Bear-Bull Logo Animation */}
      <motion.img
        src="/bear-bull.png"
        alt="Logo"
        className="w-24 h-24 rounded-full"
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }} // Perfect center
        animate={{
          scale: stage === 0 ? [0, 1.5, 1] : 1,
          opacity: 1,
          x: stage >= 2 ? "-48vw" : "-50%", // Move to the left
          y: stage >= 2 ? "-47vh" : "-50%", // Move to the top
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Ensures it starts exactly in the center
        }}
      />

      {/* Search Bar */}
      {stage >= 4 && (
        <SearchBar
          onSearch={sendToBackend}
          value={selectedStock} // Display the selected stock in the search bar
        />
      )}

      {stage >= 5 && (
        <motion.div className="mt-10 flex gap-6 z-10">
          {/* International Stocks List */}
          <StockList
            title="International Stocks"
            stocks={internationalStocks}
            onStockClick={handleStockClick} // Pass the callback to StockList
          />
          {/* NSE Stocks List */}
          <StockList
            title="NSE Stocks"
            stocks={nseStocks}
            onStockClick={handleStockClick} // Pass the callback to StockList
          />
        </motion.div>
      )}

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