import { useState, useEffect, useMemo } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Pagination } from "../components/Pagination";
import CircleLoaders from "../components/Loader";
import BookingForm from "../components/BookingForm";

const ITEMS_PER_PAGE = 6;

export const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from Supabase
  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error("Error fetching bookings:", error);
      else setBookings(data || []);
      setLoading(false);
    };
    loadBookings();
  }, []);

  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return bookings.slice(start, start + ITEMS_PER_PAGE);
  }, [bookings, page]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    if (page > Math.ceil(updated.length / ITEMS_PER_PAGE)) {
      setPage(Math.max(1, page - 1));
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingBooking(null);
    setShowForm(false);
  };

  const handleSave = (booking) => {
    if (editingBooking) {
      setBookings(bookings.map((b) => (b.id === booking.id ? booking : b)));
    } else {
      setBookings([booking, ...bookings]);
      setPage(1);
    }
    handleFormClose();
  };

  if (loading) return <CircleLoaders />;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c9a240] hover:bg-[#b08f37] text-white transition"
        >
          <Plus className="h-5 w-5" />
          Add Booking
        </button>
      </div>

      <div className="p-6 space-y-4">
        {paginatedBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings available</p>
        ) : (
          paginatedBookings.map((b) => (
            <div
              key={b.id}
              className="border border-[#e4e2dc] rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {b.item_type.toUpperCase()} Booking
                </h3>
                <p className="text-sm text-gray-600">
                  Item ID: {b.item_id}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {b.quantity} • Total: ${b.total_price}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {b.status} • {b.start_date || "-"} to {b.end_date || "-"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="p-2 rounded-lg text-[#c9a240] hover:bg-[#c9a240] hover:text-white transition"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-2 rounded-lg text-[#3a5f52] hover:bg-[#3a5f52] hover:text-white transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={page}
        totalItems={bookings.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
      />

      {showForm && (
        <BookingForm
          booking={editingBooking}
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
