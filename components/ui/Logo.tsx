import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <Image
        src="/logo/circled_logo.png"
        alt="Baba Tikkah Logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
      <span className="font-heading text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
        Baba Tikkah
      </span>
    </div>
  );
}
