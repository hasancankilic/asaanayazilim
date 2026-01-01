'use client';

/**
 * Client wrapper for icons used in server components
 * This ensures icons are only rendered on the client side
 */

import { LucideIcon } from '@/lib/icons';
import type { LucideProps } from '@/lib/icons';

interface IconWrapperProps extends LucideProps {
  Icon: LucideIcon;
}

export default function IconWrapper({ Icon, ...props }: IconWrapperProps) {
  return <Icon {...props} />;
}

