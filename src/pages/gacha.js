import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './gacha.module.css';

const jokes = [
  '你问我永远是多远，我说你有多远滚多远',
  '为什么讲冷笑话会导致世界毁灭\n因为赤道大变了',
  '为什么小孩害怕孔子\n因为孔子见两小儿便日',
  '为什么冬天的电脑很冷\n因为它开了Windows',
  '湖南的鬼叫什么\n湘飘飘',
  'maybe的反义词是什么\n是有机',
  '为什么唯独秦始皇的陵墓里有那么的兵马俑\n因为守嬴政的很爽',
  '为什么黑人适合田径运动\n因为起跑时有枪声',
  '为什么“朋”字要写很久\n因为要写两个月',
  '知道用脑机接口玩赛车游戏叫什么吗\n脑筋急转弯',
  '你知道吗，有些笑话好氧的生物想不出来，厌氧的生物也想不出\n只有我这种闭氧的生物能想出来',
  '理解玛雅人了，如果我预言到现在这些东西也会以为世界末日了',
  '如果你把自己的肠子摊开，并且放在地面上\n那么你就会死',
  '小明在海边讲笑话，为什么他死了\n因为海笑了',
  '你知道马丁路德金的反义词吗\n是芭比扣的水',
  'pdd怀孕了，你们这些cpdd的一个都跑不了',
  '你知道田忌赛马的反义词是什么\n吉普赛人',
  '红温的反义词是什么\n蓝凉',
  '你知道种族歧视用文言文怎么说吗\n以色列人',
  '加拿大人的反义词是什么\n是你好小孩',
  '这种笑话对植物是最折磨的\n听了太阴不能光合作用，不听又没有屎长不了',
  '商鞅看完这些冷笑话连夜加了两匹马，因为想和你比比谁更裂七',
  '科比得的最后一个奖是什么\n螺旋桨',
  '都说人死后会变成星星，那么植物人死后是不是会变成杨桃',
  '人死后会变成骨灰，霍金是不是会变成冰沙',
  '为什么苏轼一直被贬\n因为皇帝追求移轼感',
  '四个周杰伦等于什么\n一个周杰车',
  '一个板凳的英文是什么\nabandon',
  '小恐龙在看电影，为什么恐龙妈妈看到了很生气\n因为看的是成龙电影',
  '你知道吗每个成功的人背后都有一根脊椎',
  '喜欢临时抱佛脚算恋足吗',
  '风雪压我两三年，加在一起是五年',
  '没人发现我其实是异瞳吗\n左边小心眼，右边势利眼，没有人感惹我\n如果谁敢惹到我，我就在他面前做眼保健操',
  '恭喜你的才华已经赶上曹植了\n他七步成诗，你就不是人',
  '没人觉得2020年和2025年很好磕吗\n一个全阳了，一个阴到没边',
  '本来想夸你达芬奇的，但是因为猎奇，所以只剩下达芬了',
  '不行了可以到人行道上\n因为这样可以成为一个行人',
  '我就说上帝肯定会撸，不然哪来的这么多神经',
  '感觉我就像项羽，四面全是楚声',
  '这个笑话既有洋风又有古典风\n好像叫什么洋典风',
  '去黑头神器是什么\n是农场主',
  '其实摇滚最早起源于18世纪的法国\n因为路易十六是最早的披头士',
  '蜂蜜其实是花生酱',
  '油炸蘑菇其实是高温杀菌',
  '为什么和吸血鬼一起吃火锅要点鸳鸯锅\n因为吸血鬼喜欢blood',
  '你知道吗，氧化还原反应其实是一场电子竞技',
  '不瞒你们说，我很喜欢躺在女朋友的腿上\n因为转头有彼此，抬头有奈何',
  '其实成都是top1城市，因为成都有T有PL有1有0',
  '我上个月花了3000学拉丁舞，结果丁丁一点没长，我是不是被骗了',
  '突然发现女人其实是藻类植物，因为没有根和茎叶',
  '女人就像没有香火的庙，香炉却没有祭拜',
  '你知道为什么日本的鸡蛋要单独卖吗？因为他们不喜欢盒蛋',
  '如果一个人没有双手了，他是不是最想要新手大礼包',
  '这笑话很简单，就是你没救了',
  '我想要的日子，不是天天开心，而是低头还能看见自己',
];

const starfield = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 13) % 100}%`,
  size: `${2 + (index % 4)}px`,
  delay: `${(index % 8) * 0.7}s`,
  duration: `${6 + (index % 7)}s`,
}));

const ambientParticles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  left: `${(index * 13 + 7) % 100}%`,
  top: `${(index * 17 + 11) % 100}%`,
  size: `${2 + (index % 5)}px`,
  duration: `${5 + (index % 8)}s`,
  delay: `${(index % 10) * 0.5}s`,
  opacity: 0.2 + (index % 6) * 0.12,
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
  const [revealedCards, setRevealedCards] = useState({});
  const [featuredRevealed, setFeaturedRevealed] = useState(false);
  const [featuredAnimating, setFeaturedAnimating] = useState(false);
  const [featuredResult, setFeaturedResult] = useState(null);
  const [lastPull, setLastPull] = useState({ name: '等待祈愿', title: '命运尚未揭晓', rarity: 0, color: '#dbeafe' });
  const [lastBurst, setLastBurst] = useState(false);
  const [showFiveStarBanner, setShowFiveStarBanner] = useState(false);
  const [currentJoke, setCurrentJoke] = useState('');
  const [isJokeFlipping, setIsJokeFlipping] = useState(false);

  const summary = useMemo(() => {
    const total = totalPulls;
    const fourStarCount = history.filter((item) => item && item.rarity === 4).length;
    const fiveStarCount = history.filter((item) => item && item.rarity === 5).length;
    return { total, fourStarCount, fiveStarCount };
  }, [history, totalPulls]);

  const statusInfo = useMemo(() => {
    if (lastPull.rarity >= 5) {
      return {
        pool: '命运之环 · 琪亚娜',
        probability: '4★ 5.0% / 5★ 0.1%',
        state: '五星已记录',
      };
    }

    if (lastPull.rarity === 4) {
      return {
        pool: '命运之环 · 琪亚娜',
        probability: '4★ 5.0% / 5★ 0.1%',
        state: '四星已记录',
      };
    }

    return {
      pool: '命运之环 · 琪亚娜',
      probability: '4★ 5.0% / 5★ 0.1%',
      state: '常规祈愿',
    };
  }, [lastPull.rarity]);

  useEffect(() => {
    setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
  }, []);

  const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

  const refreshJoke = () => {
    setIsJokeFlipping(true);
    setTimeout(() => {
      setCurrentJoke(getRandomJoke());
      setIsJokeFlipping(false);
    }, 220);
  };

  const featuredCharacter = useMemo(() => {
    if (featuredResult && featuredResult.rarity >= 4) {
      return {
        name: featuredResult.name,
        title: featuredResult.title,
        rarity: featuredResult.rarity,
        tag: featuredResult.rarity >= 5 ? '五星' : '四星',
        rarityLabel: featuredResult.rarity >= 5 ? '传说' : '稀有',
        text: `累计抽数 ${totalPulls}`,
        image: featuredResult.image || '',
      };
    }

    if (!history.length) {
      return featuredCharacterDefault;
    }

    const latestById = new Map();
    history.forEach((item) => {
      latestById.set(item.id, item);
    });

    const rarest = Array.from(latestById.values()).reduce((best, item) => {
      if (best === null || item.rarity > best.rarity) {
        return item;
      }
      return best;
    }, null);

    return {
      name: rarest.name,
      title: rarest.title,
      rarity: rarest.rarity,
      tag: rarest.rarity >= 5 ? '五星' : rarest.rarity === 4 ? '四星' : '三星',
      rarityLabel: rarest.rarity >= 5 ? '传说' : rarest.rarity === 4 ? '稀有' : '常驻',
      text: `累计抽数 ${totalPulls}`,
      image: rarest.image || '',
    };
  }, [featuredResult, history, totalPulls]);

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
      const featuredFromThisPull = generated
        .filter((item) => item.rarity >= 4)
        .sort((a, b) => b.rarity - a.rarity)[0] || null;

      setResults(generated);
      setRevealedCards({});
      setFeaturedResult(featuredFromThisPull);
      setFeaturedRevealed(false);
      setFeaturedAnimating(false);
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

  const revealCard = (index) => {
    const item = results[index];
    if (!item) {
      return;
    }

    setRevealedCards((prev) => ({ ...prev, [index]: true }));

    if (item.rarity >= 4 && featuredResult && item.id === featuredResult.id && !featuredRevealed) {
      setFeaturedAnimating(true);
      setFeaturedRevealed(true);
      window.setTimeout(() => {
        setFeaturedAnimating(false);
      }, 260);
    }
  };

  const revealFeaturedPanel = () => {
    if (lastPull.rarity >= 4 && !featuredRevealed) {
      setFeaturedAnimating(true);
      setFeaturedRevealed(true);
      window.setTimeout(() => {
        setFeaturedAnimating(false);
      }, 260);
    }
  };

  const renderCard = (item, index) => {
    const isHidden = !!item && item.rarity >= 4 && !revealedCards[index];
    const baseClass = item ? `${styles.card} ${styles[`rarity${item.rarity}`]} ${isHidden ? styles.cardHidden : ''}` : `${styles.card} ${styles.emptyCard}`;

    return (
      <div
        key={index}
        className={baseClass}
        onClick={() => {
          if (isHidden) {
            revealCard(index);
          }
        }}
        role={isHidden ? 'button' : undefined}
        tabIndex={isHidden ? 0 : undefined}
        onKeyDown={(event) => {
          if (isHidden && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            revealCard(index);
          }
        }}
      >
        {item ? (
          <div className={styles.cardInner}>
            <div className={styles.cardFaceFront}>
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
            </div>
            {isHidden && (
              <div className={styles.cardFaceBack}>
                <div className={styles.cardBackGlow} />
                <div className={styles.cardBackPattern} />
                <div className={styles.cardBackContent}>
                  <span className={styles.cardBackLabel}>翻 牌</span>
                  <strong>{item.rarity >= 5 ? '五星' : '四星'}</strong>
                </div>
              </div>
            )}
          </div>
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

        <div className={styles.particleField} aria-hidden="true">
          {ambientParticles.map((particle) => (
            <span
              key={particle.id}
              className={styles.ambientParticle}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
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
              <div
                className={`${styles.characterStage} ${lastPull.rarity >= 4 && !featuredRevealed ? styles.characterStageHidden : ''} ${featuredAnimating ? styles.characterStageAnimating : ''}`}
                onClick={revealFeaturedPanel}
                role={lastPull.rarity >= 4 && !featuredRevealed ? 'button' : undefined}
                tabIndex={lastPull.rarity >= 4 && !featuredRevealed ? 0 : undefined}
                onKeyDown={(event) => {
                  if (lastPull.rarity >= 4 && !featuredRevealed && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    revealFeaturedPanel();
                  }
                }}
              >
                <div className={styles.portraitGlow} />
                <div className={styles.portraitHalo} />
                <div className={`${styles.portraitFrame} ${featuredAnimating ? styles.portraitFrameAnimating : ''}`}>
                  {featuredCharacter.image && featuredRevealed ? (
                    <img src={featuredCharacter.image} alt={featuredCharacter.name} className={styles.portraitImage} />
                  ) : (
                    <div className={styles.portraitHiddenBack}>
                      <div className={styles.cardBackGlow} />
                      <div className={styles.cardBackPattern} />
                      <div className={styles.cardBackContent}>
                        <span className={styles.cardBackLabel}>翻 牌</span>
                        <strong>{lastPull.rarity >= 5 ? '五星' : '四星'}</strong>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.characterMeta}>
                  <div className={styles.metaHeader}>
                    {featuredCharacter.tag ? <span className={styles.characterBadge}>{featuredCharacter.tag}</span> : null}
                    <span className={styles.rarityChip}>R{featuredCharacter.rarity || 0}</span>
                  </div>
                  {featuredRevealed && featuredCharacter.name ? <h3>{featuredCharacter.name}</h3> : null}
                  {featuredRevealed && featuredCharacter.title ? <p>{featuredCharacter.title}</p> : null}
                  {featuredRevealed && (
                    <div className={styles.rarityMeter} aria-hidden="true">
                      <span style={{ width: `${Math.max(14, (featuredCharacter.rarity || 0) / 5 * 100)}%` }} />
                    </div>
                  )}
                  <span className={styles.totalPullCounter}>{featuredCharacter.text}</span>
                </div>
                <div className={`${styles.previewRing} ${featuredAnimating ? styles.previewRingAnimating : ''}`}>
                  {featuredCharacter.image && featuredRevealed ? (
                    <img src={featuredCharacter.image} alt={`${featuredCharacter.name} 立绘`} className={styles.previewImage} />
                  ) : (
                    <div className={styles.previewHiddenBack}>
                      <div className={styles.cardBackGlow} />
                      <div className={styles.cardBackPattern} />
                      <div className={styles.cardBackContent}>
                        <span className={styles.cardBackLabel}>翻 牌</span>
                        <strong>{lastPull.rarity >= 5 ? '五星' : '四星'}</strong>
                      </div>
                    </div>
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

            <div className={styles.rightRail}>
              <div className={styles.statusBox}>
                <div className={styles.statusRow}>
                  <span>角色池</span>
                  <strong>{statusInfo.pool}</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>概率</span>
                  <strong>{statusInfo.probability}</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>本轮稀有度</span>
                  <strong>{summary.fourStarCount} 4★ / {summary.fiveStarCount} 5★</strong>
                </div>
                <div className={styles.statusRow}>
                  <span>状态</span>
                  <strong>{statusInfo.state}</strong>
                </div>
              </div>

              <section className={styles.jokesSection}>
                <div className={styles.jokesHeader}>
                  <span className={styles.jokesBadge}>冷笑话</span>
                  <h2>咕咕嘎嘎</h2>
                </div>

                <div className={`${styles.jokeCard} ${isJokeFlipping ? styles.jokeCardFlipping : ''}`}>
                  <span className={styles.quoteMark}>「</span>
                  <p className={styles.jokeText}>{currentJoke}</p>
                  <span className={`${styles.quoteMark} ${styles.quoteMarkEnd}`}>」</span>
                </div>

                <button type="button" className={styles.jokeButton} onClick={refreshJoke}>
                  换一个
                </button>
              </section>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default GachaPage;
