// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // 网站基本信息
  title: '叱咤月海猫猫鱼',
  tagline: '一个简洁、实用的中文知识网站',
  favicon: 'img/theresa.ico',

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
        docs: false,
        
        blog: {
          blogTitle: '博客',
          blogDescription: '记录学习、思考与实践。',

          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          showReadingTime: true,
          showLastUpdateTime: true,

          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',

          // ===== ✅ 新增：文章列表功能配置 =====
          // 取消分页，显示所有文章
          postsPerPage: 'ALL',
          // 不显示侧边栏
          blogSidebarCount: 0,
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
      image: 'img/docusaurus-social-card.jpg',

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

      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
        disableSwitch: false,
      },

      navbar: {
        title: '叱咤月海猫猫鱼',
        logo: {
          alt: '叱咤月海猫猫鱼 Logo',
          src: 'img/Theresa.png',
        },
        items: [
          {
            to: '/blog',
            label: '📦 月海妙妙仓库',
            position: 'left',
          },
          {
            to: '/jokes',
            label: '❄️ 冷笑话仓库',
            position: 'left',
          },
          {
            href: 'https://github.com/你的用户名/你的仓库名',
            label: '源代码',
            position: 'right',
          },
        ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: '学习资源',
            items: [
              {
                label: '博客文章',
                to: '/blog',
              },
              {
                label: '❄️ 冷笑话仓库',
                to: '/jokes',
              },
            ],
          },
          {
            title: '相关链接',
            items: [
              {
                label: 'GitHub 项目',
                href: 'https://github.com/你的用户名/你的仓库名',
              },
              {
                label: '崩坏三官网',
                href: 'https://bh3.mihoyo.com/main',
              },
            ],
          },
        ],
        copyright: `版权所有 © ${new Date().getFullYear()} 叱咤月海猫猫鱼。使用 Docusaurus 构建。`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'java', 'python', 'json', 'yaml'],
      },
    }),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
      type: 'text/css',
    },
  ],
};

export default config;