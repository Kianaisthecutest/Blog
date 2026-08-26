// scripts/generate-group-config.js
const fs = require('fs');
const path = require('path');

const BLOG_PATH = path.join(__dirname, '../blog');
const OUTPUT_PATH = path.join(__dirname, '../src/data/group-config.json');

function getDirectories(srcPath) {
  const items = fs.readdirSync(srcPath, { withFileTypes: true });
  return items
    .filter(item => item.isDirectory())
    .map(item => item.name);
}

function generateGroupConfig() {
  const dirs = getDirectories(BLOG_PATH);
  const groups = {};
  
  // 递归获取所有子目录
  function getAllSubDirs(basePath, prefix = '') {
    const items = fs.readdirSync(basePath, { withFileTypes: true });
    const result = [];
    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(basePath, item.name);
        const relativePath = prefix ? `${prefix}/${item.name}` : item.name;
        result.push(relativePath);
        result.push(...getAllSubDirs(fullPath, relativePath));
      }
    }
    return result;
  }
  
  const allSubDirs = getAllSubDirs(BLOG_PATH);
  
  // 生成配置
  allSubDirs.forEach(dir => {
    const label = dir.split('/').pop();
    groups[dir] = {
      label: label,
      icon: '📁',
      description: `${label} 题解`,
    };
  });
  
  // 添加默认分组
  groups['all'] = {
    label: '全部文章',
    icon: '📖',
    description: '所有文章',
  };
  
  // 写入文件
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(groups, null, 2));
  console.log('✅ 分组配置已生成:', OUTPUT_PATH);
}

generateGroupConfig();