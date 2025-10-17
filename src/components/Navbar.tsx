'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                XRP Rich List
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                                Home
                            </Link>
                            <Link href="/compare" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                                Compare Wallets
                            </Link>
                            <Link href="/analytics" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                                Analytics
                            </Link>
                            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors">
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md hover:bg-gray-700"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Home
                        </Link>
                        <Link href="/compare" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Compare Wallets
                        </Link>
                        <Link href="/analytics" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            Analytics
                        </Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}