'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RoomType, GuestInfo } from '@/types';

interface AppContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  isBookingModalOpen: boolean;
  openBookingModal: (roomId?: string) => void;
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
  scrollToSection: (id: string) => void;
  isScrolled: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [bookingDates, setBookingDates] = useState({
    checkIn: null as Date | null,
    checkOut: null as Date | null,
  });

  const [bookingGuests, setBookingGuests] = useState<GuestInfo>({
    adults: 2,
    children: 0,
    infants: 0,
  });

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
    if (isBookingModalOpen) setIsBookingModalOpen(false);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Close search
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Open booking modal
  const openBookingModal = (_roomId?: string) => {
    // If a roomId is provided, you might want to fetch the room details here
    // For now, we'll just open the modal
    setIsBookingModalOpen(true);
    // Close other open modals/menus
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  // Close booking modal
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
  };

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isBookingModalOpen]);

  // Close mobile menu and search when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      closeMobileMenu();
      closeSearch();
    };

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const value = {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    isSearchOpen,
    toggleSearch,
    closeSearch,
    isBookingModalOpen,
    openBookingModal,
    closeBookingModal,
    selectedRoom,
    setSelectedRoom,
    bookingDates,
    setBookingDates,
    bookingGuests,
    setBookingGuests,
    scrollToSection,
    isScrolled,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
