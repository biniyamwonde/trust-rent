"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../../../services/api";
import { useAuth } from "../../../../hooks/useAuth";
import type { BuildingSearchResult } from "../../../../types/api";

const imgVector = "/assets/rentsmart-logo-red.svg";
const imgVector1 = "/assets/rentsmart-logo-red.svg";
const imgGroup = "/assets/rentsmart-logo-red.svg";
const imgDrawer13 = "/assets/residential-icon.svg";
const imgDrawer21 = "/assets/commercial-icon.svg";
const imgGroup1 = "/assets/parking-icon.svg";
const imgFrame1000003257 = "/assets/checkmark-icon.svg";
const imgChevronDown = "/assets/chevron-down.svg";
const imgDocumentIcon = "/assets/document-icon.svg";
const imgDeleteIcon = "/assets/delete-icon.svg";
const imgPdfIcon = "/assets/pdf-icon.png";
const imgDocPreview = "/assets/pdf-icon.png";
const imgCloseIcon = "/assets/close-icon.svg";
const imgCheckmark = "/assets/checkmark-icon.svg";
const imgEditIcon = "/assets/edit-icon.svg";

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

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

function RadioOption({ label, selected, onSelect }: RadioOptionProps) {
  return (
    <div
      className={`h-24 sm:h-28 lg:h-[122px] w-full max-w-[630px] relative cursor-pointer transition-colors ${
        selected
          ? "bg-[#ffeff2] border-[#ff5552]"
          : "bg-white border-[#bcbdbe] hover:border-[#ff5552] hover:bg-[#ffeff2]"
      } rounded-xl sm:rounded-[20px] border`}
      onClick={onSelect}
    >
      <div className="absolute flex gap-3 sm:gap-4 items-center left-4 sm:left-6 top-1/2 transform -translate-y-1/2 right-4 sm:right-6">
        <div className="relative shrink-0 size-4 sm:size-5">
          <div className={`absolute inset-0 rounded-full border ${
            selected ? "border-[#ff5552]" : "border-[#bcbdbe]"
          }`} />
          {selected && (
            <div className="absolute bg-[#ff5552] inset-[18.75%] rounded-full" />
          )}
        </div>
        <div className="font-['Mulish'] font-normal text-[#333333] text-sm sm:text-base lg:text-[16px] leading-[24px] flex-1">
          {label}
        </div>
      </div>
    </div>
  );
}

interface RentalTypeCardProps {
  label: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}

function RentalTypeCard({ label, image, selected, onSelect }: RentalTypeCardProps) {
  return (
    <div className="relative w-full max-w-[197px] cursor-pointer transition-all" onClick={onSelect}>
      <div
        className={`bg-white h-40 sm:h-44 lg:h-[184px] w-full rounded-xl sm:rounded-[20px] transition-all ${
          selected
            ? "border-2 border-[#ff5552]"
            : "shadow-[0px_4px_16.6px_0px_rgba(0,0,0,0.1)] hover:shadow-lg"
        }`}
      >
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center h-full px-4">
          <div className="size-16 sm:size-18 lg:size-20 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('${image}')` }} />
          <div className="font-['Mulish'] font-bold text-[#ff5552] text-lg sm:text-xl lg:text-[20px] leading-[24px] text-center">
            {label}
          </div>
        </div>
      </div>
      {selected && (
        <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 size-6 sm:size-8">
          <img alt="Selected" className="block max-w-none size-full" src={imgFrame1000003257} />
        </div>
      )}
    </div>
  );
}

type RenterType = "renter" | "not_renter";
type RentalType = "residential" | "commercial" | "parking";

interface AddressForm {
  street: string;
  province: string;
  postalCode: string;
}

interface RentForm {
  effectiveDate: string;
  endDate: string;
  rentAmount: string;
  dueDate: string;
}

interface BeneficiaryForm {
  bankAccountName: string;
  bankName: string;
  bankAccountNumber: string;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image';
  preview?: string;
}

interface DocumentForm {
  uploadedDocuments: UploadedDocument[];
}

interface RenterInfoForm {
  renterName: string;
  renterMobile: string;
  relationship: string;
}

export default function CreateLeasePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRenterOption, setSelectedRenterOption] = useState<RenterType | null>(null);
  const [selectedRentalType, setSelectedRentalType] = useState<RentalType | null>(null);
  const [addressForm, setAddressForm] = useState<AddressForm>({
    street: "",
    province: "Bangkok",
    postalCode: ""
  });
  const [rentForm, setRentForm] = useState<RentForm>({
    effectiveDate: "20/08/2025",
    endDate: "20/09/2025",
    rentAmount: "",
    dueDate: "1st"
  });
  const [beneficiaryForm, setBeneficiaryForm] = useState<BeneficiaryForm>({
    bankAccountName: "",
    bankName: "",
    bankAccountNumber: ""
  });
  const [documentForm, setDocumentForm] = useState<DocumentForm>({
    uploadedDocuments: []
  });
  const [renterInfoForm, setRenterInfoForm] = useState<RenterInfoForm>({
    renterName: "",
    renterMobile: "",
    relationship: ""
  });
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Mock data - simulate API response after upload
  const mockUploadedDocuments: UploadedDocument[] = [
    {
      id: '1',
      name: 'Agreement.jpg',
      size: '200 kb',
      type: 'image',
      preview: imgDocPreview
    },
    {
      id: '2', 
      name: 'Agreement1.pdf',
      size: '200 kb',
      type: 'pdf'
    }
  ];
  
  const [showMockData, setShowMockData] = useState(false);
  const [showUploadLaterModal, setShowUploadLaterModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // API Integration state
  const [preloadData, setPreloadData] = useState<{
    relationship?: Array<{gsid: string; gvalue: string}>;
    bank?: Array<{gsid: string; gvalue: string}>;
    district?: unknown;
    region?: unknown;
    docguide?: unknown;
    docguidecommon?: unknown;
    fullname?: string;
  } | null>(null);
  const [uploadedDocFilename, setUploadedDocFilename] = useState<string>('');
  
  // Building search state
  const [buildingSearchResults, setBuildingSearchResults] = useState<BuildingSearchResult[]>([]);
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isSelectingFromDropdownRef = useRef(false);

  // Load preload data when rental type is selected (Step 2) or on mount for relationship data
  useEffect(() => {
    const loadPreloadData = async () => {
      try {
        // Map UI rental type to API rental type
        const rentalTypeMap: Record<string, string> = {
          'residential': 'HOME',
          'commercial': 'COMMERCIAL',
          'parking': 'PARKING'
        };

        // Use selected rental type if available, otherwise default to 'HOME' for initial load
        const apiRentalType = selectedRentalType ? rentalTypeMap[selectedRentalType] : 'HOME';
        
        console.log('[Loading Preload Data for]', apiRentalType);
        const response = await apiService.getPreloadTenancySetupInfo(undefined, 'en', apiRentalType);
        console.log('[Preload Data Response]', response);
        
        if (response && response.status === 'SUCCESS') {
          // API returns data at root level, not under 'data' property
            const preloadInfo = {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            relationship: (response as any).relationship,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            bank: (response as any).bank,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            district: (response as any).district,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            region: (response as any).region,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            docguide: (response as any).docguide,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            docguidecommon: (response as any).docguidecommon,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fullname: (response as any).fullname
          };
          
          setPreloadData(preloadInfo);
          console.log('[Preload Data Loaded Successfully]', {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            banks: (preloadInfo.bank as any)?.length || 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            regions: (preloadInfo.region as any)?.length || 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            districts: (preloadInfo.district as any)?.length || 0,
            relationships: preloadInfo.relationship?.length || 0,
            fullname: preloadInfo.fullname
          });
        } else {
          console.error('[Preload Data Error]', response?.error || response || 'No response received');
          // Set empty preload data to prevent UI issues
          setPreloadData({
            relationship: [],
            bank: [],
            district: null,
            region: null,
            docguide: null,
            docguidecommon: null,
            fullname: ''
          });
        }
      } catch (error) {
        console.error('[Preload Data Exception]', error);
        // Set empty preload data to prevent UI issues
        setPreloadData({
          relationship: [],
          bank: [],
          district: null,
          region: null,
          docguide: null,
          docguidecommon: null,
          fullname: ''
        });
      }
    };

    // Load on component mount and when rental type changes
    loadPreloadData();
  }, [selectedRentalType]); // Trigger on mount and when rental type is selected

  // Pre-fill owner name from preload data
  useEffect(() => {
    if (preloadData?.fullname && !beneficiaryForm.bankAccountName) {
      setBeneficiaryForm(prev => ({
        ...prev,
        bankAccountName: preloadData.fullname || ''
      }));
      console.log('[Owner Name Pre-filled]', preloadData.fullname);
    }
  }, [preloadData, beneficiaryForm.bankAccountName]);

  // Building search with debounce (from Notion: searchBuilding)
  useEffect(() => {
    const searchBuildings = async () => {
      const searchTerm = addressForm.street.trim();
      
      // Don't search if we're selecting from dropdown
      if (isSelectingFromDropdownRef.current) {
        return;
      }
      
      // Only search if there are at least 2 characters
      if (searchTerm.length < 2) {
        setBuildingSearchResults([]);
        setShowBuildingDropdown(false);
        return;
      }

      setIsSearching(true);
      try {
        console.log('[Searching Buildings]', searchTerm);
        const response = await apiService.searchBuilding(searchTerm);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (response.status === 'SUCCESS' && (response as any).result) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const results = (response as any).result as BuildingSearchResult[];
          setBuildingSearchResults(results);
          setShowBuildingDropdown(results.length > 0);
          console.log('[Building Search Results]', results);
        } else {
          setBuildingSearchResults([]);
          setShowBuildingDropdown(false);
        }
      } catch (error) {
        console.error('[Building Search Exception]', error);
        setBuildingSearchResults([]);
        setShowBuildingDropdown(false);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(searchBuildings, 500);
    return () => clearTimeout(timeoutId);
  }, [addressForm.street]); // Only depend on street input

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.building-search-container')) {
        setShowBuildingDropdown(false);
      }
    };

    if (showBuildingDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showBuildingDropdown]);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedRenterOption) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedRentalType) {
      setCurrentStep(3);
    } else if (currentStep === 3 && canProceed()) {
      setCurrentStep(4);
    } else if (currentStep === 4 && canProceed()) {
      setCurrentStep(5);
    } else if (currentStep === 5 && canProceed()) {
      setCurrentStep(6);
    } else if (currentStep === 6) {
      // Check if no documents uploaded, show modal
      if (!documentForm.uploadedDocuments || documentForm.uploadedDocuments.length === 0) {
        setShowUploadLaterModal(true);
        return;
      }
      setCurrentStep(7);
    } else if (currentStep === 7 && canProceed()) {
      // Check if no documents uploaded, go directly to dashboard
      if (!documentForm.uploadedDocuments || documentForm.uploadedDocuments.length === 0) {
        console.log("No documents uploaded, going to dashboard");
        router.push('/dashboard');
        return;
      }
      
      // Create lease via API
      if (!user) {
        console.error('User not authenticated');
        router.push('/dashboard/leases/create/error');
        return;
      }

      setIsSubmitting(true);

      const submitLease = async () => {
        try {
          // Map rental type to API format (from Notion documentation)
          const rentalTypeMap: Record<string, string> = {
            'residential': 'HOME',
            'commercial': 'COMMERCIAL',
            'parking': 'PARKING'
          };

          // Helper function to convert date from DD/MM/YYYY to YYYY-MM-DD
          const formatDate = (dateStr: string): string => {
            if (!dateStr) return '';
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD
            }
            return dateStr; // Return as-is if format is unexpected
          };

          // Extract day of month from dueDate (e.g., "1st" -> "1")
          const extractDayOfMonth = (dueDate: string): string => {
            return dueDate.replace(/[^0-9]/g, '');
          };

          // Build request data (API service will wrap it with action and data)
          const leaseData = {
            uid: 'rCiajM20esZWHZXgr4luus0osfrUEoH-', // Will be overridden by API service
            token: '', // Will be overridden by API service
            rentaltype: rentalTypeMap[selectedRentalType || 'residential'] || 'HOME',
            rent: parseInt(rentForm.rentAmount) || 0, // Convert to number
            rentfrdt: formatDate(rentForm.effectiveDate),
            renttodt: formatDate(rentForm.endDate),
            dayofpay: parseInt(extractDayOfMonth(rentForm.dueDate)) || 1, // Convert to number
            rbuilding: addressForm.street,
            rstreet: addressForm.street, // Use same value for both fields
            // Smart name mapping logic
            ismyrental: selectedRenterOption === 'not_renter' ? 'N' : 'Y',
            ownername: selectedRenterOption === 'not_renter' 
              ? renterInfoForm.renterName        // ✅ Renter name from form input when paying for someone else
              : (preloadData?.fullname || ''),   // Preload data when I am the renter
            tanetname: selectedRenterOption === 'not_renter' 
              ? (preloadData?.fullname || '')    // Preload data when paying for someone else
              : undefined,                       // Not needed when I am the renter
            // Include renter info if paying on behalf of someone else
            contactno: selectedRenterOption === 'not_renter' ? `+66${renterInfoForm.renterMobile}` : undefined,
            relationship: selectedRenterOption === 'not_renter' ? renterInfoForm.relationship : undefined,
            // Bank information
            ownerbank: beneficiaryForm.bankName,
            owneraccname: beneficiaryForm.bankAccountName,
            owneraccno: beneficiaryForm.bankAccountNumber,
            // Document attachment
            attachid: uploadedDocFilename || undefined,
            // Default values for required fields
            rentalstatus: 'PENDFORAPPROVE', // Submit for approval
            tranmethod: 'BANK_TRANSFER',    // Default to bank transfer
            usecheque: 'N',                 // Default to no cheque
            repeatpay: 'MONTHLY'            // Default to monthly
          };

          console.log('[Creating Lease via API]', leaseData);

          const response = await apiService.createLease(leaseData);

          if (response.status === 'SUCCESS') {
            console.log('[Lease Created Successfully]', response.data);
            // Navigate to success page
            router.push('/dashboard/leases/create/success');
          } else {
            // Navigate to error page with error details
            console.error('[Lease Creation Failed]', response.error);
            router.push('/dashboard/leases/create/error');
          }
        } catch (error) {
          console.error('[Lease Creation Exception]', error);
          router.push('/dashboard/leases/create/error');
        } finally {
          setIsSubmitting(false);
        }
      };

      submitLease();
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      if (selectedRenterOption === null) return false;
      // If "not_renter" is selected, validate renter info fields
      if (selectedRenterOption === 'not_renter') {
        return renterInfoForm.renterName.trim() !== '' && 
               renterInfoForm.renterMobile.trim() !== '' && 
               renterInfoForm.relationship !== '';
      }
      return true;
    }
    if (currentStep === 2) return selectedRentalType !== null;
    if (currentStep === 3) return addressForm.street.trim() && addressForm.province && addressForm.postalCode.trim();
    if (currentStep === 4) return rentForm.effectiveDate && rentForm.endDate && rentForm.rentAmount.trim() && rentForm.dueDate;
    if (currentStep === 5) return beneficiaryForm.bankAccountName.trim() && beneficiaryForm.bankName.trim() && beneficiaryForm.bankAccountNumber.trim();
    if (currentStep === 6) return true; // Document upload is optional
    if (currentStep === 7) return acceptedTerms;
    return false;
  };

  const updateAddressForm = (field: keyof AddressForm, value: string) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
  };

  const updateRentForm = (field: keyof RentForm, value: string) => {
    setRentForm(prev => ({ ...prev, [field]: value }));
  };

  const updateBeneficiaryForm = (field: keyof BeneficiaryForm, value: string) => {
    setBeneficiaryForm(prev => ({ ...prev, [field]: value }));
  };

  const updateRenterInfoForm = (field: keyof RenterInfoForm, value: string) => {
    setRenterInfoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUploadLater = () => {
    setShowUploadLaterModal(false);
    // Ensure documents are empty when uploading later
    setDocumentForm({ uploadedDocuments: [] });
    setCurrentStep(7);
  };

  const closeUploadLaterModal = () => {
    setShowUploadLaterModal(false);
  };

  const editStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      alert('File size must be less than 20MB');
      return;
    }
    if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
      alert('Only PDF, PNG, and JPG files are allowed');
      return;
    }
    
    try {
      // Upload document via API (from Notion: upload_tenancy_docs)
      console.log('[Uploading Document]', file.name);
      const response = await apiService.uploadTenancyDocs(file);

      if (response.status === 'SUCCESS' && response.data) {
        // Store the filename returned from API for later use in createRental
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUploadedDocFilename((response.data as any).filename);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log('[Document Uploaded]', (response.data as any).filename);

        // Update UI with uploaded document (for display purposes)
        const uploadedDoc: UploadedDocument = {
          id: Date.now().toString(),
          name: file.name,
          size: `${Math.round(file.size / 1024)} kb`,
          type: file.type === 'application/pdf' ? 'pdf' : 'image',
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        };

        setDocumentForm({ uploadedDocuments: [uploadedDoc] });
        setShowMockData(true);
      } else {
        alert('Failed to upload document: ' + (response.error || 'Unknown error'));
        console.error('[Document Upload Failed]', response.error);
      }
    } catch (error) {
      console.error('[Document Upload Exception]', error);
      alert('Failed to upload document');
    }
  };
  
  const removeDocument = (documentId: string) => {
    const updatedDocs = documentForm.uploadedDocuments.filter(doc => doc.id !== documentId);
    setDocumentForm({ uploadedDocuments: updatedDocs });
    
    // If no documents left, hide mock data state and clear uploaded filename
    if (updatedDocs.length === 0) {
      setShowMockData(false);
      setUploadedDocFilename('');
    }
  };

  // Handle building selection from dropdown
  const handleBuildingSelect = (building: BuildingSearchResult) => {
    console.log('[Building Selected]', building);
    
    // Set flag to prevent search from triggering
    isSelectingFromDropdownRef.current = true;
    
    // Concatenate all fields with comma and space
    const concatenatedAddress = [
      building.rbuilding,
      building.rstreet,
      building.rdistrict,
      building.rregion
    ].filter(Boolean).join(', ');
    
    setAddressForm({
      street: concatenatedAddress,
      province: addressForm.province, // Keep existing province
      postalCode: addressForm.postalCode // Keep existing postal code
    });
    setShowBuildingDropdown(false);
    
    // Reset flag after a short delay to allow for future searches
    setTimeout(() => {
      isSelectingFromDropdownRef.current = false;
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="bg-[#fffcfb] min-h-screen">
      {/* Header */}
      <div className="absolute h-10 sm:h-12 lg:h-[51px] left-4 sm:left-6 lg:left-[30px] top-4 sm:top-6 lg:top-[29px] w-32 sm:w-40 lg:w-[174px] z-10">
        <TrustRentIcon />
      </div>

      {/* Progress Steps */}
      <div className="pt-16 sm:pt-20 lg:pt-20 px-4 sm:px-6 lg:px-0">
        <div className="max-w-2xl lg:max-w-[630px] mx-auto">
          <div className="relative bg-[#d9d9d9] h-[7px] rounded-full w-full mb-4 lg:mb-[22px]">
            <div
              className="absolute bg-[#ff5552] h-[7px] rounded-full transition-all duration-300"
              style={{
                width: currentStep === 1 ? '6.67%' :
                       currentStep === 2 ? '13%' :
                       currentStep === 3 ? '25%' :
                       currentStep === 4 ? '17%' :
                       currentStep === 5 ? '31%' :
                       currentStep === 6 ? '65%' :
                       '100%'
              }}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm lg:text-[16px] font-['Mulish'] font-bold">
            <div className={currentStep >= 1 && currentStep <= 4 ? "text-[#ff5552]" : "text-[#8a8c8d]"}>Tenancy</div>
            <div className={currentStep === 5 ? "text-[#ff5552]" : "text-[#8a8c8d]"}>Beneficiary</div>
            <div className={currentStep === 6 ? "text-[#ff5552]" : "text-[#8a8c8d]"}>Documents</div>
            <div className={currentStep === 7 ? "text-[#ff5552]" : "text-[#8a8c8d]"}>Confirmation</div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="px-4 sm:px-6 lg:px-0 mt-8 lg:mt-12">
        <div className="max-w-2xl lg:max-w-[630px] mx-auto">
          <div
            className="flex gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity w-fit"
            onClick={handleBack}
          >
            <div className="size-5 sm:size-6 flex items-center justify-center">
              <div className="h-[6.84px] w-3 rotate-90">
                <img alt="Back" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
            <div className="font-['Mulish'] font-bold text-[#2e2f2f] text-lg sm:text-xl lg:text-[20px] leading-[24px]">
              Back
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-0 mt-8">
        <div className="max-w-2xl lg:max-w-[630px] mx-auto">
          {currentStep === 1 && (
            <>
              <h1 className="font-['Mulish'] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-center mb-16 sm:mb-24 lg:mb-[132px]">
                Are you the renter on the tenancy agreement?
              </h1>

              <div className="space-y-4 lg:space-y-5">
                <RadioOption
                  label="Yes, I'm the renter stated on the Tenancy Agreement"
                  selected={selectedRenterOption === "renter"}
                  onSelect={() => {
                    setSelectedRenterOption("renter");
                    // Clear renter info when selecting "I am the renter"
                    setRenterInfoForm({
                      renterName: "",
                      renterMobile: "",
                      relationship: ""
                    });
                  }}
                />

                <RadioOption
                  label="No, I&apos;m not the renter, I&apos;m paying rent for someone else"
                  selected={selectedRenterOption === "not_renter"}
                  onSelect={() => setSelectedRenterOption("not_renter")}
                />
              </div>

              {/* Renter Information Form - shown when "not_renter" is selected */}
              {selectedRenterOption === "not_renter" && (
                <div className="mt-12 space-y-6">
                  <h2 className="font-['Mulish'] font-semibold text-[#333333] text-[18px] leading-[24px]">
                    Please provide the renter&apos;s information
                  </h2>

                  {/* Renter Name */}
                  <div className="w-full">
                    <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                      Renter Name
                    </label>
                    <input
                      type="text"
                      value={renterInfoForm.renterName}
                      onChange={(e) => updateRenterInfoForm('renterName', e.target.value)}
                      placeholder="Cheung Tai Man"
                      className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="w-full">
                    <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="w-20 p-3 border border-[#bcbdbe] rounded-[8px] bg-gray-50 flex items-center justify-center font-['Mulish'] text-[#333333] text-[16px]">
                        +66
                      </div>
                      <input
                        type="tel"
                        value={renterInfoForm.renterMobile}
                        onChange={(e) => updateRenterInfoForm('renterMobile', e.target.value)}
                        placeholder="47563948"
                        className="flex-1 p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="w-full">
                    <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                      Relationship
                    </label>
                    <select
                      value={renterInfoForm.relationship}
                      onChange={(e) => updateRenterInfoForm('relationship', e.target.value)}
                      className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none bg-white appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '12px 8px'
                      }}
                    >
                      <option value="">Relationship</option>
                        {preloadData?.relationship?.map((rel) => (
                        <option key={rel.gsid} value={rel.gvalue}>
                          {rel.gvalue}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <h1 className="font-['Mulish'] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-[32px] leading-[50px] text-center mb-16 sm:mb-24 lg:mb-[132px]">
                Which type of rent do you want to select?
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 place-items-center">
                <RentalTypeCard
                  label="Residential"
                  image={imgDrawer13}
                  selected={selectedRentalType === "residential"}
                  onSelect={() => setSelectedRentalType("residential")}
                />
                <RentalTypeCard
                  label="Commercial"
                  image={imgDrawer21}
                  selected={selectedRentalType === "commercial"}
                  onSelect={() => setSelectedRentalType("commercial")}
                />
                <RentalTypeCard
                  label="Parking"
                  image={imgGroup1}
                  selected={selectedRentalType === "parking"}
                  onSelect={() => setSelectedRentalType("parking")}
                />
              </div>
            </>
          )}

        {currentStep === 3 && (
          <>
            <h1 className="font-['Mulish'] font-bold text-black text-[32px] leading-[50px] text-center mb-[114px]">
              What&apos;s the address of your lease?
            </h1>

            <div className="space-y-6">
              {/* House/Building/Street with Autocomplete */}
              <div className="w-full relative building-search-container">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  House/Building/Street
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={addressForm.street}
                    onChange={(e) => updateAddressForm('street', e.target.value)}
                    onFocus={() => {
                      if (buildingSearchResults.length > 0) {
                        setShowBuildingDropdown(true);
                      }
                    }}
                    placeholder="99 Sukhumvit Rd, Khlong Toei,"
                    className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-5 w-5 border-2 border-[#ff5552] border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Autocomplete Dropdown */}
                {showBuildingDropdown && buildingSearchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-[#bcbdbe] rounded-[8px] shadow-lg max-h-[300px] overflow-y-auto">
                    {buildingSearchResults.map((building, index) => (
                      <div
                        key={index}
                        onClick={() => handleBuildingSelect(building)}
                        className="p-3 hover:bg-[#ffeff2] cursor-pointer border-b border-[#f0f0f0] last:border-b-0 transition-colors"
                      >
                        <div className="font-['Mulish'] font-bold text-[#333333] text-[14px] leading-[20px]">
                          {building.rbuilding}
                        </div>
                        <div className="font-['Mulish'] text-[#636567] text-[12px] leading-[18px] mt-1">
                          {building.rstreet}, {building.rdistrict}, {building.rregion}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Province */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Province
                </label>
                <div className="relative">
                  <select
                    value={addressForm.province}
                    onChange={(e) => updateAddressForm('province', e.target.value)}
                    className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none appearance-none pr-12"
                  >
                    <option value="Bangkok">Bangkok</option>
                    <option value="Chiang Mai">Chiang Mai</option>
                    <option value="Phuket">Phuket</option>
                    <option value="Pattaya">Pattaya</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <img alt="" className="size-5" src={imgChevronDown} />
                  </div>
                </div>
              </div>

              {/* Postal Code */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={addressForm.postalCode}
                  onChange={(e) => updateAddressForm('postalCode', e.target.value)}
                  placeholder="10110"
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h1 className="font-['Mulish'] font-bold text-black text-[32px] leading-[50px] text-center mb-[132px]">
              When does your lease start and end, and how much is the monthly rent?
            </h1>

            <div className="space-y-6">
              {/* Effective Date and End Date - Side by side */}
              <div className="flex gap-5">
                <div className="w-[305px]">
                  <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                    Effective Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rentForm.effectiveDate}
                      onChange={(e) => updateRentForm('effectiveDate', e.target.value)}
                      className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img alt="" className="size-5" src={imgChevronDown} />
                    </div>
                  </div>
                </div>
                
                <div className="w-[305px]">
                  <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rentForm.endDate}
                      onChange={(e) => updateRentForm('endDate', e.target.value)}
                      className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <img alt="" className="size-5" src={imgChevronDown} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent amount */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Rent amount
                </label>
                <input
                  type="text"
                  value={rentForm.rentAmount}
                  onChange={(e) => updateRentForm('rentAmount', e.target.value)}
                  placeholder="THB 2,0000.00"
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                />
              </div>

              {/* Due date */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Due date
                </label>
                <input
                  type="text"
                  value={rentForm.dueDate}
                  onChange={(e) => updateRentForm('dueDate', e.target.value)}
                  placeholder="1st"
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 5 && (
          <>
            <h1 className="font-['Mulish'] font-bold text-black text-[32px] leading-[50px] text-center mb-4">
              Where should payments go?
            </h1>
            
            <div className="text-center mb-12">
              <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                Enter your beneficiary account details.
              </p>
            </div>

            <div className="space-y-6">
              {/* Bank account name */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Bank account name
                </label>
                <input
                  type="text"
                  value={beneficiaryForm.bankAccountName}
                  onChange={(e) => updateBeneficiaryForm('bankAccountName', e.target.value)}
                  placeholder="Wong Tai Man"
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                />
              </div>

              {/* Bank name */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Bank name
                </label>
                <select
                  value={beneficiaryForm.bankName}
                  onChange={(e) => updateBeneficiaryForm('bankName', e.target.value)}
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none bg-white"
                >
                  <option value="">Select a bank</option>
                    {preloadData?.bank?.map((bank) => (
                    <option key={bank.gsid} value={bank.gvalue}>
                      {bank.gvalue}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bank account number */}
              <div className="w-full">
                <label className="font-['Mulish'] font-bold text-[#636567] text-[14px] leading-[22px] mb-1 block">
                  Bank account number
                </label>
                <input
                  type="text"
                  value={beneficiaryForm.bankAccountNumber}
                  onChange={(e) => updateBeneficiaryForm('bankAccountNumber', e.target.value)}
                  placeholder="2345678909876543"
                  className="w-full p-3 border border-[#bcbdbe] rounded-[8px] font-['Mulish'] text-[#333333] text-[16px] leading-[24px] focus:border-[#ff5552] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {currentStep === 6 && (
          <>
            <h1 className="font-['Mulish'] font-bold text-black text-[32px] leading-[50px] text-center mb-4">
              Do you have your lease agreement?
            </h1>
            
            <div className="text-center mb-8">
              <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                Please upload your signed lease agreement. This helps us verify your lease details. We recommend uploading the document now.
              </p>
            </div>

            {/* Document Guide Instructions */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {preloadData?.docguidecommon && (preloadData.docguidecommon as any).length > 0 && (
              <div className="mb-8 p-4 bg-[#fff8f8] border border-[#ff5552] rounded-[12px]">
                <div className="font-['Mulish'] font-semibold text-[#ff5552] text-[14px] leading-[20px] mb-2">
                  Document Guidelines:
                </div>
                <div className="font-['Mulish'] font-normal text-[#333333] text-[14px] leading-[22px] whitespace-pre-wrap">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(preloadData.docguidecommon as any)[0].gvalue}
                </div>
              </div>
            )}

            {/* File Upload Area */}
            <div className="w-full mb-8">
              <input
                type="file"
                id="lease-agreement"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <label
                htmlFor="lease-agreement"
                className={`relative block w-full h-[180px] rounded-[40px] border-2 border-dashed transition-colors cursor-pointer ${
                  isDragOver
                    ? "border-[#ff5552] bg-[#fff8f8]"
                    : "border-[#ff5552] hover:bg-[#fff8f8]"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center h-full gap-[18px]">
                  <div className="size-10">
                    <img alt="Upload" className="block max-w-none size-full" src={imgDocumentIcon} />
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[20px] leading-[24px] text-center">
                    Drag and drop your files here
                  </div>
                  <div className="font-['Mulish'] font-normal text-[#999999] text-[16px] leading-[24px] text-center">
                    PDF, PNG, JPG (less then 20mb)
                  </div>
                </div>
              </label>
            </div>

            {/* Uploaded Documents List */}
            {documentForm.uploadedDocuments.length > 0 && (
              <div className="space-y-4 mb-8">
                {documentForm.uploadedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4">
                    {/* Document Preview/Icon */}
                    <div className="w-[100px] h-[93px] rounded-[5px] overflow-hidden flex-shrink-0">
                      {doc.type === 'image' ? (
                        <img 
                          alt={doc.name}
                          src={doc.preview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#f5f5f5] rounded-[5px] flex items-center justify-center">
                          <img 
                            alt="PDF"
                            src={imgPdfIcon}
                            className="w-[54px] h-[54px]"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Document Info */}
                    <div className="flex-grow">
                      <div className="font-['Mulish'] font-bold text-[#333333] text-[20px] leading-[24px] mb-2">
                        {doc.name}
                      </div>
                      <div className="font-['Mulish'] font-bold text-[#8a8c8d] text-[12px] leading-[18px]">
                        {doc.size}
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                    >
                      <img 
                        alt="Delete"
                        src={imgDeleteIcon}
                        className="w-full h-full"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Test Button to Show Mock Data */}
            {!showMockData && (
              <div className="mb-4 text-center">
                <button
                  onClick={() => {
                    setShowMockData(true);
                    setDocumentForm({ uploadedDocuments: mockUploadedDocuments });
                  }}
                  className="text-[#ff5552] underline text-sm font-['Mulish']"
                >
                  (Test: Show mock uploaded documents)
                </button>
              </div>
            )}
          </>
        )}

        {currentStep === 7 && (
          <>
            <h1 className="font-['Mulish'] font-bold text-black text-[32px] leading-[50px] text-center mb-4">
              Ready to confirm?
            </h1>
            
            <div className="text-center mb-12">
              <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                Review all the details before you set up your lease.
              </p>
            </div>

            {/* Lease Information Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Mulish'] font-bold text-[#333333] text-[20px] leading-[24px]">
                  Lease Information
                </h2>
                <button
                  onClick={() => editStep(2)}
                  className="flex items-center gap-2 px-4 py-3 border border-[#ff5552] rounded-full hover:bg-[#fff8f8] transition-colors"
                >
                  <span className="font-['Mulish'] font-semibold text-[#ff5552] text-[16px] leading-[24px]">
                    Edit
                  </span>
                  <img alt="Edit" src={imgEditIcon} className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-[169px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Lease type
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px] capitalize">
                    {selectedRentalType}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-[169px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Address
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {addressForm.street}, {addressForm.province} {addressForm.postalCode}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-[169px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Effective date
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {rentForm.effectiveDate} - {rentForm.endDate}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-[169px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Rent amount
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {rentForm.rentAmount}
                  </div>
                </div>
              </div>
            </div>

            {/* Beneficiary Details Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Mulish'] font-bold text-[#333333] text-[20px] leading-[24px]">
                  Beneficiary Details
                </h2>
                <button
                  onClick={() => editStep(5)}
                  className="flex items-center gap-2 px-4 py-3 border border-[#ff5552] rounded-full hover:bg-[#fff8f8] transition-colors"
                >
                  <span className="font-['Mulish'] font-semibold text-[#ff5552] text-[16px] leading-[24px]">
                    Edit
                  </span>
                  <img alt="Edit" src={imgEditIcon} className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-[170px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Bank account name
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {beneficiaryForm.bankAccountName}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-[170px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Bank name
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {beneficiaryForm.bankName}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-[169px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Bank account number
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {beneficiaryForm.bankAccountNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Mulish'] font-bold text-[#333333] text-[20px] leading-[24px]">
                  Document Upload
                </h2>
                <button
                  onClick={() => editStep(6)}
                  className="flex items-center gap-2 px-4 py-3 border border-[#ff5552] rounded-full hover:bg-[#fff8f8] transition-colors"
                >
                  <span className="font-['Mulish'] font-semibold text-[#ff5552] text-[16px] leading-[24px]">
                    Edit
                  </span>
                  <img alt="Edit" src={imgEditIcon} className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-[170px] font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                    Document1
                  </div>
                  <div className="font-['Mulish'] font-bold text-[#333333] text-[16px] leading-[24px]">
                    {documentForm.uploadedDocuments.length > 0 
                      ? documentForm.uploadedDocuments.map(doc => doc.name).join(', ')
                      : 'Upload later (documents required before payment)'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAcceptedTerms(!acceptedTerms)}
                  className="w-5 h-5 rounded border border-[#ff5552] flex items-center justify-center transition-colors"
                  style={{ backgroundColor: acceptedTerms ? '#ff5552' : 'white' }}
                >
                  {acceptedTerms && (
                    <img alt="Checked" src={imgCheckmark} className="w-3 h-3" />
                  )}
                </button>
                <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                  I accept that I have read and accept{' '}
                  <span className="text-[#ff5552] underline cursor-pointer">
                    Trust Rent Terms and Conditions
                  </span>
                  .
                </p>
              </div>
            </div>
          </>
        )}

          {/* Next Button */}
          <div className="mt-8 lg:mt-[32px] w-full">
            <button
              className={`w-full h-12 rounded-full font-['Mulish'] font-semibold text-sm sm:text-base lg:text-[16px] text-white transition-opacity ${
                canProceed() && !isSubmitting
                  ? "bg-[#ff5552] hover:opacity-90"
                  : "bg-[#bcbdbe] cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Lease...
                </div>
              ) : (
                currentStep === 6 && documentForm.uploadedDocuments.length > 0 ? 'Save and Next' :
                currentStep === 7 ? (documentForm.uploadedDocuments.length === 0 ? 'Back to Dashboard' : 'Create Lease') :
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Upload Later Modal */}
      {showUploadLaterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeUploadLaterModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[24px] shadow-lg p-10 w-[414px] mx-4">
            {/* Close Button */}
            <button
              onClick={closeUploadLaterModal}
              className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <img 
                alt="Close"
                src={imgCloseIcon}
                className="w-full h-full"
              />
            </button>
            
            {/* Modal Header */}
            <div className="text-center mb-6">
              <h2 className="font-['Mulish'] font-bold text-[#333333] text-[32px] leading-[50px] mb-2">
                Do you confirm to upload the document later?
              </h2>
              <p className="font-['Mulish'] font-normal text-[#333333] text-[16px] leading-[24px]">
                Please note: documents must be uploaded before you can pay rent.
              </p>
            </div>
            
            {/* Modal Actions */}
            <div className="flex justify-center">
              <button
                onClick={handleUploadLater}
                className="bg-[#ff5552] text-white font-['Mulish'] font-semibold text-[16px] px-4 py-3 rounded-[24px] w-[198px] hover:opacity-90 transition-opacity"
              >
                Upload Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// TODO: Review implementation
