// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // 网站基本信息
  title: '我的网站',
  tagline: '一个简洁、实用的中文知识网站',
  favicon: 'img/favicon.ico',

  // 网站语言设置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
      },
    },
  },

  // Docusaurus v4 相关配置
  future: {
    v4: true,
  },

  // 网站正式部署地址
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  // GitHub Pages 配置
  organizationName: 'your-github-name',
  projectName: 'your-repository-name',

  // 遇到链接错误时直接报错，便于及时发现问题
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // ❌ 完全禁用文档功能
        docs: false,
        
        blog: {
          // 博客页面中文标题和描述
          blogTitle: '博客',
          blogDescription: '记录学习、思考与实践。',

          // 数学公式支持
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          showReadingTime: true,
          showLastUpdateTime: true,

          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },

          // 暂时隐藏"编辑此页"链接
          // 以后有自己的 GitHub 仓库后再启用
          // editUrl: 'https://github.com/你的用户名/你的仓库名/tree/main/',

          // 没有摘要分隔符时给出提醒
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 网站分享卡片
      image: 'img/docusaurus-social-card.jpg',

      // 浏览器标签页和搜索引擎描述
      metadata: [
        {
          name: 'keywords',
          content: '中文教程, 技术文档, 学习笔记, 博客',
        },
        {
          name: 'description',
          content: '一个记录学习、技术与实践的中文网站。',
        },
      ],

      // 主题颜色设置
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
        disableSwitch: false,
      },

      // ❌ 删除 docs 相关配置
      // docs: {
      //   sidebar: {
      //     hideable: true,
      //     autoCollapseCategories: true,
      //   },
      // },

      // 顶部导航栏
      navbar: {
        title: '月球',
        logo: {
          alt: '我的网站 Logo',
          src: 'img/Theresa.png',
        },
        items: [
          // ❌ 删除文档教程链接
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: '文档教程',
          // },
          
          // ✅ 保留博客链接
          {
            to: '/blog',
            label: '月海妙妙仓库',
            position: 'left',
          },
          
          // ✅ 新增冷笑话仓库链接
          {
            to: '/jokes',
            label: '❄️ 冷笑话仓库',
            position: 'left',
          },
          
          // ❌ 删除开始使用链接（指向文档）
          // {
          //   to: '/docs/intro',
          //   label: '开始使用',
          //   position: 'left',
          // },
          
          // ✅ 保留 GitHub 链接
          {
            href: 'https://github.com/你的用户名/你的仓库名',
            label: '源代码',
            position: 'right',
          },
        ],
      },

      // 底部页脚
      footer: {
        style: 'dark',
        links: [
          // ❌ 删除文档部分
          // {
          //   title: '文档',
          //   items: [
          //     {
          //       label: '教程首页',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          
          // ✅ 保留学习资源
          {
            title: '学习资源',
            items: [
              {
                label: '博客文章',
                to: '/blog',
              },
              // ✅ 新增冷笑话仓库页脚链接
              {
                label: '❄️ 冷笑话仓库',
                to: '/jokes',
              },
              // ❌ 删除开始使用（指向文档）
              // {
              //   label: '开始使用',
              //   to: '/docs/intro',
              // },
            ],
          },
          
          // ✅ 保留相关链接
          {
            title: '相关链接',
            items: [
              {
                label: 'GitHub 项目',
                href: 'https://github.com/你的用户名/你的仓库名',
              },
            ],
          },
        ],
        copyright: `版权所有 © ${new Date().getFullYear()} 我的网站。使用 Docusaurus 构建。`,
      },

      // 代码高亮主题
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'java', 'python', 'json', 'yaml'],
      },
    }),

  // 数学公式所需的 KaTeX 样式
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
      type: 'text/css',
    },
  ],
};

export default config;