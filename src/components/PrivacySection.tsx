import React from 'react';
// Updated import
import Image from 'next/image';

const imgAWS = "/assets/aws.png";
const imgCybersource = "/assets/cybersource.png";
const imgPCI = "/assets/pci.png";
const imgISO = "/assets/iso.png";
const imgProtectionShield = "/assets/protection-shield-icon-check-mark-with-security-debit-credit-card-finance-saving-online-payment-protection-system-purple-background-banner-illustration-3d-rendering 1.png";

export default function PrivacySection() {
  return (
    <div className="bg-[#ededed] content-stretch flex flex-col gap-1 items-start justify-start relative w-full" data-name="Footer" data-node-id="2:2998">
      <div className="h-[700px] relative shrink-0 w-full" data-node-id="2:2999">
        <div 
          className="absolute bottom-0 h-[700px] left-0 w-full" 
          data-node-id="2:3000" 
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(239,87,84,1) 0%, rgba(187,72,70,1) 24.5%, rgba(134,57,56,1) 49%, rgba(81,43,42,1) 73.5%, rgba(54,35,35,1) 85.8%, rgba(28,28,28,1) 98%)'
          }} 
        />
        <div className="absolute content-stretch flex flex-col gap-8 items-start justify-start left-[66px] top-[54px] w-[713px]" data-node-id="2:3001">
          <div className="font-['Mulish:Bold',_sans-serif] font-bold leading-[0] min-w-full relative shrink-0 text-[48px] text-white tracking-[0.96px]" data-node-id="2:3002" style={{ width: "min-content" }}>
            <p className="leading-[60px]">We care about your data privacy and information security</p>
          </div>
          <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[24px] text-white w-[689px]" data-node-id="2:3003">
            <p className="leading-[32px]">We handle your payments with complete discretion. Our PCI-certified gateway meets global security standards used by banks and card networks to keep your transactions and personal information safe.</p>
          </div>
          <div className="font-['Noto_Sans_TC:Regular',_sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[24px] text-white" data-node-id="2:3004" style={{ width: "min-content" }}>
            <p className="leading-[32px]">Powered by:</p>
          </div>
          <div className="content-stretch flex gap-[26px] items-center justify-center relative shrink-0" data-node-id="2:3005">
            <div className="h-[77px] shrink-0 w-[128px] relative" data-name="AWS" data-node-id="2:3006">
              <Image src={imgAWS} alt="AWS" width={128} height={77} className="w-full h-full object-contain" />
            </div>
            <div className="h-[115px] shrink-0 w-[129px] relative" data-name="Cybersource" data-node-id="2:3007">
              <Image src={imgCybersource} alt="Cybersource" width={129} height={115} className="w-full h-full object-contain" />
            </div>
            <div className="h-[112px] shrink-0 w-[126px] relative" data-name="PCI DSS" data-node-id="2:3008">
              <Image src={imgPCI} alt="PCI DSS" width={126} height={112} className="w-full h-full object-contain" />
            </div>
            <div className="h-[133px] shrink-0 w-[175px] relative" data-name="ISO 27001" data-node-id="2:3009">
              <Image src={imgISO} alt="ISO 27001" width={175} height={133} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
        <div className="absolute h-[561px] left-[663px] top-2 w-[802px] relative" data-name="protection-shield-icon" data-node-id="2:3010">
          <Image 
            src={imgProtectionShield} 
            alt="Security Shield with Credit Cards and Coins" 
            width={802} 
            height={561} 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>
    </div>
  );
}