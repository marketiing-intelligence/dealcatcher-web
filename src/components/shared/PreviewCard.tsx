"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { easeOut } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface PreviewCardProps {
  item: PortfolioItem;
  showPremiumBadge?: boolean;
}

const ROTATION_RANGE = 10;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export function PreviewCard({ item, showPremiumBadge = false }: PreviewCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasVideo = !!item.previewVideo;
  const previewImage = item.fullPreview || item.thumbnail;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const rX = ((mouseYPos / height) * ROTATION_RANGE - HALF_ROTATION_RANGE) * -1;
    const rY = (mouseXPos / width) * ROTATION_RANGE - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeaveCard = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // 0.5s delay before starting scroll
      timeoutRef.current = setTimeout(() => {
        videoRef.current?.play();
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before delay
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    handleMouseLeaveCard();
  };

  return (
    <motion.div
      ref={cardRef}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Spotlight glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Premium badge */}
      {showPremiumBadge && item.isPremium && (
        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            Premium
          </span>
        </div>
      )}

      {/* Preview Container - aspect ratio 16:9 for full width video */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={item.previewVideo}
            loop
            muted
            playsInline
            preload="none"
            poster={item.thumbnail}
            className="w-full h-full object-contain"
          />
        ) : (
          // Fallback: simple thumbnail with zoom on hover
          <Image
            src={previewImage}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Overlay with Live Demo button */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          variants={{
            rest: { opacity: 0 },
            hover: {
              opacity: 1,
              transition: { duration: 0.3, ease: easeOut }
            },
          }}
        >
          <Button
            asChild
            className="w-full bg-primary text-primary-foreground hover:bg-accent-hover"
          >
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Demo
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {item.industryLabel}
          </span>
          <span className="text-xs text-muted-foreground capitalize">
            {item.template}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {item.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
