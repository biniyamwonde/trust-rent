'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EmptyState from '@/components/dashboard/EmptyState';
import RecordTabs, { RecordTab } from '@/components/dashboard/RecordTabs';
import RecordTableRow, { TransactionRecord } from '@/components/dashboard/RecordTableRow';

// Mock transaction data
const mockRecords: TransactionRecord[] = [
  {
    id: '1',
    description: 'Rent - 99 Sukhumvit Rd, Khlong Toei, Bangkok...',
    transactionNo: '#12548796',
    date: '18 Aug, 12.30 AM',
    amount: 'THB 20,000',
    status: 'Processing',
    type: 'Residential'
  },
  {
    id: '2',
    description: 'Rent - Queen\'s terrace',
    transactionNo: '#45675456',
    date: '14 Aug, 11.15 AM',
    amount: 'THB 15,000',
    status: 'Rejected',
    type: 'Residential'
  },
  {
    id: '3',
    description: 'Rent - 15 Sathorn Rd',
    transactionNo: '#34578907',
    date: '8 Aug, 10.35 PM',
    amount: 'THB 23,000',
    status: 'Completed',
    type: 'Parking'
  },
  {
    id: '4',
    description: 'Rent - 99 Rama IX Rd',
    transactionNo: '#34578975',
    date: '6 Aug, 09.33 PM',
    amount: 'THB 10,000',
    status: 'Completed',
    type: 'Vehicle'
  },
  {
    id: '5',
    description: 'Office Space - Central World',
    transactionNo: '#34578980',
    date: '5 Aug, 02.15 PM',
    amount: 'THB 45,000',
    status: 'Completed',
    type: 'Commercial'
  },
  {
    id: '6',
    description: 'Retail Space - Siam Paragon',
    transactionNo: '#34578981',
    date: '3 Aug, 11.30 AM',
    amount: 'THB 65,000',
    status: 'Processing',
    type: 'Commercial'
  }
];

export default function RecordsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RecordTab>('All Records');
  const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for demo
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter records based on active tab
  const getFilteredRecords = () => {
    if (activeTab === 'All Records') {
      return mockRecords;
    }
    
    // For property type tabs, filter by type
    const typeMap: Record<string, TransactionRecord['type']> = {
      'Residential': 'Residential',
      'Commercial': 'Commercial',
      'Parking': 'Parking'
    };
    
    const filterType = typeMap[activeTab];
    if (filterType) {
      return mockRecords.filter(record => record.type === filterType);
    }
    
    // For Vehicle records, they don't have a dedicated tab but are included in "All Records"
    // Vehicle tab has been removed from the RecordTab type
    
    // For "Deposit & advance fee" and "Agency fee" tabs - these would have different record types
    // For now, return empty array since we don't have sample data for these categories
    if (activeTab === 'Deposit & advance fee' || activeTab === 'Agency fee') {
      return [];
    }
    
    return mockRecords;
  };

  const handleRowClick = (recordId: string) => {
    router.push(`/dashboard/records/${recordId}`);
  };

  const toggleDataState = () => {
    setShowEmptyState(!showEmptyState);
  };

  const filteredRecords = getFilteredRecords();
  const hasRecords = filteredRecords.length > 0 && !showEmptyState;

  if (!hasRecords) {
    return (
      <div className="bg-[#fffcfb] min-h-screen">
        <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="lg:ml-[250px] flex flex-col">
          <DashboardHeader userName="Tai Man" />

          {/* Debug Toggle Button - Remove in production */}
          <div className="px-4 sm:px-6 lg:px-10 mb-4">
            <button
              onClick={toggleDataState}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              {showEmptyState ? 'Show With Data' : 'Show Empty State'} (Debug)
            </button>
          </div>

          <div className="px-4 sm:px-6 lg:px-10">
            <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-[#333333] mb-6 lg:mb-8">
              Records
            </h1>

            <EmptyState
              title="No Records Yet"
              description="Your payment history and transaction records will appear here"
              illustration="payment"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffcfb] min-h-screen">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="lg:ml-[250px] flex flex-col">
        <DashboardHeader userName="Tai Man" />

        {/* Debug Toggle Button - Remove in production */}
        <div className="px-4 sm:px-6 lg:px-10 mb-4">
          <button
            onClick={toggleDataState}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            {showEmptyState ? 'Show With Data' : 'Show Empty State'} (Debug)
          </button>
        </div>

        <div className="px-4 sm:px-6 lg:px-10">
          <h1 className="font-['Mulish:Bold',_sans-serif] font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-[#333333] mb-6 lg:mb-8">
            Records
          </h1>

          {/* Record Tabs */}
          <RecordTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Records Table - Desktop */}
          <div className="hidden lg:block bg-white rounded-[24px] shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center py-6 px-6 border-b border-[#e6eff5]">
              <div className="w-[231px] font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333]">
                Description
              </div>
              <div className="w-40 font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333]">
                Transaction No.
              </div>
              <div className="w-40 font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333]">
                Date
              </div>
              <div className="w-40 font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333]">
                Amount
              </div>
              <div className="w-[120px] font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333] text-center">
                Status
              </div>
            </div>

            {/* Table Rows */}
            <div className="px-6">
              {filteredRecords.map((record) => (
                <RecordTableRow
                  key={record.id}
                  record={record}
                  onRowClick={handleRowClick}
                />
              ))}
            </div>
          </div>

          {/* Records Cards - Mobile */}
          <div className="lg:hidden space-y-4">
            {filteredRecords.map((record) => (
              <RecordTableRow
                key={record.id}
                record={record}
                onRowClick={handleRowClick}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24




// Updated: 2025-11-24
