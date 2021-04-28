'use client';

// Updated import

// Updated import

import React from 'react';
// Updated import
// Updated import
import Link from 'next/link';
// Updated import
// Updated import
import Image from 'next/image';
// Updated import
// Updated import
import { usePathname } from 'next/navigation';

// SVG Icons
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 2L21 9V20C21 20.5523 21.4477 21 22 21H2C1.44772 21 1 20.5523 1 20V9Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const RecordsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  isActive?: boolean;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'My Leases', href: '/dashboard/leases', icon: LeaseIcon },
  { name: 'Records', href: '/dashboard/records', icon: RecordsIcon },
  { name: 'My Account', href: '/dashboard/account', icon: AccountIcon },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

// Updated export

// Updated export

// Updated export

export default function DashboardSidebar({ isOpen = false, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    // Close mobile menu when navigating
    if (onToggle && isOpen) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#ff5552] text-white p-2 rounded-lg shadow-lg hover:bg-[#e54441] transition-colors duration-200"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-[#ff5552] h-screen fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out
        w-[250px] lg:w-[250px]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <Link
          href="/"
          className="h-[51px] w-[174px] overflow-clip ml-[30px] mt-[29px] mb-[42px] block hover:opacity-80 transition-opacity duration-200"
          onClick={handleLinkClick}
        >
          <Image src="/assets/rentsmart-logo-white.svg" alt="Trust Rent" width={174} height={51} className="h-full w-full object-contain" />
        </Link>

        {/* Navigation Items */}
        <nav className="mt-[42px]">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center h-[60px] w-full transition-colors duration-200 hover:bg-white hover:bg-opacity-10 relative"
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 bg-white h-[60px] w-1.5 rounded-br-[10px] rounded-tr-[10px] z-10" />
                )}

                <div className="flex items-center gap-5 ml-[46px]">
                  <div className="text-white w-6 h-6">
                    <Icon />
                  </div>
                  <span className="font-['Mulish:Bold',_sans-serif] font-bold text-[20px] leading-[24px] text-white">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

// Updated: 2025-11-24


// Updated: 2025-11-24

// Last updated: 2025-11-24

// TODO: Review implementation






