import type { Metadata } from 'next';
import { getAllVideos, getAllTopics, getAllTags } from '@/lib/video';
import VideoFilter from '@/components/video/VideoFilter';

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Krótkie materiały wideo o regulacji układu nerwowego, oddychaniu i praktykach jogi kundalini.',
  openGraph: {
    title: 'Video | Aga · Joga Kundalini',
    description: 'Krótkie materiały wideo o regulacji układu nerwowego, oddychaniu i praktykach jogi kundalini.',
  },
};

export default function VideoHubPage() {
  const videos = getAllVideos();
  const topics = getAllTopics();
  const tags = getAllTags();

  return (
    <div className="section-spacing">
      <div className="content-container">
        <header className="mb-14">
          <span className="label-editorial mb-4 block">Materiały wideo</span>
          <h1 className="font-serif text-display-sm md:text-display text-earth-950 mb-4">
            Video
          </h1>
          <p className="text-body-lg text-earth-600 leading-relaxed max-w-2xl">
            Krótkie materiały wideo o regulacji układu nerwowego, praktykach
            oddechowych i jodze kundalini.
          </p>
        </header>

        <VideoFilter videos={videos} topics={topics} tags={tags} />
      </div>
    </div>
  );
}
