import Image from "next/image";

const BRAND_IMAGES = {
  icon: {
    src: "/images/logo_icone_TEAmamos.png",
    width: 1254,
    height: 1254,
  },
  text: {
    src: "/images/TEAmamos_sotexto.png",
    width: 1442,
    height: 445,
  },
  vertical: {
    src: "/images/logo_vertical_TEAmamos.png",
    width: 2172,
    height: 724,
  },
  square: {
    src: "/images/logo_quadrado_TEAmamos.png",
    width: 1122,
    height: 1402,
  },
};

type BrandLogoProps = {
  variant: keyof typeof BRAND_IMAGES;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant, className = "", priority = false }: BrandLogoProps) {
  const image = BRAND_IMAGES[variant];

  return (
    <Image
      src={image.src}
      alt="TEAmamos"
      width={image.width}
      height={image.height}
      priority={priority}
      style={{ width: "auto", maxWidth: "100%" }}
      className={`object-contain ${className}`}
    />
  );
}

export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex align-[-0.14em] ${className}`}>
      <Image
        src={BRAND_IMAGES.text.src}
        alt="TEAmamos"
        width={BRAND_IMAGES.text.width}
        height={BRAND_IMAGES.text.height}
        className="h-[1.05em] w-auto object-contain"
      />
    </span>
  );
}
