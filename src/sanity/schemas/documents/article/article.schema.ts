import { defineArrayMember, defineType } from 'sanity';

import { createSeoFields, seoFieldset } from '../../objects/seo.schema';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  fieldsets: [seoFieldset],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Article sans titre',
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : 'Date de publication non définie',
        media,
      };
    },
  },

  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
    },

    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: "Généré automatiquement depuis le titre. Utilisé dans l'URL de l'article.",
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
    },

    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
    },

    {
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: "Résumé court de l'article — affiché dans les cards et utilisé pour le SEO.",
      validation: (Rule) => Rule.required().max(200).error('Obligatoire, 200 caractères maximum'),
    },

    {
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Puce', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
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
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
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
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description:
        'Téléchargez une image JPEG, PNG ou WEBP inférieure à 2 Mo. Utilisez Squoosh (https://squoosh.app) pour convertir en WEBP et réduire la taille.',
      validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: "Important pour le SEO et l'accessibilité. Décrivez brièvement l'image.",
          validation: (Rule) => Rule.required().error('Ce champ est obligatoire'),
        },
      ],
    },

    ...createSeoFields('Article'),
  ],
});
