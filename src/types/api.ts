/**
 * API Type Definitions for Trust Rent Web Application
 *
 * These types define the exact structure of API responses based on the
 * mobile app analysis documentation. They serve as the contract between
 * frontend and backend teams.
 */

// Base API Response Structure
// Updated export
export interface ApiResponse<T = unknown> {
  status: 'SUCCESS' | 'FAIL';
  data?: T;
  error?: string;
}

// User Authentication Types
// Updated export
export interface User {
  uid: string;
  token: string;
  nickname?: string;
  email?: string;
  phone?: string;
  lang: string;
  session_expires?: string;
  is_first_login?: boolean;
  profile_complete_percentage?: number;
  kyc_status?: string;
  member_tier?: string;
  rewards_points?: number;
}

// Updated export

export interface LoginResponse {
  uid: string;
  token: string;
  nickname: string;
  email: string;
  lang: string;
  session_expires: string;
  is_first_login: boolean;
  requires_profile_update: boolean;
}

// Lease/Tenancy Types (based on REWRITE-TENANCY_API_ANALYSIS.md)
// Updated export
export interface Lease {
  rid: string;
  uid: string;
  property_type: 'Residential' | 'Commercial' | 'Parking' | 'Vehicle';
  property_name: string;
  property_address: string;
  province: string;
  postal_code: string;
  unit_number?: string;
  floor?: string;
  building_name: string;
  rent_amount: string;
  deposit_amount: string;
  advance_payment: string;
  lease_start_date: string;
  lease_end_date: string;
  due_date: string;
  next_payment_date: string;
  next_payment_amount: string;
  payment_status: 'pending' | 'paid' | 'overdue';
  landlord: {
    name: string;
    contact_person: string;
    phone: string;
    email: string;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
  };
  tenant_info: {
    is_primary_tenant: boolean;
    tenant_name: string;
    tenant_hkid?: string;
    tenant_phone: string;
    driver_license?: string;
    company_tax_id?: string;
  };
  documents: LeaseDocument[];
  auto_payment: {
    enabled: boolean;
    payment_method?: string;
    card_last_four?: string;
    bank_account?: string;
    next_auto_payment_date?: string;
  };
  // Vehicle-specific fields
  vehicle_info?: {
    make: string;
    model: string;
    year: string;
    color: string;
    plate_number: string;
    vin: string;
  };
  // Commercial-specific fields
  commercial_info?: {
    business_name: string;
    business_registration: string;
    space_size_sqm: string;
    usage_type: string;
  };
  lease_status: 'active' | 'expired' | 'terminated';
  created_at: string;
  updated_at: string;
}

// Updated export

export interface LeaseDocument {
  doc_id: string;
  doc_type: 'lease_agreement' | 'vehicle_lease' | 'commercial_lease' | 'business_registration';
  doc_name: string;
  upload_date: string;
  file_size: string;
  status: 'pending' | 'verified' | 'rejected';
}

// Transaction Types (based on REWRITE-PAYMENT_TRANSACTION_API_ANALYSIS.md)
// Updated export
export interface Transaction {
  // Core transaction fields (verified from mobile app API)
  pno: string;                         // Transaction number (primary ID)
  rpid: string;                        // Payment ID
  rid: string;                         // Rental ID
  paydt: string;                       // Payment date (e.g., "September 12 at 24:03")
  pstatus: 'PAID' | 'PENDING' | 'FAILED' | 'CANCELLED'; // Payment status
  totalamt: number;                    // Total amount paid (includes fees)
  amt: number;                         // Base amount (before fees)
  item: string;                        // Description (e.g., "Rent - 1", "Agency Fee")

  // Property type detection
  rentaltype: 'HOME' | 'COMMERCIAL' | 'PARKING' | 'VEHICLE'; // Property type
  payment_type?: 'AGENCY' | 'DEPOSIT'; // Only present for non-rental payments
  rentalstatus?: string;               // Rental approval status

  // Rental transaction data (when payment_type is undefined)
  rental?: {
    rentaltype: string;
    owneraccname: string;              // Landlord account name
    ownername: string;                 // Landlord name
    ownertel: string;                  // Landlord phone
    ownerbank: string;                 // Landlord bank
    owneraccno: string;                // Landlord account number
    rbuilding: string;                 // Property address
    runit?: string;                    // Unit number
    rfloor?: string;                   // Floor number
  };

  // Agency/Deposit transaction data (when payment_type exists)
  customer?: {
    beneficiary_name: string;          // Beneficiary name
    bank_name: string;                 // Bank name
    bank_account_number: string;       // Account number
  };

  // Payment details
  splitCardInfo?: Array<{             // Split payment cards
    card_type: string;
    card_last_four: string;
    amount: number;
  }>;

  // Payment timeline
  paymsg?: Array<{                    // Payment progress messages
    timestamp: string;
    message: string;
    status: string;
  }>;

  // Additional flags
  isSinglePayment?: boolean;          // Single vs split payment indicator

  // Promotion data
  promotion_applied?: {
    pmid: string;
    discount_amount: string;
    final_amount: string;
  };

  // Legacy/compatibility fields for web display
  transaction_id?: string;            // Alias for pno
  property_address?: string;          // Derived from rental.rbuilding
  description?: string;               // Alias for item
  currency?: 'THB';                   // Always THB
}

// Updated export

export interface TransactionListResponse {
  data: Transaction[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_records: number;
    records_per_page: number;
  };
}

// Dashboard Types (based on REWRITE-DASHBOARD_API_ANALYSIS.md)
// Updated export
export interface DashboardResponse {
  nickname: string;
  userisactive: string;
  user_profile: {
    uid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    hkid: string;
    profile_image: string;
    language_preference: string;
    created_at: string;
  };
  rental: Lease[];
  promotion: Promotion[];
  notify: {
    unread_count: number;
    notifications: Notification[];
  };
}

// Updated export

export interface UserSummaryResponse {
  userisactive: string;
  notifications: Notification[];
  userProfile: {
    uid: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    profile_complete_percentage: number;
    kyc_status: string;
    preferred_language: string;
    preferred_currency: string;
  };
  onboardingStatus: {
    profile_completed: boolean;
    hkid_verified: boolean;
    first_lease_created: boolean;
    first_payment_made: boolean;
    documents_uploaded: boolean;
  };
  accountStatus: {
    status: string;
    verification_level: string;
    daily_limit: string;
    monthly_limit: string;
    rewards_points: number;
    member_tier: string;
  };
  duplicateHKIDStatus: {
    has_duplicate: boolean;
    duplicate_count: number;
  };
}

// Notification Types
// Updated export
export interface Notification {
  id: string;
  type: 'payment_reminder' | 'promotion' | 'document_required' | 'system';
  title: string;
  message: string;
  property_id?: string;
  priority: 'low' | 'medium' | 'high';
  action_url?: string;
  created_at: string;
  is_read: boolean;
}

// Promotion Types
// Updated export
export interface Promotion {
  pmid: string;
  category: 'payment' | 'discount' | 'rewards';
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  banner_url: string;
  valid_from: string;
  valid_until: string;
  discount_type: 'percentage' | 'fixed' | 'installment' | 'points';
  discount_value: string;
  minimum_amount: string;
  maximum_discount?: string;
  applicable_property_types: string[];
  terms_conditions: string[];
  usage_limit?: number;
  usage_count: number;
  is_active: boolean;
  priority: number;
}

// Payment Types
// Updated export
export interface PaymentSummary {
  rid: string;
  property_name: string;
  current_period: {
    period_start: string;
    period_end: string;
    due_date: string;
    base_amount: string;
    late_fee: string;
    discounts: unknown[];
    total_amount: string;
    payment_status: string;
  };
  payment_history_summary: {
    total_paid: string;
    payments_made: number;
    on_time_payments: number;
    late_payments: number;
  };
  available_payment_methods: PaymentMethod[];
  applicable_promotions: Promotion[];
}

// Updated export

export interface PaymentMethod {
  method: 'credit_card' | 'bank_transfer' | 'promptpay';
  enabled: boolean;
  saved_cards?: SavedCard[];
  bank_details?: {
    bank_name: string;
    account_name: string;
    account_number: string;
  };
  promptpay_id?: string;
}

// Updated export

export interface SavedCard {
  card_id: string;
  card_last_four: string;
  card_brand: string;
  expiry: string;
}

// Create Lease Types
// Create Lease Types (Updated API specification)
// Updated export
export interface CreateLeaseRequest {
  action: string;                // "createRental"
  data: {
    uid: string;                 // User ID
    token: string;               // Auth token
    rentaltype: string;          // "HOME" | "COMMERICAL" | "PARK" | "PUBLIC"
    rent: number;                // Monthly rent amount
    rentfrdt: string;            // Rental start date (YYYY-MM-DD)
    renttodt: string;            // Rental end date (YYYY-MM-DD)
    dayofpay: number;            // Payment day of month (1-31)
    rbuilding: string;           // Building name
    rblock?: string;             // Block identifier
    rfloor?: string;             // Floor number
    rroom?: string;              // Room/Unit number
    rstreet?: string;            // Street name
    rdistrict?: string;          // District code
    rregion?: string;            // Region code
    ismyrental: string;          // "Y" (primary tenant) | "N" (on behalf of)
    tanettype?: string;          // "INDIVIDUAL" | "COMPANY"
    tanetname?: string;          // Tenant name (if ismyrental="N")
    contactno?: string;          // Contact number (if ismyrental="N")
    relationship?: string;       // Relationship code (if ismyrental="N")
    tranmethod?: string;         // "BANK_TRANSFER" | "CHEQUE"
    ownertel?: string;           // Landlord's phone
    ownername: string;           // Landlord's name
    attachid?: string;           // Attachment ID
    ownerbank?: string;          // Bank code
    owneraccname?: string;       // Account holder name
    ownerbankbranch?: string;    // Bank branch
    owneraccno?: string;         // Account number
    repeatpay?: string;          // "MONTHLY" | "QUARTERLY" | "YEARLY"
    chqadd1?: string;            // Cheque address line 1
    chqadd2?: string;            // Cheque address line 2
    chqadd3?: string;            // Cheque address line 3
    chqadd4?: string;            // Cheque address line 4
    chequeSameAddr?: string;     // "Y" (same as rental) | "N" (different)
    cfloor?: string;             // Commercial floor (for COMMERICAL type)
    cblock?: string;             // Commercial block (for COMMERICAL type)
    croom?: string;              // Commercial room (for COMMERICAL type)
    cbuilding?: string;          // Commercial building (for COMMERICAL type)
    cstreet?: string;            // Commercial street (for COMMERICAL type)
    cdistrict?: string;          // Commercial district (for COMMERICAL type)
    cregion?: string;            // Commercial region (for COMMERICAL type)
    comturnover?: number;        // Commercial turnover (for COMMERICAL type)
    comturnoverduedate?: string; // Commercial turnover due date (for COMMERICAL type)
    rentalstatus: string;        // "LATER" (save draft) | "PENDFORAPPROVE" (submit)
    usecheque?: string;          // "Y" (use cheque) | "N" (use bank transfer)
  }
}

// Updated export

export interface CreateLeaseResponse {
  rid: string;
  confirmation_number: string;
  message: string;
  next_steps: string[];
}

// Search Types
// Updated export
export interface BuildingSearchResult {
  rbuilding: string;        // Building name
  rstreet: string;          // Street name
  rdistrict: string;        // District name
  rregion: string;          // Region code
  rdistrictValue: string;   // District value
}

// Registration Types (based on docs/registration-flow-prd.md)
// Updated export
export interface RegistrationState {
  contactMethod: 'email' | 'mobile';
  contactValue: string;
  otpToken?: string;
  userProfile?: {
    nickname: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  authCredentials?: {
    uid: string;
    token: string;
  };
}

// Updated export

export interface SendOTPRequest {
  tel: string; // email or mobile number
}

// Updated export

export interface SendOTPResponse {
  status: 'SUCCESS' | 'FAIL';
  token: string; // JWT token for OTP verification
  reason: string | null;
}

// Updated export

export interface VerifyOTPRequest {
  token: string; // JWT token from send OTP
  passcode: string; // 6-digit OTP code
}

// Updated export

export interface VerifyOTPResponse {
  status: 'SUCCESS' | 'FAIL';
  uid: string;
  token: string; // Auth token for subsequent requests
  reason: string | null;
}

// Updated export

export interface FillProfileRequest {
  uid: string;
  token: string;
  nickname: string;
  email: string;
  firstname: string;
  lastname: string;
  lang: string;
  password?: string; // Will be added in step 4
}

// Updated export

export interface FillProfileResponse {
  status: 'SUCCESS' | 'FAIL';
  token: string; // Refreshed token
  reason: string | null;
}

// Updated export

export interface CreatePasswordRequest {
  password: string;
  uid: string;
  token: string;
}

// Updated export

export interface CreatePasswordResponse {
  passcodeUpdated: boolean;
  message: string;
  newToken?: string;
}

// Updated export

export interface CompleteRegistrationRequest {
  uid: string;
  token: string;
  skipEkyc?: boolean;
}

// Updated export

export interface CompleteRegistrationResponse {
  message: string;
  registration_complete: boolean;
  kyc_required: boolean;
  redirect_to_dashboard: boolean;
}

// API Action Types (for type-safe action mapping)
// Updated export
export type ApiAction =
  | 'getDashBoard2'
  | 'getUserSummary'
  | 'listRental2'
  | 'createRental'
  | 'updateRental'
  | 'openRental'
  | 'getTransactionList2Proxy'
  | 'createTransaction'
  | 'getPaymentSummary'
  | 'memberLogin'
  | 'checkToken'
  | 'searchBuilding'
  | 'getPromotionList'
  | 'sendOTP'
  | 'REG'
  | 'fillProfile'
  | 'createPassword'
  | 'completeRegistration';

// Typed API Response Mapping
// Updated export
export interface ApiResponseMap {
  'getDashBoard2': DashboardResponse;
  'getUserSummary': UserSummaryResponse;
  'listRental2': Lease[];
  'createRental': CreateLeaseResponse;
  'updateRental': { message: string; rid: string };
  'openRental': Lease;
  'getTransactionList2Proxy': Transaction[];
  'createTransaction': { transaction_id: string; reference_number: string; message: string };
  'getPaymentSummary': PaymentSummary;
  'memberLogin': LoginResponse;
  'checkToken': { valid: boolean; uid: string; expires_in: number; refresh_required: boolean };
  'searchBuilding': BuildingSearchResult[];
  'getPromotionList': Promotion[];
  'sendOTP': SendOTPResponse;
  'REG': VerifyOTPResponse;
  'fillProfile': FillProfileResponse;
  'createPassword': CreatePasswordResponse;
  'completeRegistration': CompleteRegistrationResponse;
}

// Account Management Types
// Updated export
export interface UserProfile {
  uid: string;
  preferred_name: string;
  email: string;
  mobile_number: string;
  language: string;
  notification_preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  profile_updated_at: string;
}

// Updated export

export interface UpdateProfileRequest {
  preferred_name?: string;
  email?: string;
  mobile_number?: string;
  language?: string;
  notification_preferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}

// Updated export

export interface UpdateProfileResponse {
  message: string;
  updated_fields: string[];
  updated_at: string;
}

// Updated export

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

// Updated export

export interface ChangePasswordResponse {
  message: string;
  password_updated: boolean;
  new_token: string;
  expires_in: number;
}

// Updated export

export interface PaymentCard {
  card_id: string;
  card_number: string; // Masked format: **** **** **** 4242
  card_type: string;
  card_brand: string;
  expiry_month: string;
  expiry_year: string;
  cardholder_name: string;
  is_default: boolean;
  added_date: string;
}

// Updated export

export interface PaymentMethodsResponse {
  cards: PaymentCard[];
  default_card_id: string;
}

// Updated export

export interface AddPaymentMethodRequest {
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cardholder_name: string;
  cvv: string;
}

// Updated export

export interface AddPaymentMethodResponse {
  card_id: string;
  message: string;
  is_default: boolean;
  card_last_four: string;
}

// Updated export

export interface DeletePaymentMethodRequest {
  card_id: string;
}

// Updated export

export interface DeletePaymentMethodResponse {
  message: string;
  deleted_card_id: string;
}

// Updated export

export interface ReferralStats {
  total_referrals: number;
  successful_referrals: number;
  pending_referrals: number;
}

// Updated export

export interface ReferralHistory {
  referred_user: string;
  signup_date: string;
  points_earned: number;
  status: 'completed' | 'pending' | 'cancelled';
}

// Updated export

export interface PointsHistory {
  date: string;
  points: number;
  description: string;
  type: 'referral' | 'bonus' | 'payment';
}

// Updated export

export interface ReferralData {
  total_points: number;
  referral_code: string;
  referral_stats: ReferralStats;
  recent_referrals: ReferralHistory[];
  points_history: PointsHistory[];
}


// TODO: Review: Review implementation

// Last updated: 2025-11-24


// Updated: 2025-11-24
