import { env } from '@/shared/lib/env';

export function generateStructuredData() {
  const baseUrl = env.SITE_URL;

  const organizationData = {
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'Projet',
    url: baseUrl,
    description:
      "Projet est une entreprise française spécialisée dans son domaine d'expertise, proposant des services adaptés à ses clients.",
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}images/logo.webp`,
      width: 200,
      height: 60,
    },
    brand: {
      '@type': 'Brand',
      name: 'Projet',
      url: baseUrl,
      logo: `${baseUrl}images/logo.webp`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['French'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationData,
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: 'Projet',
        description:
          'Site vitrine de Projet, présentant ses services et ses informations de contact.',
        publisher: { '@id': `${baseUrl}#organization` },
        inLanguage: 'fr-FR',
      },
    ],
  };
}
