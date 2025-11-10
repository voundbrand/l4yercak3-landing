# L4YERCAK3 Landing Page - CRM Integration Guide

## 🎯 Overview

This landing page now integrates with the l4yercak3 backend CRM to automatically create contacts and organizations from three key conversion points:

1. **Newsletter Signups** - Captures email subscribers
2. **Application Form** - Captures pilot program applicants with company info
3. **Appointment Bookings** - Captures meeting bookings via Cal.com

All three flows automatically sync to your l4yercak3 backend CRM, creating contacts and linking organizations.

## 📊 Current Integration Status

### ✅ Newsletter Signups
- **File**: `convex/contacts.ts`
- **Flow**:
  1. User subscribes via newsletter form
  2. Contact stored in local Convex database
  3. Welcome email sent to subscriber
  4. Notification email sent to sales team
  5. **NEW**: Contact synced to backend CRM via `syncToCRM` action
- **CRM Data**:
  - Contact created as "newsletter" lead
  - Tags: `newsletter`, subscription type
  - No organization created (individual subscribers)

### ✅ Application Form (Lead Generator)
- **File**: `src/app/api/application/submit/route.ts`
- **Flow**:
  1. User submits pilot application
  2. Application stored in Convex
  3. Confirmation email sent to applicant
  4. Notification email sent to sales team
  5. **NEW**: Contact + Organization created in backend CRM
- **CRM Data**:
  - Contact created as "application" lead
  - Organization created/linked with company name
  - Tags: `pilot-application`, `high-intent`, team size, monthly spend
  - Metadata: role, challenges, application date

### ✅ Appointment Bookings
- **File**: `src/app/api/cal/bookings/route.ts`
- **Flow**:
  1. User books appointment via Cal.com
  2. Booking created in Cal.com
  3. Cal.com sends confirmation emails (automatic)
  4. **NEW**: Contact created in backend CRM
- **CRM Data**:
  - Contact created as "appointment" lead
  - Tags: `appointment`, `scheduled-call`
  - Reference to Cal.com booking ID
  - No organization created (unless provided)

## 🔧 Setup Instructions

### Step 1: Configure Backend CRM

You need to set up the backend CRM API endpoint. Based on the geschlossene-gesellschaft pattern, your backend needs:

**File to create in backend**: `convex/api/v1/crm.ts`

```typescript
import { httpAction } from "../../_generated/server";
import { internal } from "../../_generated/api";

export const createContact = httpAction(async (ctx, request) => {
  // 1. Verify API key
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ error: "Missing Authorization header" }),
      { status: 401 }
    );
  }

  const apiKey = authHeader.substring(7);
  const authContext = await ctx.runQuery(internal.api.auth.verifyApiKey, {
    apiKey,
  });

  if (!authContext) {
    return new Response(
      JSON.stringify({ error: "Invalid API key" }),
      { status: 401 }
    );
  }

  // 2. Parse request
  const { contactInfo, organizationInfo, tags, metadata } = await request.json();

  // 3. Create organization if provided
  let organizationId = null;
  if (organizationInfo) {
    organizationId = await ctx.runMutation(
      internal.crmIntegrations.createOrganization,
      {
        organizationId: authContext.organizationId,
        orgInfo: organizationInfo,
        performedBy: authContext.userId,
      }
    );
  }

  // 4. Create contact
  const contactId = await ctx.runMutation(
    internal.crmIntegrations.createContact,
    {
      organizationId: authContext.organizationId,
      contactInfo: {
        ...contactInfo,
        organizationId,
      },
      tags,
      metadata,
      performedBy: authContext.userId,
    }
  );

  return new Response(
    JSON.stringify({
      success: true,
      contactId,
      organizationId,
    }),
    { status: 200 }
  );
});
```

**Configure routing in**: `convex/http.ts`

```typescript
import * as crm from "./api/v1/crm";

http.route({
  path: "/api/v1/crm/contacts",
  method: "POST",
  handler: crm.createContact,
});
```

### Step 2: Generate API Key

In your backend CRM system:

1. Navigate to your organization settings
2. Generate an API key with format: `org_{organizationId}_{random_chars}`
3. Save this key securely

### Step 3: Configure Environment Variables

Add to your `.env.local`:

```env
# Backend CRM Integration
BACKEND_CRM_URL=https://your-backend.convex.site
BACKEND_CRM_API_KEY=org_j97a2b3c4d5e6f7g8h9i_your_api_key_here
```

**Important**:
- Replace `your-backend.convex.site` with your actual backend URL
- Replace the API key with your generated key
- **Never commit `.env.local` to git!**

### Step 4: Regenerate Convex API

The newsletter integration uses a new Convex action. Regenerate the API:

```bash
npx convex dev
```

This will regenerate the API types and make the `syncToCRM` action available.

## 📝 Email Confirmation Status

### Newsletter Signups ✅
- **To Subscriber**: Welcome email with subscription confirmation
- **To Sales Team**: Notification email with subscriber details
- Both emails are sent via `convex/emails.ts`

### Application Form ✅
- **To Applicant**: Confirmation email with next steps
- **To Sales Team**: Notification with application details
- Both emails sent via Resend in `src/app/api/application/submit/route.ts`

### Appointment Bookings ✅
- **To Booker**: Cal.com sends automatic confirmation emails
- **To Sales Team**: Cal.com sends automatic notifications
- CRM contact created for follow-up tracking

## 🔍 Testing the Integration

### Test Newsletter Signup

1. Go to landing page
2. Enter email in newsletter form
3. Submit
4. Check console logs for: `✅ Contact synced to CRM: {contactId}`
5. Verify in backend CRM that contact was created

### Test Application Form

1. Click "Apply for Pilot" button
2. Fill out application form completely
3. Submit
4. Check console logs for:
   - `✅ CRM contact created from application: {contactId}`
   - `✅ CRM organization created/linked: {organizationId}`
5. Verify in backend CRM that contact AND organization were created

### Test Appointment Booking

1. Click "Book a Call" button
2. Select date and time
3. Fill in contact details
4. Confirm booking
5. Check console logs for: `✅ CRM contact created from appointment: {contactId}`
6. Verify in backend CRM that contact was created

## 🔒 Security Considerations

1. **API Key Storage**:
   - Stored in environment variables (never in code)
   - Never committed to version control
   - Rotated periodically for security

2. **Fire-and-Forget Pattern**:
   - CRM sync doesn't block user actions
   - Failures logged but don't affect user experience
   - Retry logic with exponential backoff

3. **Data Validation**:
   - All data validated before submission
   - Email format validation
   - Required field checks
   - SQL injection prevention (Convex handles this)

4. **Error Handling**:
   - Backend errors not exposed to users
   - All errors logged server-side
   - Graceful degradation if CRM unavailable

## 📊 Data Flow Diagrams

### Newsletter Signup Flow
```
User submits email
    ↓
convex/contacts.ts:subscribe
    ↓
Store in emailList table
    ↓
Schedule actions (parallel):
    ├─→ sendWelcomeEmail (to subscriber)
    ├─→ sendNotificationEmail (to sales)
    └─→ syncToCRM (to backend) ← NEW
         ↓
         Backend CRM API
         ↓
         Contact created as "newsletter" lead
```

### Application Form Flow
```
User submits application
    ↓
src/app/api/application/submit/route.ts
    ↓
Store in Convex
    ↓
Parallel actions:
    ├─→ Send customer confirmation email
    ├─→ Send sales notification email
    └─→ Submit to CRM (fire-and-forget) ← NEW
         ↓
         Backend CRM API
         ↓
         Create organization
         ↓
         Create contact linked to organization
```

### Appointment Booking Flow
```
User books appointment
    ↓
src/app/api/cal/bookings/route.ts
    ↓
Create booking in Cal.com
    ↓
Cal.com sends confirmation emails
    ↓
Submit to CRM (fire-and-forget) ← NEW
    ↓
    Backend CRM API
    ↓
    Contact created as "appointment" lead
```

## 🐛 Troubleshooting

### CRM Integration Not Working

1. **Check environment variables**:
   ```bash
   echo $BACKEND_CRM_URL
   echo $BACKEND_CRM_API_KEY
   ```

2. **Check logs**:
   - Look for `⚠️ CRM integration not configured`
   - Look for `❌ CRM API error` messages

3. **Verify API key**:
   - Format should be `org_xxx_yyy`
   - Test with curl:
     ```bash
     curl -X POST https://your-backend.convex.site/api/v1/crm/contacts \
       -H "Authorization: Bearer $BACKEND_CRM_API_KEY" \
       -H "Content-Type: application/json" \
       -d '{"contactInfo":{"firstName":"Test","lastName":"User","email":"test@example.com","source":"newsletter"}}'
     ```

4. **Check backend logs**:
   - Verify API endpoint is deployed
   - Check for authentication errors
   - Verify CRM mutations are working

### Emails Not Sending

1. **Check Resend API key** in `.env.local`
2. **Verify sender email** is configured in Resend
3. **Check sales team email** is valid
4. **Look for email errors** in console logs

### Newsletter CRM Sync Failing

1. **Regenerate Convex API**:
   ```bash
   npx convex dev
   ```

2. **Check action is available**:
   - Look in `convex/_generated/api.ts`
   - Should see `contacts.syncToCRM`

3. **Verify environment variables in Convex**:
   - Go to Convex dashboard
   - Check environment variables are set
   - Add `BACKEND_CRM_URL` and `BACKEND_CRM_API_KEY`

## 📈 Next Steps

1. **Monitor Integration**:
   - Check CRM regularly for new contacts
   - Monitor error logs
   - Track conversion rates

2. **Enhance Integration**:
   - Add custom fields to CRM
   - Create automated workflows
   - Set up lead scoring

3. **Analytics**:
   - Track CRM sync success rates
   - Monitor email delivery rates
   - Measure conversion funnel

## 🎉 Summary

You now have a fully integrated landing page that:

✅ Captures newsletter subscribers and syncs to CRM
✅ Captures pilot applications with organizations
✅ Captures appointment bookings
✅ Sends confirmation emails to users
✅ Sends notification emails to sales team
✅ Creates contacts and organizations in backend CRM
✅ Handles errors gracefully with fire-and-forget pattern

All three conversion points are now feeding your centralized CRM system!
