"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Background = ({
  src,
  placeholder,
}: {
  src: string;
  placeholder?: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          priority
          loading="eager"
          src={src}
          alt="Background"
          className={cn(
            "absolute bg-background left-0 top-0 w-full h-full object-cover transition-opacity duration-1000",
            {
              "opacity-100": imageLoaded,
              "opacity-0": !imageLoaded,
            }
          )}
          sizes="100vw"
          fill
          onLoad={() => setImageLoaded(true)}
          quality={100}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
    </div>
  );
};