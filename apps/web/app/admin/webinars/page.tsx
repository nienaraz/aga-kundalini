import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { getAllWebinars, getSignupCount } from '@/lib/webinar';
import AdminWebinarList from './AdminWebinarList';

/* ------------------------------------------------------------------ */
/*  /admin/webinars – Admin panel for webinar management                */
/*  Server component with session check                                  */
/* ------------------------------------------------------------------ */

export default async function AdminWebinarsPage() {
  // Auth – admin only
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/account/login');
  }

  const webinars = getAllWebinars();
  const webinarsWithCounts = webinars.map((w) => ({
    ...w,
    signupCount: getSignupCount(w.id),
  }));

  return (
    <div className="section-spacing">
      <div className="content-container max-w-5xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-earth-400 mb-2">
            <span>Panel administracyjny</span>
            <span aria-hidden="true">/</span>
            <span className="text-earth-600">Webinary</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-earth-800">
            Zarzadzanie webinarami
          </h1>
        </header>

        {/* Client list component for interactivity */}
        <AdminWebinarList webinars={webinarsWithCounts} />
      </div>
    </div>
  );
}
