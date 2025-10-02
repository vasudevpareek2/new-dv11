/**
 * Get the base API URL with proper protocol handling
 * Ensures HTTPS is used in production and uses the correct backend URL
 */
export function getApiBaseUrl(): string {
  // In production, always use the backend URL directly
  if (process.env.NODE_ENV === 'production') {
    // Use the backend URL from environment or fallback to production URL
    return process.env.NEXT_PUBLIC_API_BACKEND_URL || 'https://api.dolcevitapushkar.com';
  }

  // In development, use the local API URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
}

/**
 * Get the full API URL for an endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Remove any trailing slashes from base URL
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // If the endpoint already starts with /api, don't add another one
  if (normalizedEndpoint.startsWith('/api')) {
    return `${cleanBaseUrl}${normalizedEndpoint}`;
  }

  // Otherwise, ensure there's exactly one /api in the path
  if (cleanBaseUrl.endsWith('/api')) {
    return `${cleanBaseUrl}${normalizedEndpoint}`;
  }

  return `${cleanBaseUrl}/api${normalizedEndpoint}`;
}
