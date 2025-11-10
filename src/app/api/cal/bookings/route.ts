import { NextRequest, NextResponse } from 'next/server';
import { getBackendCRMClient } from '@/lib/crm-integration/backend-client';

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_URL = process.env.CAL_API_URL || 'https://api.cal.com/v1';
const OPEN_END_MEETING_ID = 2883643;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      notes, 
      startTime, 
      endTime, 
      timeZone, 
      location = 'integrations:daily' 
    } = body;

    console.log('📝 Creating Cal.com booking with data:', {
      name,
      email,
      phone,
      startTime,
      endTime,
      timeZone,
      location,
    });

    // Prepare booking data for Cal.com API
    const bookingData = {
      eventTypeId: OPEN_END_MEETING_ID,
      start: startTime,
      end: endTime,
      timeZone: timeZone,
      language: 'en',
      metadata: {},
      responses: {
        name: name,
        email: email,
        ...(phone && { phone: phone }),
        ...(notes && { notes: notes }),
        // Location must be object with value and optionValue
        location: {
          value: location,
          optionValue: location,
        },
      },
    };

    console.log('🚀 Sending to Cal.com API:', JSON.stringify(bookingData, null, 2));

    // Call Cal.com booking API
    const response = await fetch(`${CAL_API_URL}/bookings?apiKey=${CAL_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const responseText = await response.text();
    console.log('📞 Cal.com booking response status:', response.status);
    console.log('📞 Cal.com booking response text:', responseText);

    if (!response.ok) {
      console.error('❌ Cal.com booking API error:', response.status, responseText);
      return NextResponse.json(
        { error: `Booking failed: ${response.status}`, details: responseText },
        { status: response.status }
      );
    }

    let bookingResponse;
    try {
      bookingResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse Cal.com response:', parseError);
      return NextResponse.json(
        { error: 'Invalid response from Cal.com', details: responseText },
        { status: 500 }
      );
    }

    console.log('✅ Cal.com booking created successfully:', bookingResponse);

    // Submit to backend CRM (fire-and-forget)
    const crmClient = getBackendCRMClient();
    if (crmClient.isEnabled()) {
      const bookingId = bookingResponse?.id || bookingResponse?.uid;
      crmClient.createContactFromAppointment(
        name,
        email,
        phone,
        notes,
        bookingId
      ).then((result) => {
        if (result.success) {
          console.log(`✅ CRM contact created from appointment: ${result.contactId}`);
        } else {
          console.error(`❌ CRM submission failed: ${result.error}`);
        }
      }).catch((error) => {
        console.error('❌ CRM submission error:', error);
      });
    }

    return NextResponse.json({
      success: true,
      booking: bookingResponse,
    });

  } catch (error) {
    console.error('❌ Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}