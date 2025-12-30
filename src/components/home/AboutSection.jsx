import { motion } from "framer-motion";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const features = [
    {
      title: "Local Expertise",
      description:
        "Guides with deep knowledge of Rwanda's landscapes, wildlife, and culture",
    },
    {
      title: "Trusted Experiences",
      description:
        "Years of refined travel experiences ensuring comfort and safety",
    },
    {
      title: "Personalized Service",
      description: "Each journey tailored to your preferences and pace",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fff]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0f2f24] mb-6">
              About Visit Rwanda
            </h2>
            <p className="text-lg text-[#2b2b2b] leading-relaxed max-w-3xl mx-auto">
              We believe travel is transformative. Since our founding, Visit
              Rwanda has been dedicated to creating meaningful connections
              between adventurous souls and Africa's most breathtaking
              destination. Our mission is simple: provide premium, personalized
              experiences that leave lasting impressions and support Rwanda's
              thriving tourism community.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-[#e4e2dc] hover:border-[#c9a240]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#e4e2dc] rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-[#c9a240] rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-[#0f2f24] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#2b2b2b] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Story Section */}
          <motion.div
            variants={itemVariants}
            className="bg-[#ede6e1] rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h3 className="text-3xl font-bold text-[#0f2f24] mb-4">
                Our Story
              </h3>
              <p className="text-[#2b2b2b] leading-relaxed mb-4">
                Visit Rwanda was founded by passionate travelers and
                conservation advocates who fell in love with Rwanda's natural
                beauty and warm people. We saw an opportunity to share this
                magic with the world while supporting local communities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, every tour and rental is a testament to our commitment:
                deliver exceptional experiences with integrity, sustainability,
                and a deep respect for Rwanda's heritage.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop"
                alt="Rwanda landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
