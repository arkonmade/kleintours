import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const CarForm = ({ car, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "sedan",
    price_per_day: 0,
    seats: 2,
    transmission: "automatic",
    fuel_type: "petrol",
    thumbnail: "",
    is_published: true,
  });

  useEffect(() => {
    if (car) {
      const { id, created_at, ...rest } = car;
      setFormData(rest);
    }
  }, [car]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(car || { id: crypto.randomUUID(), created_at: new Date().toISOString() }),
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />

      <div className="w-full max-w-xl bg-white shadow-xl h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {car ? "Edit Car" : "Add New Car"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            >
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="electric">Electric</option>
              <option value="luxury">Luxury</option>
            </select>

            <select
              value={formData.transmission}
              onChange={(e) =>
                setFormData({ ...formData, transmission: e.target.value })
              }
              className="border px-3 py-2 rounded-lg"
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price per day"
              value={formData.price_per_day}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_per_day: Number(e.target.value),
                })
              }
              className="border px-3 py-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Seats"
              value={formData.seats}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seats: Number(e.target.value),
                })
              }
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          <input
            type="text"
            placeholder="Thumbnail URL"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer border border-[#3a5f52] rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-[#c9a240] text-white rounded-lg hover:bg-[#b08f37]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
