"use client";

import React, { useState } from "react";
import { CuratedExperienceStrip } from "../curated-experience-strip";
import { CarModal } from "../modals/car-modal";

const SAMPLE_CARS = [
  {
    id: "car-1",
    name: "Toyota Land Cruiser",
    category: "Safari 4x4",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.nKVgeWNbfGFvetrFp1qc9wHaEK",
    description:
      "Legendary full-size 4x4 known for durability, high ground clearance, and exceptional off-road performance. Widely used for safaris and rugged expeditions.",
    seats: 7,
    drive: "4WD",
  },
  {
    id: "car-2",
    name: "Mercedes-Benz E-Class",
    category: "Premium Sedan",
    image:
      "https://www.mercedes-benz.co.za/content/dam/SouthAfrica/passengercars/cars/E-Class/E-Class_Sedan/image/e-class-tactical-1884x1884px.jpg",
    description:
      "Luxury executive sedan offering a smooth ride, premium interior, and advanced safety features. Ideal for city travel and business-class comfort.",
    seats: 5,
    drive: "RWD / AWD",
  },
  {
    id: "car-3",
    name: "Toyota Highlander",
    category: "Family SUV",
    image:
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop",
    description:
      "Spacious and reliable mid-size SUV with three-row seating, perfect for families, long trips, and everyday comfort.",
    seats: 7,
    drive: "AWD",
  },
  {
    id: "car-4",
    name: "Land Rover Defender",
    category: "All-Terrain",
    image:
      "https://images.unsplash.com/photo-1533473359331-35ad069e7d94?w=800&h=600&fit=crop",
    description:
      "Iconic all-terrain SUV engineered for extreme environments, featuring advanced traction systems and rugged design.",
    seats: 5,
    drive: "4WD",
  },
  {
    id: "car-5",
    name: "Jeep Wrangler Rubicon",
    category: "Off-Road Adventure",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop",
    description:
      "Purpose-built off-road vehicle with locking differentials, removable roof, and trail-rated capability for extreme terrain.",
    seats: 5,
    drive: "4WD",
  },
];

export function CarsSection() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <section id="cars" className=" bg-[#f7f6f2]">
          <CuratedExperienceStrip
            items={SAMPLE_CARS}
            title="The Drive"
            onItemClick={handleSelectCar}
          />
          {selectedCar && (
            <CarModal
              car={selectedCar}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </section>
      </div>
    </>
  );
}
