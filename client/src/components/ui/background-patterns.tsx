import { cn } from "@/lib/utils";

interface PatternProps {
  className?: string;
}

export function CirclePattern({ className }: PatternProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" className="fill-primary/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    </div>
  );
}

export function GridPattern({ className }: PatternProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="stroke-primary/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function DotsPattern({ className }: PatternProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-primary/20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

export function WavePattern({ className }: PatternProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 10 Q 12.5 0, 25 10 Q 37.5 20, 50 10 Q 62.5 0, 75 10 Q 87.5 20, 100 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="stroke-primary/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    </div>
  );
}
