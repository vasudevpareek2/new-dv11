import { AppError } from './error-handler';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

interface ApiResponse<T> {
  data: T | null;
  error: {
    message: string;
    status: number;
    details?: any;
  } | null;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
  } = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, isFormData = false } = options;

  // Set up request configuration
  const config: RequestInit = {
    method,
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    credentials: 'include', // Include cookies for authentication
  };

  // Add body if present and not a GET/HEAD request
  if (body && method !== 'GET' && method !== 'HEAD') {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  // Get the base API URL from environment variables or use a default
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const apiUrl = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    // Use the full URL for the fetch request
    const response = await fetch(apiUrl, {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json().catch(() => ({}));

    // Handle non-2xx responses
    if (!response.ok) {
      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        `Request failed with status ${response.status}`;

      return {
        data: null,
        error: {
          message: errorMessage,
          status: response.status,
          details: responseData.details,
        },
      };
    }

    return {
      data: responseData as T,
      error: null,
    };
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error('API request failed:', error);

    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Network error occurred',
        status: 0,
        details: error,
      },
    };
  }
}

// Example usage with error handling
export async function fetchWithErrorHandling<T = any>(
  endpoint: string,
  options?: Parameters<typeof apiRequest>[1]
): Promise<T> {
  const { data, error } = await apiRequest<T>(endpoint, options);

  if (error) {
    throw new AppError(error.message, error.status);
  }

  if (!data) {
    throw new AppError('No data returned from the server', 500);
  }

  return data;
}

// Utility for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', headers }),

  post: <T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData = false
  ) => apiRequest<T>(endpoint, { method: 'POST', body, headers, isFormData }),

  put: <T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData = false
  ) => apiRequest<T>(endpoint, { method: 'PUT', body, headers, isFormData }),

  patch: <T = any>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData = false
  ) => apiRequest<T>(endpoint, { method: 'PATCH', body, headers, isFormData }),

  delete: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'DELETE', headers }),
};
