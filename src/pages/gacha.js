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

const placeholderItem = {
  id: 'placeholder',
  name: '',
  title: '',
  rarity: 3,
  type: '',
  element: '—',
  tagline: '',
  color: '#dbeafe',
};

const pool = {
  5: [
    {
      id: 'bronya-law-of-reason',
      name: '布洛妮娅·理之律者',
      title: '还没有驾照',
      rarity: 5,
      type: '角色',
      element: '风',
      tagline: '还没有驾照',
      color: '#facc15',
      image: '/img/Thelawofreason.png',
    },
    {
      id: 'featherofdustcrossing',
      name: '浮华·浮生 渡尘之羽',
      title: '老东西你垫了',
      rarity: 5,
      type: '角色',
      element: '风',
      tagline: '老东西你垫了',
      color: '#c084fc',
      image: '/img/FeatherofDustCrossing.png',
    },
    {
      id: 'love-fairy',
      name: '嗨♪爱愿妖精♥',
      title: '♥♥♥',
      rarity: 5,
      type: '角色',
      element: '光',
      tagline: '♥♥♥',
      color: '#f472b6',
      image: '/img/Love.png',
    },
    {
      id: 'lucky-star',
      name: '咚！炽愿吉星',
      title: '宝宝你怎么胖了',
      rarity: 5,
      type: '角色',
      element: '光',
      tagline: '宝宝你怎么胖了',
      color: '#fbbf24',
      image: '/img/Lucky.png',
    },
  ],
  4: [
    {
      id: 'korari-heavy-machine',
      name: '科拉莉·重机',
      title: '狗头军师',
      rarity: 4,
      type: '角色',
      element: '火',
      tagline: '狗头军师',
      color: '#c4b5fd',
      image: '/img/KorariHeavyMachine.png',
    },
    {
      id: 'miss-pink-fairy',
      name: '粉色妖精小姐♪',
      title: '乐土女同王',
      rarity: 4,
      type: '角色',
      element: '风',
      tagline: '乐土女同王',
      color: '#f9a8d4',
      image: '/img/MissPinkFairy.png',
    },
  ],
  3: [
    {
      id: 'theresa-3',
      name: '德丽傻',
      title: '其实很可爱对吧',
      rarity: 3,
      type: '角色',
      element: '光',
      tagline: '其实很可爱对吧',
      color: '#dbeafe',
      image: '/img/Theresaca.png',
    },
  ],
};

const starterHistory = [];

const featuredCharacterDefault = {
  name: '等待祈愿',
  title: '命运尚未揭晓',
  rarity: 0,
  tag: '待定',
  text: '累计抽数 0',
  image: '',
};

function pickByRarity(rarity) {
  const options = pool[rarity] && pool[rarity].length > 0 ? pool[rarity] : [placeholderItem];
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
  const [totalPulls, setTotalPulls] = useState(0);
  const [pity, setPity] = useState({ four: 0, five: 0 });
  const [lastPull, setLastPull] = useState({ name: '等待祈愿', title: '命运尚未揭晓', rarity: 0, color: '#dbeafe' });
  const [lastBurst, setLastBurst] = useState(false);
  const [showFiveStarBanner, setShowFiveStarBanner] = useState(false);

  const summary = useMemo(() => {
    const total = totalPulls;
    const fiveStarCount = history.filter((item) => item.rarity === 5).length;
    return { total, fiveStarCount };
  }, [history, totalPulls]);

  const featuredCharacter = useMemo(() => {
    if (!history.length) {
      return featuredCharacterDefault;
    }

    const rarest = history.reduce((best, item) => (best === null || item.rarity > best.rarity ? item : best), null);
    return {
      name: rarest.name,
      title: rarest.title,
      rarity: rarest.rarity,
      tag: rarest.rarity >= 5 ? '五星' : rarest.rarity === 4 ? '四星' : '三星',
      text: `累计抽数 ${totalPulls}`,
      image: rarest.image || '',
    };
  }, [history, summary.total]);

  const runPull = (count) => {
    if (pulling) {
      return;
    }

    setPulling(true);
    const nextResults = Array.from({ length: count }, () => null);
    setResults(nextResults);

    const generated = [];
    let newPity = { ...pity };
    setTotalPulls((prev) => prev + count);

    for (let i = 0; i < count; i += 1) {
      const item = getPullResult(newPity);
      generated.push(item);
      newPity = advancePity(newPity, item);
    }

    window.setTimeout(() => {
      const reward = generated[generated.length - 1];
      setResults(generated);
      setHistory((prev) => [...generated, ...prev].slice(0, 10));
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
            {item.image ? (
              <div className={styles.cardImageWrap}>
                <img src={item.image} alt={item.name} className={styles.cardImage} />
              </div>
            ) : (
              <div className={styles.avatar}>
                <span>{item.name.slice(0, 1)}</span>
              </div>
            )}
            <div className={styles.cardInfo}>
              <strong>{item.name}</strong>
              <span className={styles.cardSubText}>{item.tagline || item.title}</span>
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
                  '--angle': `${i * 20}deg`,
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
                  {featuredCharacter.image ? (
                    <img src={featuredCharacter.image} alt={featuredCharacter.name} className={styles.portraitImage} />
                  ) : (
                    <div className={styles.portraitFigure}>
                      <div className={styles.hair} />
                      <div className={styles.face} />
                      <div className={styles.body} />
                      <div className={styles.weapon} />
                    </div>
                  )}
                </div>
                <div className={styles.characterMeta}>
                  {featuredCharacter.tag ? <span className={styles.characterBadge}>{featuredCharacter.tag}</span> : null}
                  {featuredCharacter.name ? <h3>{featuredCharacter.name}</h3> : null}
                  {featuredCharacter.title ? <p>{featuredCharacter.title}</p> : null}
                  <span className={styles.totalPullCounter}>{featuredCharacter.text}</span>
                </div>
                <div className={styles.previewRing}>
                  {featuredCharacter.image ? (
                    <img src={featuredCharacter.image} alt={`${featuredCharacter.name} 立绘`} className={styles.previewImage} />
                  ) : (
                    <div className={styles.previewPlaceholder} />
                  )}
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
                  <span>最近10次</span>
                </div>

                <div className={styles.historyList}>
                  {history.length === 0 ? (
                    <div className={styles.emptyHistory}>暂无记录</div>
                  ) : (
                    history.map((item, index) => (
                      <div key={`${item.name}-${index}`} className={styles.historyItem}>
                        <span className={`${styles.dot} ${styles[`rarityDot${item.rarity}`]}`} />
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.title}</small>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={styles.statusBox}>
                <div className={styles.statusRow}>
                  <span>角色池</span>
                  <strong></strong>
                </div>
                <div className={styles.statusRow}>
                  <span>概率</span>
                  <strong></strong>
                </div>
                <div className={styles.statusRow}>
                  <span>状态</span>
                  <strong></strong>
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
