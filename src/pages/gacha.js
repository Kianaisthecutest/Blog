import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './gacha.module.css';

const starfield = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 13) % 100}%`,
  size: `${2 + (index % 4)}px`,
  delay: `${(index % 8) * 0.7}s`,
  duration: `${6 + (index % 7)}s`,
}));

const pool = {
  5: [
    { id: 'kiana', name: '琪亚娜', title: '焰之女王', rarity: 5, type: '角色', element: '炎', tagline: '以焰火点亮战场', color: '#ffe3a6' },
    { id: 'mei', name: '梅比乌斯', title: '月下之梦', rarity: 5, type: '角色', element: '月', tagline: '静如湖面，锐如刀锋', color: '#c7d2fe' },
    { id: 'sakura', name: '樱', title: '星海之锚', rarity: 5, type: '角色', element: '光', tagline: '海潮回响，世界清醒', color: '#e9d5ff' },
    { id: 'kallen', name: '卡莲', title: '炽燃之心', rarity: 5, type: '角色', element: '火', tagline: '火焰在心中熊熊燃烧', color: '#fdba74' },
    { id: 'lily', name: '莉莉娅', title: '深海幽蓝', rarity: 5, type: '角色', element: '水', tagline: '雾海中的微光不灭', color: '#93c5fd' },
    { id: 'lance', name: '天命之剑', title: '星穹之刃', rarity: 5, type: '武器', element: '光', tagline: '穿透命运的利刃', color: '#f5d0fe' },
    { id: 'eileen', name: '艾琳', title: '梦醒之歌', rarity: 5, type: '角色', element: '风', tagline: '从梦中醒来，向着星辰奔跑', color: '#bfdbfe' },
  ],
  4: [
    { id: 'ai', name: '爱莉希雅', title: '晨曦长路', rarity: 4, type: '角色', element: '雷', tagline: '劈开迷雾，照见未来', color: '#bfdbfe' },
    { id: 'bronya', name: '布洛妮娅', title: '时空旅人', rarity: 4, type: '角色', element: '风', tagline: '迈向新的终点', color: '#d1fae5' },
    { id: 'theresa', name: '德丽莎', title: '净化之翼', rarity: 4, type: '角色', element: '光', tagline: '高处俯瞰一切', color: '#fef3c7' },
    { id: 'seele', name: '赛尔', title: '静谧之影', rarity: 4, type: '角色', element: '影', tagline: '影中藏着无穷可能', color: '#c4b5fd' },
    { id: 'fischl', name: '菲谢尔', title: '星空召唤', rarity: 4, type: '角色', element: '雷', tagline: '夜色中听见星辰低语', color: '#f9a8d4' },
    { id: 'bow', name: '星隐长弓', title: '天穹之眼', rarity: 4, type: '武器', element: '风', tagline: '箭无虚发', color: '#a5f3fc' },
    { id: 'lance-2', name: '流星双刃', title: '迅斩之锋', rarity: 4, type: '武器', element: '火', tagline: '一击定乾坤', color: '#fdba74' },
  ],
  3: [
    { id: 'potion', name: '回响药剂', title: '战斗气息', rarity: 3, type: '消耗', element: '无', tagline: '小小助力，千里可行', color: '#dbeafe' },
    { id: 'memory', name: '记忆碎片', title: '星尘回响', rarity: 3, type: '材料', element: '无', tagline: '沉睡的碎片，悄然苏醒', color: '#e2e8f0' },
    { id: 'shield', name: '守护护盾', title: '应急装置', rarity: 3, type: '工具', element: '无', tagline: '身前尽是光', color: '#bfdbfe' },
    { id: 'talisman', name: '祈愿符', title: '命运印记', rarity: 3, type: '道具', element: '无', tagline: '愿望被悄悄听见', color: '#f5d0fe' },
    { id: 'orb', name: '星核碎片', title: '奇点余烬', rarity: 3, type: '材料', element: '无', tagline: '暗处的光也能被拾起', color: '#d1fae5' },
    { id: 'rune', name: '符文纸片', title: '星图纹痕', rarity: 3, type: '道具', element: '无', tagline: '凡人的执念，也有力量', color: '#f9a8d4' },
  ],
};

const starterHistory = [
  { name: '琪亚娜', title: '焰之女王', rarity: 5 },
  { name: '布洛妮娅', title: '时空旅人', rarity: 4 },
  { name: '守护护盾', title: '应急装置', rarity: 3 },
  { name: '爱莉希雅', title: '晨曦长路', rarity: 4 },
];

const featuredCharacter = {
  name: '琪亚娜',
  title: '焰之女王',
  rarity: 5,
  tag: '特限定池',
  text: '以火焰宣誓，愿所有人都能看见明天。',
};

function pickByRarity(rarity) {
  const options = pool[rarity];
  return options[Math.floor(Math.random() * options.length)];
}

function getPullResult(pity) {
  const { four, five } = pity;

  if (five >= 99) {
    return pickByRarity(5);
  }
  if (four >= 9) {
    return pickByRarity(4);
  }

  const roll = Math.random();
  if (roll < 0.001) {
    return pickByRarity(5);
  }
  if (roll < 0.051) {
    return pickByRarity(4);
  }
  return pickByRarity(3);
}

function advancePity(currentPity, item) {
  const next = { four: currentPity.four, five: currentPity.five };

  if (item.rarity === 5) {
    next.four = 0;
    next.five = 0;
  } else if (item.rarity === 4) {
    next.four = 0;
    next.five += 1;
  } else {
    next.four += 1;
    next.five += 1;
  }

  return next;
}

function GachaPage() {
  const [pulling, setPulling] = useState(false);
  const [results, setResults] = useState(Array.from({ length: 10 }, () => null));
  const [history, setHistory] = useState(starterHistory);
  const [pity, setPity] = useState({ four: 0, five: 0 });
  const [lastPull, setLastPull] = useState({ name: '等待祈愿', title: '命运尚未揭晓', rarity: 0, color: '#dbeafe' });
  const [lastBurst, setLastBurst] = useState(false);
  const [showFiveStarBanner, setShowFiveStarBanner] = useState(false);

  const summary = useMemo(() => {
    const total = history.length;
    const fiveStarCount = history.filter((item) => item.rarity === 5).length;
    return { total, fiveStarCount };
  }, [history]);

  const runPull = (count) => {
    if (pulling) {
      return;
    }

    setPulling(true);
    const nextResults = Array.from({ length: count }, () => null);
    setResults(nextResults);

    const generated = [];
    let newPity = { ...pity };

    for (let i = 0; i < count; i += 1) {
      const item = getPullResult(newPity);
      generated.push(item);
      newPity = advancePity(newPity, item);
    }

    window.setTimeout(() => {
      const reward = generated[generated.length - 1];
      setResults(generated);
      setHistory((prev) => [...generated, ...prev].slice(0, 12));
      setLastPull(reward);
      setPity(newPity);
      setLastBurst(reward.rarity >= 5);
      setShowFiveStarBanner(reward.rarity === 5);
      setPulling(false);

      window.setTimeout(() => {
        setLastBurst(false);
        setShowFiveStarBanner(false);
      }, 1200);
    }, 900);
  };

  const renderCard = (item, index) => {
    const baseClass = item ? `${styles.card} ${styles[`rarity${item.rarity}`]}` : `${styles.card} ${styles.emptyCard}`;

    return (
      <div key={index} className={baseClass}>
        {item ? (
          <>
            <div className={styles.cardGlow} style={{ background: item.color }} />
            <div className={styles.cardCorner} />
            <div className={styles.sparkle} />
            <div className={styles.cardHeader}>
              <span className={styles.rarityLabel}>R{item.rarity}</span>
              <span className={styles.typeLabel}>{item.type}</span>
            </div>
            <div className={styles.avatar}>
              <span>{item.name.slice(0, 1)}</span>
            </div>
            <div className={styles.cardInfo}>
              <strong>{item.name}</strong>
              <span>{item.title}</span>
            </div>
          </>
        ) : (
          <div className={styles.emptyText}>祈愿中</div>
        )}
      </div>
    );
  };

  return (
    <Layout
      title="祈愿抽卡"
      description="仿崩坏三祈愿卡池的抽卡页面，支持单抽和十连动画。"
    >
      <div className={styles.pageShell}>
        <div className={styles.skyBack} />
        <div className={styles.orbA} />
        <div className={styles.orbB} />
        {lastBurst && (
          <div className={styles.burstOverlay}>
            <div className={styles.burstCore} />
            {[...Array(18)].map((_, i) => (
              <span
                key={i}
                className={styles.burstRay}
                style={{
                  transform: `rotate(${i * 20}deg) translateY(-12px)`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}
        {showFiveStarBanner && (
          <div className={styles.fiveStarBanner}>
            <span>五星获取</span>
            <strong>{lastPull.name}</strong>
          </div>
        )}
        <div className={styles.starField}>
          {starfield.map((star) => (
            <span
              key={star.id}
              className={styles.star}
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className={styles.pageInner}>
          <header className={styles.topBar}>
            <div className={styles.brandWrap}>
              <span className={styles.brandBadge}>崩坏3</span>
              <span className={styles.brandText}>命运之环 · 琪亚娜</span>
            </div>
            <div className={styles.pityWrap}>
              <span>4星保底</span>
              <strong>{pity.four}/10</strong>
              <span>5星保底</span>
              <strong>{pity.five}/100</strong>
            </div>
          </header>

          <section className={styles.bannerPanel}>
            <div className={styles.bannerGlow} />
            <div className={styles.bannerText}>
              <p className={styles.kicker}>池子活动</p>
              <h1>以火与命运交织的祈愿</h1>
              <p className={styles.subtitle}>每一枚星光，都是未来的开端。愿你在战场上与世界相遇。</p>
            </div>
            <div className={styles.bannerInfo}>
              <div>
                <span>累计抽数</span>
                <strong>{summary.total}</strong>
              </div>
              <div>
                <span>5星</span>
                <strong>{summary.fiveStarCount}</strong>
              </div>
              <div>
                <span>4星保底</span>
                <strong>{pity.four}/10</strong>
              </div>
              <div>
                <span>5星保底</span>
                <strong>{pity.five}/100</strong>
              </div>
            </div>
          </section>

          <main className={styles.mainPanel}>
            <div className={styles.leftPanel}>
              <div className={styles.characterStage}>
                <div className={styles.portraitGlow} />
                <div className={styles.portraitHalo} />
                <div className={styles.portraitFrame}>
                  <div className={styles.portraitFigure}>
                    <div className={styles.hair} />
                    <div className={styles.face} />
                    <div className={styles.body} />
                    <div className={styles.weapon} />
                  </div>
                </div>
                <div className={styles.characterMeta}>
                  <span className={styles.characterBadge}>{featuredCharacter.tag}</span>
                  <h3>{featuredCharacter.name}</h3>
                  <p>{featuredCharacter.title}</p>
                </div>
              </div>

              <div className={styles.panelHeader}>
                <div className={styles.highlightPill}>新池</div>
                <div className={styles.resultHeader}>
                  <div>
                    <p className={styles.resultLabel}>最近获取</p>
                    <h2>{lastPull.name}</h2>
                  </div>
                  <span className={styles.resultBadge}>R{lastPull.rarity || '—'}</span>
                </div>
              </div>

              <div className={styles.resultPreview}>
                <div className={styles.resultAvatar}>
                  {lastPull.name === '等待祈愿' ? '✦' : lastPull.name.slice(0, 1)}
                </div>
                <div className={styles.resultMeta}>
                  <span className={styles.metaLabel}>当前祈愿</span>
                  <strong>{lastPull.title}</strong>
                  <small>{lastPull.name === '等待祈愿' ? '命运尚未揭晓' : '愿望已被听见'}</small>
                </div>
              </div>

              <div className={styles.resultGrid}>
                {results.map((item, index) => renderCard(item, index))}
              </div>

              <div className={styles.actionRow}>
                <button type="button" className={styles.primaryBtn} onClick={() => runPull(1)} disabled={pulling}>
                  {pulling ? '祈愿中...' : '单抽'}
                </button>
                <button type="button" className={styles.secondaryBtn} onClick={() => runPull(10)} disabled={pulling}>
                  十连抽
                </button>
              </div>
            </div>

            <aside className={styles.rightPanel}>
              <div className={styles.historyBox}>
                <div className={styles.historyTitleRow}>
                  <h3>祈愿记录</h3>
                  <span>最近12次</span>
                </div>

                <div className={styles.historyList}>
                  {history.map((item, index) => (
                    <div key={`${item.name}-${index}`} className={styles.historyItem}>
                      <span className={`${styles.dot} ${styles[`rarityDot${item.rarity}`]}`} />
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.title}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.statusBox}>
                <div className={styles.statusRow}>
                  <span>角色池</span>
                  <strong>琪亚娜</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>概率</span>
                  <strong>0.1% / 5.0%</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>状态</span>
                  <strong>可祈愿</strong>
                </div>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default GachaPage;
