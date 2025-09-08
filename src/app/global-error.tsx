'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught in root layout:', error);
  }, [error]);

  return (
    <html>
      <head>
        <title>Error - Dolce Vita Pushkar</title>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-red-600 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600">
              We're experiencing some technical difficulties. Please try again later.
            </p>
          </div>
          
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
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If the problem persists, please contact our support team at{' '}
              <a 
                href="mailto:support@dolcevitapushkar.com" 
                className="text-blue-600 hover:underline"
              >
                support@dolcevitapushkar.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
