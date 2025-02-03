import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ButtonScrollProps {
  targetId: string;
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function ButtonScroll({ targetId, children, variant = "default", className }: ButtonScrollProps) {
  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      variant={variant}
      className={cn("", className)}
      onClick={scrollToSection}
    >
      {children}
    </Button>
  );
}
