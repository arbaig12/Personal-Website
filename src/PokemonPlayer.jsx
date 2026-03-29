import React, { useEffect, useMemo, useRef, useState } from 'react';
import './PokemonPlayer.css';

// Vite resolves these at build time — proper hashed URLs, no encoding issues
const audioModules = import.meta.glob(
  '/src/assets/music/**/*.mp3',
  { eager: true, import: 'default' }
);

const coverModules = import.meta.glob(
  '/src/assets/music/**/Covers/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

// ── Helpers ────────────────────────────────────────────────────────────────
const stripExt = (name) => name.replace(/\.[^/.]+$/, '');

const toTitle = (name) =>
  name
    .replace(/Pokémon_/g, 'Pokémon:')
    .replace(/\s*\[.*?\]\s*$/, '')
    .trim();

const fmt = (s) => {
  if (!s || !Number.isFinite(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Build track list from Vite-imported modules ────────────────────────────
const buildTracks = () => {
  const coversByAlbum = new Map();
  Object.entries(coverModules).forEach(([path, url]) => {
    const parts = path.split('/');
    const album = parts[parts.length - 3];
    if (!coversByAlbum.has(album)) coversByAlbum.set(album, []);
    coversByAlbum.get(album).push(url);
  });

  const tracks = Object.entries(audioModules).map(([path, url]) => {
    const parts = path.split('/');
    const album = parts[parts.length - 2];
    const filename = stripExt(parts[parts.length - 1]);
    return {
      title: toTitle(filename),
      game: album,
      covers: coversByAlbum.get(album) ?? [],
      src: url,
    };
  });

  return shuffle(tracks);
};

// ── Music prompt popup ─────────────────────────────────────────────────────
const MusicPrompt = ({ onYes, onNo }) => (
  <div className="pkm-prompt-overlay">
    <div className="pkm-prompt-card">
      <div className="pkm-prompt-icon">♪</div>
      <h2 className="pkm-prompt-title">Pokémon Music</h2>
      <p className="pkm-prompt-body">
        Would you like to play some Pokémon background music while you browse?
      </p>
      <div className="pkm-prompt-actions">
        <button className="pkm-prompt-yes" onClick={onYes}>
          <span>▶</span> Let's go!
        </button>
        <button className="pkm-prompt-no" onClick={onNo}>
          No thanks
        </button>
      </div>
    </div>
  </div>
);

// ── Component ──────────────────────────────────────────────────────────────
const PokemonPlayer = () => {
  const allTracks = useMemo(() => buildTracks(), []);
  const audioRef   = useRef(null);
  const hasStarted = useRef(false);

  const [showPrompt, setShowPrompt] = useState(true);
  const [open, setOpen]             = useState(false);
  const [idx, setIdx]               = useState(0);
  const [playing, setPlaying]       = useState(false);
  const [progress, setProgress]     = useState(0);
  const [duration, setDuration]     = useState(0);
  const [volume, setVolume]         = useState(0.7);
  const [coverIdx, setCoverIdx]     = useState(0);
  const [coverFade, setCoverFade]   = useState(false);
  const [imgErr, setImgErr]         = useState(false);

  const track = allTracks[idx];

  const prev = () => setIdx((i) => (i - 1 + allTracks.length) % allTracks.length);
  const next = () => setIdx((i) => (i + 1) % allTracks.length);

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
      hasStarted.current = true;
    } catch {
      setPlaying(false);
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const togglePlay = () => (playing ? pauseAudio() : playAudio());

  const openPlayer = () => {
    setOpen(true);
    if (!hasStarted.current) playAudio();
  };

  const handlePromptYes = () => {
    setShowPrompt(false);
    setOpen(true);
    // Small delay so the prompt fade-out animation plays first
    setTimeout(() => playAudio(), 350);
  };

  const handlePromptNo = () => {
    setShowPrompt(false);
  };

  // ── Sync volume to audio element ──────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Audio event listeners ──────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncDuration = () => {
      const d = audio.duration;
      setDuration(Number.isFinite(d) ? d : 0);
    };
    const onTime  = () => setProgress(audio.currentTime || 0);
    const onEnded = () => next();
    audio.addEventListener('timeupdate',     onTime);
    audio.addEventListener('loadedmetadata', syncDuration);
    audio.addEventListener('durationchange', syncDuration);
    audio.addEventListener('canplay',        syncDuration);
    audio.addEventListener('ended',          onEnded);
    return () => {
      audio.removeEventListener('timeupdate',     onTime);
      audio.removeEventListener('loadedmetadata', syncDuration);
      audio.removeEventListener('durationchange', syncDuration);
      audio.removeEventListener('canplay',        syncDuration);
      audio.removeEventListener('ended',          onEnded);
    };
  }, [idx]);

  // ── Load track when idx changes ────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    const wasPlaying = playing;
    setProgress(0);
    setDuration(0);
    setImgErr(false);
    setCoverIdx(0);
    audio.pause();
    audio.src = track.src;
    audio.load();
    if (wasPlaying) playAudio();
  }, [idx]);

  // ── Cover crossfade every 4 s ──────────────────────────────────────────
  useEffect(() => {
    if (!open || !track || track.covers.length <= 1) return;
    const id = setInterval(() => {
      setCoverFade(true);
      setTimeout(() => {
        setCoverIdx((i) => (i + 1) % track.covers.length);
        setCoverFade(false);
      }, 450);
    }, 4000);
    return () => clearInterval(id);
  }, [open, idx]);

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setProgress(audio.currentTime);
  };

  const onVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const volumeIcon = volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.75 ? '🔉' : '🔊';

  const pct = duration ? (progress / duration) * 100 : 0;

  if (!allTracks.length) return null;

  return (
    <>
      {showPrompt && <MusicPrompt onYes={handlePromptYes} onNo={handlePromptNo} />}

      <div className="pkm-player">
        <audio ref={audioRef} preload="metadata" />

        <button
          className={`pkm-toggle ${open ? 'hidden' : ''} ${playing ? 'pulse' : ''}`}
          onClick={openPlayer}
          title="Open Pokémon Music Player"
          aria-label="Open music player"
        >
          <span className="pkm-note">♪</span>
        </button>

        <div className={`pkm-card ${open ? 'open' : ''}`}>
          <div className="pkm-card-header">
            <span className="pkm-header-label">♪ Now Playing</span>
            <button className="pkm-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          <div className="pkm-cover-wrap">
            {!imgErr && track.covers.length > 0 ? (
              <img
                key={`${idx}-${coverIdx}`}
                src={track.covers[coverIdx]}
                alt={track.game}
                className={`pkm-cover ${coverFade ? 'fading' : ''}`}
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="pkm-cover-fallback"><span>◉</span></div>
            )}
            {track.covers.length > 1 && (
              <div className="pkm-cover-dots">
                {track.covers.map((_, i) => (
                  <span key={i} className={`pkm-cover-dot ${i === coverIdx ? 'active' : ''}`} />
                ))}
              </div>
            )}
          </div>

          <div className="pkm-meta">
            <p className="pkm-title">{track.title}</p>
            <p className="pkm-game">{track.game}</p>
          </div>

          <div className="pkm-seek" onClick={seek} role="slider" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="pkm-seek-bg">
              <div className="pkm-seek-fill" style={{ width: `${pct}%` }} />
              <div className="pkm-seek-thumb" style={{ left: `${pct}%` }} />
            </div>
          </div>
          <div className="pkm-times">
            <span>{fmt(progress)}</span>
            <span>{fmt(duration)}</span>
          </div>

          <div className="pkm-controls">
            <button className="pkm-btn" onClick={prev} aria-label="Previous">⏮</button>
            <button className="pkm-btn pkm-play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? '⏸' : '▶'}
            </button>
            <button className="pkm-btn" onClick={next} aria-label="Next">⏭</button>
          </div>

          <div className="pkm-volume">
            <span className="pkm-vol-icon">{volumeIcon}</span>
            <div className="pkm-vol-track">
              <div className="pkm-vol-fill" style={{ width: `${volume * 100}%` }} />
              <input
                className="pkm-vol-input"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={onVolumeChange}
                aria-label="Volume"
              />
            </div>
          </div>

          <p className="pkm-counter">{idx + 1} / {allTracks.length}</p>
        </div>
      </div>
    </>
  );
};

export default PokemonPlayer;
