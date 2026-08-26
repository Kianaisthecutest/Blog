// src/pages/blog/index.js
import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

// ===== ✅ 导入自动生成的分组配置 =====
import groupConfig from '../../data/group-config.json';

export default function BlogList() {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== 加载博客文章数据 =====
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/blog/archive.json');
        if (response.ok) {
          const archive = await response.json();
          if (archive.posts && archive.posts.length > 0) {
            setPosts(archive.posts);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('加载 archive.json 失败:', e);
      }

      try {
        if (typeof window !== 'undefined') {
          const data = window.__DATA || window.__docusaurus || {};
          if (data.blogPosts) {
            setPosts(data.blogPosts);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('加载页面数据失败:', e);
      }

      setLoading(false);
    };

    loadPosts();
  }, []);

  // ===== ✅ 从 groupConfig 生成侧边栏列表 =====
  const groupList = useMemo(() => {
    const list = [];
    const config = groupConfig || {};

    // 先添加 "全部文章"
    list.push({
      key: 'all',
      label: '全部文章',
      icon: '📖',
      count: posts.length,
    });

    // 从配置中添加其他分组
    Object.entries(config).forEach(([key, value]) => {
      if (key === 'all') return; // 跳过 all，已经添加了
      // 计算该分组下的文章数量
      const count = posts.filter(post => {
        const permalink = post.permalink || post.metadata?.permalink || '';
        return permalink.includes(key);
      }).length;
      list.push({
        key: key,
        label: value.label || key,
        icon: value.icon || '📁',
        count: count,
      });
    });

    return list;
  }, [posts]);

  // ===== 根据分组和搜索过滤文章 =====
  const filteredPosts = useMemo(() => {
    let result = posts || [];

    if (searchTerm) {
      result = result.filter(post => {
        const title = post.title || post.metadata?.title || '';
        const tags = post.tags || post.metadata?.tags || [];
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tags.some(tag => (tag.label || tag || '').toLowerCase().includes(searchTerm.toLowerCase()));
      });
    }

    if (selectedGroup !== 'all') {
      result = result.filter(post => {
        const permalink = post.permalink || post.metadata?.permalink || '';
        return permalink.includes(selectedGroup);
      });
    }

    return result;
  }, [posts, searchTerm, selectedGroup]);

  // ===== 按年份分组 =====
  const postsByYear = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      const date = post.date || post.metadata?.date || '';
      const year = date ? new Date(date).getFullYear() : '未知';
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .reduce((acc, year) => {
        acc[year] = groups[year];
        return acc;
      }, {});
  }, [filteredPosts]);

  if (loading) {
    return (
      <Layout title="文章列表" description="所有博客文章列表">
        <div className={styles.container}>
          <div className={styles.loading}>📚 加载文章中...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="文章列表" description="所有博客文章列表">
      <div className={styles.container}>
        {/* ===== 侧边栏 - 分组列表 ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>📂 分类</h3>
          </div>

          <ul className={styles.groupList}>
            {groupList.map(group => (
              <li
                key={group.key}
                className={`${styles.groupItem} ${selectedGroup === group.key ? styles.active : ''}`}
                onClick={() => setSelectedGroup(group.key)}
              >
                <span className={styles.groupIcon}>{group.icon}</span>
                <span className={styles.groupLabel}>{group.label}</span>
                <span className={styles.groupCount}>{group.count}</span>
              </li>
            ))}
          </ul>

          <div className={styles.sidebarFooter}>
            <span>📚 共 {filteredPosts.length} 篇文章</span>
          </div>
        </aside>

        {/* ===== 主内容区 ===== */}
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>📖 文章列表</h1>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="🔍 搜索文章..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className={styles.empty}>
              <p>📭 没有找到文章</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                请确认 blog 文件夹下有文章，并且 Docusaurus 能正常读取
              </p>
            </div>
          ) : (
            <div className={styles.postList}>
              {Object.entries(postsByYear).map(([year, yearPosts]) => (
                <div key={year} className={styles.yearGroup}>
                  <h2 className={styles.yearTitle}>{year}</h2>
                  <ul className={styles.postItems}>
                    {yearPosts.map((post, index) => {
                      const title = post.title || post.metadata?.title || '未命名';
                      const permalink = post.permalink || post.metadata?.permalink || `/blog/${post.slug || ''}`;
                      const tags = post.tags || post.metadata?.tags || [];
                      return (
                        <li key={index} className={styles.postItem}>
                          <Link to={permalink} className={styles.postLink}>
                            <span className={styles.postTitle}>{title}</span>
                            {tags.length > 0 && (
                              <span className={styles.postTags}>
                                {tags.map((tag, i) => (
                                  <span key={i} className={styles.tag}>#{tag.label || tag}</span>
                                ))}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}