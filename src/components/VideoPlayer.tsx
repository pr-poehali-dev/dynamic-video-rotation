import { useRef, useState, useCallback, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface VideoSource {
  quality: string;
  src: string;
}

interface VideoPlayerProps {
  sources: VideoSource[];
  title?: string;
  poster?: string;
}

export default function VideoPlayer({ sources, title, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(sources[0]?.quality || '');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [showPlayPulse, setShowPlayPulse] = useState(false);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) scheduleHide();
    else {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setShowControls(true);
    }
  }, [isPlaying, scheduleHide]);

  const handleMouseMove = () => {
    setShowControls(true);
    scheduleHide();
  };

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayPulse(true);
    setTimeout(() => setShowPlayPulse(false), 600);
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.buffered.length > 0) {
      setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changeQuality = (quality: string) => {
    const video = videoRef.current;
    if (!video) return;
    const src = sources.find(s => s.quality === quality)?.src;
    if (!src) return;
    const time = video.currentTime;
    const playing = !video.paused;
    video.src = src;
    video.currentTime = time;
    if (playing) video.play();
    setSelectedQuality(quality);
    setShowQualityMenu(false);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black group select-none"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        src={sources[0]?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* Center play pulse */}
      {showPlayPulse && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(0,0,0,0.5)',
              animation: 'pulse-out 0.6s ease forwards'
            }}
          >
            <Icon name={isPlaying ? 'Play' : 'Pause'} size={32} className="text-white" />
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 controls-fade"
        style={{
          opacity: showControls ? 1 : 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          transform: showControls ? 'translateY(0)' : 'translateY(4px)',
          paddingBottom: '1px'
        }}
      >
        {/* Progress bar (display only, no seek) */}
        <div className="relative px-4 pt-4 pb-1">
          <div className="relative h-[3px] bg-white/15 w-full">
            <div
              className="absolute top-0 left-0 h-full bg-white/25 transition-all"
              style={{ width: `${buffered}%` }}
            />
            <div
              className="absolute top-0 left-0 h-full transition-all"
              style={{ width: `${progressPercent}%`, background: 'hsl(38 92% 60%)' }}
            />
          </div>
        </div>

        {/* Bottom controls row */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                <Icon name={isMuted || volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'} size={18} />
              </button>
              <div className="relative w-16 h-[2px] bg-white/25">
                <div
                  className="absolute top-0 left-0 h-full bg-white/80"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="video-volume absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ height: '2px' }}
                />
              </div>
            </div>

            {/* Time */}
            <span
              className="text-white/60 text-xs font-montserrat"
              style={{ letterSpacing: '0.08em', fontWeight: 300 }}
            >
              {formatTime(currentTime)} <span className="text-white/30">/</span> {formatTime(duration)}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Quality selector */}
            {sources.length > 1 && (
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(v => !v)}
                  className="text-white/60 hover:text-white transition-colors text-xs font-montserrat px-2 py-1 border border-white/20 hover:border-white/50"
                  style={{ letterSpacing: '0.1em', fontWeight: 400 }}
                >
                  {selectedQuality}
                </button>
                {showQualityMenu && (
                  <div
                    className="absolute bottom-full right-0 mb-2 border border-white/10"
                    style={{ background: 'rgba(8,8,8,0.95)' }}
                  >
                    {sources.map(s => (
                      <button
                        key={s.quality}
                        onClick={() => changeQuality(s.quality)}
                        className="block w-full text-left px-4 py-2 text-xs font-montserrat hover:bg-white/10 transition-colors"
                        style={{
                          color: s.quality === selectedQuality ? 'hsl(38 92% 60%)' : 'rgba(255,255,255,0.7)',
                          letterSpacing: '0.1em'
                        }}
                      >
                        {s.quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Title overlay top */}
      {title && (
        <div
          className="absolute top-0 left-0 right-0 controls-fade px-5 pt-4 pb-8"
          style={{
            opacity: showControls ? 1 : 0,
            background: 'linear-gradient(rgba(0,0,0,0.6), transparent)',
            transform: showControls ? 'translateY(0)' : 'translateY(-4px)'
          }}
        >
          <p
            className="text-white/50 text-xs font-montserrat uppercase"
            style={{ letterSpacing: '0.2em', fontWeight: 400 }}
          >
            {title}
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse-out {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}