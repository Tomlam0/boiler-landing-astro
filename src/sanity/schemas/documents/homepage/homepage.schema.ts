import { defineType } from 'sanity';

import { createSeoFields, seoFieldset } from '../../objects/seo.schema';

export const homepage = defineType({
  name: 'homepage',
  title: 'Accueil',
  type: 'document',

  fieldsets: [seoFieldset],

  preview: {
    prepare() {
      return { title: 'Accueil' };
    },
  },

  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      hidden: true,
      initialValue: 'Accueil',
    },
    ...createSeoFields('Accueil'),
  ],
});
