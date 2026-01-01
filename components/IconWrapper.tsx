'use client';

/**
 * Client wrapper for icons used in server components
 * This ensures icons are only rendered on the client side
 */

import type { LucideIcon, LucideProps } from 'lucide-react';

interface IconWrapperProps extends LucideProps {
  Icon: LucideIcon;
}

export default function IconWrapper({ Icon, ...props }: IconWrapperProps) {
  return <Icon {...props} />;
}

