'use client';

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.93 21 3 13.07 3 3.08C3 2.48 3.48 2 4.08 2H7.08C7.68 2 8.16 2.48 8.16 3.08C8.16 4.18 8.36 5.24 8.72 6.22C8.86 6.6 8.74 7.02 8.4 7.3L6.9 8.51C8.07 10.62 9.38 11.93 11.49 13.1L12.7 11.6C12.98 11.26 13.4 11.14 13.78 11.28C14.76 11.64 15.82 11.84 16.92 11.84C17.52 11.84 18 12.32 18 12.92V15.92C18 16.52 17.52 17 16.92 17H13.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M2 6L12 13L22 6" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

interface LeaseDetailProps {
  onBack: () => void;
}

// Updated export

export default function LeaseDetail({ onBack }: LeaseDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Lease Details</h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Property Image and Basic Info */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 relative">
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold mb-1">Modern Condo in Sukhumvit</h2>
              <p className="text-blue-100">2 bedrooms • 2 bathrooms • 80 sqm</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lease Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Lease ID</span>
                    <p className="font-medium">LS-2024-001</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Lease Period</span>
                    <p className="font-medium">Jan 1, 2024 - Dec 31, 2024</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Monthly Rent</span>
                    <p className="font-medium text-green-600">฿25,000</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Deposit</span>
                    <p className="font-medium">฿50,000</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Address</span>
                    <p className="font-medium">123 Sukhumvit Road, Watthana, Bangkok 10110</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Floor</span>
                    <p className="font-medium">15th Floor</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Furnishing</span>
                    <p className="font-medium">Fully Furnished</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Landlord Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Landlord Information</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                SM
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Somchai Maneerat</h4>
                <p className="text-sm text-gray-500 mb-3">Property Owner</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <PhoneIcon />
                    <span>+66 81 234 5678</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MailIcon />
                    <span>somchai.m@email.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beneficiary Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Beneficiary Information</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-500 mb-3">Primary Tenant</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <PhoneIcon />
                    <span>+66 87 654 3210</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MailIcon />
                    <span>john.doe@email.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { date: 'Dec 1, 2024', amount: '฿25,000', status: 'Paid', type: 'Monthly Rent' },
                { date: 'Nov 1, 2024', amount: '฿25,000', status: 'Paid', type: 'Monthly Rent' },
                { date: 'Oct 1, 2024', amount: '฿25,000', status: 'Paid', type: 'Monthly Rent' },
                { date: 'Sep 1, 2024', amount: '฿25,000', status: 'Paid', type: 'Monthly Rent' },
                { date: 'Jan 1, 2024', amount: '฿50,000', status: 'Paid', type: 'Security Deposit' },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${payment.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium text-gray-900">{payment.type}</p>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{payment.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated: 2025-11-24
