import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Icon from '@/components/ui/icon';

const VIDEOS = [
  {
    sources: [
      { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { quality: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ],
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg',
  },
  {
    sources: [
      { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { quality: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    ],
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg',
  },
  {
    sources: [
      { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { quality: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg',
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent(i => (i + 1) % VIDEOS.length);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
      style={{ background: 'hsl(0 0% 4%)' }}
    >
      <h1
        className="font-montserrat text-white text-5xl md:text-6xl"
        style={{ letterSpacing: '0.15em', fontWeight: 700 }}
      >
        OneFap
      </h1>

      <div
        className="w-full max-w-5xl"
        style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
      >
        <VideoPlayer
          key={current}
          sources={VIDEOS[current].sources}
          poster={VIDEOS[current].poster}
        />
      </div>

      <button
        onClick={goNext}
        className="flex items-center gap-3 font-montserrat text-white/70 hover:text-white transition-colors group"
        style={{ letterSpacing: '0.15em', fontWeight: 500, fontSize: '0.8rem' }}
      >
        <span>СЛЕДУЮЩЕЕ ВИДЕО</span>
        <Icon
          name="ChevronRight"
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}