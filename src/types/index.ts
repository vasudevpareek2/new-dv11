// Basic types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Common component props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  current?: boolean;
  children?: NavItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

// Room/Villa types
export interface RoomFeature {
  id: string;
  name: string;
  icon?: string;
  included?: boolean;
}

export interface RoomImage {
  id: string;
  src: string;
  alt: string;
  featured?: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  size: string;
  capacity: string;
  maxAdults: number;
  maxChildren: number;
  bedType: string;
  images: RoomImage[];
  features: RoomFeature[];
  amenities: string[];
  rating?: number;
  reviewCount?: number;
  isAvailable?: boolean;
  bookingLink?: string;
}

// Booking types
export interface GuestInfo {
  adults: number;
  children: number;
  infants?: number;
}

export interface BookingDates {
  checkIn: Date;
  checkOut: Date;
}

export interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingDetails extends BookingGuest {
  roomId: string;
  dates: BookingDates;
  guests: GuestInfo;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled';
  bookingStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingReference: string;
  createdAt: Date;
  updatedAt: Date;
}

// Testimonial types
export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
  location?: string;
}

// Gallery types
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  title?: string;
  description?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  count?: number;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Form field types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  required?: boolean;
  validate?: (value: T) => string | undefined;
}

// Utility types
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface Dictionary<T> {
  [key: string]: T;
}

// SEO types
export interface SeoData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
    url?: string;
    image?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    };
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
  robots?: {
    noindex?: boolean;
    nofollow?: boolean;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
}

// App context types
export interface AppContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isBookingModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  selectedRoom: RoomType | null;
  setSelectedRoom: (room: RoomType | null) => void;
  bookingDates: {
    checkIn: Date | null;
    checkOut: Date | null;
  };
  setBookingDates: (dates: { checkIn: Date | null; checkOut: Date | null }) => void;
  bookingGuests: GuestInfo;
  setBookingGuests: (guests: GuestInfo) => void;
}

// Environment variables
export interface EnvVars {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_GA_TRACKING_ID?: string;
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// API error response
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// Social media link
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

// FAQ item
export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

// Location information
export interface LocationInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  whatsapp?: string;
}

// Amenity/Feature type
export interface Amenity {
  id: string;
  name: string;
  description?: string;
  icon: string;
  category: string;
  available: boolean;
}

// Pricing information
export interface PricingInfo {
  basePrice: number;
  currency: string;
  taxRate: number;
  serviceCharge: number;
  extraBedCharge: number;
  childBedCharge: number;
  cancellationPolicy: string;
  minStay: number;
  maxStay: number;
  seasonalRates?: Array<{
    startDate: string;
    endDate: string;
    multiplier: number;
    name: string;
  }>;
}

// Review/Rating type
export interface Review {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  response?: {
    comment: string;
    date: string;
    managerName: string;
  };
  verified: boolean;
}
