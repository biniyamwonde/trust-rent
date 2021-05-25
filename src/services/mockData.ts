/**
 * Mock Data Service for Trust Rent Web Application
 *
 * This service provides realistic mock data that matches the actual API response structure
 * based on the mobile app API analysis. This ensures interfaces are production-ready.
 */

// Based on actual API response structures from mobile app analysis
// Updated export
// Updated export
export const mockData = {
  /**
   * Dashboard API Response (action: getDashBoard2)
   * Based on REWRITE-DASHBOARD_API_ANALYSIS.md
   */
  dashboard: {
    status: 'SUCCESS',
    nickname: 'John Smith',
    userisactive: '1',
    user_profile: {
      uid: 'usr_123456789',
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@example.com',
      phone: '+66812345678',
      hkid: 'A1234567',
      profile_image: '/assets/user-avatar.jpg',
      language_preference: 'en',
      created_at: '2024-01-15T08:00:00Z'
    },
    rental: [
      {
        rid: 'rnt_001',
        property_type: 'Residential',
        property_name: 'Sukhumvit Residence',
        address: '99 Sukhumvit Rd, Khlong Toei',
        province: 'Bangkok',
        postal_code: '10110',
        rent_amount: '35000',
        deposit_amount: '70000',
        next_payment_date: '2025-02-01',
        next_payment_amount: '35000',
        payment_status: 'pending',
        lease_start_date: '2024-08-01',
        lease_end_date: '2025-07-31',
        due_date: '1',
        landlord_name: 'Property Management Co.',
        landlord_bank: 'Bangkok Bank',
        landlord_account: '1234567890',
        is_active: true,
        created_at: '2024-07-15T10:30:00Z'
      },
      {
        rid: 'rnt_002',
        property_type: 'Parking',
        property_name: 'Central Plaza Parking',
        address: '15 Sathorn Rd',
        province: 'Bangkok',
        postal_code: '10120',
        rent_amount: '3000',
        deposit_amount: '3000',
        next_payment_date: '2025-02-01',
        next_payment_amount: '3000',
        payment_status: 'paid',
        lease_start_date: '2024-06-01',
        lease_end_date: '2025-05-31',
        due_date: '1',
        landlord_name: 'Central Plaza Management',
        landlord_bank: 'SCB',
        landlord_account: '9876543210',
        is_active: true,
        created_at: '2024-05-20T14:00:00Z'
      },
      {
        rid: 'rnt_003',
        property_type: 'Vehicle',
        property_name: 'Toyota Camry Lease',
        address: '18 Sukhumvit 39',
        province: 'Bangkok',
        postal_code: '10110',
        rent_amount: '15000',
        deposit_amount: '30000',
        next_payment_date: '2025-02-15',
        next_payment_amount: '15000',
        payment_status: 'pending',
        lease_start_date: '2024-09-15',
        lease_end_date: '2026-09-14',
        due_date: '15',
        landlord_name: 'Auto Lease Thailand',
        landlord_bank: 'Kasikorn Bank',
        landlord_account: '1122334455',
        is_active: true,
        created_at: '2024-09-01T09:00:00Z'
      }
    ],
    promotion: [
      {
        pmid: 'prm_001',
        title: '0% Credit Card Installment',
        description: 'Pay your rent with 0% interest for 3 months',
        image_url: '/assets/promo-property-1.svg',
        valid_from: '2025-01-01',
        valid_until: '2025-03-31',
        discount_type: 'installment',
        discount_value: '0',
        terms_conditions: 'Minimum payment 10,000 THB',
        is_active: true
      },
      {
        pmid: 'prm_002',
        title: 'Early Payment Discount',
        description: 'Get 2% off when you pay 5 days early',
        image_url: '/assets/promo-property-2.svg',
        valid_from: '2025-01-01',
        valid_until: '2025-12-31',
        discount_type: 'percentage',
        discount_value: '2',
        terms_conditions: 'Applied automatically',
        is_active: true
      }
    ],
    notify: {
      unread_count: 3,
      notifications: [
        {
          id: 'ntf_001',
          type: 'payment_reminder',
          title: 'Payment Due Soon',
          message: 'Your rent payment for Sukhumvit Residence is due in 3 days',
          created_at: '2025-01-29T10:00:00Z',
          is_read: false
        },
        {
          id: 'ntf_002',
          type: 'promotion',
          title: 'New Promotion Available',
          message: 'Earn 2x rewards points this month',
          created_at: '2025-01-28T15:00:00Z',
          is_read: false
        }
      ]
    }
  },

  /**
   * User Summary API Response (action: getUserSummary)
   * Modern notification system
   */
  userSummary: {
    status: 'SUCCESS',
    data: {
      userisactive: '1',
      notifications: [
        {
          id: 'ntf_001',
          type: 'payment_reminder',
          title: 'Payment Due Soon',
          message: 'Your rent payment for Sukhumvit Residence is due in 3 days',
          property_id: 'rnt_001',
          priority: 'high',
          action_url: '/dashboard/payments/rnt_001',
          created_at: '2025-01-29T10:00:00Z',
          is_read: false
        },
        {
          id: 'ntf_002',
          type: 'promotion',
          title: 'New Promotion Available',
          message: 'Earn 2x rewards points on all payments this month',
          priority: 'medium',
          action_url: '/dashboard/promotions',
          created_at: '2025-01-28T15:00:00Z',
          is_read: false
        },
        {
          id: 'ntf_003',
          type: 'document_required',
          title: 'Document Upload Required',
          message: 'Please upload your lease agreement for Central Plaza Parking',
          property_id: 'rnt_002',
          priority: 'medium',
          action_url: '/dashboard/leases/rnt_002/documents',
          created_at: '2025-01-27T09:00:00Z',
          is_read: true
        }
      ],
      userProfile: {
        uid: 'usr_123456789',
        email: 'john.smith@example.com',
        phone: '+66812345678',
        first_name: 'John',
        last_name: 'Smith',
        profile_complete_percentage: 85,
        kyc_status: 'verified',
        preferred_language: 'en',
        preferred_currency: 'THB'
      },
      onboardingStatus: {
        profile_completed: true,
        hkid_verified: true,
        first_lease_created: true,
        first_payment_made: true,
        documents_uploaded: false
      },
      accountStatus: {
        status: 'active',
        verification_level: 'full',
        daily_limit: '100000',
        monthly_limit: '1000000',
        rewards_points: 1250,
        member_tier: 'gold'
      },
      duplicateHKIDStatus: {
        has_duplicate: false,
        duplicate_count: 0
      }
    }
  },

  /**
   * Transaction List API Response (action: getTransactionList2Proxy)
   * Based on REWRITE-PAYMENT_TRANSACTION_API_ANALYSIS.md
   * Using actual API field names: pno, paydt, pstatus, totalamt, amt, item, rentaltype
   */
  transactions: {
    status: 'SUCCESS',
    data: [
      {
        pno: 'TXN202501220001',
        rpid: 'PAY202501220001',
        rid: 'rnt_001',
        paydt: 'January 22 at 00:03',
        pstatus: 'PAID',
        totalamt: 35000,
        amt: 35000,
        item: 'Rent - 1',
        rentaltype: 'HOME',
        rental: {
          rentaltype: 'Residential',
          owneraccname: 'Property Management Co Ltd',
          ownername: 'Ms. Siriwan',
          ownertel: '+66891234567',
          ownerbank: 'Bangkok Bank',
          owneraccno: '1234567890',
          rbuilding: '99 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
          runit: 'A-1205',
          rfloor: '12'
        },
        splitCardInfo: [
          {
            card_type: 'Visa',
            card_last_four: '4242',
            amount: 35000
          }
        ],
        isSinglePayment: true,
        currency: 'THB'
      },
      {
        pno: 'TXN202501140001',
        rpid: 'PAY202501140001',
        rid: 'rnt_002',
        paydt: 'January 14 at 11:15',
        pstatus: 'PAID',
        totalamt: 3000,
        amt: 3000,
        item: 'Rent - 1',
        rentaltype: 'PARKING',
        rental: {
          rentaltype: 'Parking',
          owneraccname: 'Central Plaza Management',
          ownername: 'Parking Division',
          ownertel: '+6622222222',
          ownerbank: 'Siam Commercial Bank',
          owneraccno: '9876543210',
          rbuilding: '15 Sathorn Rd, Bangkok 10120',
          runit: 'B2-055',
          rfloor: 'B2'
        },
        isSinglePayment: true,
        currency: 'THB'
      },
      {
        pno: 'TXN202412150001',
        rpid: 'PAY202412150001',
        rid: 'rnt_003',
        paydt: 'December 15 at 14:30',
        pstatus: 'PAID',
        totalamt: 15000,
        amt: 15000,
        item: 'Rent - 1',
        rentaltype: 'VEHICLE',
        rental: {
          rentaltype: 'Vehicle',
          owneraccname: 'Auto Lease Thailand',
          ownername: 'Mr. Somchai',
          ownertel: '+6633333333',
          ownerbank: 'Kasikorn Bank',
          owneraccno: '1122334455',
          rbuilding: '18 Sukhumvit 39, Bangkok 10110',
          runit: null,
          rfloor: null
        },
        splitCardInfo: [
          {
            card_type: 'Mastercard',
            card_last_four: '5555',
            amount: 15000
          }
        ],
        isSinglePayment: true,
        currency: 'THB'
      },
      {
        pno: 'TXN202411220001',
        rpid: 'PAY202411220001',
        rid: 'rnt_001',
        paydt: 'November 22 at 09:45',
        pstatus: 'PAID',
        totalamt: 34300,
        amt: 35000,
        item: 'Rent - 1',
        rentaltype: 'HOME',
        rental: {
          rentaltype: 'Residential',
          owneraccname: 'Property Management Co Ltd',
          ownername: 'Ms. Siriwan',
          ownertel: '+66891234567',
          ownerbank: 'Bangkok Bank',
          owneraccno: '1234567890',
          rbuilding: '99 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
          runit: 'A-1205',
          rfloor: '12'
        },
        splitCardInfo: [
          {
            card_type: 'Visa',
            card_last_four: '4242',
            amount: 34300
          }
        ],
        promotion_applied: {
          pmid: 'prm_002',
          discount_amount: '700',
          final_amount: '34300'
        },
        isSinglePayment: true,
        currency: 'THB'
      }
    ],
    pagination: {
      current_page: 1,
      total_pages: 5,
      total_records: 48,
      records_per_page: 10
    }
  },

  /**
   * Lease List API Response (action: listRental2)
   * Based on REWRITE-TENANCY_API_ANALYSIS.md
   */
  leases: {
    status: 'SUCCESS',
    data: [
      {
        rid: 'rnt_001',
        uid: 'usr_123456789',
        property_type: 'Residential',
        property_name: 'Sukhumvit Residence',
        property_address: '99 Sukhumvit Rd, Khlong Toei',
        province: 'Bangkok',
        postal_code: '10110',
        unit_number: 'A-1205',
        floor: '12',
        building_name: 'The Residence Tower A',
        rent_amount: '35000',
        deposit_amount: '70000',
        advance_payment: '35000',
        lease_start_date: '2024-08-01',
        lease_end_date: '2025-07-31',
        due_date: '1',
        next_payment_date: '2025-02-01',
        next_payment_amount: '35000',
        payment_status: 'pending',
        landlord: {
          name: 'Property Management Co., Ltd.',
          contact_person: 'Ms. Siriwan',
          phone: '+66891234567',
          email: 'landlord@propertyco.com',
          bank_name: 'Bangkok Bank',
          bank_account_name: 'Property Management Co Ltd',
          bank_account_number: '1234567890'
        },
        tenant_info: {
          is_primary_tenant: true,
          tenant_name: 'John Smith',
          tenant_hkid: 'A1234567',
          tenant_phone: '+66812345678'
        },
        documents: [
          {
            doc_id: 'doc_001',
            doc_type: 'lease_agreement',
            doc_name: 'Lease_Agreement_Sukhumvit.pdf',
            upload_date: '2024-07-20T10:00:00Z',
            file_size: '2.5MB',
            status: 'verified'
          }
        ],
        auto_payment: {
          enabled: false,
          payment_method: null,
          next_auto_payment_date: null
        },
        lease_status: 'active',
        created_at: '2024-07-15T10:30:00Z',
        updated_at: '2025-01-15T08:00:00Z'
      },
      {
        rid: 'rnt_002',
        uid: 'usr_123456789',
        property_type: 'Parking',
        property_name: 'Central Plaza Parking',
        property_address: '15 Sathorn Rd',
        province: 'Bangkok',
        postal_code: '10120',
        unit_number: 'B2-055',
        floor: 'B2',
        building_name: 'Central Plaza',
        rent_amount: '3000',
        deposit_amount: '3000',
        advance_payment: '0',
        lease_start_date: '2024-06-01',
        lease_end_date: '2025-05-31',
        due_date: '1',
        next_payment_date: '2025-02-01',
        next_payment_amount: '3000',
        payment_status: 'paid',
        landlord: {
          name: 'Central Plaza Management',
          contact_person: 'Parking Division',
          phone: '+6622222222',
          email: 'parking@centralplaza.com',
          bank_name: 'Siam Commercial Bank',
          bank_account_name: 'Central Plaza Management',
          bank_account_number: '9876543210'
        },
        tenant_info: {
          is_primary_tenant: true,
          tenant_name: 'John Smith',
          tenant_hkid: 'A1234567',
          tenant_phone: '+66812345678'
        },
        documents: [],
        auto_payment: {
          enabled: true,
          payment_method: 'credit_card',
          card_last_four: '4242',
          next_auto_payment_date: '2025-02-01'
        },
        lease_status: 'active',
        created_at: '2024-05-20T14:00:00Z',
        updated_at: '2025-01-14T11:15:00Z'
      },
      {
        rid: 'rnt_003',
        uid: 'usr_123456789',
        property_type: 'Vehicle',
        property_name: 'Toyota Camry 2.5G',
        property_address: '18 Sukhumvit 39',
        province: 'Bangkok',
        postal_code: '10110',
        unit_number: null,
        floor: null,
        building_name: 'Auto Lease Thailand',
        rent_amount: '15000',
        deposit_amount: '30000',
        advance_payment: '15000',
        lease_start_date: '2024-09-15',
        lease_end_date: '2026-09-14',
        due_date: '15',
        next_payment_date: '2025-02-15',
        next_payment_amount: '15000',
        payment_status: 'pending',
        vehicle_info: {
          make: 'Toyota',
          model: 'Camry',
          year: '2023',
          color: 'Silver',
          plate_number: 'กข 1234',
          vin: 'JTDBR32E820123456'
        },
        landlord: {
          name: 'Auto Lease Thailand Co., Ltd.',
          contact_person: 'Mr. Somchai',
          phone: '+6633333333',
          email: 'info@autolease.co.th',
          bank_name: 'Kasikorn Bank',
          bank_account_name: 'Auto Lease Thailand',
          bank_account_number: '1122334455'
        },
        tenant_info: {
          is_primary_tenant: true,
          tenant_name: 'John Smith',
          tenant_hkid: 'A1234567',
          tenant_phone: '+66812345678',
          driver_license: 'DL9876543'
        },
        documents: [
          {
            doc_id: 'doc_002',
            doc_type: 'vehicle_lease',
            doc_name: 'Vehicle_Lease_Agreement.pdf',
            upload_date: '2024-09-01T09:00:00Z',
            file_size: '1.8MB',
            status: 'verified'
          }
        ],
        auto_payment: {
          enabled: false,
          payment_method: null,
          next_auto_payment_date: null
        },
        lease_status: 'active',
        created_at: '2024-09-01T09:00:00Z',
        updated_at: '2024-12-15T14:30:00Z'
      },
      {
        rid: 'rnt_004',
        uid: 'usr_123456789',
        property_type: 'Commercial',
        property_name: 'Office Space - Asoke',
        property_address: '123 Asoke Rd, Khlong Toei Nuea',
        province: 'Bangkok',
        postal_code: '10110',
        unit_number: '15-01',
        floor: '15',
        building_name: 'Interchange 21 Tower',
        rent_amount: '85000',
        deposit_amount: '255000',
        advance_payment: '85000',
        lease_start_date: '2024-04-01',
        lease_end_date: '2027-03-31',
        due_date: '5',
        next_payment_date: '2025-02-05',
        next_payment_amount: '85000',
        payment_status: 'pending',
        commercial_info: {
          business_name: 'Smith Consulting Co., Ltd.',
          business_registration: 'REG0123456789',
          space_size_sqm: '150',
          usage_type: 'office'
        },
        landlord: {
          name: 'Interchange Building Management',
          contact_person: 'Ms. Nattaya',
          phone: '+6644444444',
          email: 'office@interchange21.com',
          bank_name: 'TMB Bank',
          bank_account_name: 'Interchange Management',
          bank_account_number: '5566778899'
        },
        tenant_info: {
          is_primary_tenant: false,
          tenant_name: 'Smith Consulting Co., Ltd.',
          tenant_hkid: null,
          tenant_phone: '+66812345678',
          authorized_person: 'John Smith',
          company_tax_id: 'TAX0123456789'
        },
        documents: [
          {
            doc_id: 'doc_003',
            doc_type: 'commercial_lease',
            doc_name: 'Commercial_Lease_Agreement.pdf',
            upload_date: '2024-03-15T14:00:00Z',
            file_size: '3.2MB',
            status: 'verified'
          },
          {
            doc_id: 'doc_004',
            doc_type: 'business_registration',
            doc_name: 'Business_Registration.pdf',
            upload_date: '2024-03-15T14:05:00Z',
            file_size: '1.1MB',
            status: 'verified'
          }
        ],
        auto_payment: {
          enabled: true,
          payment_method: 'bank_transfer',
          bank_account: '****7890',
          next_auto_payment_date: '2025-02-05'
        },
        lease_status: 'active',
        created_at: '2024-03-15T14:00:00Z',
        updated_at: '2025-01-10T10:00:00Z'
      }
    ]
  },

  /**
   * Payment Summary API Response (action: getPaymentSummary)
   */
  paymentSummary: {
    status: 'SUCCESS',
    data: {
      rid: 'rnt_001',
      property_name: 'Sukhumvit Residence',
      current_period: {
        period_start: '2025-01-01',
        period_end: '2025-01-31',
        due_date: '2025-02-01',
        base_amount: '35000',
        late_fee: '0',
        discounts: [],
        total_amount: '35000',
        payment_status: 'pending'
      },
      payment_history_summary: {
        total_paid: '385000',
        payments_made: 11,
        on_time_payments: 10,
        late_payments: 1
      },
      available_payment_methods: [
        {
          method: 'credit_card',
          enabled: true,
          saved_cards: [
            {
              card_id: 'card_001',
              card_last_four: '4242',
              card_brand: 'Visa',
              expiry: '12/25'
            }
          ]
        },
        {
          method: 'bank_transfer',
          enabled: true,
          bank_details: {
            bank_name: 'Bangkok Bank',
            account_name: 'Property Management Co Ltd',
            account_number: '1234567890'
          }
        },
        {
          method: 'promptpay',
          enabled: true,
          promptpay_id: '0812345678'
        }
      ],
      applicable_promotions: [
        {
          pmid: 'prm_002',
          title: 'Early Payment Discount',
          discount_amount: '700',
          final_amount: '34300'
        }
      ]
    }
  },

  /**
   * Create Lease Response (action: createRental)
   */
  createLeaseResponse: {
    status: 'SUCCESS',
    data: {
      rid: 'rnt_005',
      confirmation_number: 'CNF2025013100001',
      message: 'Lease created successfully',
      next_steps: [
        'Upload lease agreement document',
        'Wait for landlord approval',
        'Make first payment'
      ]
    }
  },

  /**
   * Login Response (action: memberLogin)
   */
  loginResponse: {
    status: 'SUCCESS',
    data: {
      uid: 'usr_123456789',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ1c3JfMTIzNDU2Nzg5IiwiZXhwIjoxNzM4MzAwODAwfQ.mock_token_signature',
      nickname: 'John',
      email: 'john.smith@example.com',
      lang: 'en',
      session_expires: '2025-01-31T23:59:59Z',
      is_first_login: false,
      requires_profile_update: false
    }
  },

  /**
   * Token Validation Response (action: checkToken)
   */
  checkTokenResponse: {
    status: 'SUCCESS',
    data: {
      valid: true,
      uid: 'usr_123456789',
      expires_in: 86400,
      refresh_required: false
    }
  },

  /**
   * Get Preload Tenancy Setup Info Response (actual API structure)
   */
  preloadTenancySetupInfo: {
    status: 'SUCCESS',
    relationship: [
      { gsid: '1', mtype: 'RELATION', gdesc: 'Husband/Wife', gkey: 'EN', gvalue: 'Husband/Wife' },
      { gsid: '2', mtype: 'RELATION', gdesc: 'Domestic Partner/Roommate', gkey: 'EN', gvalue: 'Domestic Partner/Roommate' },
      { gsid: '3', mtype: 'RELATION', gdesc: 'Siblings', gkey: 'EN', gvalue: 'Siblings' },
      { gsid: '4', mtype: 'RELATION', gdesc: 'Relative/Friend', gkey: 'EN', gvalue: 'Relative/Friend' },
      { gsid: '5', mtype: 'RELATION', gdesc: 'Business Associate', gkey: 'EN', gvalue: 'Business Associate' },
      { gsid: '6', mtype: 'RELATION', gdesc: 'Other', gkey: 'EN', gvalue: 'Other' }
    ],
    bank: [
      { gsid: '1', mtype: 'BANKEN', gdesc: 'Bangkok Bank', gkey: '1', gvalue: 'Bangkok Bank' },
      { gsid: '2', mtype: 'BANKEN', gdesc: 'Kasikorn Bank', gkey: '2', gvalue: 'Kasikorn Bank' },
      { gsid: '3', mtype: 'BANKEN', gdesc: 'Siam Commercial Bank (SCB)', gkey: '3', gvalue: 'Siam Commercial Bank (SCB)' },
      { gsid: '4', mtype: 'BANKEN', gdesc: 'Krung Thai Bank (KTB)', gkey: '4', gvalue: 'Krung Thai Bank (KTB)' },
      { gsid: '5', mtype: 'BANKEN', gdesc: 'TMB Bank (TMB)', gkey: '5', gvalue: 'TMB Bank (TMB)' },
      { gsid: '6', mtype: 'BANKEN', gdesc: 'Bank of China (Hong Kong) (012)', gkey: '12', gvalue: 'Bank of China (Hong Kong) (012)' }
    ],
    district: [
      { gsid: '1', mtype: 'DISTRICT', gdesc: 'sample district', gkey: 'en', gvalue: 'hk district' },
      { gsid: '2', mtype: 'DISTRICT', gdesc: 'Central and Western District', gkey: 'EN', gvalue: 'CENTRAL AND WESTERN DISTRICT' },
      { gsid: '3', mtype: 'DISTRICT', gdesc: 'Eastern District', gkey: 'EN', gvalue: 'EASTERN DISTRICT' },
      { gsid: '4', mtype: 'DISTRICT', gdesc: 'Islands District', gkey: 'EN', gvalue: 'ISLANDS DISTRICT' }
    ],
    region: [
      { gsid: 'REGION', mtype: 'REGION', gdesc: 'REGION1', gkey: 'en', gvalue: 'Region 1' },
      { gsid: '1', mtype: 'REGION', gdesc: 'Hong Kong', gkey: 'EN', gvalue: 'HK' },
      { gsid: '2', mtype: 'REGION', gdesc: 'Kowloon', gkey: 'EN', gvalue: 'KLN' },
      { gsid: '3', mtype: 'REGION', gdesc: 'New Territories', gkey: 'EN', gvalue: 'NT' }
    ],
    docguide: [],
    docguidecommon: [
      { gsid: 'e0cf2d92e7211eda65e021dabacde58', mtype: 'DOCGUIDECOMMON', gdesc: 'Document Guide (Common)', gkey: 'EN', gvalue: '1. Full names of renter and landlord,\n2. Rental property address\n3. Lease duration (start date and end date)\n4. Rent amount\n5. First rent due date' }
    ],
    fullname: 'Test User'
  },

  /**
   * Upload Tenancy Docs Response (action: upload_tenancy_docs)
   * From Notion documentation
   */
  uploadTenancyDocsResponse: {
    status: 'SUCCESS',
    data: {
      status: 'SUCCESS',
      filename: `doc_${Date.now()}_lease_agreement.pdf`
    }
  },

  /**
   * Building Search Response (action: searchBuilding)
   */
  buildingSearchResponse: {
    status: 'SUCCESS',
    data: [
      {
        building_id: 'bld_001',
        building_name: 'The Residence Tower A',
        address: '99 Sukhumvit Rd',
        district: 'Khlong Toei',
        province: 'Bangkok',
        postal_code: '10110',
        has_units: true,
        total_units: 250
      },
      {
        building_id: 'bld_002',
        building_name: 'The Residence Tower B',
        address: '99 Sukhumvit Rd',
        district: 'Khlong Toei',
        province: 'Bangkok',
        postal_code: '10110',
        has_units: true,
        total_units: 200
      }
    ]
  },

  /**
   * Registration Flow Responses (NEW API_ORQ_PROXY endpoints)
   * Based on REWRITE-USER_AUTH_MANAGEMENT_API_ANALYSIS.md
   */

  // Send OTP Response (action: sendOTP)
  sendOTPResponse: {
    status: 'SUCCESS',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiI4NTI5MjkyOTI5MiIsImV4cCI6MTczODMwMDgwMH0.mock_otp_token_signature',
    reason: null
  },

  // Registration/OTP Verification Response (action: REG)
  registrationResponse: {
    status: 'SUCCESS',
    uid: 'vz0Mv4P6CxxUDleyxu-_0D5MKcShLT7P',
    token: 'BCwCyk-l-dvEDAlH6SJF0gTO2mPRQDN8',
    reason: null
  },

  // Fill Profile Response (action: fillProfile)
  fillProfileResponse: {
    status: 'SUCCESS',
    token: 'refreshed_BCwCyk-l-dvEDAlH6SJF0gTO2mPRQDN8_after_profile',
    reason: null
  },

  // Create Password Response (action: createPassword)
  createPasswordResponse: {
    status: 'SUCCESS',
    message: 'Password created successfully',
    password_created: true
  },

  // Complete Registration Response (action: completeRegistration)
  completeRegistrationResponse: {
    status: 'SUCCESS',
    message: 'Registration completed successfully',
    registration_complete: true,
    kyc_required: false,
    redirect_to_dashboard: true
  },

  /**
   * Promotions List Response (action: getPromotionList)
   */
  promotionsResponse: {
    status: 'SUCCESS',
    data: [
      {
        pmid: 'prm_001',
        category: 'payment',
        title: '0% Credit Card Installment - 3 Months',
        subtitle: 'Split your payment with no interest',
        description: 'Pay your rent in 3 monthly installments with 0% interest using participating credit cards',
        image_url: '/assets/promo-property-1.svg',
        banner_url: '/assets/promo-banner-1.jpg',
        valid_from: '2025-01-01',
        valid_until: '2025-03-31',
        discount_type: 'installment',
        discount_value: '0',
        minimum_amount: '10000',
        maximum_discount: null,
        applicable_property_types: ['Residential', 'Commercial'],
        terms_conditions: [
          'Minimum payment amount 10,000 THB',
          'Available for Visa and Mastercard only',
          'Cannot be combined with other promotions'
        ],
        usage_limit: 3,
        usage_count: 0,
        is_active: true,
        priority: 1
      },
      {
        pmid: 'prm_002',
        category: 'discount',
        title: 'Early Bird Discount',
        subtitle: 'Save 2% on early payments',
        description: 'Get 2% discount when you pay your rent at least 5 days before the due date',
        image_url: '/assets/promo-property-2.svg',
        banner_url: '/assets/promo-banner-2.jpg',
        valid_from: '2025-01-01',
        valid_until: '2025-12-31',
        discount_type: 'percentage',
        discount_value: '2',
        minimum_amount: '5000',
        maximum_discount: '2000',
        applicable_property_types: ['Residential', 'Parking', 'Vehicle', 'Commercial'],
        terms_conditions: [
          'Payment must be made 5 days before due date',
          'Maximum discount 2,000 THB per transaction',
          'Automatically applied at checkout'
        ],
        usage_limit: null,
        usage_count: 4,
        is_active: true,
        priority: 2
      },
      {
        pmid: 'prm_003',
        category: 'rewards',
        title: 'Double Points February',
        subtitle: 'Earn 2x rewards on all payments',
        description: 'Get double rewards points on all successful rent payments made in February',
        image_url: '/assets/promo-property-3.svg',
        banner_url: '/assets/promo-banner-3.jpg',
        valid_from: '2025-02-01',
        valid_until: '2025-02-28',
        discount_type: 'points',
        discount_value: '2',
        minimum_amount: '1000',
        maximum_discount: null,
        applicable_property_types: ['Residential', 'Parking', 'Vehicle', 'Commercial'],
        terms_conditions: [
          'Valid for February 2025 payments only',
          'Points credited within 7 days',
          'No limit on points earned'
        ],
        usage_limit: null,
        usage_count: 0,
        is_active: true,
        priority: 3
      }
    ]
  },

  /**
   * Account Management Responses
   * Based on Figma designs and common account patterns
   */

  // Get user profile data (action: getUserProfile)
  userProfile: {
    status: 'SUCCESS',
    data: {
      uid: 'usr_123456789',
      preferred_name: 'John Smith',
      email: 'john.smith@example.com',
      mobile_number: '+66812345678',
      language: 'en',
      notification_preferences: {
        email: true,
        sms: true,
        push: true
      },
      profile_updated_at: '2025-01-15T10:30:00Z'
    }
  },

  // Update profile response (action: updateUserProfile)
  updateProfileResponse: {
    status: 'SUCCESS',
    data: {
      message: 'Profile updated successfully',
      updated_fields: ['preferred_name', 'email'],
      updated_at: new Date().toISOString()
    }
  },

  // Change password response (action: changePassword)
  changePasswordResponse: {
    status: 'SUCCESS',
    data: {
      message: 'Password changed successfully',
      password_updated: true,
      new_token: `updated_token_${Date.now()}`,
      expires_in: 86400
    }
  },

  // Get payment methods (action: getPaymentMethods)
  paymentMethods: {
    status: 'SUCCESS',
    data: {
      cards: [
        {
          card_id: 'card_001',
          card_number: '**** **** **** 4242',
          card_type: 'Visa',
          card_brand: 'visa',
          expiry_month: '12',
          expiry_year: '25',
          cardholder_name: 'John Smith',
          is_default: true,
          added_date: '2024-06-15T10:00:00Z'
        },
        {
          card_id: 'card_002',
          card_number: '**** **** **** 5555',
          card_type: 'Mastercard',
          card_brand: 'mastercard',
          expiry_month: '08',
          expiry_year: '26',
          cardholder_name: 'John Smith',
          is_default: false,
          added_date: '2024-08-20T14:30:00Z'
        }
      ],
      default_card_id: 'card_001'
    }
  },

  // Add payment method response (action: addPaymentMethod)
  addPaymentMethodResponse: {
    status: 'SUCCESS',
    data: {
      card_id: `card_${Date.now()}`,
      message: 'Payment method added successfully',
      is_default: false
    }
  },

  // Delete payment method response (action: deletePaymentMethod)
  deletePaymentMethodResponse: {
    status: 'SUCCESS',
    data: {
      message: 'Payment method removed successfully',
      deleted_card_id: null // Will be set dynamically
    }
  },

  // Referral data (action: getReferralData)
  referralData: {
    status: 'SUCCESS',
    data: {
      total_points: 1250,
      referral_code: 'JOHN2025',
      referral_stats: {
        total_referrals: 8,
        successful_referrals: 5,
        pending_referrals: 3
      },
      recent_referrals: [
        {
          referred_user: 'Sarah Johnson',
          signup_date: '2024-12-15T10:00:00Z',
          points_earned: 250,
          status: 'completed'
        },
        {
          referred_user: 'Mike Chen',
          signup_date: '2024-11-20T14:30:00Z',
          points_earned: 250,
          status: 'completed'
        },
        {
          referred_user: 'Lisa Wong',
          signup_date: '2025-01-10T09:15:00Z',
          points_earned: 0,
          status: 'pending'
        }
      ],
      points_history: [
        {
          date: '2024-12-15T10:00:00Z',
          points: 250,
          description: 'Referral bonus for Sarah Johnson',
          type: 'referral'
        },
        {
          date: '2024-11-20T14:30:00Z',
          points: 250,
          description: 'Referral bonus for Mike Chen',
          type: 'referral'
        },
        {
          date: '2024-10-05T16:45:00Z',
          points: 100,
          description: 'First payment bonus',
          type: 'bonus'
        }
      ]
    }
  }
};

/**
 * Helper function to simulate API delay
 */
// Updated export
// Updated export
export const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Helper function to simulate random API failure (for testing error handling)
 */
// Updated export
// Updated export
export const simulateRandomFailure = (failureRate: number = 0.1): boolean => {
  return Math.random() < failureRate;
};

/**
 * Get mock response by action name with enhanced error simulation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Updated export
// Updated export
export const getMockResponse = (action: string, data?: any): any => {
  // Critical APIs that should not fail randomly during testing
  const criticalApis = ['get_preload_tenancy_setup_info', 'getDashBoard2', 'getUserSummary'];
  
  // Simulate random failures for testing (5% failure rate) - but not for critical APIs
  if (!criticalApis.includes(action) && simulateRandomFailure(0.05)) {
    return getRandomErrorResponse(action);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseMap: Record<string, any> = {
    'getDashBoard2': mockData.dashboard,
    'getUserSummary': mockData.userSummary,
    'getTransactionList2Proxy': mockData.transactions,
    'listRental2': mockData.leases,
    'getPaymentSummary': mockData.paymentSummary,
    'createRental': mockData.createLeaseResponse,
    'memberLogin': getEmailLoginResponse(data),
    'LOGIN_NEW': getSMSLoginOTPResponse(data),
    'LOGIN': getLoginOTPVerifyResponse(data),
    'checkToken': mockData.checkTokenResponse,
    'getPreloadTenancySetupInfo': mockData.preloadTenancySetupInfo,
    'get_preload_tenancy_setup_info': mockData.preloadTenancySetupInfo, // Legacy support
    'upload_tenancy_docs': getUploadTenancyDocsResponse(data),
    'searchBuilding': mockData.buildingSearchResponse,
    'getPromotionList': mockData.promotionsResponse,
    // Account Management Actions
    'getUserProfile': mockData.userProfile,
    'updateUserProfile': getUpdateProfileResponse(data),
    'changePassword': getChangePasswordResponse(data),
    'getPaymentMethods': mockData.paymentMethods,
    'addPaymentMethod': getAddPaymentMethodResponse(data),
    'deletePaymentMethod': getDeletePaymentMethodResponse(data),
    'getReferralData': mockData.referralData,

    // Registration flow endpoints (NEW API_ORQ_PROXY)
    'send-otp': getSendOTPResponse(data),
    'verify-otp': getVerifyOTPResponse(data),
    'fill': getFillProfileResponse(data),
    // Legacy action names for backwards compatibility
    'sendOTP': getSendOTPResponse(data),
    'REG': getVerifyOTPResponse(data),
    'fillProfile': getFillProfileResponse(data),

    // Registration flow endpoints that still use legacy apiURL
    'memberUpdatePasscode': getCreatePasswordResponse(data),
    'memberSetUpNotification': getCompleteRegistrationResponse(data),

    'openRental': {
      status: 'SUCCESS',
      data: mockData.leases.data.find(lease => lease.rid === data?.rid) || mockData.leases.data[0]
    },
    'updateRental': {
      status: 'SUCCESS',
      data: { message: 'Lease updated successfully', rid: data?.rid }
    },
    'createTransaction': {
      status: 'SUCCESS',
      data: {
        pno: `TXN${Date.now()}`,
        rpid: `PAY${Date.now()}`,
        message: 'Payment processed successfully'
      }
    }
  };

  return responseMap[action] || { status: 'FAIL', error: 'Unknown action' };
};

/**
 * Enhanced login mock response with email/password validation
 */
function getEmailLoginResponse(data?: { username?: string; password?: string }) {
  // Validate required parameters
  if (!data?.username || !data?.password) {
    return {
      status: 'FAIL',
      error: 'Username and password are required'
    };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.username)) {
    return {
      status: 'FAIL',
      error: 'Please enter a valid email address'
    };
  }

  // Password validation
  if (data.password.length < 6) {
    return {
      status: 'FAIL',
      error: 'Password must be at least 6 characters'
    };
  }

  // Test credentials for demo (you can add more)
  const validCredentials = [
    { email: 'demo@example.com', password: 'password123' },
    { email: 'john@example.com', password: 'password123' },
    { email: 'test@trustrent.com', password: 'password123' },
    { email: 'user@test.com', password: 'test123' }
  ];

  const isValidCredential = validCredentials.some(
    cred => cred.email === data.username && cred.password === data.password
  );

  if (!isValidCredential) {
    return {
      status: 'FAIL',
      error: 'Invalid email or password'
    };
  }

  // Return successful login response
  return {
    status: 'SUCCESS',
    data: {
      uid: 'usr_123456789',
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Date.now()}.mock_token_signature`,
      nickname: 'John Smith',
      email: data.username,
      lang: 'en',
      session_expires: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      is_first_login: false,
      requires_profile_update: false
    }
  };
}

/**
 * SMS Login mock responses
 */
function getSMSLoginOTPResponse(data?: { tel?: string }) {
  // Validate tel parameter
  if (!data?.tel) {
    return {
      status: 'FAIL',
      error: 'Mobile number is required'
    };
  }

  // Basic mobile number validation (accept Thai format starting with 0 or +66)
  const tel = data.tel.replace(/\s+/g, ''); // Remove spaces
  if (tel.length < 8) {
    return {
      status: 'FAIL',
      error: 'Please enter a valid mobile number'
    };
  }

  // Simulate 5% failure rate for testing error handling
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Unable to send SMS. Please try again.'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      message: 'SMS OTP sent successfully',
      token: `login_otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expires_in: 300, // 5 minutes
      reason: null
    }
  };
}

function getLoginOTPVerifyResponse(data?: { token?: string; passcode?: string }) {
  // Validate required parameters
  if (!data?.token || !data?.passcode) {
    return {
      status: 'FAIL',
      error: 'Token and OTP code are required'
    };
  }

  // Validate OTP format (6 digits)
  if (data.passcode.length !== 6 || !/^\d{6}$/.test(data.passcode)) {
    return {
      status: 'FAIL',
      error: 'Please enter a 6-digit OTP code'
    };
  }

  // For testing, accept any 6-digit code
  // In production, you would validate against the actual OTP sent
  // Special test code that always fails for error testing
  if (data.passcode === '000000') {
    return {
      status: 'FAIL',
      error: 'Invalid OTP code. Please try again.'
    };
  }

  // Simulate 5% failure rate for testing
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'OTP verification failed. Please try again.'
    };
  }

  // Return successful login response (same structure as email login)
  return {
    status: 'SUCCESS',
    data: {
      uid: 'usr_sms_login_123456789',
      token: 'jwt_sms_login_' + Date.now() + '_' + Math.random().toString(36).substr(2, 15),
      user_profile: {
        nickname: 'SMS User',
        email: '', // SMS login may not have email
        phone: data.token.includes('66') ? '+66' + data.token.split('_')[2] : '+66812345678', // Extract from token or use default
        profile_complete: true,
        verification_status: 'verified'
      },
      account_info: {
        account_status: 'active',
        member_tier: 'standard',
        registration_date: '2024-01-15',
        last_login: new Date().toISOString()
      },
      preferences: {
        language: 'th',
        currency: 'THB',
        notifications_enabled: true
      },
      session_expires: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      is_first_login: false,
      requires_profile_update: false
    }
  };
}

/**
 * Enhanced registration mock responses with validation
 */
/**
 * Helper function for upload_tenancy_docs response
 */
function getUploadTenancyDocsResponse(data?: { uid?: string; filename?: string }) {
  // Simulate 5% failure rate for testing error handling
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Document upload failed. Please try again.'
    };
  }

  // Generate a unique filename based on the original or use a default
  const originalFilename = data?.filename || 'lease_agreement.pdf';
  const timestamp = Date.now();
  const generatedFilename = `doc_${timestamp}_${originalFilename}`;

  return {
    status: 'SUCCESS',
    data: {
      status: 'SUCCESS',
      filename: generatedFilename
    }
  };
}

function getSendOTPResponse(data?: { tel?: string }) {
  // Validate tel parameter
  if (!data?.tel) {
    return {
      status: 'FAIL',
      error: 'Tel parameter is required'
    };
  }

  // Simulate email vs mobile validation (permissive for testing)
  const tel = data.tel;

  // For testing purposes, accept any non-empty input as valid
  // In production, you would validate email/mobile format properly
  // Examples that will work: "test", "123", "user@email.com", "1234567890"
  if (tel.length < 3) {
    return {
      status: 'FAIL',
      error: 'Input too short (minimum 3 characters)'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      status: 'SUCCESS',
      token: `otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reason: null
    }
  };
}

function getVerifyOTPResponse(data?: { token?: string; passcode?: string }) {
  // Validate required parameters
  if (!data?.token || !data?.passcode) {
    return {
      status: 'FAIL',
      error: 'Token and passcode are required'
    };
  }

  // Simulate OTP validation (accept any 6-digit code for testing)
  if (data.passcode.length !== 6 || !/^\d{6}$/.test(data.passcode)) {
    return {
      status: 'FAIL',
      error: 'Please enter a 6-digit verification code'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      status: 'SUCCESS',
      uid: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      token: `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reason: null
    }
  };
}

function getFillProfileResponse(data?: { uid?: string; token?: string; nickname?: string; email?: string }) {
  // Validate required profile fields
  const required = ['uid', 'token', 'nickname', 'email'];
  const missing = required.filter(field => !data || !(field in data) || !data[field as keyof typeof data]);

  if (missing.length > 0) {
    return {
      status: 'FAIL',
      error: `Missing required fields: ${missing.join(', ')}`
    };
  }

  // Validate email format
  if (data && data.email && !data.email.includes('@')) {
    return {
      status: 'FAIL',
      error: 'Invalid email format'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      status: 'SUCCESS',
      token: `refreshed_${data?.token || 'default'}_${Date.now()}`,
      reason: null
    }
  };
}

function getCreatePasswordResponse(data?: { newPasscode?: string; uid?: string; token?: string }) {
  // Validate password requirements
  if (!data?.newPasscode) {
    return {
      status: 'FAIL',
      data: {
        passcodeUpdated: false,
        message: 'Password is required',
        newToken: null
      }
    };
  }

  const password = data.newPasscode;

  // Basic password validation
  if (password.length < 8) {
    return {
      status: 'FAIL',
      data: {
        passcodeUpdated: false,
        message: 'Password must be at least 8 characters long',
        newToken: null
      }
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      passcodeUpdated: true,
      message: 'Password created successfully',
      newToken: `refreshed_${data.token}_${Date.now()}`
    }
  };
}

function getCompleteRegistrationResponse(data?: { uid?: string; token?: string; skipEkyc?: boolean }) {
  // Validate user session
  if (!data?.uid || !data?.token) {
    return {
      status: 'FAIL',
      data: {
        message: 'Invalid session. Please log in again.',
        registration_complete: false,
        kyc_required: true,
        redirect_to_dashboard: false
      }
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      message: 'Registration completed successfully',
      registration_complete: true,
      kyc_required: !data.skipEkyc,
      redirect_to_dashboard: true
    }
  };
}

/**
 * Generate random error responses for different actions
 */
function getRandomErrorResponse(action: string) {
  const errorResponses = {
    'sendOTP': {
      status: 'FAIL',
      token: null,
      reason: 'Service temporarily unavailable. Please try again.'
    },
    'REG': {
      status: 'FAIL',
      uid: null,
      token: null,
      reason: 'Verification code has expired. Please request a new one.'
    },
    'fillProfile': {
      status: 'FAIL',
      token: null,
      reason: 'Profile update failed. Please try again.'
    },
    'memberUpdatePasscode': {
      status: 'FAIL',
      data: {
        passcodeUpdated: false,
        message: 'Password update failed. Please try again.',
        newToken: null
      }
    },
    'memberSetUpNotification': {
      status: 'FAIL',
      data: {
        message: 'Registration completion failed. Please contact support.',
        registration_complete: false,
        kyc_required: true,
        redirect_to_dashboard: false
      }
    }
  };

  return errorResponses[action as keyof typeof errorResponses] || {
    status: 'FAIL',
    error: 'Service temporarily unavailable'
  };
}

/**
 * Account Management Mock Response Functions
 */

function getUpdateProfileResponse(data?: { preferred_name?: string; email?: string; mobile_number?: string }) {
  // Validate required session data (uid and token would come from authenticated user)
  if (!data || Object.keys(data).length === 0) {
    return {
      status: 'FAIL',
      error: 'No profile data provided'
    };
  }

  // Validate email format if provided
  if (data.email && !data.email.includes('@')) {
    return {
      status: 'FAIL',
      error: 'Invalid email format'
    };
  }

  // Simulate 5% failure rate
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Profile update failed. Please try again.'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      message: 'Profile updated successfully',
      updated_fields: Object.keys(data),
      updated_at: new Date().toISOString()
    }
  };
}

function getChangePasswordResponse(data?: { current_password?: string; new_password?: string; confirm_password?: string }) {
  // Validate required fields
  if (!data?.current_password || !data?.new_password || !data?.confirm_password) {
    return {
      status: 'FAIL',
      error: 'All password fields are required'
    };
  }

  // Check if passwords match
  if (data.new_password !== data.confirm_password) {
    return {
      status: 'FAIL',
      error: 'New passwords do not match'
    };
  }

  // Password strength validation
  if (data.new_password.length < 8) {
    return {
      status: 'FAIL',
      error: 'Password must be at least 8 characters long'
    };
  }

  // Mock current password validation (in real app, this would verify against stored hash)
  if (data.current_password === 'wrongpassword') {
    return {
      status: 'FAIL',
      error: 'Current password is incorrect'
    };
  }

  // Simulate 5% failure rate
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Password change failed. Please try again.'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      message: 'Password changed successfully',
      password_updated: true,
      new_token: `updated_token_${Date.now()}`,
      expires_in: 86400
    }
  };
}

function getAddPaymentMethodResponse(data?: { card_number?: string; expiry_month?: string; expiry_year?: string; cardholder_name?: string; cvv?: string }) {
  // Validate required card fields
  const required = ['card_number', 'expiry_month', 'expiry_year', 'cardholder_name', 'cvv'];
  const missing = required.filter(field => !data || !data[field as keyof typeof data]);

  if (missing.length > 0) {
    return {
      status: 'FAIL',
      error: `Missing required fields: ${missing.join(', ')}`
    };
  }

  // Basic card number validation (should be 16 digits)
  if (data?.card_number && data.card_number.replace(/\s/g, '').length !== 16) {
    return {
      status: 'FAIL',
      error: 'Invalid card number'
    };
  }

  // CVV validation
  if (data?.cvv && (data.cvv.length < 3 || data.cvv.length > 4)) {
    return {
      status: 'FAIL',
      error: 'Invalid CVV'
    };
  }

  // Simulate 5% failure rate
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Failed to add payment method. Please try again.'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      card_id: `card_${Date.now()}`,
      message: 'Payment method added successfully',
      is_default: false,
      card_last_four: data?.card_number?.slice(-4) || '0000'
    }
  };
}

function getDeletePaymentMethodResponse(data?: { card_id?: string }) {
  // Validate card_id
  if (!data?.card_id) {
    return {
      status: 'FAIL',
      error: 'Card ID is required'
    };
  }

  // Don't allow deleting the default card if it's the only one
  if (data.card_id === 'card_001') {
    return {
      status: 'FAIL',
      error: 'Cannot delete default payment method. Please set another card as default first.'
    };
  }

  // Simulate 5% failure rate
  if (Math.random() < 0.05) {
    return {
      status: 'FAIL',
      error: 'Failed to remove payment method. Please try again.'
    };
  }

  return {
    status: 'SUCCESS',
    data: {
      message: 'Payment method removed successfully',
      deleted_card_id: data.card_id
    }
  };
}


// TODO: Review: Review: Review: Review implementation




// Updated: 2025-11-24



// Last updated: 2025-11-24


