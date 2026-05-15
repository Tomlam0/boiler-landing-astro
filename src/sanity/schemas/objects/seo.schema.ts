import { defineField } from 'sanity';

export const seoFieldset = {
  name: 'seo',
  title: 'SEO',
  options: { collapsible: false },
} as const;

export function createSeoFields(pageName: string, group?: string) {
  return [
    defineField({
      name: 'seoTitle',
      title: `Titre SEO — ${pageName}`,
      type: 'string',
      ...(group ? { group } : { fieldset: 'seo' as const }),
      description:
        "Affiché dans l'onglet du navigateur et comme titre principal dans les résultats Google.",
      validation: (R) => [
        R.required(),
        R.max(70).warning('70 caractères maximum pour un affichage optimal dans Google'),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: `Description SEO — ${pageName}`,
      type: 'text',
      rows: 3,
      ...(group ? { group } : { fieldset: 'seo' as const }),
      description:
        'Affichée sous le titre dans les résultats Google. Une description claire améliore le taux de clic.',
      validation: (R) => [
        R.required(),
        R.max(160).warning('160 caractères maximum pour un affichage optimal dans Google'),
      ],
    }),
  ];
}
