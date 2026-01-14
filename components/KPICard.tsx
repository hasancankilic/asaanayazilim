"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "@/lib/icons";
import { ReactNode } from "react";
import IconWrapper from "./IconWrapper";
import * as Icons from "@/lib/icons";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  iconName?: keyof typeof Icons;
  iconClassName?: string;
  gradient: string;
  delay?: number;
}

const KPICard = ({
  title,
  value,
  change,
  icon,
  iconName,
  iconClassName = "w-6 h-6",
  gradient,
  delay = 0,
}: KPICardProps) => {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  // Render icon from iconName if provided (prevents serialization issues)
  const renderedIcon = iconName && iconName in Icons && typeof Icons[iconName] === 'function' ? (
    <IconWrapper Icon={Icons[iconName] as typeof Icons.Code} className={iconClassName} />
  ) : icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-6 hover:border-blue-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] group relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
          >
            {renderedIcon}
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                isPositive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-sm text-white/60 mt-1">{title}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;

