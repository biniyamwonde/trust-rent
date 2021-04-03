"use client";

import { useRouter } from "next/navigation";

const imgSuccessful1 = "/assets/success-illustration.svg";
const imgVector = "/assets/rentsmart-logo.svg";
const imgVector1 = "/assets/rentsmart-logo.svg";

function TrustRentIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute bottom-[29.19%] left-[34.76%] right-0 top-[46.99%]">
        <img alt="" className="block max-w-none size-full" src={imgVector} />
      </div>
      <div className="absolute bottom-0 left-0 right-[72.79%] top-0">
        <img alt="" className="block max-w-none size-full" src={imgVector1} />
      </div>
    </div>
  );
}

function SuccessIllustration() {
  return (
    <div className="relative size-full">
      <div 
        className="absolute left-0 top-0 size-[220px] bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url('${imgSuccessful1}')` }} 
      />
    </div>
  );
}

export default function TenancySuccessPage() {
  const router = useRouter();

  const handlePayNow = () => {
    // TODO: Review: Navigate to payment page
    console.log("Navigate to payment page");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-[#fffcfb] min-h-screen relative">
      {/* Header */}
      <div className="absolute h-[51px] left-[30px] top-[29px] w-[174px]">
        <TrustRentIcon />
      </div>

      {/* Success Modal */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-[108px] rounded-[24px] shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center justify-center py-10 w-[414px] gap-6">
            {/* Success Illustration */}
            <div className="size-[220px]">
              <SuccessIllustration />
            </div>

            {/* Success Message */}
            <div className="text-center w-96 space-y-2">
              <h1 className="font-['Mulish'] font-bold text-[#333333] text-[24px] leading-[32px]">
                You&apos;ve set up your tenancy!
              </h1>
              <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px] w-[358px]">
                Your tenancy has been successfully created. You can make your payment now or return to dashboard.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5 w-full justify-center">
              <button
                onClick={handlePayNow}
                className="bg-[#ff5552] text-white font-['Mulish'] font-semibold text-[16px] px-4 py-3 rounded-[24px] w-[198px] hover:opacity-90 transition-opacity"
              >
                Pay tenancy now
              </button>
              <button
                onClick={handleBackToDashboard}
                className="bg-white border border-[#ff5552] text-[#ff5552] font-['Mulish'] font-semibold text-[16px] px-4 py-3 rounded-[120px] w-[231px] hover:bg-[#fff8f8] transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Last updated: 2025-11-24
