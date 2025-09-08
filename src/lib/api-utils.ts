/**
 * Get the base API URL with proper protocol handling
 * Ensures HTTPS is used in production
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // In the browser, use relative URL to avoid CORS issues
    return '/api';
  }

  // On the server, use the configured API URL
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  // Force HTTPS in production if not already set
  if (process.env.NODE_ENV === 'production' && !baseUrl.startsWith('https')) {
    baseUrl = baseUrl.replace('http://', 'https://');
  }
  
  return baseUrl;
}

/**
 * Get the full API URL for an endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // If the base URL already includes /api, avoid duplicating it
  if (baseUrl.endsWith('/api') && normalizedEndpoint.startsWith('/api')) {
    return `${baseUrl}${normalizedEndpoint.substring(4)}`;
  }
  
  return `${baseUrl}${normalizedEndpoint}`;
}
