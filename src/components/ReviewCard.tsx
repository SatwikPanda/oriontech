import { motion } from "framer-motion";
import Image from "next/image";

interface ReviewCardProps {
  review: {
    name: string;
    role: string;
    image: string;
    review: string;
    company: string;
  };
  isFocused: boolean;
  style?: React.CSSProperties;
}

export default function ReviewCard({
  review,
  isFocused,
  style,
}: ReviewCardProps) {
  return (
    <motion.div
      className={`p-6 rounded-xl bg-white border border-black/10`}
      style={{
        ...style,
        transform: `scale(${isFocused ? 1 : 0.9})`,
        opacity: isFocused ? 1 : 0.3,
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-lg">{review.name}</h4>
          <p className="text-black/60 text-sm">{review.role}</p>
          <p className="text-black/40 text-sm font-rmmono">{review.company}</p>
        </div>
      </div>
      <p className="text-black/80 leading-relaxed">{review.review}</p>
    </motion.div>
  );
}
