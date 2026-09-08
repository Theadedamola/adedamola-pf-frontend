import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// 1. Figma: Authentic 5-part multi-color icon
export function FigmaLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

// 2. React: Authentic Cyan atom with core
export function ReactLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// 3. TypeScript: Authentic #3178C6 rounded square with white TS
export function TypeScriptLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="128" height="128" rx="24" fill="#3178C6" />
      <path
        d="M71.2 59.8h-18v48.6H40.4V59.8H22.5V49.4h48.7v10.4zm34.2 32.8c0 3.3-1.1 5.9-3.2 7.7-2.1 1.8-5.3 2.7-9.5 2.7-4.1 0-7.7-.8-10.7-2.4-3-1.6-4.9-3.8-5.7-6.5l10.2-5.7c.6 1.7 1.6 3.1 3 4.1 1.4 1 3.2 1.5 5.3 1.5 1.8 0 3.2-.4 4.1-1.1.9-.7 1.4-1.7 1.4-2.8 0-1.2-.5-2.2-1.5-3-1-1-2.9-2-5.7-3.1-3.9-1.5-6.8-3.1-8.7-4.9-1.9-1.8-2.9-4.3-2.9-7.5 0-3.3 1.2-5.9 3.5-7.9 2.3-2 5.5-3 9.6-3 3.5 0 6.6.7 9.3 2.1 2.7 1.4 4.6 3.4 5.6 6l-9.8 5.6c-.6-1.5-1.5-2.6-2.6-3.3-1.1-.7-2.6-1-4.3-1-1.6 0-2.8.3-3.7 1-.9.7-1.3 1.5-1.3 2.5 0 1 .4 1.8 1.3 2.5.9.7 2.6 1.6 5.2 2.6 4.3 1.6 7.4 3.4 9.3 5.4 1.9 1.9 2.9 4.4 2.9 7.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 4. Next.js: Authentic monochrome/gradient icon
export function NextLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="90" cy="90" r="90" fill="#000000" stroke="#333" strokeWidth="6" />
      <path
        d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
        fill="url(#next_grad)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#next_grad2)" />
      <defs>
        <linearGradient id="next_grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next_grad2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 5. Tailwind CSS: Vibrant cyan-blue gradient waves
export function TailwindLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="url(#tw_grad)"
      />
      <defs>
        <linearGradient id="tw_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 6. Framer Motion: Multi-tone violet & blue geometry
export function FramerMotionLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M4 0h16v8h-8z" fill="#0055FF" />
      <path d="M4 8h8l8 8H4z" fill="#FF0055" />
      <path d="M4 16h8v8z" fill="#9900FF" />
    </svg>
  );
}

// 7. Node.js: Official hexagon with green & light green facets
export function NodeLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16 2.5L28.124 9.5V23.5L16 30.5L3.876 23.5V9.5L16 2.5Z"
        fill="#5FA04E"
      />
      <path
        d="M16 2.5L28.124 9.5L16 16.5L3.876 9.5L16 2.5Z"
        fill="#66B852"
        opacity="0.25"
      />
      <path
        d="M16 16.5V30.5L3.876 23.5V9.5L16 16.5Z"
        fill="#417E38"
        opacity="0.2"
      />
      <path
        d="M16.5 8c-.4 0-.8.2-1 .5l-4 3c-.4.3-.5.7-.5 1.1v6.8c0 .4.2.8.5 1.1l4 3c.3.2.7.3 1.1.2.4-.1.7-.4.9-.7l.1-.3c.1-.3 0-.6-.2-.8l-1.3-1c-.2-.1-.4-.2-.6-.2s-.4.1-.5.2l-2.6 2v-5.2l7.7 5.7c.3.2.7.3 1.1.2.4-.1.7-.4.9-.7l.8-1.5c.2-.4.2-.9 0-1.3l-5.6-4.2 3.8-2.8c.4-.3.5-.7.5-1.1v-3c0-.8-.7-1.4-1.5-1.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 8. Git: Authentic #F05032 orange diamond with branching nodes
export function GitLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g transform="translate(50,50) rotate(45) translate(-50,-50)">
        <rect x="12" y="12" width="76" height="76" rx="14" fill="#F05032" />
        <g fill="#FFFFFF" stroke="#FFFFFF">
          <circle cx="36" cy="36" r="8" strokeWidth="0" />
          <circle cx="36" cy="64" r="8" strokeWidth="0" />
          <circle cx="64" cy="64" r="8" strokeWidth="0" />
          <line x1="36" y1="36" x2="36" y2="64" strokeWidth="7" strokeLinecap="round" />
          <path d="M 64,64 L 64,52 C 64,44 56,36 48,36 L 36,36" strokeWidth="7" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

// 9. Design Systems: Multi-color design token swatches / atomic layers
export function DesignSystemsLogo({ size = 16, className = "", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="2" y="3" width="9" height="9" rx="2.5" fill="#EC4899" />
      <rect x="13" y="3" width="9" height="9" rx="2.5" fill="#8B5CF6" />
      <rect x="2" y="14" width="9" height="9" rx="2.5" fill="#3B82F6" />
      <rect x="13" y="14" width="9" height="9" rx="2.5" fill="#10B981" />
    </svg>
  );
}
