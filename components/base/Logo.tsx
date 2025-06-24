import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle */}
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="#3B82F6"
            stroke="#2563EB"
            strokeWidth="2"
          />

          {/* Pencil Icon */}
          <path d="M32 16L28 20L26 18L30 14L32 16Z" fill="white" />
          <path d="M26 18L18 26L16 32L22 30L30 22L26 18Z" fill="white" />

          {/* Flow Lines */}
          <path
            d="M12 20C14 18 16 18 18 20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 28C16 26 18 26 20 28"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 36C22 34 24 34 26 36"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Sparkle */}
          <circle cx="36" cy="12" r="1.5" fill="#FCD34D" />
          <circle cx="40" cy="16" r="1" fill="#FCD34D" />
        </svg>
      </div>

      {/* App Name */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-blue-500 ${textSizes[size]}`}>
            SketchFlow
          </span>
          <span className="text-xs text-gray-400 font-medium">
            Draw • Create • Flow
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
