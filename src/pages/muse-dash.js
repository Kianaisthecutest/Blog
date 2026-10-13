import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './muse-dash.module.css';

const LANE_TOP = 0;
const LANE_BOTTOM = 1;
const NOTE_START_X = 840;
const JUDGE_X = 224;
const NOTE_TRAVEL = NOTE_START_X - JUDGE_X;
const PERFECT_MS = 50;
const GREAT_MS = 100;
const MISS_MS = 150;

const TRACKS = [
  { lane: LANE_TOP, key: 'W / S', label: '上轨' },
  { lane: LANE_BOTTOM, key: 'K / O', label: '下轨' },
];

const CHART = [
  { time: 900, lane: 0, type: 'enemy' },
  { time: 1200, lane: 1, type: 'enemy' },
  { time: 1500, lane: 0, type: 'enemy' },
  { time: 1800, lane: 1, type: 'enemy' },
  { time: 2200, lane: 0, type: 'enemy' },
  { time: 2500, lane: 1, type: 'enemy' },
  { time: 2900, lane: 0, type: 'enemy' },
  { time: 3200, lane: 1, type: 'enemy' },
  { time: 3500, lane: 1, type: 'enemy' },
  { time: 3800, lane: 0, type: 'enemy' },
  { time: 4300, lane: 0, type: 'enemy' },
  { time: 4600, lane: 1, type: 'enemy' },
  { time: 5000, lane: 1, type: 'enemy' },
  { time: 5300, lane: 0, type: 'enemy' },
  { time: 5700, lane: 1, type: 'enemy' },
  { time: 6000, lane: 0, type: 'enemy' },
  { time: 6400, lane: 1, type: 'enemy' },
  { time: 6700, lane: 0, type: 'enemy' },
  { time: 7100, lane: 1, type: 'enemy' },
  { time: 7400, lane: 0, type: 'enemy' },
  { time: 7800, lane: 0, type: 'enemy' },
  { time: 8100, lane: 1, type: 'enemy' },
  { time: 8500, lane: 0, type: 'enemy' },
  { time: 8900, lane: 1, type: 'enemy' },
  { time: 9300, lane: 0, type: 'enemy' },
  { time: 9600, lane: 1, type: 'enemy' },
  { time: 9900, lane: 1, type: 'enemy' },
  { time: 10300, lane: 0, type: 'enemy' },
  { time: 10600, lane: 1, type: 'enemy' },
  { time: 10900, lane: 0, type: 'enemy' },
  { time: 11300, lane: 1, type: 'enemy' },
  { time: 11800, lane: 0, type: 'enemy' },
  { time: 12100, lane: 1, type: 'enemy' },
  { time: 12400, lane: 0, type: 'enemy' },
  { time: 12800, lane: 1, type: 'enemy' },
  { time: 13200, lane: 0, type: 'enemy' },
  { time: 13600, lane: 1, type: 'enemy' },
  { time: 13900, lane: 0, type: 'enemy' },
  { time: 14200, lane: 1, type: 'enemy' },
  { time: 14500, lane: 0, type: 'enemy' },
  { time: 14900, lane: 1, type: 'enemy' },
  { time: 15200, lane: 0, type: 'enemy' },
  { time: 15600, lane: 1, type: 'enemy' },
  { time: 16000, lane: 0, type: 'enemy' },
  { time: 16400, lane: 1, type: 'enemy' },
  { time: 16800, lane: 0, type: 'enemy' },
  { time: 17100, lane: 1, type: 'enemy' },
  { time: 17500, lane: 0, type: 'enemy' },
  { time: 17900, lane: 1, type: 'enemy' },
  { time: 18200, lane: 1, type: 'enemy' },
  { time: 18600, lane: 0, type: 'enemy' },
  { time: 18900, lane: 1, type: 'enemy' },
  { time: 19300, lane: 0, type: 'enemy' },
  { time: 19700, lane: 1, type: 'enemy' },
  { time: 20000, lane: 0, type: 'enemy' },
  { time: 20400, lane: 1, type: 'enemy' },
  { time: 20800, lane: 0, type: 'enemy' },
  { time: 21100, lane: 1, type: 'enemy' },
  { time: 21400, lane: 0, type: 'enemy' },
  { time: 21800, lane: 1, type: 'enemy' },
  { time: 22200, lane: 0, type: 'enemy' },
  { time: 22500, lane: 1, type: 'enemy' },
  { time: 22900, lane: 0, type: 'enemy' },
  { time: 23200, lane: 1, type: 'enemy' },
  { time: 23600, lane: 0, type: 'enemy' },
  { time: 23900, lane: 1, type: 'enemy' },
  { time: 24200, lane: 0, type: 'enemy' },
  { time: 24500, lane: 0, type: 'enemy' },
  { time: 24900, lane: 1, type: 'enemy' },
  { time: 25200, lane: 0, type: 'enemy' },
  { time: 25600, lane: 1, type: 'enemy' },
];

function getNoteX(note, currentMs) {
  const progress = 1 - (note.time - currentMs) / 1600;
  const clamped = Math.min(Math.max(progress, -0.25), 1.35);
  return NOTE_START_X - clamped * NOTE_TRAVEL;
}

function getLaneTop(lane) {
  return lane === LANE_TOP ? 64 : 220;
}

function getJudgeLabel(delta) {
  if (delta <= PERFECT_MS) return 'Perfect';
  if (delta <= GREAT_MS) return 'Great';
  return 'Miss';
}

function getJudgeScore(delta) {
  if (delta <= PERFECT_MS) return 1000;
  if (delta <= GREAT_MS) return 700;
  return 0;
}

function calculateAccuracy(hitPerfect, hitGreat, hitMiss) {
  if (hitPerfect + hitGreat + hitMiss === 0) return 100;
  const total = hitPerfect + hitGreat + hitMiss;
  const weighted = hitPerfect * 100 + hitGreat * 70 + hitMiss * 0;
  return Math.round((weighted / (total * 100)) * 100);
}

function getChartFromSpec() {
  return CHART.map((note, index) => ({ ...note, id: index, state: 'pending' }));
}

function MuseDashPage() {
  const [game, setGame] = useState({
    status: 'ready',
    score: 0,
    combo: 0,
    maxCombo: 0,
    health: 100,
    currentTime: 0,
    accuracy: 100,
    judgeText: '准备',
    notes: getChartFromSpec(),
    hitPerfect: 0,
    hitGreat: 0,
    hitMiss: 0,
  });

  const audioCtxRef = useRef(null);
  const startAtRef = useRef(0);
  const rafRef = useRef(null);
  const noteRef = useRef(null);

  const visibleNotes = useMemo(
    () => game.notes.filter((note) => note.state === 'pending').length,
    [game.notes],
  );

  const ensureAudio = () => {
    if (typeof window === 'undefined') return null;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtor();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = (frequency, duration = 0.08, volume = 0.045) => {
    const ctx = ensureAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    osc.start(now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration);
  };

  const scheduleSong = (ctx) => {
    const sequence = [220, 330, 440, 330, 440, 550, 660, 550];
    const start = ctx.currentTime + 0.15;
    const chart = CHART;

    chart.forEach((note) => {
      const index = Math.floor(note.time / 600) % sequence.length;
      const baseFreq = Number.isFinite(sequence[index]) ? sequence[index] : sequence[0];
      const freq = baseFreq + (note.lane === 1 ? 55 : 0);
      const startTime = start + note.time / 1000;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(Number.isFinite(freq) ? freq : 220, startTime);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.05, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.09);
    });
  };

  const restartGame = () => {
    const ctx = ensureAudio();
    const chart = getChartFromSpec();
    let startAt = 0;
    if (ctx) {
      startAt = ctx.currentTime + 0.35;
      scheduleSong(ctx);
    }

    startAtRef.current = startAt;
    setGame({
      status: 'playing',
      score: 0,
      combo: 0,
      maxCombo: 0,
      health: 100,
      currentTime: 0,
      accuracy: 100,
      judgeText: 'Perfect',
      notes: chart,
      hitPerfect: 0,
      hitGreat: 0,
      hitMiss: 0,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const lane = key === 'w' || key === 's' ? LANE_TOP : key === 'k' || key === 'o' ? LANE_BOTTOM : null;
      if (lane === null || game.status !== 'playing') return;
      event.preventDefault();

      const currentMs = audioCtxRef.current ? (audioCtxRef.current.currentTime - startAtRef.current) * 1000 : 0;

      setGame((prev) => {
        const candidates = prev.notes
          .filter((note) => note.state === 'pending' && note.lane === lane)
          .filter((note) => Math.abs(note.time - currentMs) <= MISS_MS + 10)
          .sort((a, b) => Math.abs(a.time - currentMs) - Math.abs(b.time - currentMs));

        if (!candidates.length) {
          return {
            ...prev,
            combo: 0,
            health: Math.max(0, prev.health - 12),
            judgeText: 'Miss',
            hitMiss: prev.hitMiss + 1,
            accuracy: calculateAccuracy(prev.hitPerfect, prev.hitGreat, prev.hitMiss + 1),
          };
        }

        const note = candidates[0];
        const delta = Math.abs(note.time - currentMs);
        const label = getJudgeLabel(delta);

        if (label === 'Miss') {
          const nextMiss = prev.hitMiss + 1;
          return {
            ...prev,
            combo: 0,
            health: Math.max(0, prev.health - 12),
            judgeText: 'Miss',
            hitMiss: nextMiss,
            accuracy: calculateAccuracy(prev.hitPerfect, prev.hitGreat, nextMiss),
            notes: prev.notes.map((item) => (item.id === note.id ? { ...item, state: 'hit' } : item)),
          };
        }

        const score = getJudgeScore(delta);
        const nextPerfect = label === 'Perfect' ? prev.hitPerfect + 1 : prev.hitPerfect;
        const nextGreat = label === 'Great' ? prev.hitGreat + 1 : prev.hitGreat;
        const nextCombo = prev.combo + 1;

        playTone(label === 'Perfect' ? 760 : 620, 0.08, 0.05);

        return {
          ...prev,
          score: prev.score + score + prev.combo * 12,
          combo: nextCombo,
          maxCombo: Math.max(prev.maxCombo, nextCombo),
          health: Math.min(100, prev.health + 3),
          judgeText: label,
          hitPerfect: nextPerfect,
          hitGreat: nextGreat,
          accuracy: calculateAccuracy(nextPerfect, nextGreat, prev.hitMiss),
          notes: prev.notes.map((item) => (item.id === note.id ? { ...item, state: 'hit' } : item)),
        };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [game.status]);

  useEffect(() => {
    if (game.status !== 'playing') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return undefined;
    }

    const tick = () => {
      const currentMs = audioCtxRef.current ? (audioCtxRef.current.currentTime - startAtRef.current) * 1000 : 0;

      setGame((prev) => {
        if (prev.status !== 'playing') return prev;

        let health = prev.health;
        let combo = prev.combo;
        let status = prev.status;
        let hitMiss = prev.hitMiss;

        const nextNotes = prev.notes.map((note) => {
          if (note.state !== 'pending') return note;
          if (note.time < currentMs - MISS_MS) {
            health = Math.max(0, health - 12);
            combo = 0;
            hitMiss += 1;
            return { ...note, state: 'missed' };
          }
          return note;
        });

        const lastNoteTime = nextNotes.reduce((max, note) => Math.max(max, note.time), 0);
        if (currentMs > lastNoteTime + 800) {
          status = 'finished';
        }
        if (health <= 0) {
          status = 'failed';
        }

        return {
          ...prev,
          status,
          health,
          combo,
          currentTime: currentMs,
          notes: nextNotes,
          hitMiss,
          accuracy: calculateAccuracy(prev.hitPerfect, prev.hitGreat, hitMiss),
        };
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [game.status]);

  useEffect(() => {
    noteRef.current = game.judgeText;
  }, [game.judgeText]);

  const finishText =
    game.status === 'failed' ? '战斗结束' : game.status === 'finished' ? '通关' : '等待出击';

  const judgeTheme =
    game.judgeText === 'Perfect'
      ? styles.judgePerfect
      : game.judgeText === 'Great'
        ? styles.judgeGreat
        : game.judgeText === 'Miss'
          ? styles.judgeMiss
          : styles.judgeReady;

  const progress = Math.min(100, (game.currentTime / 26000) * 100);

  return (
    <Layout title="双轨对战 · 夜色节奏" description="双轨音游原型">
      <div className={styles.pageShell}>
        <div className={styles.bgOne} />
        <div className={styles.bgTwo} />

        <main className={styles.stage}>
          <header className={styles.topBar}>
            <div>
              <p className={styles.kicker}>单曲原型</p>
              <h1 className={styles.title}>夜色追击</h1>
            </div>
            <button type="button" className={styles.playButton} onClick={restartGame}>
              {game.status === 'playing' ? '重开' : '开始'}
            </button>
          </header>

          <section className={styles.hudRow}>
            <div className={styles.statCard}>
              <span>分数</span>
              <strong>{game.score}</strong>
            </div>
            <div className={styles.statCard}>
              <span>连击</span>
              <strong>{game.combo}x</strong>
            </div>
            <div className={styles.statCard}>
              <span>最高</span>
              <strong>{game.maxCombo}x</strong>
            </div>
            <div className={styles.statCard}>
              <span>体力</span>
              <strong>{game.health}%</strong>
            </div>
            <div className={styles.statCard}>
              <span>准确率</span>
              <strong>{game.accuracy}%</strong>
            </div>
          </section>

          <div className={styles.playfield}>
            <div className={styles.player}>
              <div className={styles.playerBody} />
              <div className={styles.playerHead} />
            </div>

            <div className={styles.laneLine} />
            <div className={styles.laneLineBottom} />

            <div className={styles.judgeLine} />

            {game.notes
              .filter((note) => note.state !== 'hit' && note.state !== 'missed')
              .map((note) => {
                const x = getNoteX(note, game.currentTime);
                const y = getLaneTop(note.lane);
                const travelRatio = Math.min(Math.max((NOTE_START_X - x) / NOTE_TRAVEL, 0), 1.4);
                const opacity = travelRatio > 1 ? 0.55 : 0.8 + (1 - travelRatio) * 0.2;
                const scale = travelRatio > 1 ? 1 - (travelRatio - 1) * 0.7 : 1 + (1 - travelRatio) * 0.14;

                return (
                  <div
                    key={note.id}
                    className={`${styles.enemy} ${note.lane === LANE_TOP ? styles.enemyTop : styles.enemyBottom}`}
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                  />
                );
              })}

            <div className={`${styles.judgeText} ${judgeTheme}`}>{game.judgeText}</div>

            <div className={styles.progressWrap}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            {(game.status === 'ready' || game.status === 'failed' || game.status === 'finished') && (
              <div className={styles.overlay}>
                <div className={styles.overlayPanel}>
                  <p className={styles.overlayTag}>READY</p>
                  <h2>{finishText}</h2>
                  <p>上轨按 W / S，下轨按 K / O，命中敌人进入判定线。</p>
                  <button type="button" className={styles.primaryButton} onClick={restartGame}>
                    {game.status === 'finished' || game.status === 'failed' ? '再来一局' : '开始演奏'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className={styles.footerBar}>
            <div className={styles.keyHint}>
              <span className={styles.keyCapsule}>W / S</span>
              <span>上轨</span>
            </div>
            <div className={styles.metaText}>敌人：{visibleNotes}</div>
            <div className={styles.keyHint}>
              <span className={styles.keyCapsule}>K / O</span>
              <span>下轨</span>
            </div>
          </footer>
        </main>
      </div>
    </Layout>
  );
}

export default MuseDashPage;
