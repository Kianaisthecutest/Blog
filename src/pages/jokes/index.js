// src/pages/jokes/index.js
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// 冷笑话列表
const jokes = [
  "你问我永远是多远, 我说你有多远滚多远",
  "为什么讲冷笑话会导致世界毁灭\n因为赤道大变了",
  "为什么小孩害怕孔子\n因为孔子见两小儿便日",
  "为什么冬天的电脑很冷\n因为它开了Windows",
  "湖南的鬼叫什么\n湘飘飘",
  "maybe的反义词是什么\n是有机",
  "为什么唯独秦始皇的陵墓里有那么的兵马俑\n因为守嬴政的很爽",
  "为什么黑人适合田径运动\n因为起跑时有枪声",
  "为什么‘朋’字要写很久\n因为要写两个月",
  "知道用脑机接口完赛车游戏叫什么吗\n脑筋急转弯",
  "你知道吗, 有些笑话好氧的生物想不出来, 厌氧的生物也想不出\n只有我这种闭氧的生物能想出来",
  "理解玛雅人了, 如果我预言到现在这些东西也会以为世界末日了",
  "如果你把自己的肠子摊开, 并且放在地面上\n那么你就会死",
  "小明在海边讲笑话, 为什么他死了\n因为海笑了",
  "你知道马丁路德金的反义词吗\n是芭比扣的水",
  "pdd怀孕了, 你们这些cpdd的一个都跑不了",
  "你知道田忌赛马的反义词是什么吗\n吉普赛人",
  "红温的反义词是什么 \n蓝凉",
  "你知道种族歧视用文言文怎么说吗\n以色列人",
  "加拿大人的反义词是什么是你好小孩",
  "这种笑话对植物是最折磨的\n听了太阴不能光合作用, 不听又没有屎长不了",
  "商鞅看完这些冷笑话连夜加了两匹马, 因为想和你比比谁更裂七",
  "科比得的最后一个奖是什么\n螺旋桨",
  "都说人死后会变成星星, 那么植物人死后是不是会变成杨桃",
  "人死后会变成骨灰, 霍金是不是会变成冰沙",
  "为什么苏轼一直被贬\n因为皇帝追求移轼感",
  "四个周杰伦等于什么\n一个周杰车",
  "一个板凳的英文是什么\nabandon",
  "小恐龙在看电影, 为什么恐龙妈妈看到了很生气\n因为看的是成龙电影",
  "你知道吗每个成功的人背后都有一根脊椎",
  "喜欢临时抱佛脚算恋足吗",
  "风雪压我两三年, 加在一起是五年",
  "没人发现我其实是异瞳吗\n左边小心眼, 右边势利眼, 没人感惹我\n如果谁敢惹到我, 我就在他面前做眼保健操",
  "恭喜你的才华已经赶上曹植了\n他七步成诗, 你就不是人",
  "没人觉得2020年和2025年很好磕吗\n一个全阳了, 一个阴到没边",
  "本来想夸你达芬奇的, 但是因为猎奇, 所以只剩下达芬了",
  "不行了可以到人行道上\n因为这样可以成为一个行人",
  "我就说上帝肯定会撸, 不然哪来的这么多神经",
  "感觉我就像项羽, 四面全是楚声",
  "这个笑话既有洋风又有古典风\n好像叫什么洋典风",
  "去黑头神器是什么\n是农场主",
  "其实摇滚最早起源于18世纪的法国\n因为路易十六是最早的披头士",
  "蜂蜜其实是花生酱",
  "油炸蘑菇其实是高温杀菌",
  "为什么和吸血鬼一起吃火锅要点鸳鸯锅\n因为吸血鬼喜欢blood",
  "你知道吗, 氧化还原反应其实是一场电子竞技",
  "不瞒你们说, 我很喜欢躺在女朋友的腿上\n因为转头有彼此, 抬头有奈何",
  "其实成都是top1城市, 因为成都有T有PL有1有0",
  "我上个月花了3000学拉丁舞, 结果丁丁一点没长, 我是不是被骗了",
  "突然发现女人其实是藻类植物, 因为没有根和茎叶",
  "女人就像没有香火的庙, 香炉却没有祭拜",
  "你知道为什么日本的鸡蛋要单独卖吗? 因为他们不喜欢盒蛋",

];

export default function JokesPage() {
  const [currentJoke, setCurrentJoke] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);

  // 获取随机笑话
  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  };

  // 刷新笑话
  const refreshJoke = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentJoke(getRandomJoke());
      setIsFlipping(false);
    }, 300);
  };

  // 初始化随机笑话
  useEffect(() => {
    setCurrentJoke(getRandomJoke());
  }, []);

  return (
    <Layout title="冷笑话仓库" description="收集各种冷笑话, 让你会心一笑">
      <div className={styles.jokesContainer}>
        {/* 背景装饰 */}
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.glowOrb3} />
        
        <div className={styles.card}>
          <div className={styles.header}>
            <span className={styles.icon}>❄️</span>
            <h1 className={styles.title}>冷笑话仓库</h1>
            <span className={styles.icon}>❄️</span>
          </div>
          
          {/* ✅ 修改这里 */}
          <p className={styles.subtitle}>咕咕嘎嘎 · 嘎嘎咕咕</p>
          
          <div className={`${styles.jokeBox} ${isFlipping ? styles.flipping : ''}`}>
            <span className={styles.quote}>{'「'}</span>
            <p className={styles.jokeText}>{currentJoke}</p>
            <span className={`${styles.quote} ${styles.quoteEnd}`}>{'」'}</span>
          </div>
          
          <div className={styles.stats}>
            <span>📚 共 {jokes.length} 条冷笑话</span>
          </div>
          
          <button className={styles.refreshButton} onClick={refreshJoke}>
            <span className={styles.refreshIcon}>🔄</span>
            换一个
          </button>
        </div>
      </div>
    </Layout>
  );
}