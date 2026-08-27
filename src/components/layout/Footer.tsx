import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8E6E1] text-[#1A1A1A] mt-auto">
      {/* Top Links Section */}
      <div className="flex flex-col w-full text-3xl md:text-5xl tracking-tight uppercase">
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-black/10">
          <span className="font-light">OBJECTS</span>
          <Link href="/objects" className="text-[10px] md:text-xs tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
            VIEW COLLECTION
          </Link>
        </div>
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-black/10">
          <span className="font-light">LIGHTS</span>
          <Link href="/lights" className="text-[10px] md:text-xs tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
            VIEW COLLECTION
          </Link>
        </div>
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-black/10">
          <span className="font-light">PROCESS</span>
          <Link href="/process" className="text-[10px] md:text-xs tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
            VIEW COLLECTION
          </Link>
        </div>
        <div className="flex justify-between items-center px-6 md:px-12 py-8 border-b border-black/10">
          <span className="font-light">MATERIAL LIBRARY</span>
          <Link href="/material-library" className="text-[10px] md:text-xs tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
            VIEW COLLECTION
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-16">
          IT'S NOW & THEN
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm leading-relaxed">
          {/* Subscribe */}
          <div className="flex flex-col">
            <span className="font-semibold mb-4">Subscribe to our emails</span>
            <form className="flex border border-black p-1 pl-3 bg-transparent">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-none outline-none w-full placeholder-black/50"
              />
              <button type="submit" className="p-2 hover:opacity-60 transition-opacity">
                ▶
              </button>
            </form>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col">
            <span className="font-semibold mb-4">Opening Hours</span>
            <p>Mon-Sat: 10am-6pm</p>
            <p>Appointment only</p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <span className="font-semibold mb-4">Links</span>
            <nav className="flex flex-col space-y-1">
              <Link href="/projects" className="hover:opacity-60 transition-opacity">Projects</Link>
              <Link href="/objects" className="hover:opacity-60 transition-opacity">Objects</Link>
              <Link href="/lights" className="hover:opacity-60 transition-opacity">Lights</Link>
              <Link href="/process" className="hover:opacity-60 transition-opacity">Process</Link>
              <Link href="/material-library" className="hover:opacity-60 transition-opacity">Material Library</Link>
              <Link href="/about" className="hover:opacity-60 transition-opacity">Our Story</Link>
            </nav>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <span className="font-semibold mb-4">Address</span>
            <p className="max-w-[200px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10 flex w-full">
        <div className="flex-1"></div>
        <div className="flex">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="border-l border-black/10 px-6 py-4 text-xs font-semibold hover:bg-black/5 transition-colors">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="border-l border-black/10 px-6 py-4 text-xs font-semibold hover:bg-black/5 transition-colors">
            LinkedIn
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="border-l border-black/10 px-6 py-4 text-xs font-semibold hover:bg-black/5 transition-colors">
            Pinterest
          </a>
        </div>
      </div>
    </footer>
  );
}
