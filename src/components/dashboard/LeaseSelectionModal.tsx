'use client';

// Updated import

import React, { useState, useEffect, useCallback } from 'react';
// Updated import
import { useAuth } from '@/hooks/useAuth';
// Updated import
import { apiService } from '@/services/api';
// Updated import
import { Lease } from '@/types/api';

interface LeaseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeaseSelect: (lease: Lease) => void;
  paymentType: 'deposit_advance' | 'agency_fee';
}

interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
}

function RadioButton({ checked, onChange }: RadioButtonProps) {
  return (
    <div
      className={`relative w-5 h-5 rounded-full border-2 cursor-pointer transition-colors ${
        checked
          ? 'border-[#ff5552] bg-[#ff5552]'
          : 'border-[#ff5552] bg-white'
      }`}
      onClick={onChange}
    >
      {checked && (
        <div className="absolute inset-[3px] rounded-full bg-white" />
      )}
    </div>
  );
}

interface LeaseCardProps {
  lease: Lease;
  isSelected: boolean;
  onSelect: () => void;
}

function LeaseCard({ lease, isSelected, onSelect }: LeaseCardProps) {
  const formatDueDate = (dueDateStr: string) => {
    try {
      const dueDate = new Date(dueDateStr);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        return `Due in ${diffDays} days`;
      } else if (diffDays === 0) {
        return 'Due today';
      } else {
        return `Overdue by ${Math.abs(diffDays)} days`;
      }
    } catch {
      return 'Due date unavailable';
    }
  };


  return (
    <div
      className={`bg-white border rounded-[21px] p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-[#ff5552] bg-[#fff2f2]'
          : 'border-[#dbe2eb] hover:border-[#ff5552]'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-['Mulish'] font-bold text-black text-base leading-6 mb-2">
            {lease.building_name || lease.property_address}
          </div>
          <div className="font-['Mulish'] font-normal text-[#636567] text-sm leading-[22px]">
            {formatDueDate(lease.due_date)}
          </div>
        </div>
        <RadioButton checked={isSelected} onChange={onSelect} />
      </div>
    </div>
  );
}

interface CategorySectionProps {
  categoryName: string;
  leases: Lease[];
  selectedLeaseId: string | null;
  onLeaseSelect: (lease: Lease) => void;
}

function CategorySection({ categoryName, leases, selectedLeaseId, onLeaseSelect }: CategorySectionProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'residential':
        return '#ff5552';
      case 'commercial':
        return '#56b283';
      case 'parking':
        return '#6cbfe2';
      case 'vehicle':
        return '#f49e38';
      default:
        return '#ff5552';
    }
  };

  if (leases.length === 0) return null;

  return (
    <div className="space-y-3">
      <div
        className="inline-flex items-center px-4 py-[5.333px] rounded-2xl text-white font-['Inter'] font-normal text-base leading-[21.333px]"
        style={{ backgroundColor: getCategoryColor(categoryName) }}
      >
        {categoryName}
      </div>
      <div className="space-y-5">
        {leases.map((lease) => (
          <LeaseCard
            key={lease.rid}
            lease={lease}
            isSelected={selectedLeaseId === lease.rid}
            onSelect={() => onLeaseSelect(lease)}
          />
        ))}
      </div>
    </div>
  );
}

// Updated export

export default function LeaseSelectionModal({
  isOpen,
  onClose,
  onLeaseSelect,
  paymentType
}: LeaseSelectionModalProps) {
  const { user } = useAuth();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeaseId, setSelectedLeaseId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLeases = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getLeases(user.uid, user.token, user.lang);

      if (response.status === 'SUCCESS') {
        setLeases(response.data || []);
      } else {
        setError('Failed to load leases');
      }
    } catch (err) {
      console.error('Error fetching leases:', err);
      setError('Unable to load leases. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && user) {
      fetchLeases();
    }
  }, [isOpen, user, fetchLeases]);

  const handleLeaseSelect = (lease: Lease) => {
    setSelectedLeaseId(lease.rid);
    onLeaseSelect(lease);
    onClose();
  };

  const getModalTitle = () => {
    switch (paymentType) {
      case 'deposit_advance':
        return 'Which home do you want to pay for?';
      case 'agency_fee':
        return 'Select lease for agency fee payment';
      default:
        return 'Select a lease';
    }
  };

  const categorizeLeases = (leases: Lease[]) => {
    const categories: { [key: string]: Lease[] } = {
      Residential: [],
      Commercial: [],
      Parking: [],
      Vehicle: []
    };

    leases.forEach(lease => {
      const type = lease.property_type;
      if (categories[type]) {
        categories[type].push(lease);
      }
    });

    return categories;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] shadow-[0px_24px_60px_0px_rgba(0,118,156,0.05),0px_12px_24px_0px_rgba(0,118,156,0.05)] max-w-[630px] w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-10 border-b border-[#dbe2eb]">
          <h2 className="font-['Mulish'] font-bold text-[#333333] text-2xl leading-8">
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#6d6f71] hover:text-[#333333] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-10 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-[#636567]">Loading leases...</div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="text-red-500 text-center">{error}</div>
              <button
                onClick={fetchLeases}
                className="bg-[#ff5552] text-white px-6 py-2 rounded-full hover:bg-[#e04947] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : leases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="text-[#636567] text-center">
                No leases found. Please create a lease first.
              </div>
              <button
                onClick={onClose}
                className="bg-[#ff5552] text-white px-6 py-2 rounded-full hover:bg-[#e04947] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(categorizeLeases(leases)).map(([category, categoryLeases]) => (
                <CategorySection
                  key={category}
                  categoryName={category}
                  leases={categoryLeases}
                  selectedLeaseId={selectedLeaseId}
                  onLeaseSelect={handleLeaseSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scrollbar styling */}
        <style jsx>{`
          .max-h-[60vh]::-webkit-scrollbar {
            width: 8px;
          }
          .max-h-[60vh]::-webkit-scrollbar-track {
            background: #dbe2eb;
            border-radius: 20px;
          }
          .max-h-[60vh]::-webkit-scrollbar-thumb {
            background: #636567;
            border-radius: 20px;
          }
          .max-h-[60vh]::-webkit-scrollbar-thumb:hover {
            background: #333333;
          }
        `}</style>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24

// TODO: Review implementation


