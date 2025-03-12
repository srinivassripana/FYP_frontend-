import { motion } from "framer-motion";

export default function StockList({ title, stocks }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-gray-800 p-4 rounded-lg shadow-lg w-48 text-center"
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {stocks.map((stock) => (
        <p key={stock} className="bg-gray-700 px-3 py-1 mt-1">
          {stock}
        </p>
      ))}
    </motion.div>
  );
}
