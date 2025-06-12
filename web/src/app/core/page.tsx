// You can place this file at a path like: app/coming-soon/page.tsx

import Link from 'next/link';
import type { Metadata } from 'next';

// It's a good practice to set metadata for SEO and browser tabs
export const metadata: Metadata = {
  title: 'Under Development',
  description: 'This page is currently under construction.',
};

/**
 * A minimalist black & white "Under Development" page component.
 * It informs users that the page is being worked on.
 */
export default function UnderDevelopmentPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 text-white bg-black">
      <div className="max-w-md text-center">
        {/* Minimalist Construction Icon */}
        <svg
          className="w-20 h-20 mx-auto text-white animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
          />
        </svg>

        {/* Main Heading - Oswald Font */}
        <h1 className="mt-12 text-5xl font-bold tracking-wider text-white uppercase font-oswald sm:text-6xl">
          Under Development
        </h1>

        {/* Status Text - Mono Font */}
        <p className="mt-8 font-mono text-sm tracking-widest text-gray-400 uppercase">
          [ Work in Progress ]
        </p>

        {/* Call-to-action Link */}
        <div className="mt-16">
          <Link
            href="/"
            className="inline-block px-8 py-3 text-sm font-medium tracking-widest text-black uppercase transition-all duration-200 ease-out bg-white border border-white font-oswald hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}