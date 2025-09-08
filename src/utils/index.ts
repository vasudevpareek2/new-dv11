/**
 * Formats a number as currency in Indian Rupees (INR)
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₹25,000")
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generates a slug from a string
 * @param str - The string to convert to a slug
 * @returns URL-friendly slug (e.g., "villa-rosa")
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

/**
 * Truncates text to a specified length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - Whether to add ellipsis at the end (default: true)
 * @returns Truncated text
 */
export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis: boolean = true
): string => {
  if (text.length <= maxLength) return text;
  return ellipsis ? `${text.substring(0, maxLength)}...` : text.substring(0, maxLength);
};

/**
 * Formats a date to a readable string
 * @param date - Date object or date string
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', options).format(dateObj);
};

/**
 * Generates a random ID
 * @param length - Length of the ID (default: 8)
 * @returns Random alphanumeric ID
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - The function to debounce
 * @param wait - The time to wait in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled version of the function
 */
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  limit: number
): ((...args: Parameters<F>) => void) => {
  let inThrottle = false;
  return function (this: any, ...args: Parameters<F>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates a phone number (Indian format)
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const re = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9 and are 10 digits
  return re.test(phone.replace(/\D/g, ''));
};

/**
 * Scrolls to an element with smooth behavior
 * @param id - The ID of the element to scroll to
 * @param offset - Optional offset in pixels
 */
export const scrollToElement = (id: string, offset: number = 0): void => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Copies text to clipboard
 * @param text - The text to copy
 * @returns Promise that resolves when text is copied
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

/**
 * Toggles body scroll
 * @param disable - Whether to disable scrolling
 */
export const toggleBodyScroll = (disable: boolean): void => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = disable ? 'hidden' : '';
  }
};

/**
 * Formats a duration in minutes to hours and minutes
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "2h 30m")
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`.trim();
};

/**
 * Gets the current breakpoint based on window width
 * @returns The current breakpoint name
 */
export const getCurrentBreakpoint = (): string => {
  if (typeof window === 'undefined') return 'sm';
  
  const width = window.innerWidth;
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

/**
 * Checks if the current device is a mobile device
 * @returns Boolean indicating if the device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768; // Tailwind's 'md' breakpoint
};

/**
 * Formats a number with commas as thousand separators
 * @param num - The number to format
 * @returns Formatted number string (e.g., "1,234,567")
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Generates a range of numbers
 * @param start - Start of the range
 * @param end - End of the range
 * @param step - Step between numbers (default: 1)
 * @returns Array of numbers in the range
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

/**
 * Safely parses JSON string to object
 * @param jsonString - The JSON string to parse
 * @param fallback - Fallback value if parsing fails (default: {})
 * @returns Parsed object or fallback value
 */
export const safeJsonParse = <T>(jsonString: string, fallback: any = {}): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return fallback as T;
  }
};

/**
 * Deep clones an object
 * @param obj - The object to clone
 * @returns A deep clone of the object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns String in title case (e.g., "hello world" -> "Hello World")
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

/**
 * Creates a query string from an object
 * @param params - The parameters object
 * @returns URL-encoded query string
 */
export const createQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

/**
 * Parses a query string to an object
 * @param queryString - The query string to parse
 * @returns Parsed object
 */
export const parseQueryString = <T extends Record<string, any>>(queryString: string): T => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result as T;
};
