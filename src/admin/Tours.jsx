import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  MapPinned,
  UsersRound,
  AlarmClock,
} from "lucide-react";
import { Pagination } from "../components/Pagination";
import { supabase } from "../lib/supabase";
import CircleLoaders from "../components/Loader";
import { ItemForm } from "../components/admin/MainForm";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

export const ToursListingManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const loadTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error("Failed to load tours");
      else setTours(data || []);
      setLoading(false);
    };
    loadTours();
  }, []);

  const paginatedTours = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return tours.slice(start, start + ITEMS_PER_PAGE);
  }, [tours, page]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Delete this tour?</span>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            const updated = tours.filter((tour) => tour.id !== id);
            setTours(updated);
            if (page > Math.ceil(updated.length / ITEMS_PER_PAGE)) {
              setPage(Math.max(1, page - 1));
            }
            toast.success("Tour deleted");
          }}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>
      </div>
    ));
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingTour(null);
    setShowForm(false);
  };

  const handleSave = (tour) => {
    if (editingTour) {
      setTours(tours.map((t) => (t.id === tour.id ? tour : t)));
    } else {
      setTours([
        {
          ...tour,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
        },
        ...tours,
      ]);
      setPage(1);
    }
    handleFormClose();
    toast.success(`Tour ${editingTour ? "updated" : "added"}`);
  };

  if (loading) return <CircleLoaders />;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tour Listings</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c9a240] hover:bg-[#b08f37] text-white transition"
        >
          <Plus className="h-5 w-5" />
          Add Tour
        </button>
      </div>

      <div className="p-6 space-y-4">
        {paginatedTours.length === 0 ? (
          <p className="text-center text-gray-500">No tours available</p>
        ) : (
          paginatedTours.map((tour) => (
            <div
              key={tour.id}
              className="border border-[#e4e2dc] rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <div className="flex gap-4 flex-wrap items-center">
                  <p className="text-[1.2rem] font-semibold text-[#0f2f24]">
                    {tour.name}
                  </p>
                  {tour.is_popular && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {tour.location && (
                    <>
                      <div className="flex gap-1">
                        <MapPinned className="h-4 w-4 text-[#3a5f52]" />
                        <p className="text-sm text-[#2b2b2b]">
                          {tour.location}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="flex gap-1">
                    <UsersRound className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090]">{tour.group_size}</p>
                  </div>
                  <div className="flex gap-1">
                    <AlarmClock className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090]">
                      {tour.duration} {tour.duration > 1 ? "days" : "day"}
                    </p>
                  </div>
                </div>

                {tour.highlights?.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {tour.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="text-sm text-gray-600 inline-block px-2 py-0.5 bg-gray-200 rounded"
                      >
                        #{highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="p-2 rounded-lg text-[#c9a240] hover:bg-[#c9a240] hover:text-white transition"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(tour.id)}
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
        totalItems={tours.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
      />

      {showForm && (
        <ItemForm
          type="tour"
          item={editingTour}
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
