import { defineType } from 'sanity';

import { createSeoFields, seoFieldset } from '../../objects/seo.schema';

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog',
  type: 'document',

  fieldsets: [seoFieldset],

  preview: {
    prepare() {
      return { title: 'Blog' };
    },
  },

  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      hidden: true,
      initialValue: 'Blog',
    },
    ...createSeoFields('Blog'),
  ],
});
