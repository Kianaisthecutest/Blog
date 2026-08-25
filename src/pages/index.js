// src/pages/index.js
import React, { useEffect, useRef } from 'react';  // 移除 useState
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // 鼠标视差效果
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (titleRef.current) {
        titleRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className={styles.heroBanner}>
      <div className={styles.particles}>
        {[...Array(50)].map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>
      
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />
      <div className={styles.glowOrb3} />
      
      <div className={styles.container}>
        <div className={styles.badge}>✨ 崩坏3 · 琪亚娜主题</div>
        
        <h1 ref={titleRef} className={styles.heroTitle}>
          <span className={styles.gradientText}>跨越终焉</span>
          <span className={styles.titleDivider}>，</span>
          <span className={styles.gradientText2}>薪火相传</span>
        </h1>
        
        <p ref={subtitleRef} className={styles.heroSubtitle}>
          <span className={styles.subtitleLine}>以琪亚娜·卡斯兰娜之名，</span>
          <br />
          <span className={styles.subtitleHighlight}>为世界上所有的美好而战</span>
        </p>
        
        <div className={styles.buttons}>
          <a className={styles.primaryButton} href="/blog">
            <span>开始探索</span>
            <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a className={styles.secondaryButton} href="#features">
            <span>了解更多</span>
          </a>
        </div>

        {/* 滚动指示器已删除 */}
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="以琪亚娜·卡斯兰娜之名，为世界上所有的美好而战">
      <HomepageHeader />
      
      <section id="features" className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>✦ 薪火传承 ✦</h2>
          <div className="row">
            <div className="col col--4">
              <div className={styles.featureCard}>
                <img 
                  src="/img/kiana-fire.png" 
                  alt="薪炎之律者"
                  className={styles.featureImage}
                />
                <h3>薪炎之律者</h3>
                <p>燃烧自己，照亮前路</p>
              </div>
            </div>
            <div className="col col--4">
              <div className={styles.featureCard}>
                <img 
                  src="/img/kiana-void.png" 
                  alt="终焉之律者"
                  className={styles.featureImage}
                />
                <h3>终焉之律者</h3>
                <p>跨越终焉，拥抱全新可能</p>
              </div>
            </div>
            <div className="col col--4">
              <div className={styles.featureCard}>
                <img 
                  src="/img/kiana-start.png" 
                  alt="无名之辈"
                  className={styles.featureImage}
                />
                <h3>无名之辈</h3>
                <p>一切的起点，是寻找自己的名字</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}