import { motion } from "framer-motion";

const CardSkeletonLoader = ({ isCenter }) => {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse ${
        isCenter
          ? "w-80 h-96 sm:w-96 sm:h-[450px] lg:w-[500px] lg:h-[550px]"
          : "w-64 h-80"
      }`}
    >
      {/* Simulated image */}
      <div
        className={`absolute inset-0 bg-gray-400 dark:bg-gray-600 transition-all duration-500 ${
          isCenter ? "grayscale-0 blur-0" : "grayscale blur-sm"
        }`}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 ${
          isCenter
            ? "bg-gradient-to-t from-black/50 via-transparent to-transparent"
            : "bg-gradient-to-t from-black/70 via-transparent to-transparent"
        }`}
      />

      {/* Text placeholders */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 space-y-2">
        <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded" /> {/* Location */}
        <div className="h-6 w-32 bg-gray-400 dark:bg-gray-600 rounded" /> {/* Name */}
        {isCenter && (
          <div className="space-y-2 mt-2">
            <div className="h-3 w-full bg-gray-400 dark:bg-gray-600 rounded" />
            <div className="h-3 w-5/6 bg-gray-400 dark:bg-gray-600 rounded" />
            <div className="h-8 w-32 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" /> {/* Button */}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CardSkeletonLoader;
