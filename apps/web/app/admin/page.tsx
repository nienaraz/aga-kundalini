import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/options';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Double-check server-side (middleware already guards, but defense in depth)
  if (!session || session.user.role !== 'admin') {
    redirect('/account?error=unauthorized');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-calm-lg">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-serif text-earth-900 mb-2">
          Panel administracyjny
        </h1>
        <p className="text-earth-600 text-sm">
          Zalogowano jako {session.user.name || session.user.email}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-earth-100 bg-warm-50 p-5 text-center">
          <p className="text-2xl font-serif text-sage-700">--</p>
          <p className="text-xs text-earth-500 mt-1">Użytkownicy</p>
        </div>
        <div className="rounded-xl border border-earth-100 bg-warm-50 p-5 text-center">
          <p className="text-2xl font-serif text-sage-700">--</p>
          <p className="text-xs text-earth-500 mt-1">Aktywne ścieżki</p>
        </div>
        <div className="rounded-xl border border-earth-100 bg-warm-50 p-5 text-center">
          <p className="text-2xl font-serif text-sage-700">--</p>
          <p className="text-xs text-earth-500 mt-1">Webinary</p>
        </div>
      </div>

      {/* Navigation links */}
      <section className="space-y-3">
        <h2 className="text-lg font-serif text-earth-800 mb-4">
          Zarządzanie
        </h2>

        <a
          href="/admin/webinars"
          className="flex items-center justify-between rounded-xl border border-earth-100 bg-warm-50
                     px-6 py-4 text-earth-700 hover:bg-sage-50 hover:border-sage-200
                     transition-colors duration-200 group"
        >
          <div>
            <p className="font-medium text-earth-800 group-hover:text-sage-800">
              Webinary
            </p>
            <p className="text-sm text-earth-500 mt-0.5">
              Zarządzaj wydarzeniami i zapisami
            </p>
          </div>
          <span className="text-earth-400 group-hover:text-sage-600 transition-colors">
            &rarr;
          </span>
        </a>
      </section>
    </div>
  );
}
