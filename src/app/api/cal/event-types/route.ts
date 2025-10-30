import { NextResponse } from 'next/server';

const CAL_API_KEY = process.env.CAL_API_KEY;
const CAL_API_URL = process.env.CAL_API_URL || 'https://api.cal.com/v1';

export async function GET() {
  try {
    console.log('🔍 Fetching Cal.com event types...');

    const response = await fetch(`${CAL_API_URL}/event-types?apiKey=${CAL_API_KEY}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Cal.com event-types API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Cal.com API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Cal.com event types response:', data);

    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ Event types API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event types', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}