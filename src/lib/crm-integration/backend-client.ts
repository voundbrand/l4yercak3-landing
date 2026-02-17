/**
 * L4YERCAK3 BACKEND CRM CLIENT
 *
 * HTTP client for submitting contacts and organizations to the l4yercak3 backend CRM.
 * Handles authentication, retries, and error handling.
 *
 * Based on geschlossene-gesellschaft integration pattern
 */

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'newsletter' | 'application' | 'appointment' | 'event';
  sourceRef?: string; // ID reference from source system
  notes?: string;
}

export interface OrganizationInfo {
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  size?: string;
  website?: string;
}

export interface CreateContactRequest {
  contactInfo: ContactInfo;
  organizationInfo?: OrganizationInfo; // Optional organization to create/link
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface CreateContactResponse {
  success: boolean;
  contactId?: string;
  organizationId?: string;
  error?: string;
  details?: string;
}

class BackendCRMClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.L4YERCAK3_BACKEND_URL || "";
    this.apiKey = process.env.L4YERCAK3_API_KEY || "";

    if (!this.baseUrl || !this.apiKey) {
      console.warn("⚠️ Backend CRM credentials not configured - CRM sync will be skipped");
    }
  }

  /**
   * Check if CRM integration is enabled
   */
  isEnabled(): boolean {
    return !!this.baseUrl && !!this.apiKey;
  }

  /**
   * Create contact in CRM (with optional organization)
   *
   * @param data Contact and organization information
   * @returns Result of CRM submission
   */
  async createContact(
    data: CreateContactRequest
  ): Promise<CreateContactResponse> {
    if (!this.isEnabled()) {
      console.warn("⚠️ Backend CRM integration disabled - skipping contact creation");
      return {
        success: false,
        error: "CRM integration not configured"
      };
    }

    try {
      console.log(`📝 Submitting contact to CRM: ${data.contactInfo.email}`);

      const response = await fetch(
        `${this.baseUrl}/api/v1/crm/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
            "X-Organization-Id": process.env.L4YERCAK3_ORGANIZATION_ID || "",
          },
          body: JSON.stringify({
            contactInfo: data.contactInfo,
            organizationInfo: data.organizationInfo,
            tags: data.tags || [],
            metadata: data.metadata || {},
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Backend CRM API error:", result);
        return {
          success: false,
          error: result.error || "CRM API request failed",
          details: result.details,
        };
      }

      console.log(`✅ CRM contact created successfully: ${result.contactId}`);
      if (result.organizationId) {
        console.log(`✅ CRM organization created/linked: ${result.organizationId}`);
      }

      return {
        success: true,
        contactId: result.contactId,
        organizationId: result.organizationId,
      };
    } catch (error) {
      console.error("❌ Backend CRM client error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Create contact with retry logic (fire-and-forget safe)
   */
  async createContactWithRetry(
    data: CreateContactRequest,
    maxRetries: number = 3
  ): Promise<CreateContactResponse> {
    let lastError: string = "";

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.createContact(data);

      if (result.success) {
        return result;
      }

      lastError = result.error || "Unknown error";
      console.warn(
        `⚠️ CRM submission attempt ${attempt}/${maxRetries} failed:`,
        lastError
      );

      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    return {
      success: false,
      error: `Failed after ${maxRetries} attempts: ${lastError}`,
    };
  }

  /**
   * Helper: Create contact from newsletter signup
   */
  async createContactFromNewsletter(
    email: string,
    name?: string,
    subscriptionType?: string
  ): Promise<CreateContactResponse> {
    const [firstName, ...lastNameParts] = (name || email.split('@')[0]).split(' ');
    const lastName = lastNameParts.join(' ') || '';

    return this.createContactWithRetry({
      contactInfo: {
        firstName,
        lastName: lastName || 'Newsletter Subscriber',
        email,
        source: 'newsletter',
        notes: `Subscribed to: ${subscriptionType || 'newsletter'}`,
      },
      tags: ['newsletter', subscriptionType || 'general'].filter(Boolean),
      metadata: {
        subscriptionType,
        subscribedAt: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Create contact from application form
   */
  async createContactFromApplication(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    company: string,
    role: string,
    teamSize: string,
    monthlySpend: string,
    currentChallenges: string
  ): Promise<CreateContactResponse> {
    return this.createContactWithRetry({
      contactInfo: {
        firstName,
        lastName,
        email,
        phone,
        company,
        source: 'application',
        notes: `Role: ${role}\nCurrent Challenges: ${currentChallenges}`,
      },
      organizationInfo: {
        name: company,
        email: email, // Use contact email as org email
        phone,
        size: teamSize,
      },
      tags: ['pilot-application', 'high-intent', teamSize, monthlySpend].filter(Boolean),
      metadata: {
        role,
        teamSize,
        monthlySpend,
        currentChallenges,
        appliedAt: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Create contact from appointment booking
   */
  async createContactFromAppointment(
    name: string,
    email: string,
    phone?: string,
    notes?: string,
    bookingId?: string
  ): Promise<CreateContactResponse> {
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    return this.createContactWithRetry({
      contactInfo: {
        firstName,
        lastName: lastName || 'Appointment',
        email,
        phone,
        source: 'appointment',
        sourceRef: bookingId,
        notes: notes || 'Scheduled appointment via Cal.com',
      },
      tags: ['appointment', 'scheduled-call'].filter(Boolean),
      metadata: {
        bookingId,
        bookedAt: new Date().toISOString(),
      },
    });
  }
}

// Singleton instance
let backendCRMClient: BackendCRMClient | null = null;

export function getBackendCRMClient(): BackendCRMClient {
  if (!backendCRMClient) {
    backendCRMClient = new BackendCRMClient();
  }
  return backendCRMClient;
}
