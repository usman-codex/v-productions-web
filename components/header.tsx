"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Updated navLinks with Portfolio and Blog
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/training", label: "Training" },
  { href: "/internship", label: "Internship" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div
        className={cn(
          "bg-purple-deep/90 backdrop-blur-sm transition-all duration-300 overflow-hidden",
          hideTopBar ? "h-0 opacity-0" : "h-10 opacity-100"
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-foreground/80">
            <a
              href="mailto:vmarketingsofficial@gmail.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden lg:inline">
                vmarketingsofficial@gmail.com
              </span>
            </a>
            <a
              href="tel:+923001234567"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">+92 (300) 123-4567</span>
            </a>
          </div>
          <Link href="/contact">
            <Button
              size="sm"
              className="bg-gold text-accent-foreground hover:bg-gold-light font-semibold h-7 text-xs"
            >
              Get a Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "glass-strong transition-all duration-300",
          isScrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">V</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">
                V-Productions
              </span>
              <span className="text-gold text-sm block -mt-1">& Marketing</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-gold transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button className="bg-gold text-accent-foreground hover:bg-gold-light font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "xl:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 py-6 space-y-4 bg-background/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-foreground/80 hover:text-gold transition-colors font-medium py-2 text-lg border-b border-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gold text-accent-foreground hover:bg-gold-light font-semibold mt-4">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}