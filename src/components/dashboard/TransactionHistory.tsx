'use client';

import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

interface Transaction {
  id: string;
  title: string;
  location: string;
  date: string;
  amount: number;
  currency: string;
  iconColor: string;
}

// Helper function to get icon color based on transaction type
const getTransactionColor = (type: string) => {
  const colorMap: Record<string, string> = {
    'Residential': '#ff5552',
    'Commercial': '#56b283',
    'Parking': '#6cbfe2',
    'Vehicle': '#f49e38'
  };
  return colorMap[type] || '#ff5552';
};

const HomeIcon = ({ color }: { color: string }) => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6L8 1L14 6V13C14 13.55 13.55 14 13 14H3C2.45 14 2 13.55 2 13V6Z" 
            fill="#FFFCFB" stroke="#FFFCFB" strokeWidth="1"/>
      <path d="M6 14V8H10V14" fill="#FFFCFB" stroke="#FFFCFB" strokeWidth="1"/>
    </svg>
  </div>
);

interface TransactionHistoryProps {
  showViewAll?: boolean;
}

export default function TransactionHistory({ showViewAll = true }: TransactionHistoryProps) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getTransactions(user.uid, user.token);

        if (response.status === 'SUCCESS' && response.data && Array.isArray(response.data)) {
          // Transform API response to component format using real API field structure
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformedTransactions: Transaction[] = response.data.slice(0, 2).map((apiTransaction: any) => {
            // Format date from API paydt field (e.g., "January 22 at 00:03")
            let formattedDate = 'Date not available';
            if (apiTransaction.paydt) {
              formattedDate = apiTransaction.paydt;
            }

            // Get property address from nested rental object
            const propertyAddress = apiTransaction.rental?.rbuilding || 'Property';

            // Get property type from rentaltype for color mapping
            const propertyType = apiTransaction.rental?.rentaltype || 'Residential';

            return {
              id: apiTransaction.pno, // Using pno (transaction number) as ID
              title: `${apiTransaction.item} - ${propertyAddress}`, // Using item field for description
              location: '',
              date: formattedDate,
              amount: apiTransaction.totalamt || 0, // Using totalamt for display amount
              currency: apiTransaction.currency || 'THB',
              iconColor: getTransactionColor(propertyType)
            };
          });

          setTransactions(transformedTransactions);
        } else {
          // Fallback to mock data for development
          const mockTransactions: Transaction[] = [
            {
              id: '1',
              title: 'Rent - 99 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
              location: '',
              date: '22 Aug, 12.03 AM',
              amount: 38000,
              currency: 'THB',
              iconColor: '#ff5552'
            },
            {
              id: '2',
              title: 'Rent - 99 Rama IX Rd, Huai Khwang, Bangkok 10310',
              location: '',
              date: '14 Aug, 11.15 AM',
              amount: 18000,
              currency: 'THB',
              iconColor: '#56b283'
            }
          ];
          setTransactions(mockTransactions);
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
        setError('Failed to load transactions');

        // Fallback to mock data on error
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            title: 'Rent - 99 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
            location: '',
            date: '22 Aug, 12.03 AM',
            amount: 38000,
            currency: 'THB',
            iconColor: '#ff5552'
          }
        ];
        setTransactions(mockTransactions);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleViewAll = () => {
    console.log('View all transactions');
  };

  // Loading state
  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[22px] leading-normal text-[#333333]">
            Recent Transaction
          </h2>
        </div>
        <div className="bg-white rounded-[24px] h-[180px] w-[1109px] p-6">
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-6">
                  <div className="w-[42px] h-[42px] bg-gray-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-96" />
                    <div className="h-3 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[22px] leading-normal text-[#333333]">
            Recent Transaction
          </h2>
        </div>
        <div className="bg-white rounded-[24px] h-[180px] w-[1109px] p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#ff5552] text-white px-4 py-2 rounded hover:opacity-90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-[22px] leading-normal text-[#333333]">
          Recent Transaction
        </h2>
        {showViewAll && (
          <button
            onClick={handleViewAll}
            className="font-['Mulish:Bold',_sans-serif] font-bold text-[16px] leading-[24px] text-[#636567] hover:text-[#333333] transition-colors duration-200"
          >
            View All
          </button>
        )}
      </div>

      <div className="bg-white rounded-[24px] h-[180px] w-[1109px] p-6">
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              {/* Left side - Icon and details */}
              <div className="flex items-center gap-6">
                {/* Transaction icon */}
                <div className="relative">
                  {/* Background circle */}
                  <div className="w-[42px] h-[42px] bg-gray-100 rounded-full flex items-center justify-center">
                    <HomeIcon color={transaction.iconColor} />
                  </div>
                </div>

                {/* Transaction details */}
                <div className="flex flex-col">
                  <h3 className="font-['Mulish:Bold',_sans-serif] font-bold text-[16px] leading-[24px] text-[#232323] w-[495px]">
                    {transaction.title}
                  </h3>
                  <p className="font-['Mulish:Regular',_sans-serif] font-normal text-[14px] leading-[22px] text-[#8a8c8d] w-[139px]">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Right side - Amount */}
              <div className="text-right w-[94px]">
                <span className="font-['Inter:Medium',_sans-serif] font-medium text-[16px] leading-normal text-[#333333]">
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24


// Updated: 2025-11-24
