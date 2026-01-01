// Design System Constants
export const designSystem = {
  colors: {
    gradients: {
      primary: "from-blue-600 to-purple-600",
      secondary: "from-purple-600 to-pink-600",
      accent: "from-blue-500 to-cyan-500",
      success: "from-green-500 to-emerald-500",
      warning: "from-orange-500 to-red-500",
      info: "from-indigo-500 to-blue-500",
    },
    glass: {
      bg: "rgba(30, 41, 59, 0.5)",
      border: "rgba(148, 163, 184, 0.15)",
    },
  },
  spacing: {
    section: "py-24 px-4 sm:px-6 lg:px-8",
    container: "max-w-7xl mx-auto",
    card: "p-8",
    cardCompact: "p-6",
  },
  effects: {
    glassCard: "glass-card rounded-2xl",
    shadow: "shadow-2xl shadow-blue-500/10",
    hoverShadow: "hover:shadow-2xl hover:shadow-blue-500/20",
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-300",
  },
  animations: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    scale: "animate-scale",
  },
};

// Section Header Component Props
export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  centered?: boolean;
}

// Common animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};




