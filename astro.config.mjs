// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages serves the repo at https://browyhq.github.io/docs/
  site: 'https://browyhq.github.io',
  base: '/docs',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      title: 'Browy',
      description: 'The AI agent that lives in your browser. Drives real tabs through chat. Side panel + DevTools REPL.',
      logo: { src: './src/assets/logo.png', replacesTitle: false },
      customCss: ['./src/styles/custom.css'],
      // Global head injection — runs on every page. Per-page frontmatter
      // `head:` blocks are appended after this and can override.
      head: [
        // Default social card so link previews aren't blank.
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://browyhq.github.io/docs/og-default.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://browyhq.github.io/docs/og-default.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0a1f12' } },
        // Canonical author for blog posts (overridable per-post)
        { tag: 'meta', attrs: { name: 'author', content: 'Ritabrata Maiti' } },
      ],
      components: {
        Hero: './src/components/Hero.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/BrowyHQ' },
      ],
      editLink: {
        baseUrl: 'https://github.com/BrowyHQ/docs/edit/main/',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'What is Browy?', slug: 'index' },
            { label: 'Install', slug: 'install' },
            { label: 'First chat', slug: 'first-chat' },
            { label: 'DevTools CLI', slug: 'devtools-cli' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Permissions', slug: 'permissions' },
            { label: 'Tools the agent has', slug: 'tools' },
            { label: 'Privacy & Data', slug: 'privacy' },
            { label: 'Security', slug: 'security' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Native host (backend)', slug: 'arch-backend' },
            { label: 'Extension (frontend)', slug: 'arch-frontend' },
            { label: 'DevTools CLI internals', slug: 'arch-cli' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'FAQ', slug: 'faq' },
            { label: 'Changelog', slug: 'changelog' },
            { label: 'Roadmap & contributing', slug: 'roadmap' },
          ],
        },
        {
          label: 'Writing',
          items: [
            { label: 'Blog', slug: 'blog' },
          ],
        },
      ],
    }),
    sitemap({
      // Drop the .new staging file if any and the OG image binaries from sitemap.
      filter: (page) => !page.includes('/.well-known/') && !page.endsWith('.png'),
    }),
  ],
});
