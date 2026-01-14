"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import IconWrapper from "./IconWrapper";
import * as Icons from "@/lib/icons";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  iconName?: keyof typeof Icons;
  iconClassName?: string;
  centered?: boolean;
}

const SectionHeader = ({
  title,
  description,
  icon,
  iconName,
  iconClassName = "w-12 h-12 text-blue-400",
  centered = true,
}: SectionHeaderProps) => {
  // Render icon from iconName if provided (prevents serialization issues)
  const renderedIcon = iconName && iconName in Icons && typeof Icons[iconName] === 'function' ? (
    <IconWrapper Icon={Icons[iconName] as typeof Icons.Sparkles} className={iconClassName} />
  ) : icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      {renderedIcon && (
        <div className="flex justify-center mb-4">{renderedIcon}</div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
      {description && (
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

