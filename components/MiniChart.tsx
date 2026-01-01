"use client";

import { motion } from "framer-motion";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

const MiniChart = ({
  data,
  color = "rgb(59, 130, 246)",
  height = 60,
}: MiniChartProps) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Area */}
        <motion.path
          d={`${pathData} L 100,100 L 0,100 Z`}
          fill="url(#gradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />

        {/* Points */}
        {points.map((point, index) => {
          const [x, y] = point.split(",").map(Number);
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.5 + index * 0.1,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default MiniChart;




