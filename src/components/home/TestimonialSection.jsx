

const testimonials = [
  {
    name: "Eleanor Pena",
    handle: "@BerryB777",
    avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png",
    title: "Seamless Integration",
    quote:
      "The components are intuitive and blend perfectly with Tailwind CSS. It saved us a lot of development time.",
    rating: 5,
    source: "G2",
    sourceLogo:
      "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/g2-logo.png",
  },
  {
    name: "Darlene Robertson",
    handle: "@LatentHQ",
    avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png",
    title: "Incredible Support",
    quote:
      "The support team helped us resolve integration issues quickly and efficiently.",
    rating: 5,
    source: "Trustpilot",
    sourceLogo:
      "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/trustpilot-icon.png",
  },
  {
    name: "Esther Howard",
    handle: "@oxtuggs",
    avatar: "https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png",
    title: "Fantastic Library",
    quote:
      "Beautiful, functional components that just work out of the box.",
    rating: 4.5,
    source: "Twitter",
    sourceLogo:
      "https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/brand-logo/twitter-icon.png",
  },
]


function Stars({ rating }) {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i + 1 <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  )
}



function TestimonialCard({ t }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      {/* Rating + Source */}
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <img src={t.sourceLogo} alt={t.source} className="h-4" />
          {t.source}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-gray-900">{t.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{t.quote}</p>
      </div>

      {/* User */}
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-medium text-sm">{t.name}</p>
          <p className="text-xs text-gray-500">{t.handle}</p>
        </div>
      </div>
    </div>
  )
}




function TestimonialColumn({ items, reverse = false }) {
  return (
    <div
      className={`space-y-6 animate-scroll ${
        reverse ? "animation-reverse" : ""
      }`}
    >
      {[...items, ...items].map((t, i) => (
        <TestimonialCard key={i} t={t} />
      ))}
    </div>
  )
}






export default function TestimonialsSection() {
  return (
     <section className="relative bg-gray-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-16 max-w-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            “Just amazing…”
          </h2>
          <p className="text-gray-600">
            Teams and travelers trust us for reliable service, beautiful
            experiences, and unforgettable journeys.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialColumn items={testimonials} />
          <TestimonialColumn items={testimonials} reverse />
          <TestimonialColumn items={testimonials} />
        </div>
      </div>
    </section>
  )
}
