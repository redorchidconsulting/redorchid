import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonScroll } from "@/components/ui/button-scroll";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Redorchid Consulting
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <ButtonScroll
                key={item.id}
                targetId={item.id}
                variant="ghost"
                className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary group"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </ButtonScroll>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <ButtonScroll
                key={item.id}
                targetId={item.id}
                variant="ghost"
                className="w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </ButtonScroll>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}