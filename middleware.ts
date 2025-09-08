import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that should be accessible without redirection
const publicPaths = ['/health', '/api/health'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect to HTTPS in production
  if (process.env.NODE_ENV === 'production' && protocol !== 'https') {
    const httpsUrl = new URL(`https://${hostname}${request.nextUrl.pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(httpsUrl);
  }

  // Security headers
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' https://*.razorpay.com https://*.google-analytics.com https://*.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.razorpay.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
    frame-src 'self' https://*.razorpay.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);
  requestHeaders.set('X-Content-Type-Options', 'nosniff');
  requestHeaders.set('X-Frame-Options', 'DENY');
  requestHeaders.set('X-XSS-Protection', '1; mode=block');
  requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  requestHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  requestHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set security headers on the response
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

// Only run middleware on these paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
