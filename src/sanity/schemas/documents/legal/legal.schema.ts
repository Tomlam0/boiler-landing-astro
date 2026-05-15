import { defineType } from 'sanity';

import { createSeoFields, seoFieldset } from '../../objects/seo.schema';

export const legalText = defineType({
  name: 'legalText',
  title: 'Texte légal',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [{ title: 'Puce', value: 'bullet' }],
      marks: {
        decorators: [{ title: 'Gras', value: 'strong' }],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto'],
                  }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Ouvrir dans un nouvel onglet',
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
  ],
});

export const legal = defineType({
  name: 'legal',
  title: 'Légal',
  type: 'document',

  fieldsets: [seoFieldset],

  preview: {
    prepare() {
      return { title: 'Legal' };
    },
  },

  fields: [
    ...createSeoFields('Mentions légales'),

    {
      name: 'lastUpdated',
      title: 'Date de dernière mise à jour',
      type: 'date',
      description:
        'Date affichée sous le titre de la page (« Dernière mise à jour : … »). À renseigner manuellement à chaque révision juridique.',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'privacyPolicy',
      title: 'Politique de confidentialité',
      type: 'legalText',
      description: 'Traitement des données personnelles et conformité RGPD.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'termsAndConditions',
      title: "Conditions générales d'utilisation",
      type: 'legalText',
      description: "Règles régissant l'utilisation du site et des services.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cookiePolicy',
      title: 'Politique de cookies',
      type: 'legalText',
      description: "Informations sur l'utilisation des cookies.",
      validation: (Rule) => Rule.required(),
    },
  ],
});
