import { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RockingChair,
  Cog,
  CarFront,
  Fuel,
} from "lucide-react";
import { Pagination } from "../components/Pagination";
import { supabase } from "../lib/supabase";
import CircleLoaders from "../components/Loader";
import { ItemForm } from "../components/admin/MainForm";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 4;

export const CarsListingManager = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error("Failed to load cars");
      else setCars(data || []);
      setLoading(false);
    };
    loadCars();
  }, []);

  const paginatedCars = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return cars.slice(start, start + ITEMS_PER_PAGE);
  }, [cars, page]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Delete this car?</span>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            const { error } = await supabase.from("cars").delete().eq("id", id);
            if (error) {
              toast.error("Failed to delete car");
              return;
            }
            const updated = cars.filter((c) => c.id !== id);
            setCars(updated);
            if (page > Math.ceil(updated.length / ITEMS_PER_PAGE)) {
              setPage(Math.max(1, page - 1));
            }
            toast.success("Car deleted");
          }}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>
      </div>
    ));
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setEditingCar(null);
    setShowForm(false);
  };

  const handleSave = (car) => {
    if (editingCar) {
      setCars(cars.map((c) => (c.id === car.id ? car : c)));
    } else {
      setCars([car, ...cars]);
      setPage(1);
    }
    handleFormClose();
    toast.success(`Car ${editingCar ? "updated" : "added"}`);
  };

  if (loading) return <CircleLoaders />;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <p className="text-2xl font-bold text-gray-900">Car Listings</p>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c9a240] hover:bg-[#b08f37] text-white transition"
        >
          <Plus className="h-5 w-5" />
          Add Car
        </button>
      </div>

      <div className="p-6 space-y-4">
        {paginatedCars.length === 0 ? (
          <p className="text-center text-gray-500">No cars available</p>
        ) : (
          paginatedCars.map((car) => (
            <div
              key={car.id}
              className="border border-[#e4e2dc] rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[1.3rem] font-semibold text-[#0f2f24]">
                    {car.title}
                  </p>
                  <p className="text font-[500]  text-gray-600">
                    ${car.price_per_day} /day
                  </p>
                </div>
                <div className="flex flex-wrap mt-2 gap-2 items-center">
                  <div className="flex gap-1">
                    <RockingChair className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090] ">{car?.seats} </p>
                  </div>
                  <div className="flex gap-1 ">
                    <Cog className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090] capitalize">
                      {car?.transmission}{" "}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <CarFront className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090]">{car?.category} </p>
                  </div>
                  <div className="flex gap-1">
                    <Fuel className="h-4 w-4 text-[#909090]" />
                    <p className="text-sm text-[#909090]">{car?.fuel_type} </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(car)}
                  className="p-2 rounded-lg text-[#c9a240] hover:bg-[#c9a240] hover:text-white transition"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
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
        totalItems={cars.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
      />

      {showForm && (
        <ItemForm
          type="car"
          item={editingCar}
          onClose={handleFormClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
