import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    article: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Article sans titre', href: `/blog/${doc?.slug}` },
          { title: 'Blog', href: '/blog' },
        ],
      }),
    }),
  },
};
