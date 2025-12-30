import { useState } from "react";
import { CuratedExperienceStrip } from "../curated-experience-strip";
import { TourModal } from "../modals/tour-modal";

const SAMPLE_TOURS = [
  {
    id: "tour-1",
    name: "Gorilla Trekking",
    category: "Featured Tour",
    image:
      "https://images.unsplash.com/photo-1551986782-d244d7d1d115?w=800&h=600&fit=crop",
    description:
      "Journey into the mist-covered mountains to witness these majestic creatures in their natural habitat",
  },
  {
    id: "tour-2",
    name: "Akagera Safari",
    category: "Featured Tour",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    description:
      "Experience Africa's wild side through an intimate game drive across diverse ecosystems",
  },
  {
    id: "tour-3",
    name: "Nyungwe Forest",
    category: "Featured Tour",
    image:
      "https://images.unsplash.com/photo-1489493072403-541015f32ebc?w=800&h=600&fit=crop",
    description:
      "Trek through ancient rainforest canopy to discover rare primates and hidden waterfalls",
  },
  {
    id: "tour-4",
    name: "Lake Kivu Experience",
    category: "Experience Tour",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description:
      "Relax by pristine waters with stunning lakeside sunsets and local village encounters",
  },
  {
    id: "tour-5",
    name: "Kigali City Tour",
    category: "Experience Tour",
    image:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&h=600&fit=crop",
    description:
      "Explore Rwanda's vibrant capital city, its museums, markets, and contemporary culture",
  },
  {
    id: "tour-6",
    name: "Canopy Walk Adventure",
    category: "Experience Tour",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",
    description:
      "Walk among the treetops on suspension bridges with panoramic views of pristine forests",
  },
  {
    id: "tour-7",
    name: "Cultural Heritage Tour",
    category: "Experience Tour",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    description:
      "Connect with Rwanda's rich heritage through traditional ceremonies and local storytelling",
  },
  {
    id: "tour-8",
    name: "Golden Monkey Trek",
    category: "Experience Tour",
    image:
      "https://images.unsplash.com/photo-1444464666175-1642158e3c45?w=800&h=600&fit=crop",
    description:
      "Track elusive golden monkeys through misty forests in one of Africa's most exclusive encounters",
  },
];

export function ToursSection() {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTour = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <section id="tours" className="bg-[#f7f6f2]">
      <CuratedExperienceStrip
        items={SAMPLE_TOURS}
        title="Guided Tours & Experiences"
        onItemClick={handleSelectTour}
      />
      {selectedTour && (
        <TourModal
          tour={selectedTour}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
