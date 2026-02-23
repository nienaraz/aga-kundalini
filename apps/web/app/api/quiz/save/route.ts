import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

/**
 * POST /api/quiz/save
 *
 * Zapisuje wynik quizu dla zalogowanego użytkownika.
 * Póki nie ma tabeli QuizResult w schemacie DB, wynik jest logowany.
 * localStorage jest zawsze głównym źródłem danych po stronie klienta.
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Musisz być zalogowana/y, aby zapisać wynik.' },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Walidacja podstawowa
    if (!body.stateId || !body.scores || !body.completedAt) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane quizu.' },
        { status: 400 },
      );
    }

    // TODO: Zapisz do bazy danych po dodaniu tabeli quizResults do schematu
    // Przykład:
    // import { db } from '@/lib/db';
    // import { quizResults } from '@/lib/db/schema';
    // import { createId } from '@paralleldrive/cuid2';
    //
    // await db.insert(quizResults).values({
    //   id: createId(),
    //   userId: session.user.id,
    //   stateId: body.stateId,
    //   scores: JSON.stringify(body.scores),
    //   answers: JSON.stringify(body.answers),
    //   completedAt: body.completedAt,
    // });

    // Na razie logujemy wynik
    console.log('[Quiz Save]', {
      userId: session.user.id,
      stateId: body.stateId,
      scores: body.scores,
      completedAt: body.completedAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Quiz Save Error]', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisywania.' },
      { status: 500 },
    );
  }
}
