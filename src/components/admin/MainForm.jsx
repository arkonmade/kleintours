import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const ItemForm = ({ item, type, onClose, onSave }) => {
  // Initialize formData with defaults immediately
  const defaultCar = {
    title: "",
    description: "",
    category: "sedan",
    price_per_day: 0,
    seats: 2,
    transmission: "automatic",
    fuel_type: "petrol",
    thumbnail: "",
    is_published: true,
  };

  const defaultTour = {
    name: "",
    description: "",
    highlights: [],
    group_size: 1,
    duration: 1,
    location: "",
    thumbnail: "",
    is_popular: false,
    is_published: true,
  };

  const [formData, setFormData] = useState(type === "car" ? defaultCar : defaultTour);

  useEffect(() => {
    if (item) {
      const { id, created_at, updated_at, ...rest } = item;
      setFormData({
        ...rest,
        highlights: rest.highlights || [],
      });
    } else {
      // Reset to defaults when type changes or no item
      setFormData(type === "car" ? defaultCar : defaultTour);
    }
  }, [item, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(item || { id: crypto.randomUUID(), created_at: new Date().toISOString() }),
      ...formData,
    });
  };

  // For Tour highlights
  const handleHighlightChange = (index, value) => {
    const newHighlights = [...(formData.highlights || [])];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...(formData.highlights || []), ""] });
  };

  const removeHighlight = (index) => {
    const newHighlights = (formData.highlights || []).filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: newHighlights });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full max-w-xl bg-white shadow-xl h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {item ? `Edit ${type === "car" ? "Car" : "Tour"}` : `Add New ${type === "car" ? "Car" : "Tour"}`}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === "car" ? (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.category || "sedan"}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border px-3 py-2 rounded-lg"
                >
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="electric">Electric</option>
                  <option value="luxury">Luxury</option>
                </select>

                <select
                  value={formData.transmission || "automatic"}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
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
                  value={formData.price_per_day || 0}
                  onChange={(e) => setFormData({ ...formData, price_per_day: Number(e.target.value) })}
                  className="border px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Seats"
                  value={formData.seats || 0}
                  onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <input
                type="text"
                placeholder="Thumbnail URL"
                value={formData.thumbnail || ""}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                Published
              </label>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Tour Name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
                rows={3}
              />

              <div>
                <label className="font-semibold text-gray-700">Highlights</label>
                {(formData.highlights || []).map((h, i) => (
                  <div key={i} className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={h || ""}
                      onChange={(e) => handleHighlightChange(i, e.target.value)}
                      className="flex-1 border px-3 py-2 rounded-lg"
                    />
                    <button type="button" onClick={() => removeHighlight(i)} className="px-2 py-1 text-red-500">
                      X
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addHighlight} className="mt-2 px-3 py-1 bg-gray-200 rounded-lg">
                  Add Highlight
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Group Size"
                  value={formData.group_size || 1}
                  onChange={(e) => setFormData({ ...formData, group_size: Number(e.target.value) })}
                  className="border px-3 py-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Duration (days)"
                  value={formData.duration || 1}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <input
                type="text"
                placeholder="Location"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                value={formData.thumbnail || ""}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                  />
                  Popular
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  />
                  Published
                </label>
              </div>
            </>
          )}

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
