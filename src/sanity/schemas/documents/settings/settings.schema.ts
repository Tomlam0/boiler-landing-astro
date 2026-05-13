import { defineField, defineType } from 'sanity';

import { withFieldIcon } from '../../../studio/field-with-icon';
import { SOCIAL_ICONS } from '../../../../shared/lib/social-icons';

export const settings = defineType({
  name: 'settings',
  title: 'Paramètres',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Paramètres du site' };
    },
  },
  fieldsets: [
    { name: 'brandAssets', title: 'Assets de marque', options: { collapsible: false } },
    { name: 'social', title: 'Réseaux sociaux', options: { collapsible: false } },
  ],
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      fieldset: 'brandAssets',
      description:
        'Icône carrée affichée dans les onglets du navigateur. Recommandé : 32×32px, PNG ou SVG.',
      options: { accept: 'image/png,image/svg+xml,image/x-icon' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph par défaut',
      type: 'image',
      fieldset: 'brandAssets',
      description:
        'Image affichée par défaut lors du partage des pages sur les réseaux sociaux. Recommandé : 1200×630px.',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'socialTwitter',
      title: 'X (Twitter)',
      type: 'url',
      fieldset: 'social',
      description: 'URL complète du profil. Laisser vide pour ne pas afficher.',
      components: { field: withFieldIcon(SOCIAL_ICONS.twitter) },
    }),
    defineField({
      name: 'socialLinkedin',
      title: 'LinkedIn',
      type: 'url',
      fieldset: 'social',
      components: { field: withFieldIcon(SOCIAL_ICONS.linkedin, { color: '#0A66C2' }) },
    }),
    defineField({
      name: 'socialGithub',
      title: 'GitHub',
      type: 'url',
      fieldset: 'social',
      components: { field: withFieldIcon(SOCIAL_ICONS.github) },
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram',
      type: 'url',
      fieldset: 'social',
      components: { field: withFieldIcon(SOCIAL_ICONS.instagram, { color: '#E4405F' }) },
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook',
      type: 'url',
      fieldset: 'social',
      components: { field: withFieldIcon(SOCIAL_ICONS.facebook, { color: '#1877F2' }) },
    }),
    defineField({
      name: 'socialYoutube',
      title: 'YouTube',
      type: 'url',
      fieldset: 'social',
      components: { field: withFieldIcon(SOCIAL_ICONS.youtube, { color: '#FF0000' }) },
    }),

    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      description:
        "Texte de copyright affiché dans le pied de page. L'année est ajoutée automatiquement.",
      placeholder: "Nom de l'entreprise. Tous droits réservés.",
    }),
  ],
});
