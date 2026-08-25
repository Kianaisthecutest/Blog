// src/pages/jokes/index.js
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// 冷笑话列表
const jokes = [
  "为什么数学书总是很忧郁？因为它有太多的问题。",
  "程序员为什么喜欢暗色模式？因为光吸引bug。",
  "为什么电脑总是很冷？因为它有Windows（窗户）。",
  "为什么咖啡总是很悲伤？因为它的人生太苦了。",
  "为什么书呆子不喜欢打篮球？因为他们怕遇到'篮板'（难板）。",
  "为什么月亮总是很孤独？因为它只有一个月亮。",
  "为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25。",
  "为什么鸡蛋很胆小？因为它一碰就碎。",
  "为什么数学考试总是很冷？因为有很多'冷'知识。",
  "为什么饼干总是很脆弱？因为它一压就碎。",
  "为什么程序员总是很冷静？因为他们有足够的内存。",
  "为什么键盘总是很累？因为它有太多按键要按。",
  "为什么显示器总是很亮？因为它有高清（高情）商。",
  "为什么鼠标总是很忙？因为它要一直点击。",
  "为什么数据库总是很稳定？因为它有事务（失误）回滚。",
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
    <Layout title="冷笑话仓库" description="收集各种冷笑话，让你会心一笑">
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