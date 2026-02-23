import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { getSignupsForWebinar, exportSignupsCsv } from '@/lib/webinar';

/* ------------------------------------------------------------------ */
/*  GET /api/admin/webinars/[id]/signups                                */
/*  Returns signups as JSON or CSV (with ?format=csv)                   */
/*  Admin-only endpoint                                                  */
/* ------------------------------------------------------------------ */

interface RouteContext {
  params: { id: string };
}

export async function GET(request: Request, { params }: RouteContext) {
  // Auth check – admin only
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Brak dostepu. Wymagana rola administratora.' },
      { status: 403 },
    );
  }

  const webinarId = params.id;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  try {
    if (format === 'csv') {
      // CSV download
      const csv = exportSignupsCsv(webinarId);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="signups-${webinarId}.csv"`,
        },
      });
    }

    // JSON response
    const signups = getSignupsForWebinar(webinarId);

    return NextResponse.json({
      webinarId,
      count: signups.length,
      signups,
    });
  } catch (error) {
    console.error('[api/admin/webinars/signups] Error:', error);
    return NextResponse.json(
      { error: 'Wystapil blad serwera.' },
      { status: 500 },
    );
  }
}
