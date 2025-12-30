import React from "react";
import { LuX, LuSearch } from "react-icons/lu";

const suggestions = ["Luxury Cars", "Desert Tours", "City Rides", "VIP Experience"];

const SearchModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-999 bg-black/40 backdrop-blur-sm flex justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          <LuX />
        </button>

        <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
          <LuSearch />
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-full outline-none"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold mb-2">Recommended</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Start typing to see results...
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
