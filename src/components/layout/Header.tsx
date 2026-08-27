"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'OBJECTS', href: '/objects', hasSubmenu: true },
  { name: 'LIGHTS', href: '/lights', hasSubmenu: false },
  { name: 'PROCESS', href: '/process', hasSubmenu: false },
  { name: 'MATERIAL LIBRARY', href: '/material-library', hasSubmenu: false },
  { name: 'EXHIBITIONS', href: '/exhibitions', hasSubmenu: false },
  { name: 'PRESS', href: '/press', hasSubmenu: false },
  { name: 'ABOUT', href: '/about', hasSubmenu: false },
];

const subItems = [
  { name: 'Chairs', href: '#chairs' },
  { name: 'Tables', href: '#tables' },
  { name: 'Sofa', href: '#sofa' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <Link 
            href="/" 
            className="text-sm font-semibold tracking-widest uppercase"
            onClick={() => setIsOpen(false)}
          >
            Then & Now
          </Link>
        </div>
        <div className="pointer-events-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-semibold tracking-widest uppercase focus:outline-none"
          >
            Menu {isOpen ? '-' : ''}
          </button>
        </div>
      </header>

      {/* Side Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[500px] bg-black text-white z-40 transform transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-start min-h-screen pt-40 pb-20">
          <nav className="flex flex-col items-center w-full px-8">
            {menuItems.map((item, index) => (
              <div key={item.name} className={`flex flex-col items-center w-full ${index !== menuItems.length - 1 ? 'mb-8' : ''}`}>
                <div className="flex items-center justify-center relative w-full group">
                  <Link 
                    href={item.href} 
                    className="text-3xl md:text-4xl font-light tracking-wider hover:opacity-70 transition-opacity text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasSubmenu && (
                    <button 
                      onClick={(e) => toggleSubmenu(item.name, e)}
                      className="absolute right-0 text-xl md:text-2xl p-2 opacity-50 hover:opacity-100 transition-opacity"
                      aria-label={`Toggle ${item.name} submenu`}
                    >
                      {openSubmenus[item.name] ? '-' : '+'}
                    </button>
                  )}
                </div>
                
                {item.hasSubmenu && (
                  <div 
                    className={`flex flex-col items-center space-y-5 overflow-hidden transition-all duration-300 ${
                      openSubmenus[item.name] ? 'max-h-64 mt-6 opacity-100' : 'max-h-0 mt-0 opacity-0'
                    }`}
                  >
                    {subItems.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        href={`${item.href}${subItem.href}`}
                        className="text-lg md:text-xl font-light tracking-wide text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Background overlay for mobile or to close on click outside */}
      <div 
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

    </>
  );
}
