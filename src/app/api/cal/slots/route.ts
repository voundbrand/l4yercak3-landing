import { NextRequest, NextResponse } from 'next/server';

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_URL = process.env.CAL_API_URL || 'https://api.cal.com/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventTypeSlug = searchParams.get('eventTypeSlug') || 'open-end-meeting';
    const usernameList = searchParams.get('usernameList') || 'voundbrand';
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    const timeZone = searchParams.get('timeZone') || 'Europe/Berlin';
    const duration = searchParams.get('duration') || '30';

    if (!startTime || !endTime) {
      return NextResponse.json(
        { error: 'startTime and endTime are required' },
        { status: 400 }
      );
    }

    console.log('🚀 Fetching Cal.com slots with params:', {
      eventTypeSlug,
      usernameList,
      startTime,
      endTime,
      timeZone,
      duration,
    });

    // Call Cal.com API using eventTypeId (not slug)
    const OPEN_END_MEETING_ID = 2883643;
    const calUrl = new URL(`${CAL_API_URL}/slots`);
    calUrl.searchParams.set('apiKey', CAL_API_KEY!);
    calUrl.searchParams.set('username', usernameList);
    calUrl.searchParams.set('eventTypeId', OPEN_END_MEETING_ID.toString());
    calUrl.searchParams.set('startTime', startTime);
    calUrl.searchParams.set('endTime', endTime);
    calUrl.searchParams.set('timeZone', timeZone);
    calUrl.searchParams.set('duration', duration);

    console.log('📞 Calling Cal.com API:', calUrl.toString().replace(CAL_API_KEY!, '[API_KEY]'));

    const response = await fetch(calUrl.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Cal.com API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Cal.com API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Cal.com slots response:', data);

    // Apply minimum booking notice filter (2 hours)
    const minimumBookingNoticeMinutes = 120;
    const now = new Date();
    const minimumBookingTime = new Date(now.getTime() + minimumBookingNoticeMinutes * 60 * 1000);

    console.log('✅ Cal.com slots response:', data);

    // Transform the response to our expected format
    const transformedSlots: { time: string }[] = [];

    if (data.slots) {
      Object.entries(data.slots).forEach(([, daySlots]) => {
        if (Array.isArray(daySlots)) {
          daySlots.forEach((slot: { time: string }) => {
            const slotTime = new Date(slot.time);
            const slotTimeUTC = slotTime.getTime();
            const minimumBookingTimeUTC = minimumBookingTime.getTime();

            console.log('Checking slot:', {
              slotTime: slot.time,
              isAfterMinimum: slotTimeUTC > minimumBookingTimeUTC,
            });

            if (slotTimeUTC > minimumBookingTimeUTC) {
              transformedSlots.push({ time: slot.time });
            }
          });
        }
      });
    }

    return NextResponse.json({
      data: transformedSlots,
      status: 'success',
      minimumBookingNotice: minimumBookingNoticeMinutes,
      slotsAfterFilter: transformedSlots.length,
    });

  } catch (error) {
    console.error('❌ Slots API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}