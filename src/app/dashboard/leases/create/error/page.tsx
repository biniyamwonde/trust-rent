"use client";

import { useRouter } from "next/navigation";

const imgNoResult1 = "/assets/error-illustration.svg";
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

function ErrorIllustration() {
  return (
    <div className="relative size-full">
      <div 
        className="absolute left-0 top-0 size-[220px] bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url('${imgNoResult1}')` }} 
      />
    </div>
  );
}

export default function TenancyErrorPage() {
  const router = useRouter();

  const handleTryAgain = () => {
    // Go back to the lease creation form (step 1)
    router.push("/dashboard/leases/create");
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

      {/* Error Modal */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-[108px] rounded-[24px] shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center justify-center py-10 w-[414px] gap-6">
            {/* Error Illustration */}
            <div className="size-[220px] overflow-hidden">
              <ErrorIllustration />
            </div>

            {/* Error Message */}
            <div className="text-center w-96">
              <h1 className="font-['Mulish'] font-bold text-[#333333] text-[24px] leading-[32px]">
                Oops, something went wrong, your setup is failed.
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-5 w-full justify-center">
              <button
                onClick={handleTryAgain}
                className="bg-[#ff5552] text-white font-['Mulish'] font-semibold text-[16px] px-4 py-3 rounded-[24px] w-[198px] hover:opacity-90 transition-opacity"
              >
                Try again
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

// TODO: Review implementation
