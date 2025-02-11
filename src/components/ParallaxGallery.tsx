"use client";

const images = [
  "/images/websites/radga.png",
  "/images/websites/spectral.png",
  "/images/websites/luminous-labs.png",
  "/images/websites/miga.png",
  "/images/websites/fanhubble.png",
  "/images/websites/blockchainland.png",
  "/images/websites/radga.png",
  "/images/websites/spectral.png",
  "/images/websites/luminous-labs.png",
  // Duplicate more images for fuller grid
  "/images/websites/miga.png",
  "/images/websites/fanhubble.png",
  "/images/websites/blockchainland.png",
];

export default function ParallaxGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[90rem] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-medium mb-12">
          Our Latest Work
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {images.map((img, i) => (
            <div
              key={`${img}-${i}`}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-black/5"
            >
              <img
                src={img}
                alt={`Project ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
                <span className="text-white text-sm">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
