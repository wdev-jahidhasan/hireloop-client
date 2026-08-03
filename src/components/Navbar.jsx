"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      title: "Browse Jobs",
      href: "/jobs",
    },
    {
      title: "Companies",
      href: "/companies",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-default-200 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-10">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 transition hover:bg-default-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">hire</span>
            <span className="text-warning">loop</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-default-600 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-default-600 transition-colors hover:text-primary"
          >
            Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen
            ? "max-h-96 border-t border-default-200"
            : "max-h-0"
        }`}
      >
        <ul className="space-y-1 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-default-700 transition hover:bg-default-100"
              >
                {item.title}
              </Link>
            </li>
          ))}

          <li className="mt-4 border-t border-default-200 pt-4">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-center transition hover:bg-default-100"
            >
              Sign In
            </Link>
          </li>

          <li>
            <Link
              href="/auth/signup"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl bg-primary py-3 text-center font-semibold text-white transition hover:opacity-90"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}