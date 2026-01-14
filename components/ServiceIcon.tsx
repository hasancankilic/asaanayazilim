'use client';

import IconWrapper from './IconWrapper';
import * as Icons from '@/lib/icons';

interface ServiceIconProps {
  iconName: string;
  className?: string;
}

export default function ServiceIcon({ iconName, className = "w-8 h-8 text-white" }: ServiceIconProps) {
  // Safely get icon from Icons object
  if (iconName in Icons && typeof Icons[iconName as keyof typeof Icons] === 'function') {
    const Icon = Icons[iconName as keyof typeof Icons] as typeof Icons.Smartphone;
    return <IconWrapper Icon={Icon} className={className} />;
  }
  
  // Fallback if icon not found
  return null;
}

