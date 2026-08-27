import type { Metadata } from "next";
import "./globals.css";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'], 
  variable: '--font-serif' 
});

export const metadata: Metadata = {
  title: "Then & Now | Furniture & Interiors",
  description: "Modern manufacture furniture. We craft enduring objects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, cormorant.variable, "antialiased")}>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col">
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
