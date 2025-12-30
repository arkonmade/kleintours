import { AnimatePresence, motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";

const heroImages = [assets.bg.hero1, assets.bg.hero2];

const HomeHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-[#0f2f24] h-vh flex justify-center w-full h-screen flex items-center overflow-hidden mt-16"
    >
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://yellowzebrasafaris.com/media/42201/farmland2-volcanoes-national-park-rwanda-yellow-zebra-safaris.jpg?width=2048&height=1024&format=jpg&v=1da5e0fda1ceca0&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
      </div> */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${assets.bg.hero1})`,
          }}
          // style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-[80%] h-full text-white px-4 flex justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute hero-text left-0 bottom-24 max-w-lg space-y-6"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold"
          >
            Come see Rwanda{" "}
            <span className="text-[#c9a240]">the way we know it</span>.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-md md:text-lg text-[#f7f6f2]"
          >
            Quiet roads, early mornings, long conversations, and places that
            stay with you.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-row flex-wrap hero-links relative gap-3 sm:gap-6"
          >
            <motion.a
              variants={itemVariants}
              href="#tours"
              className="bg-[#c9a240] border border-transparent hover:bg-[#3a5f52] text-[#f7f6f2] hover:text-[#f7f6f2] px-6 py-3 rounded-md font-medium transition"
            >
              See what's possible
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="#contact"
              className="bg-transparent border hover:bg-[#3a5f52] hover:border-transparent text-[#f7f6f2] hover:text-[#f7f6f2] px-6 py-3 rounded-md font-medium transition"
            >
              Talk with us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HomeHero;
