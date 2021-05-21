import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-[#fffcfb] min-h-screen">
      {children}
    </div>
  );
}

// Updated: 2025-11-24
