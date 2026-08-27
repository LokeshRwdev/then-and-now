import Header from "@/components/layout/Header";
import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  bgColor?: string;
  className?: string;
}

export default function PageBanner({ 
  title, 
  subtitle = "NOW & THEN COLLECTION", 
  imageSrc, 
  bgColor = "bg-[#e5e5e5]",
  className = ""
}: PageBannerProps) {
  return (
    <>
      <Header />
      <section className={`relative w-full ${imageSrc ? 'h-[60vh] md:h-[80vh]' : 'pt-40 pb-12'} flex flex-col justify-end px-6 md:px-12 lg:px-24 overflow-hidden ${className}`}>
        <div className={`absolute inset-0 z-0 ${bgColor}`}>
          {imageSrc && (
            <Image src={imageSrc} alt={title} fill className="object-cover" priority />
          )}
        </div>
        <div className={`relative z-10 max-w-7xl mx-auto w-full pb-6 md:pb-12 ${imageSrc ? 'text-white mix-blend-difference' : 'text-[#1A1A1A]'}`}>
          {subtitle && (
            <p className="text-xs font-bold tracking-widest uppercase mb-4">
              {subtitle}
            </p>
          )}
          <h1 className="text-5xl md:text-7xl font-light tracking-wide">
            {title}
          </h1>
        </div>
      </section>
    </>
  );
}
