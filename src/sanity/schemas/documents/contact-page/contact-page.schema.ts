import { defineType } from 'sanity';

import { createSeoFields, seoFieldset } from '../../objects/seo.schema';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',

  fieldsets: [seoFieldset],

  preview: {
    prepare() {
      return { title: 'Contact' };
    },
  },

  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      hidden: true,
      initialValue: 'Contact',
    },
    ...createSeoFields('Contact'),
  ],
});
