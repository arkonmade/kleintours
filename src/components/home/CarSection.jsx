"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CarModal } from "../modals/car-modal";
import { CuratedExperienceStrip } from "../curated-car-strip";
import { supabase } from "../../lib/supabase";

export function CarsSection() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCars(data ?? []);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
      setError(err.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchCars]);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <CuratedExperienceStrip
        items={[]}
        title="The Drive"
        loading
      />
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <section id="cars" className="bg-[#f7f6f2]">
        <CuratedExperienceStrip
          items={cars}
          title="The Drive"
          loading={false}
          onItemClick={handleSelectCar}
        />

        {selectedCar && (
          <CarModal
            cars={cars}
            car={selectedCar}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </section>
    </div>
  );
}
