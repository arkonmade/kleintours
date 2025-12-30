
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Users, Zap, Gauge } from "lucide-react";
import { Button } from "../ui/button";
import { BookingModal } from "./booking-modal";

const CAR_DETAILS = {
  "car-1": {
    // Toyota Prado TXL (The Rwanda Workhorse)
    passengers: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    images: [
      "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&q=80", // White Prado Front
      "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80", // Modern SUV Dashboard
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80", // Off-road Detail
    ],
  },
  "car-2": {
    // Toyota RAV4 / Hybrid SUV
    passengers: 4,
    transmission: "Automatic",
    fuel: "Hybrid",
    images: [
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80", // White RAV4 Exterior
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80", // SUV Interior/Cockpit
      "https://images.unsplash.com/photo-1566367576585-051277d52997?w=800&q=80", // Profile View
    ],
  },
  "car-3": {
    // Toyota Land Cruiser 300 (7-Seater)
    passengers: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    images: [
      "https://images.unsplash.com/photo-1626012356515-460f47e30739?w=800&q=80", // LC300 Front Profile
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", // Rear/Side View
      "https://images.unsplash.com/photo-1506469717960-433cebe3f181?w=800&q=80", // Luxury SUV Leather Seats
    ],
  },
  "car-4": {
    // Toyota Fortuner (Manual/Rugged)
    passengers: 5,
    transmission: "Manual",
    fuel: "Diesel",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", // Off-road SUV Side
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80", // Front Close-up
      "https://images.unsplash.com/photo-1533473359331-35ad069e7d94?w=800&q=80", // Mountain terrain action
    ],
  },
};

export function CarModal({ car, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const details = CAR_DETAILS[car.id] || CAR_DETAILS["car-1"];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % details.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + details.images.length) % details.images.length
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-[50%] right-0 z-50 w-[100%] max-w-[1380px] max-h-[80vh] translate-x-[-50%] overflow-y-auto"
            >
              <div className="bg-[#f7f6f2] h-full car-modal-1 rounded-t-3xl p-6 sm:p-8 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full hover:bg-[#e4e2dc] cursor-pointer z-10 p-2"
                >
                  <X className="w-6 h-6 text-[#0f2f24]" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                  <div>
                    <div className="relative h-96 bg-[#e4e2dc] rounded-2xl overflow-hidden mb-4">
                      <motion.img
                        key={currentImageIndex}
                        src={details.images[currentImageIndex]}
                        alt={`${car.name} view ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />

                      {/* Image Navigation */}
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {details.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? "bg-[#c9a240] w-6"
                                : "bg-white/40 hover:bg-white/60 w-2"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[2rem] car-detail-items">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-accent text-sm font-semibold uppercase tracking-wide">
                        {car.category}
                      </p>
                      <h2 className="text-4xl font-bold text-foreground mb-4">
                        {car.name}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {car.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 ">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-[#c9a240]" />
                          <div>
                            <p className="text-xs text-[#2b2b2b]/80">
                              Passengers
                            </p>
                            <p className="font-semibold text-[#0f2f24]">
                              {details.passengers}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-[#c9a240]" />
                          <div>
                            <p className="text-xs text-[#2b2b2b]/80">
                              Transmission
                            </p>
                            <p className="font-semibold text-[#0f2f24] text-sm">
                              {details.transmission}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Gauge className="w-5 h-5 text-[#c9a240]" />
                          <div>
                            <p className="text-xs text-[#2b2b2b]/80">Fuel</p>
                            <p className="font-semibold text-[#0f2f24] text-sm">
                              {details.fuel}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full bg-[#0f2f24] hover:bg-[#0f2f24]/90 text-[#f7f6f2] font-semibold py-6 rounded-full"
                      >
                        Book This Car
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        experience={car}
        type="car"
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
