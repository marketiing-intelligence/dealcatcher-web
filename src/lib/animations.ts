import { Variants } from "framer-motion";

// Check if user prefers reduced motion or is on mobile (for performance)
export const shouldReduceMotion = () => {
  if (typeof window === "undefined") return false;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;
  return prefersReduced || isMobile;
};

// Easing curves (as tuples for Framer Motion)
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeInOut: [number, number, number, number] = [0.65, 0, 0.35, 1];

// Fade up animation - most common
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

// Fade in (no movement)
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

// Fade from left
export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

// Fade from right
export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

// Scale up
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

// Container with staggered children
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Faster stagger for lists
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Slow stagger for hero elements
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Child item for stagger containers
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

// Viewport settings for scroll animations
export const viewportOnce = {
  once: true,
  margin: "-100px",
};

export const viewportRepeat = {
  once: false,
  margin: "-100px",
};

// Hover animations for interactive elements
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.2 },
};

// Button hover with glow (use with style prop for boxShadow)
export const buttonHover = {
  y: -2,
  transition: { duration: 0.2 },
};

// Card hover
export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: easeOut },
};

// Preview scroll on hover - for portfolio preview images
export const previewScrollOnHover: Variants = {
  rest: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
  hover: {
    y: -300, // Scroll down to reveal more of the page
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
};

// Config for scroll-on-hover preview
export const scrollPreviewConfig = {
  containerHeight: 240, // Visible area height in px
  scrollAmount: 300, // How much to scroll on hover
  duration: 1.2, // Animation duration in seconds
};
