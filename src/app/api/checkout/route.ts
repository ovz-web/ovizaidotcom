import { NextRequest, NextResponse } from 'next/server';

/**
 * Endpoint de checkout désactivé temporairement selon les directives stratégiques.
 * La formation/guide est hors du funnel commercial principal.
 */
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Les inscriptions à la formation sont temporairement indisponibles.' },
    { status: 403 }
  );
}

