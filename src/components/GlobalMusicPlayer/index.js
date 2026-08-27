import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const DEFAULT_PLAYLIST = [
  // NetEase Cloud Music entry for "Moon Halo" (provided link id)
  {
    id: '1859652717',
    type: 'netease',
    title: 'Moon Halo',
    artist: '茶理理 / TetraCalyx / Hanser / HOYO-MiX',
    cover: '/img/moon-halo.jpg',
  },
];

export default function GlobalMusicPlayer({ playlist = DEFAULT_PLAYLIST }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('global-music-player');
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        if (typeof obj.index === 'number') setIndex(obj.index);
        if (typeof obj.volume === 'number') setVolume(obj.volume);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('global-music-player', JSON.stringify({ index, volume }));
  }, [index, volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, index, volume]);

  useEffect(() => setVisible(true), []);
 

  const togglePlay = () => setPlaying((p) => !p);
  const next = () => setIndex((i) => (i + 1) % playlist.length);
  const prev = () => setIndex((i) => (i - 1 + playlist.length) % playlist.length);

  const handleEnded = () => {
    next();
    setPlaying(true);
  };

  const track = playlist[index] || playlist[0];
  const [meta, setMeta] = useState({
    title: track && track.title,
    artist: track && track.artist,
    cover: track && track.cover,
  });

  // keep meta in sync when track changes
  useEffect(() => {
    setMeta({
      title: track && track.title,
      artist: track && track.artist,
      cover: track && track.cover,
    });
  }, [index, playlist]);

  // fetch NetEase metadata (via public API). Called on track change.
  const fetchNeteaseMeta = async (id) => {
    const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours
    const storageKey = `netease_meta_${id}`;
    try {
      // try local cache first (client-side only)
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.ts && Date.now() - parsed.ts < CACHE_TTL && parsed.data) {
              setMeta(parsed.data);
              return;
            }
          } catch (e) {
            // ignore parse errors and continue to fetch
          }
        }
      }

      // choose upstream: optional in-page proxy (window.NETEASE_PROXY_URL) or public API
      let url;
      if (typeof window !== 'undefined' && window.NETEASE_PROXY_URL) {
        const base = window.NETEASE_PROXY_URL.replace(/\/$/, '');
        url = `${base}/api/netease?id=${encodeURIComponent(id)}`;
      } else {
        url = `https://api.imjad.cn/cloudmusic/?type=detail&id=${encodeURIComponent(id)}`;
      }

      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`status ${resp.status}`);
      const data = await resp.json();
      const song = data && data.songs && data.songs[0];
      // support proxy shape (proxy returns upstream JSON) or direct upstream
      const resultSong = song || (data && data.songs && data.songs[0]);
      if (resultSong) {
        const cover = (resultSong.al && resultSong.al.picUrl) || (track && track.cover);
        const artist = (resultSong.ar && resultSong.ar.map((a) => a.name).join(', ')) || (track && track.artist);
        const title = resultSong.name || (track && track.title);
        const newMeta = { title, artist, cover };
        setMeta(newMeta);
        // store to local cache
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(storageKey, JSON.stringify({ ts: Date.now(), data: newMeta }));
          }
        } catch (e) {
          // ignore storage errors
        }
      }
    } catch (e) {
      // network/CORS may fail in some environments — fail silently but keep fallback
      // console.warn('Failed to fetch NetEase metadata', e);
    }
  };

  // Trigger metadata fetch when track switches
  useEffect(() => {
    if (track && track.type === 'netease') {
      fetchNeteaseMeta(track.id);
    } else if (track) {
      setMeta({ title: track.title, artist: track.artist, cover: track.cover });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track && track.id]);

  return (
    <div className={styles.playerWrap} aria-hidden={!visible}>
      {/* If track specifies a NetEase ID, render the NetEase embed iframe */}
      {track && track.type === 'netease' ? (
        // If a proxy is configured (window.NETEASE_PROXY_URL), use a proxied audio stream
        // so we can control volume via the <audio> element. Otherwise fall back to hidden iframe.
        (typeof window !== 'undefined' && window.NETEASE_PROXY_URL) ? (
          <audio
            ref={audioRef}
            src={`${window.NETEASE_PROXY_URL.replace(/\/$/, '')}/stream?id=${encodeURIComponent(track.id)}`}
            onEnded={handleEnded}
            preload="metadata"
            controls={false}
          />
        ) : (
          // keep the netease iframe loaded but hidden so our own UI remains primary
          <div className={`${styles.iframeWrap} ${styles.iframeHidden}`}>
            <iframe
              title={`netease-${track.id}`}
              src={`https://music.163.com/outchain/player?type=2&id=${track.id}&auto=${playing ? 1 : 0}&height=66`}
              width="1"
              height="1"
              frameBorder="0"
              allow="encrypted-media"
              allowTransparency="true"
            />
          </div>
        )
      ) : (
        <audio
          ref={audioRef}
          src={track && track.src}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}

      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close player' : 'Open player'}
      >
        <span className={styles.fabIcon} />
      </button>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.trackInfo}>
              <img src={meta && meta.cover} alt="cover" className={styles.cover} />
            <div className={styles.meta}>
                <div className={styles.title}>{meta && meta.title}</div>
                <div className={styles.artist}>{meta && meta.artist}</div>
            </div>
          </div>
          <div className={styles.controls}>
            <button onClick={prev} className={styles.ctrl} aria-label="Previous">◀</button>
            <button onClick={togglePlay} className={styles.ctrl} aria-label={playing ? 'Pause' : 'Play'}>{playing ? '⏸' : '▶'}</button>
            <button onClick={next} className={styles.ctrl} aria-label="Next">▶</button>
          </div>
        </div>

        <div className={styles.progressRow}>
          <div className={styles.extraActions}>
            {track && track.type === 'netease' ? (
              <div className={styles.note}>
                网易云歌曲通过内嵌播放器播放，浏览器无法通过外部脚本稳定控制其音量。可使用系统或浏览器音量，或部署代理以支持可控音频流。
              </div>
            ) : null}
            <button onClick={() => { setPlaying(false); setOpen(false); }} className={styles.closeBtn}>Close</button>
          </div>
        </div>

      </div>
    </div>
  );
}
