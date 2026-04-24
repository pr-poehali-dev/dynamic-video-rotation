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
      className="min-h-screen flex flex-col"
      style={{ background: 'hsl(0 0% 4%)' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-8 py-6 animate-fade-in-up"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span
          className="font-cormorant text-white/90 text-lg"
          style={{ letterSpacing: '0.35em', fontWeight: 300 }}
        >
          КИНО
        </span>
        <nav className="flex items-center gap-8">
          {['Каталог', 'Новинки', 'Избранное'].map(item => (
            <button
              key={item}
              className="font-montserrat text-white/30 hover:text-white/80 transition-colors text-xs"
              style={{ letterSpacing: '0.15em', fontWeight: 400 }}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">

          {/* Title block */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-baseline gap-4 mb-2">
              <span
                className="font-montserrat text-white/20 text-xs uppercase"
                style={{ letterSpacing: '0.3em' }}
              >
                2024 · Анимация · 96 мин
              </span>
            </div>
            <h1
              className="font-cormorant text-white text-5xl md:text-6xl leading-none"
              style={{ fontWeight: 300, letterSpacing: '-0.01em' }}
            >
              Большой Кролик
            </h1>
          </div>

          {/* Player */}
          <div
            className="animate-fade-in-up-delay"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
          >
            <VideoPlayer
              sources={VIDEO_SOURCES}
              title="Big Buck Bunny — демо"
              poster="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg"
            />
          </div>

          {/* Meta row */}
          <div
            className="mt-8 flex items-start justify-between animate-fade-in-up-delay-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
          >
            <div className="max-w-xl">
              <p
                className="font-montserrat text-white/40 text-sm leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                Классический анимационный короткометражный фильм студии Blender Foundation.
                Три зверька устраивают приключения в лесу, сталкиваясь с задиристым кроликом.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-8">
              <div className="text-center">
                <div
                  className="font-cormorant text-white text-3xl leading-none"
                  style={{ fontWeight: 300 }}
                >
                  8.1
                </div>
                <div
                  className="font-montserrat text-white/25 text-xs mt-1 uppercase"
                  style={{ letterSpacing: '0.2em' }}
                >
                  Рейтинг
                </div>
              </div>
              <div
                className="w-px h-10 self-center"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
              <div className="text-center">
                <div
                  className="font-cormorant text-white text-3xl leading-none"
                  style={{ fontWeight: 300 }}
                >
                  4.2M
                </div>
                <div
                  className="font-montserrat text-white/25 text-xs mt-1 uppercase"
                  style={{ letterSpacing: '0.2em' }}
                >
                  Просмотров
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-8 py-5 text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <span
          className="font-montserrat text-white/15 text-xs"
          style={{ letterSpacing: '0.2em' }}
        >
          © 2024 КИНО
        </span>
      </footer>
    </div>
  );
}
