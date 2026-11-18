import Image from "next/image";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "h-10 w-10" }: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Idaho Snow Co. Crest Logo"
      width={96}
      height={96}
      priority
      className={className}
    />
  );
}
