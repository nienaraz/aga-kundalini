import type { Metadata } from 'next';
import { getAllVideos, getAllTopics, getAllTags } from '@/lib/video';
import VideoFilter from '@/components/video/VideoFilter';

/* ------------------------------------------------------------------ */
/*  /video – Video Hub listing page                                     */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Krótkie materiały wideo o regulacji układu nerwowego, oddychaniu i praktykach jogi kundalini.',
  openGraph: {
    title: 'Video | Aga · Joga Kundalini',
    description:
      'Krótkie materiały wideo o regulacji układu nerwowego, oddychaniu i praktykach jogi kundalini.',
  },
};

export default function VideoHubPage() {
  const videos = getAllVideos();
  const topics = getAllTopics();
  const tags = getAllTags();

  return (
    <div className="section-spacing">
      <div className="content-container">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-earth-800 mb-3">
            Video
          </h1>
          <p className="text-earth-500 text-lg leading-relaxed max-w-2xl">
            Krótkie materiały wideo o regulacji układu nerwowego, praktykach
            oddechowych i jodze kundalini. Obejrzyj, kiedy potrzebujesz wsparcia
            lub inspiracji.
          </p>
        </header>

        {/* Filterable grid */}
        <VideoFilter videos={videos} topics={topics} tags={tags} />
      </div>
    </div>
  );
}
