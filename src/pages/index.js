// src/pages/index.js
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>🌸 跨越终焉，薪火相传</h1>
        <p className={styles.heroSubtitle}>
          以琪亚娜·卡斯兰娜之名，为世界上所有的美好而战
        </p>
        <div className={styles.buttons}>
          <a className="button button--lg" href="/blog">
            开始探索 →
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="分享与琪亚娜同行的每一刻">
      <HomepageHeader />
      <main>
        {/* 自定义功能卡片：你可以修改标题和描述 */}
        <section className="container" style={{ padding: '4rem 0' }}>
          <div className="row">
            <div className="col col--4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>⚡</div>
              <h3>薪炎之律者</h3>
              <p>燃烧自己，照亮前路，这是琪亚娜的抉择。</p>
            </div>
            <div className="col col--4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>🌌</div>
              <h3>终焉之律者</h3>
              <p>跨越终焉，拥抱全新可能。</p>
            </div>
            <div className="col col--4" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>💫</div>
              <h3>无名之茧</h3>
              <p>一切的起点，是寻找自己的名字。</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}