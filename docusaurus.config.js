// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

import path from 'path';
const brandName = process.env.brand || 'yabbr';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dev Docs',
  tagline: 'Learn to use our APIs and Workflows',
  favicon: '/img/fav.ico',
  plugins: ['polyfill',path.join(__dirname, '/plugins/webpackConfig')],
  staticDirectories: [`src/brands/${brandName}`, 'static'],




  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Yabbr', // Usually your GitHub org/user name.
  projectName: 'dev-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },



  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',

        },
        blog: false,


      }),
    ],
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({


      // Replace with your project's social card
      image: '/img/brand-logo.png',
      navbar: {
        items: [
          {to: '/api', label: 'API', position: 'left'},
          {to: '/tools', label: 'Workflows', position: 'left'},
          



        ],
        logo: {
          alt: 'Site Logo',
          src: '/img/brand-logo.png',
          href: '/',
        },
        


      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Yabbr Products',
            items: [
              {
                label: 'Yabbr Website',
                to: 'https://yabbr.com.au/',
              },
              {
                label: 'Yabbr App',
                to: 'https://go.yabbr.io',
              },

            ],
          },
          {
            title: 'Social Media',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/yabbr/?originalSubdomain=au',
              },

            ],
          },

        ],
        copyright: `Copyright © ${new Date().getFullYear()} Yabbr.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

};

// could potentially use tabs in some places instead of sub-links

export default config;
