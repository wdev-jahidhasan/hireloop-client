"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;
  console.log(session, isPending);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      },
    });
  };

  const navItems = [
    { title: "Browse Jobs", href: "/jobs" },
    { title: "Companies", href: "/companies" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-default-200 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* Left Side: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-1.5 sm:p-2 transition hover:bg-default-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
            <span className="text-primary">hire</span>
            <span className="text-warning">loop</span>
          </Link>

          {/* Desktop Links */}
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

        {/* Right Side: Auth Buttons & User Profile (Visible Always) */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {isPending ? (
            <div className="h-8 w-16 sm:w-20 animate-pulse rounded-lg bg-default-200" />
          ) : user ? (
            <div className="flex items-center gap-1.5 sm:gap-3">
              <span className="max-w-[80px] xs:max-w-[120px] sm:max-w-none truncate text-xs sm:text-sm font-medium text-default-700">
                Hi, {user.name?.split(" ")[0]}!
              </span>
              <Button
                onClick={handleSignOut}
                variant="flat"
                color="danger"
                size="sm"
                className="h-8 px-2.5 sm:px-3 text-xs sm:text-sm font-medium"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-xs sm:text-sm font-medium text-default-600 transition-colors hover:text-primary px-1.5 sm:px-2 py-1.5"
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-xl bg-primary px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-96 border-t border-default-200" : "max-h-0"
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
        </ul>
      </div>
    </nav>
  );
}