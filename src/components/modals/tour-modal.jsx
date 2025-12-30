"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Clock, Users, MapPin } from "lucide-react"
import { Button } from "../ui/button";
import { BookingModal } from "./booking-modal"

const TOUR_DETAILS = {
  "tour-1": {
    duration: "3-4 Days",
    groupSize: "2-8 people",
    location: "Volcanoes National Park",
    fullDescription:
      "Experience one of nature's most profound moments as you trek through misty mountains to encounter mountain gorillas in their natural habitat. This intimate, guided journey brings you face-to-face with these intelligent creatures, leaving an indelible mark on your soul.",
    images: [
      "https://images.unsplash.com/photo-1551986782-d244d7d1d115?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1489493072403-541015f32ebc?w=800&h=600&fit=crop",
    ],
    highlights: [
      "Gorilla families encounter",
      "Expert naturalist guides",
      "Professional porter support",
      "Mountain ecosystem insight",
    ],
  },
  // ... same structure for tour-2 to tour-8 ...
}

export function TourModal({ tour, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const details = TOUR_DETAILS[tour.id] || TOUR_DETAILS["tour-1"]

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % details.images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + details.images.length) % details.images.length)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-[#f7f6f2] rounded-t-3xl p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-[#e4e2dc] transition-colors"
                >
                  <X className="w-6 h-6 text-[#0f2f24]" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                  <div>
                    <div className="relative h-96 bg-[#e4e2dc] rounded-2xl overflow-hidden mb-4">
                      <motion.img
                        key={currentImageIndex}
                        src={details.images[currentImageIndex]}
                        alt={`${tour.name} view ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />

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

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {details.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentImageIndex ? "bg-[#c9a240] w-6" : "bg-white/80 hover:bg-white/60 w-2"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-[#c9a240] text-sm font-semibold uppercase tracking-wide mb-2">{tour.category}</p>
                      <h2 className="text-4xl font-bold text-[#0f2f24] mb-4">{tour.name}</h2>
                      <p className="text-[#3a5f52] leading-relaxed mb-6">{details.fullDescription}</p>

                      {/* Tour Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#c9a240] flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs text-[#3a5f52]">Duration</p>
                            <p className="font-semibold text-[#0f2f24]">{details.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs text-[#3a5f52]">Group Size</p>
                            <p className="font-semibold text-[#0f2f24] text-sm">{details.groupSize}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-xs text-[#3a5f52]">Location</p>
                            <p className="font-semibold text-[#0f2f24] text-sm">{details.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-[#0f2f24] mb-3">Tour Highlights</h3>
                        <ul className="grid grid-cols-2 gap-2">
                          {details.highlights.map((highlight) => (
                            <li key={highlight} className="text-sm text-[#3a5f52] flex items-start gap-2">
                              <span className="text-[#3a5f52]">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
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
                        Book This Experience
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
      <BookingModal experience={tour} type="tour" isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
