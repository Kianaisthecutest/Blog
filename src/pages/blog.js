// src/pages/blog.js
import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './blog.module.css';
import postsData from '../data/blog-posts.json';

const POSTS = Array.isArray(postsData) ? postsData : [];

const FolderIcon = ({ expanded = false }) => (
  <svg viewBox="0 0 24 24" className={styles.folderGlyph} aria-hidden="true">
    <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4.2l1.5 2H18a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 17H6a2.5 2.5 0 0 1-2.5-2.5v-7Z" />
    <path d="M3.5 9.5h17" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" className={styles.folderGlyph} aria-hidden="true">
    <path d="M7 3.5h6l4 4V18a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 5 18V6A2.5 2.5 0 0 1 7.5 3.5Z" />
    <path d="M13 3.5V8h4" />
    <path d="M8.25 12h7.5M8.25 15h7.5" />
  </svg>
);

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
  const [expandedGroups, setExpandedGroups] = useState(() => new Set());

  const getGroupPathForPost = (post) => post.groupPath || getFolderPathFromPermalink(post.permalink || '');

  const autoGroupList = useMemo(() => {
    const list = [];
    const added = new Set();

    POSTS.forEach((post) => {
      const folderPath = getGroupPathForPost(post);

      if (folderPath) {
        const segments = folderPath.split('/').filter(Boolean);
        let currentPath = '';

        segments.forEach((segment, index) => {
          currentPath = currentPath ? `${currentPath}/${segment}` : segment;
          if (added.has(currentPath)) return;

          added.add(currentPath);
          const count = POSTS.filter((p) => {
            const groupPath = getGroupPathForPost(p);
            return groupPath === currentPath || groupPath.startsWith(`${currentPath}/`);
          }).length;

          list.push({
            key: currentPath,
            label: segment,
            icon: 'folder',
            count,
            level: index,
            children: [],
          });
        });
      }

      const postKey = post.permalink || `${post.title}-${Math.random()}`;
      const parentPath = folderPath || '';
      list.push({
        key: postKey,
        label: post.title || '未命名',
        icon: 'document',
        count: 1,
        level: folderPath ? folderPath.split('/').filter(Boolean).length : 0,
        parentPath,
        children: [],
      });
    });

    return list.sort((a, b) => a.level - b.level || a.label.localeCompare(b.label));
  }, []);

  const groupTree = useMemo(() => {
    const nodes = new Map();
    const rootNodes = [];

    autoGroupList.forEach((group) => {
      nodes.set(group.key, { ...group, children: Array.isArray(group.children) ? group.children : [] });
    });

    autoGroupList.forEach((group) => {
      if (group.parentPath) {
        const parentNode = nodes.get(group.parentPath);
        if (parentNode) {
          parentNode.children.push(nodes.get(group.key));
          return;
        }
      }

      const parentPath = group.key.includes('/') ? group.key.split('/').slice(0, -1).join('/') : '';
      if (parentPath && nodes.has(parentPath)) {
        nodes.get(parentPath).children.push(nodes.get(group.key));
      } else {
        rootNodes.push(nodes.get(group.key));
      }
    });

    return [{ key: 'all', label: '全部文章', icon: 'document', count: POSTS.length, level: -1, children: rootNodes }];
  }, [autoGroupList]);

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  const renderTree = (nodes, depth = 0) =>
    nodes.map((node) => {
      const hasChildren = Array.isArray(node.children) && node.children.length > 0;
      const isExpanded = expandedGroups.has(node.key);
      const canToggle = true;
      const toggleSymbol = hasChildren ? (isExpanded ? '▾' : '▸') : '•';

      const handleSelect = () => {
        setSelectedGroup(node.key);
        if (node.icon !== 'document' || hasChildren) {
          setExpandedGroups((prev) => new Set(prev).add(node.key));
        }
      };

      return (
        <li key={node.key} className={styles.treeNode}>
          <div
            className={`${styles.groupItem} ${selectedGroup === node.key ? styles.active : ''} ${hasChildren && isExpanded ? styles.folderExpanded : ''}`}
            onClick={handleSelect}
            style={{ paddingLeft: `${0.18 + depth * 0.24}rem` }}
          >
            <span className={`${styles.groupIcon} ${hasChildren && isExpanded ? styles.groupIconExpanded : ''}`}>
              {node.icon === 'document' ? <DocumentIcon /> : <FolderIcon expanded={isExpanded} />}
            </span>
            <span className={styles.groupLabel}>{node.label}</span>
            <span className={styles.groupCount}>{node.count}</span>
            <button
              type="button"
              className={styles.toggleButton}
              onClick={(event) => {
                if (!hasChildren) return;
                event.stopPropagation();
                toggleGroup(node.key);
              }}
              aria-label={hasChildren ? (isExpanded ? `折叠${node.label}` : `展开${node.label}`) : `${node.label}`}
              disabled={!hasChildren}
            >
              {toggleSymbol}
            </button>
          </div>
          {hasChildren && (
            <ul className={`${styles.treeChildren} ${isExpanded ? styles.expanded : ''}`}>
              {renderTree(node.children, depth + 1)}
            </ul>
          )}
        </li>
      );
    });

  const groupList = useMemo(() => groupTree, [groupTree]);

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
        const permalink = post.permalink || '';
        const folderPath = getGroupPathForPost(post);
        return permalink === selectedGroup || folderPath === selectedGroup || folderPath.startsWith(`${selectedGroup}/`);
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

  const stats = useMemo(() => {
    const activeGroup = selectedGroup === 'all' ? '全部目录' : selectedGroup;
    return [
      { label: '总文章', value: POSTS.length },
      { label: '当前分类', value: activeGroup },
      { label: '已筛选', value: filteredPosts.length },
    ];
  }, [selectedGroup, filteredPosts]);

  return (
    <Layout title="文章列表" description="所有博客文章列表">
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}><h3>📂 分类</h3></div>
          <ul className={styles.groupList}>{renderTree(groupList)}</ul>
          <div className={styles.sidebarFooter}><span>📚 共 {filteredPosts.length} 篇文章</span></div>
        </aside>

        <main className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.kicker}>知识库</p>
              <h1 className={styles.title}>📖 文章列表</h1>
            </div>
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

          <div className={styles.statsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span className={styles.statLabel}>{stat.label}</span>
                <strong className={styles.statValue}>{stat.value}</strong>
              </div>
            ))}
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