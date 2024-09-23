// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';



/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dev Docs',
  tagline: 'How to use Dev Tools',
  favicon: 'img/yabbr.svg',
  plugins: ['polyfill'],
  

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

        theme: {
          customCss: './src/css/custom.css',

        },
      }),
    ],
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({


      // Replace with your project's social card
      image: 'img/yabbr.svg',
      navbar: {
        items: [
          {to: '/api', label: 'API', position: 'left'},
          {to: '/tools', label: 'Workflows', position: 'left'},
          



        ],
        logo: {
          alt: 'Yabbr Site Logo',
          src: 'img/yabbr.svg',
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
              {
                label: 'API Documentation',
                to: 'https://api.yabbr.io/',
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
