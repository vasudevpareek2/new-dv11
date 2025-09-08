'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but an unexpected error has occurred. Our team has been notified.
          </p>
          
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded text-left text-sm">
            <p className="font-medium">Error details:</p>
            <p className="mt-1">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs opacity-75">Error ID: {error.digest}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => reset()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
