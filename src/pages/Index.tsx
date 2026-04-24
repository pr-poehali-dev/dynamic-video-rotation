import VideoPlayer from '@/components/VideoPlayer';

const VIDEO_SOURCES = [
  {
    quality: '1080p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    quality: '720p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    quality: '480p',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

export default function Index() {
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
          sources={VIDEO_SOURCES}
          poster="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg"
        />
      </div>
    </div>
  );
}