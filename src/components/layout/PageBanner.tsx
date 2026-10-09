import Header from "@/components/layout/Header";
import AppImage from "@/components/ui/AppImage";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  fallbackSrc?: string;
  bgColor?: string;
  className?: string;
  height?: string;
}

export default function PageBanner({
  title,
  subtitle,
  imageSrc,
  fallbackSrc,
  bgColor = "bg-[#e5e5e5]",
  className = "",
  height,
}: PageBannerProps) {
  const bannerHeight = height || (imageSrc ? "h-screen min-h-[600px]" : "pt-40 pb-12");

  return (
    <>
      <Header />
      <section
        className={`relative w-full ${bannerHeight} flex flex-col justify-end px-6 md:px-12 lg:px-20 overflow-hidden ${className}`}
      >
        <div className={`absolute inset-0 z-0 ${bgColor}`}>
          {imageSrc && (
            <AppImage
              src={imageSrc}
              fallbackSrc={fallbackSrc}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="relative z-10 w-full pb-12 md:pb-16 lg:pb-24">
          {subtitle && subtitle.trim() !== "" && (
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/90">
              {subtitle}
            </p>
          )}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight md:tracking-normal ${
              imageSrc ? "text-white drop-shadow-sm" : "text-[#1A1A1A]"
            }`}
          >
            {title}
          </h1>
        </div>
      </section>
    </>
  );
}
