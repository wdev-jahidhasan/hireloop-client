import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const productLinks = [
    { name: "Job Discovery", href: "/jobs" },
    { name: "Worker AI", href: "/ai" },
    { name: "Companies", href: "/companies" },
    { name: "Salary Data", href: "/salary" },
  ];

  const navigationLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Career Library", href: "/career-library" },
    { name: "Contact", href: "/contact" },
  ];

  const resourceLinks = [
    { name: "Brand Guideline", href: "/brand" },
    { name: "Newsroom", href: "/newsroom" },
  ];

  return (
    <footer className="border-t border-default-200 bg-black text-default-500">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl font-bold">
                <span className="text-primary">hire</span>
                <span className="text-warning">loop</span>
              </h2>
            </Link>

            <p className="max-w-xs leading-8">
              The AI-native career platform built for people who take their
              work seriously.
            </p>

            <div className="flex items-center gap-3 pt-4">
              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-default-100 transition hover:bg-primary hover:text-white"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white transition hover:opacity-90"
              >
                <FaPinterestP size={18} />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-default-100 transition hover:bg-primary hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 font-semibold text-primary">Product</h3>

            <ul className="space-y-4">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 font-semibold text-primary">Navigation</h3>

            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 font-semibold text-primary">Resources</h3>

            <ul className="space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-default-200 pt-8 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}