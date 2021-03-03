/**
 * API Service for Trust Rent Web Application
 *
 * This service provides a unified interface for making API calls through the
 * centralized proxy endpoint. It follows the same patterns used by the mobile app
 * for seamless backend integration.
 */

// Updated import

// Updated import

import { getMockResponse, simulateDelay } from './mockData';
// Updated import
// Updated import
import type {
  ApiResponse,
  Lease,
  DashboardResponse,
  UserSummaryResponse,
  CreateLeaseResponse,
  SendOTPRequest,
  SendOTPResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  FillProfileRequest,
  FillProfileResponse,
  CreatePasswordResponse,
  CompleteRegistrationResponse,
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  PaymentMethodsResponse,
  AddPaymentMethodRequest,
  AddPaymentMethodResponse,
  DeletePaymentMethodResponse,
  ReferralData,
} from '../types/api';

interface ProxyRequest {
  action: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}

// Always use the UID provided for testing (works in both mock and real API modes)
const DEVELOPMENT_UID = 'rCiajM20esZWHZXgr4luus0osfrUEoH-';
const DEVELOPMENT_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';

class ApiService {
  private baseUrl: string;
  private registrationBaseUrl: string;
  private useMockData: boolean;
  private directusToken: string;
  private appToken: string;

  constructor() {
    // Use environment variable or fallback to relative path
    this.baseUrl = process.env.NEXT_PUBLIC_NODE_API_BASE || process.env.NEXT_PUBLIC_PHP_API_BASE || '';
    this.registrationBaseUrl = process.env.NEXT_PUBLIC_API_ORQ_PROXY || this.baseUrl;
    
    // Use NEXT_PUBLIC_ENABLE_MOCK_DATA flag from .env.local (set by developers)
    // Falls back to true if not configured or if no API URL is available
    const enableMockData = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA !== 'false';
    this.useMockData = enableMockData || !this.baseUrl;

    // Auth tokens - these would typically be retrieved from secure storage
    this.directusToken = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || '';
    this.appToken = process.env.NEXT_PUBLIC_APP_TOKEN || '';
    
    // Log configuration in debug mode
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('[API Service Config]', {
        baseUrl: this.baseUrl,
        useMockData: this.useMockData,
        enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA,
        devUid: DEVELOPMENT_UID,
        devToken: DEVELOPMENT_TOKEN ? `${DEVELOPMENT_TOKEN.substring(0, 8)}...` : 'not set'
      });
    }
  }

  /**
   * Make a proxy API call using the action-based routing pattern
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async call<T = any>(action: string, data: Record<string, any> = {}): Promise<ApiResponse<T>> {
    try {
      // Use mock data in development when configured
      if (this.useMockData) {
        await simulateDelay(300); // Simulate network delay
        const mockResponse = getMockResponse(action, data);
        console.log(`[MOCK API] ${action}:`, { request: data, response: mockResponse });
        return mockResponse;
      }

      const requestBody: ProxyRequest = {
        action,
        data
      };

      console.log(`[API Request] ${action}:`, { url: `${this.baseUrl}/proxy/`, body: requestBody });

      const response = await fetch(`${this.baseUrl}/proxy/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log(`[API HTTP Response] ${action}:`, { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API HTTP Error] ${action}:`, { status: response.status, body: errorText });
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const result = await response.json();
      console.log(`[API Response] ${action}:`, { request: data, response: result });
      return result;
    } catch (error) {
      console.error(`[API Call Failed] ${action}:`, error);

      // Fallback to mock data on error in development
      if (this.useMockData) {
        const mockResponse = getMockResponse(action, data);
        console.log(`[MOCK API - Fallback] ${action}:`, { request: data, response: mockResponse });
        return mockResponse;
      }

      return {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Make registration API call with dual token authentication
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registrationCall<T = any>(endpoint: string, data: Record<string, any> = {}): Promise<ApiResponse<T>> {
    try {
      // Use mock data in development when configured
      if (this.useMockData) {
        await simulateDelay(300); // Simulate network delay
        // Map endpoint to action for mock data
        const action = endpoint.split('/').pop() || endpoint;
        const mockResponse = getMockResponse(action, data);
        console.log(`[MOCK REGISTRATION API] ${endpoint}:`, { request: data, response: mockResponse });
        return mockResponse;
      }

      const requestBody = {
        action: endpoint.split('/').pop(), // Extract action from endpoint
        data: {
          ...data,
          app_token: this.appToken
        }
      };

      const response = await fetch(`${this.registrationBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.directusToken}`,
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`[REGISTRATION API] ${endpoint}:`, { request: data, response: result });
      return result;
    } catch (error) {
      console.error(`Registration API call failed for endpoint: ${endpoint}`, error);

      // Fallback to mock data on error in development
      if (this.useMockData) {
        const action = endpoint.split('/').pop() || endpoint;
        const mockResponse = getMockResponse(action, data);
        console.log(`[MOCK REGISTRATION API - Fallback] ${endpoint}:`, { request: data, response: mockResponse });
        return mockResponse;
      }

      return {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Dashboard API calls
   */
  async getDashboard(uid: string, token: string, lang: string = 'en'): Promise<ApiResponse<DashboardResponse>> {
    return this.call('getDashBoard2', { uid, token, lang });
  }

  async getUserSummary(uid: string, token: string, lang: string = 'en'): Promise<ApiResponse<UserSummaryResponse>> {
    return this.call('getUserSummary', { uid, token, lang });
  }

  /**
   * Lease/Tenancy API calls
   */
  async getLeases(uid: string, token: string, lang: string = 'en'): Promise<ApiResponse<Lease[]>> {
    return this.call('listRental2', { uid, token, lang });
  }

  /**
   * Get preload tenancy setup info (from backend: getPreloadTenancySetupInfo)
   * Returns rental types and payment schedules for dropdowns
   */
  async getPreloadTenancySetupInfo(uid?: string, lang: string = 'en', rentaltype: string = 'HOME'): Promise<ApiResponse<unknown>> {
    return this.call('getPreloadTenancySetupInfo', {
      uid: DEVELOPMENT_UID,
      token: DEVELOPMENT_TOKEN,
      lang,
      rentaltype // Required by API: HOME | COMMERCIAL | PARK | PUBLIC
    });
  }

  /**
   * Upload tenancy documents (from Notion: appfileupload)
   * Uses multipart/form-data to upload files to /files endpoint
   */
  async uploadTenancyDocs(file: File, uid?: string): Promise<ApiResponse<unknown>> {
    try {
      const actualUid = DEVELOPMENT_UID; // Always use development UID for now

      // Use mock data in development when configured
      if (this.useMockData) {
        await simulateDelay(500); // Simulate upload delay
        const mockResponse = getMockResponse('upload_tenancy_docs', { uid: actualUid, filename: file.name });
        console.log(`[MOCK API] upload_tenancy_docs:`, { request: { uid: actualUid, filename: file.name }, response: mockResponse });
        return mockResponse;
      }

      // For real API calls, use the /files endpoint (not /proxy/)
      const formData = new FormData();
      formData.append('attachid', actualUid); // Use UID as attachid
      formData.append('file', file);

      console.log('[API] Uploading document to /files:', { 
        attachid: actualUid,
        filename: file.name,
        size: file.size,
        type: file.type
      });

      const response = await fetch(`${this.baseUrl}/files`, {
        method: 'POST',
        body: formData
        // Note: Don't set Content-Type header, browser will set it automatically with boundary
      });

      console.log('[API HTTP Response] file upload:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API HTTP Error] file upload:', { status: response.status, body: errorText });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('[API Response] file upload:', result);
      
      // Transform response to match our expected structure
      return {
        status: 'SUCCESS',
        data: {
          status: 'SUCCESS',
          filename: result.filename || file.name
        }
      };
    } catch (error) {
      console.error('Document upload failed:', error);

      // Fallback to mock data on error in development
      if (this.useMockData) {
        const mockResponse = getMockResponse('upload_tenancy_docs', { uid: uid || DEVELOPMENT_UID, filename: file.name });
        console.log(`[MOCK API - Fallback] upload_tenancy_docs:`, { response: mockResponse });
        return mockResponse;
      }

      return {
        status: 'FAIL',
        error: error instanceof Error ? error.message : 'Document upload failed'
      };
    }
  }

  async createLease(leaseData: Record<string, unknown>): Promise<ApiResponse<CreateLeaseResponse>> {
    // The call method will automatically wrap with action and data
    const requestData = {
      ...leaseData,
      uid: DEVELOPMENT_UID, // Always use development UID for now
      token: DEVELOPMENT_TOKEN
    };
    
    return this.call('createRental', requestData);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateLease(leaseId: string, leaseData: any, uid: string, token: string) {
    return this.call('updateRental', {
      rid: leaseId,
      ...leaseData,
      uid,
      token
    });
  }

  async getLease(leaseId: string, uid: string, token: string, lang: string = 'en') {
    return this.call('openRental', {
      rid: leaseId,
      uid,
      token,
      lang
    });
  }

  /**
   * Transaction API calls
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTransactions(uid: string, token: string, filters?: Record<string, any>) {
    return this.call('getTransactionList2Proxy', {
      uid,
      token,
      ...(filters || {})
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createTransaction(transactionData: any, uid: string, token: string) {
    return this.call('createTransaction', {
      ...transactionData,
      uid,
      token
    });
  }

  async getPaymentSummary(uid: string, token: string, rentId?: string) {
    return this.call('getPaymentSummary', {
      uid,
      token,
      ...(rentId ? { rid: rentId } : {})
    });
  }

  /**
   * Registration API calls using API_ORQ_PROXY endpoints
   */
  async sendOTP(otpData: SendOTPRequest): Promise<ApiResponse<SendOTPResponse>> {
    return this.registrationCall('tel/send-otp', otpData);
  }

  async verifyOTP(verifyData: VerifyOTPRequest): Promise<ApiResponse<VerifyOTPResponse>> {
    return this.registrationCall('tel/verify-otp', verifyData);
  }

  async fillProfile(profileData: FillProfileRequest): Promise<ApiResponse<FillProfileResponse>> {
    return this.registrationCall('tel/register/fill', profileData);
  }

  async createPassword(password: string, uid: string, token: string): Promise<ApiResponse<CreatePasswordResponse>> {
    // According to docs, passcode update still uses legacy apiURL endpoint
    return this.call('memberUpdatePasscode', {
      uid,
      token,
      lang: 'en',
      oldPasscode: '', // New registration, no old passcode
      newPasscode: password // This should be hashed client-side in real implementation
    });
  }

  async completeRegistration(uid: string, token: string, options: { skipEkyc?: boolean } = {}): Promise<ApiResponse<CompleteRegistrationResponse>> {
    // According to docs, notification setup still uses legacy apiURL endpoint
    return this.call('memberSetUpNotification', {
      uid,
      token,
      lang: 'en',
      ...options
    });
  }

  /**
   * Authentication API calls
   */
  async login(username: string, password: string) {
    return this.call('memberLogin', { username, password });
  }

  // SMS Login Flow - Step 1: Request OTP
  async sendLoginOTP(mobileNumber: string) {
    return this.call('LOGIN_NEW', { tel: mobileNumber });
  }

  // SMS Login Flow - Step 2: Verify OTP and Complete Login
  async verifyLoginOTP(token: string, otp: string) {
    return this.call('LOGIN', { token, passcode: otp });
  }

  async checkToken(token: string) {
    return this.call('checkToken', { token });
  }

  /**
   * Utility API calls
   */
  
  /**
   * Search building by keyword for address autocomplete (from Notion: searchBuilding)
   */
  async searchBuilding(searchTerm: string, uid?: string, token?: string, lang: string = 'en') {
    return this.call('searchBuilding', {
      search: searchTerm,
      uid: DEVELOPMENT_UID, // Always use development UID for now
      token: DEVELOPMENT_TOKEN,
      lang
    });
  }

  async getPromotions(uid?: string, token?: string) {
    return this.call('getPromotionList', {
      ...(uid && token ? { uid, token } : {})
    });
  }

  // Account Management Methods

  /**
   * Get user profile data
   */
  async getUserProfile(uid: string, token: string): Promise<ApiResponse<UserProfile>> {
    return this.call('getUserProfile', { uid, token });
  }

  /**
   * Update user profile
   */
  async updateProfile(
    profileData: UpdateProfileRequest,
    uid: string,
    token: string
  ): Promise<ApiResponse<UpdateProfileResponse>> {
    return this.call('updateUserProfile', {
      uid,
      token,
      ...profileData
    });
  }

  /**
   * Change user password
   */
  async changePassword(
    passwordData: ChangePasswordRequest,
    uid: string,
    token: string
  ): Promise<ApiResponse<ChangePasswordResponse>> {
    return this.call('changePassword', {
      uid,
      token,
      ...passwordData
    });
  }

  /**
   * Get user payment methods
   */
  async getPaymentMethods(uid: string, token: string): Promise<ApiResponse<PaymentMethodsResponse>> {
    return this.call('getPaymentMethods', { uid, token });
  }

  /**
   * Add new payment method
   */
  async addPaymentMethod(
    cardData: AddPaymentMethodRequest,
    uid: string,
    token: string
  ): Promise<ApiResponse<AddPaymentMethodResponse>> {
    return this.call('addPaymentMethod', {
      uid,
      token,
      ...cardData
    });
  }

  /**
   * Delete payment method
   */
  async deletePaymentMethod(
    card_id: string,
    uid: string,
    token: string
  ): Promise<ApiResponse<DeletePaymentMethodResponse>> {
    return this.call('deletePaymentMethod', {
      uid,
      token,
      card_id
    });
  }

  /**
   * Get referral data and points
   */
  async getReferralData(uid: string, token: string): Promise<ApiResponse<ReferralData>> {
    return this.call('getReferralData', { uid, token });
  }
}

// Export singleton instance
// Updated export
export const apiService = new ApiService();

// Export types for TypeScript usage
// Updated export
export type { ApiResponse, ProxyRequest };

// Updated: 2025-11-24




// Updated: 2025-11-24


// Updated: 2025-11-24

// Last updated: 2025-11-24
