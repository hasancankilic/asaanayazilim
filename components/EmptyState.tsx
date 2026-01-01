"use client";

import { motion } from "framer-motion";
import { FileQuestion, Plus, ArrowRight } from "@/lib/icons";
import { Link } from "@/i18n/routing";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel = "Oluştur",
  actionHref,
  onAction,
}: EmptyStateProps) => {
  const defaultIcon = icon || (
    <FileQuestion className="w-16 h-16 text-blue-400/50" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Illustration Container */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center backdrop-blur-sm border border-blue-500/20">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            {defaultIcon}
          </div>
        </div>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10"></div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/60 max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          {actionLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;




