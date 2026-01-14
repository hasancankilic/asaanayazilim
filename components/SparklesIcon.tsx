'use client';

import { Sparkles } from '@/lib/icons';
import IconWrapper from './IconWrapper';

interface SparklesIconProps {
  className?: string;
}

export default function SparklesIcon({ className = "w-8 h-8 text-blue-400" }: SparklesIconProps) {
  return <IconWrapper Icon={Sparkles} className={className} />;
}

