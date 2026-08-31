import { NextResponse } from 'next/server';

export const revalidate = 86400; // Automatic update every 24h

export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 86400 }
    });
    const data = await res.json();
    
    return NextResponse.json({
      success: true,
      rates: {
        USD: 1,
        EUR: data?.rates?.EUR || 0.92,
        CAD: data?.rates?.CAD || 1.36,
      },
      updatedAt: data?.time_last_update_utc || new Date().toISOString()
    });
  } catch (error) {
    console.error('[RATES API] Error fetching live exchange rates:', error);
    // Fallback exchange rates
    return NextResponse.json({
      success: false,
      rates: { USD: 1, EUR: 0.92, CAD: 1.36 },
      updatedAt: new Date().toISOString()
    });
  }
}
