import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase";

const STATUSES = ["pending", "confirmed", "cancelled", "completed", "no_show"];

const BookingForm = ({ booking, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    profile_id: "",
    item_type: "car",
    item_id: "",
    quantity: 1,
    status: "pending",
    start_date: "",
    end_date: "",
  });

  const [itemDetails, setItemDetails] = useState(null);
  const [loadingItem, setLoadingItem] = useState(false);

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  // Fetch item details for preview
  useEffect(() => {
    if (!formData.item_id) return;

    const loadItem = async () => {
      setLoadingItem(true);
      const table = formData.item_type === "car" ? "cars" : "tours";
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", formData.item_id)
        .single();

      if (error) {
        console.error("Error fetching item:", error);
        setItemDetails(null);
      } else {
        setItemDetails(data);
      }
      setLoadingItem(false);
    };

    loadItem();
  }, [formData.item_id, formData.item_type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_date || !formData.end_date || !formData.item_id) {
      alert("Please select valid dates and item.");
      return;
    }

    if (!itemDetails) {
      alert("Item details are not loaded yet.");
      return;
    }

    // Calculate total price
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const unitPrice =
      formData.item_type === "car" ? itemDetails.price_per_day : itemDetails.price;
    const total_price = days * unitPrice * formData.quantity;

    // Save booking
    await onSave({
      ...formData,
      total_price,
      id: booking?.id || crypto.randomUUID(),
      created_at: booking?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-lg bg-white shadow-xl h-full overflow-y-auto animate-slide-in-right">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {booking ? "Edit Booking" : "Add Booking"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Profile ID"
            value={formData.profile_id}
            onChange={(e) => setFormData({ ...formData, profile_id: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <select
            value={formData.item_type}
            onChange={(e) =>
              setFormData({ ...formData, item_type: e.target.value, item_id: "" })
            }
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="car">Car</option>
            <option value="tour">Tour</option>
          </select>

          <input
            type="text"
            placeholder={`Enter ${formData.item_type} ID`}
            value={formData.item_id}
            onChange={(e) => setFormData({ ...formData, item_id: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {loadingItem && <p className="text-sm text-gray-500">Loading item details...</p>}
          {itemDetails && (
            <p className="text-sm text-gray-600">
              Selected {formData.item_type}: {itemDetails.title || itemDetails.name} | Price per day: $
              {formData.item_type === "car" ? itemDetails.price_per_day : itemDetails.price}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.start_date || ""}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="date"
              value={formData.end_date || ""}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="border px-3 py-2 rounded-lg"
              required
            />
          </div>

          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            min={1}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

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

export default BookingForm;
