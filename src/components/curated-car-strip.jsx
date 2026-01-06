import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarFront, ChevronLeft, ChevronRight, Cog } from "lucide-react";
import { Button } from "./ui/button.jsx";
import CardSkeletonLoader from "./SkeletonLoader.jsx";

export function CuratedExperienceStrip({
  items = [], // default to empty array to prevent crashes
  loading = false,
  onItemClick,
  title = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const scrollRef = useRef(null);

  const itemsLength = items.length;

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay || itemsLength === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsLength);
    }, 15000);

    return () => clearInterval(interval);
  }, [isAutoPlay, itemsLength]);

  const handleNext = () => {
    if (itemsLength === 0) return;
    setCurrentIndex((prev) => (prev + 1) % itemsLength);
    setIsAutoPlay(false);
  };

  const handlePrev = () => {
    if (itemsLength === 0) return;
    setCurrentIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    setIsAutoPlay(false);
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) handleNext();
      else handlePrev();
      setIsAutoPlay(false);
    }
  };

  const getCardIndex = (offset) => {
    if (itemsLength === 0) return 0;
    return (currentIndex + offset + itemsLength) % itemsLength;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0f2f24] mb-4 text-center">
            {title}
          </h2>
          <p className="text-center text-[#2b2b2b] mb-12">
            Vehicles that suit the distance, the terrain, and the pace you
            choose.
          </p>
        </motion.div>

        <div
          className="relative h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="relative w-full h-full flex items-center justify-center px-8 sm:px-12 rounded-3xl shadow-lg">
            <AnimatePresence mode="sync">
              {/* Left Card */}
              <motion.div
                key={`left-${getCardIndex(-1)}`}
                initial={{ opacity: 0, x: -300, scale: 0.8 }}
                animate={{ opacity: 0.5, x: -200, scale: 0.8 }}
                exit={{ opacity: 0, x: -300, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute left-0 hidden lg:block"
              >
                {loading ? (
                  <CardSkeletonLoader isCenter={false} />
                ) : (
                  <ExperienceCard
                    item={items[getCardIndex(-1)]}
                    isCenter={false}
                    onClick={() => {}}
                    onDetailClick={onItemClick}
                  />
                )}
              </motion.div>

              {/* Center Card */}
              <motion.div
                key={`center-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute z-20"
              >
                {loading ? (
                  <CardSkeletonLoader isCenter={true} />
                ) : (
                  <ExperienceCard
                    item={items[currentIndex]}
                    isCenter={true}
                    onClick={() => onItemClick?.(items[currentIndex])}
                    onDetailClick={onItemClick}
                  />
                )}
              </motion.div>

              {/* Right Card */}
              <motion.div
                key={`right-${getCardIndex(1)}`}
                initial={{ opacity: 0, x: 300, scale: 0.8 }}
                animate={{ opacity: 0.5, x: 200, scale: 0.8 }}
                exit={{ opacity: 0, x: 300, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute right-0 hidden lg:block"
              >
                {loading ? (
                  <CardSkeletonLoader isCenter={false} />
                ) : (
                  <ExperienceCard
                    item={items[getCardIndex(1)]}
                    isCenter={false}
                    onClick={() => {}}
                    onDetailClick={onItemClick}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 cursor-pointer z-30 p-2 rounded-full hover:bg-[#0f2f24]/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7 text-[#0f2f24]" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 cursor-pointer z-30 p-2 rounded-full hover:bg-[#0f2f24]/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7 text-[#0f2f24]" />
          </button>
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {itemsLength > 0 &&
            items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#0f2f24] w-8"
                    : "bg-[#e4e2dc] hover:bg-[#3a5f52] w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

// ExperienceCard remains mostly the same
function ExperienceCard({ item, isCenter, onClick, onDetailClick }) {
  if (!item) return null; // safe guard

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer group rounded-2xl overflow-hidden transition-all ${
        isCenter
          ? "w-80 h-96 sm:w-96 sm:h-[450px] lg:w-[500px] lg:h-[550px]"
          : "w-64 h-80"
      }`}
      whileHover={isCenter ? { scale: 1.02 } : {}}
    >
      <img
        src={item.thumbnail || item.image || "/placeholder.svg"}
        alt={item.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          isCenter ? "grayscale-0 blur-0" : "grayscale blur-sm"
        } group-hover:grayscale-0 group-hover:blur-0`}
      />
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isCenter
            ? "bg-gradient-to-t from-black via-transparent to-transparent"
            : "bg-gradient-to-t from-black/80 via-transparent to-transparent"
        }`}
      />

      <div className="absolute inset-0 flex flex-col justify-end car-card p-4">
        <motion.div
          initial={isCenter ? { opacity: 0, y: 10 } : { opacity: 0.5, y: 5 }}
          animate={isCenter ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2">
            <div className="flex mb-2 gap-1">
              <CarFront className="size-4 text-[#c9a240]" />
              <p className="text-[#c9a240] text-sm font-semibold capitalize tracking-wide">
                {item.category}
              </p>
            </div>
            {item.transmission && (
              <div className="flex mb-2 gap-1">
                <Cog className="size-4 text-[#c9a240]" />
                <p className="text-[#c9a240] text-sm font-semibold capitalize tracking-wide">
                  {item.transmission}
                </p>
              </div>
            )}
          </div>

          <h3 className="text-white text-2xl font-bold mb-3">
            {item.title || item.name}
          </h3>

          {isCenter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDetailClick?.(item);
                }}
                className="bg-[#c9a240] button hover:bg-[#3a5f52]/90 text-[#f7f6f2] rounded-full text-xs font-semibold border-transparent"
              >
                View Experience →
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
