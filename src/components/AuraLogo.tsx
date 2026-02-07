import { useId } from 'react';

interface AuraLogoProps {
  className?: string;
  ariaHidden?: boolean;
}

/**
 * AURA logo: stylized A + U, metallic silver, transparent background.
 * Same design language — sharp, minimal, luxury.
 */
const AuraLogo = ({ className = '', ariaHidden }: AuraLogoProps) => {
  const id = useId().replace(/:/g, '');
  const metalId = `aura-metal-${id}`;
  const sparkleId = `aura-sparkle-${id}`;

  return (
  <svg
    viewBox="0 0 70 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden={ariaHidden}
  >
    <defs>
      {/* Metallic silver gradient */}
      <linearGradient
        id={metalId}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#E8E6E3" />
        <stop offset="25%" stopColor="#F5F4F2" />
        <stop offset="50%" stopColor="#C9C6C1" />
        <stop offset="75%" stopColor="#A8A5A0" />
        <stop offset="100%" stopColor="#8A8782" />
      </linearGradient>
      {/* Sparkle highlight */}
      <linearGradient id={sparkleId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#E8E6E3" />
      </linearGradient>
    </defs>

    {/* Letter A — left diagonal, right diagonal, crossbar */}
    <path
      d="M12 44 L22 14 L32 44 M18 28 L26 28"
      stroke={`url(#${metalId})`}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Letter U — left leg, curve, right leg */}
    <path
      d="M38 14 L38 34 Q38 44 45 44 Q52 44 52 34 L52 14"
      stroke={`url(#${metalId})`}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Sparkle above A */}
    <path
      d="M22 8 L23 11 L26 12 L23 13 L22 16 L21 13 L18 12 L21 11 Z"
      fill={`url(#${sparkleId})`}
    />
    {/* Sparkle between A and U */}
    <path
      d="M34 26 L35 29 L38 30 L35 31 L34 34 L33 31 L30 30 L33 29 Z"
      fill={`url(#${sparkleId})`}
    />
  </svg>
  );
};

export default AuraLogo;
