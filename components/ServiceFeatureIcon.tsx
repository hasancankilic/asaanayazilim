'use client';

import IconWrapper from './IconWrapper';
import * as Icons from '@/lib/icons';

interface ServiceFeatureIconProps {
  iconName: string;
  className?: string;
}

export default function ServiceFeatureIcon({ iconName, className }: ServiceFeatureIconProps) {
  // Safely get icon from Icons object
  if (iconName in Icons && typeof Icons[iconName as keyof typeof Icons] === 'function') {
    const Icon = Icons[iconName as keyof typeof Icons] as typeof Icons.CheckCircle;
    return <IconWrapper Icon={Icon} className={className} />;
  }
  
  // Fallback if icon not found
  return null;
}

