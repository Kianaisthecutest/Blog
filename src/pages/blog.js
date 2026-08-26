// src/pages/blog.js
import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './blog.module.css';
import postsData from '../data/blog-posts.json';

const POSTS = Array.isArray(postsData) ? postsData : [];

const getFolderPathFromPermalink = (permalink = '') => {
  const normalized = permalink.replace(/\/+$/, '');
  if (!normalized.startsWith('/blog-posts/')) return '';

  const relative = normalized.replace(/^\/blog-posts\//, '');
  const parts = relative.split('/').filter(Boolean);
  if (parts.length <= 1) return '';
  return parts.slice(0, -1).join('/');
};

export default function BlogList() {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const autoGroupList = useMemo(() => {
    const list = [];
    const added = new Set();

    POSTS.forEach((post) => {
      const folderPath = post.groupPath || getFolderPathFromPermalink(post.permalink || '');
      if (!folderPath) return;

      const segments = folderPath.split('/').filter(Boolean);
      let currentPath = '';

      segments.forEach((segment, index) => {
        currentPath = currentPath ? `${currentPath}/${segment}` : segment;
        if (added.has(currentPath)) return;

        added.add(currentPath);
        const count = POSTS.filter((p) => {
          const groupPath = p.groupPath || getFolderPathFromPermalink(p.permalink || '');
          return groupPath === currentPath || groupPath.startsWith(`${currentPath}/`);
        }).length;

        list.push({
          key: currentPath,
          label: segment,
          icon: '📂',
          count,
          level: index,
        });
      });
    });

    return list.sort((a, b) => a.level - b.level || a.label.localeCompare(b.label));
  }, []);

  const groupList = useMemo(() => {
    const list = [{ key: 'all', label: '全部文章', icon: '📖', count: POSTS.length, level: -1 }];
    return list.concat(autoGroupList);
  }, [autoGroupList]);

  const filteredPosts = useMemo(() => {
    let result = POSTS || [];

    if (searchTerm) {
      result = result.filter((post) => {
        const title = post.title || '';
        return title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (selectedGroup !== 'all') {
      result = result.filter((post) => {
        const folderPath = post.groupPath || getFolderPathFromPermalink(post.permalink || '');
        return folderPath === selectedGroup || folderPath.startsWith(`${selectedGroup}/`);
      });
    }

    return result;
  }, [searchTerm, selectedGroup]);

  const postsByYear = useMemo(() => {
    const groups = {};
    filteredPosts.forEach((post) => {
      const year = post.date ? new Date(post.date).getFullYear() : '未知';
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

  return (
    <Layout title="文章列表" description="所有博客文章列表">
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}><h3>📂 分类</h3></div>
          <ul className={styles.groupList}>
            {groupList.map((group) => (
              <li
                key={group.key}
                className={`${styles.groupItem} ${selectedGroup === group.key ? styles.active : ''}`}
                onClick={() => setSelectedGroup(group.key)}
                style={{ paddingLeft: group.level >= 0 ? `${1.2 + group.level * 0.8}rem` : '0.8rem' }}
              >
                <span className={styles.groupIcon}>{group.icon}</span>
                <span className={styles.groupLabel}>{group.label}</span>
                <span className={styles.groupCount}>{group.count}</span>
              </li>
            ))}
          </ul>
          <div className={styles.sidebarFooter}><span>📚 共 {filteredPosts.length} 篇文章</span></div>
        </aside>

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
            <div className={styles.empty}><p>📭 没有找到文章</p></div>
          ) : (
            <div className={styles.postList}>
              {Object.entries(postsByYear).map(([year, yearPosts]) => (
                <div key={year} className={styles.yearGroup}>
                  <h2 className={styles.yearTitle}>{year}</h2>
                  <ul className={styles.postItems}>
                    {yearPosts.map((post, index) => {
                      const title = post.title || '未命名';
                      const permalink = post.permalink || '/blog-posts';
                      const tags = post.tags || [];
                      return (
                        <li key={`${year}-${index}`} className={styles.postItem}>
                          <Link to={permalink} className={styles.postLink}>
                            <span className={styles.postTitle}>{title}</span>
                            {tags.length > 0 && (
                              <span className={styles.postTags}>
                                {tags.map((tag, i) => (
                                  <span key={`${title}-tag-${i}`} className={styles.tag}>#{tag}</span>
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