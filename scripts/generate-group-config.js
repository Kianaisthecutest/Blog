// scripts/generate-group-config.js
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const BLOG_PATH = path.join(PROJECT_ROOT, 'blog');
const GROUP_OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/data/group-config.json');
const POSTS_OUTPUT_PATH = path.join(PROJECT_ROOT, 'src/data/blog-posts.json');

function normalizeSlug(slug = '') {
  let value = slug.trim();
  if (!value) return '';
  value = value.replace(/\\/g, '/');
  if (!value.startsWith('/')) value = `/${value}`;
  value = value.replace(/\/+$/, '');
  return value;
}

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return null;

  const frontmatter = match[1];
  const getField = (name) => {
    const regex = new RegExp(`^${name}:\\s*(.*)$`, 'm');
    const result = frontmatter.match(regex);
    if (!result) return '';
    return result[1].trim();
  };

  const title = getField('title') || path.basename(filePath, '.md');
  const date = getField('date') || new Date().toISOString();
  const rawTags = getField('tags') || '';
  const slug = getField('slug') || path.relative(BLOG_PATH, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
  const tags = rawTags
    ? rawTags
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((tag) => tag.trim().replace(/^['\"]|['\"]$/g, ''))
        .filter(Boolean)
    : [];

  return {
    title,
    date,
    slug,
    tags,
    filePath,
  };
}

function getPermalink(slug, filePath) {
  const normalizedSlug = normalizeSlug(slug);
  if (normalizedSlug.startsWith('/blog-posts')) {
    return normalizedSlug;
  }

  if (normalizedSlug.startsWith('/blog')) {
    return normalizedSlug.replace(/^\/blog/, '/blog-posts');
  }

  const relativePath = path.relative(BLOG_PATH, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
  const defaultRoute = `/blog-posts/${relativePath}`;
  return defaultRoute;
}

function collectPosts() {
  const posts = [];

  function walk(currentDir) {
    for (const item of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!item.name.endsWith('.md')) continue;

      const metadata = parseFrontmatter(fullPath);
      if (!metadata) continue;

      const permalink = getPermalink(metadata.slug, fullPath);
      const parts = permalink.split('/').filter(Boolean);
      const routeParts = parts.slice(1); // remove blog-posts
      const groupPath = routeParts.slice(0, -1).join('/');
      const groupSegments = routeParts.slice(0, -1);

      posts.push({
        title: metadata.title,
        date: metadata.date,
        permalink,
        tags: metadata.tags,
        groupPath,
        groupSegments,
        filePath: path.relative(PROJECT_ROOT, fullPath).replace(/\\/g, '/'),
      });
    }
  }

  walk(BLOG_PATH);

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function buildGroups(posts) {
  const groups = {};

  posts.forEach((post) => {
    const segments = post.groupSegments.filter(Boolean);
    let current = '';

    segments.forEach((segment, index) => {
      current = current ? `${current}/${segment}` : segment;
      if (!groups[current]) {
        groups[current] = {
          key: current,
          label: segment,
          icon: '📁',
          count: 0,
        };
      }
      groups[current].count += 1;
    });
  });

  groups.all = {
    key: 'all',
    label: '全部文章',
    icon: '📖',
    count: posts.length,
  };

  return groups;
}

function generate() {
  if (!fs.existsSync(BLOG_PATH)) {
    console.error('❌ 博客目录不存在:', BLOG_PATH);
    return;
  }

  const posts = collectPosts();
  const groups = buildGroups(posts);

  fs.mkdirSync(path.dirname(GROUP_OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(POSTS_OUTPUT_PATH, JSON.stringify(posts, null, 2));
  fs.writeFileSync(GROUP_OUTPUT_PATH, JSON.stringify(groups, null, 2));

  console.log('✅ 已生成动态博客索引:', POSTS_OUTPUT_PATH);
  console.log('✅ 已生成动态分组配置:', GROUP_OUTPUT_PATH);
  console.log(`📚 共发现 ${posts.length} 篇文章`);
}

generate();