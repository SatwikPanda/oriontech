export default function VideoBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-[100%] min-h-[100%] object-cover -translate-x-1/2 -translate-y-1/2 opacity-10"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}
