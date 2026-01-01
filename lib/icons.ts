/**
 * Centralized Icon Exports
 * 
 * All lucide-react icons should be imported from this file.
 * This ensures proper tree-shaking and prevents vendor chunk issues.
 * 
 * Usage:
 *   import { IconName } from '@/lib/icons';
 * 
 * IMPORTANT: Icons can only be used in "use client" components.
 * For server components, create a client wrapper component.
 */

// Navigation & UI
export {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Home,
  Search,
  Globe,
} from 'lucide-react';

// Admin & Dashboard
export {
  LayoutDashboard,
  Settings,
  LogOut,
  User,
  Users,
  BarChart3,
  Sparkles,
} from 'lucide-react';

// Content Management
export {
  BookOpen,
  FolderKanban,
  FileText,
  FileQuestion,
  Edit,
  Trash2,
  Plus,
  Save,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';

// Communication
export {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Share2,
} from 'lucide-react';

// Status & Feedback
export {
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  XCircle,
} from 'lucide-react';

// Services & Features
export {
  Smartphone,
  Monitor,
  Code,
  Brain,
  Palette,
  Target,
  Lightbulb,
  Activity,
  Zap,
} from 'lucide-react';

// Social & Media
export {
  Calendar,
  Tag,
  MapPin,
  Heart,
  Award,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

// Security
export {
  Lock,
  Shield,
  Key,
} from 'lucide-react';

// Analytics & Trends
export {
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  RefreshCw,
} from 'lucide-react';

// Re-export types if needed
export type { LucideIcon, LucideProps } from 'lucide-react';

