import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Users, Zap, Gauge } from "lucide-react";
import { Button } from "../ui/button";
import { BookingModal } from "./booking-modal";

export function CarModal({ car, cars, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
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
                        src={car.images[currentImageIndex]}
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
                        {car.images.map((_, index) => (
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
                        {car.title}
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
                              {car.seats} {car.seats > 1 ? "seats" : "seat"}
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
                              {car.transmission}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Gauge className="w-5 h-5 text-[#c9a240]" />
                          <div>
                            <p className="text-xs text-[#2b2b2b]/80">Fuel</p>
                            <p className="font-semibold text-[#0f2f24] text-sm">
                              {car.fuel_type}
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
