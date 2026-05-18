import { env } from '@/shared/lib/env';
import type { SeoMetadata } from '@/shared/lib/seo/metadata';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateStructuredData(metadata: SeoMetadata, breadcrumbs?: BreadcrumbItem[]) {
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
    sameAs: [
      // Add social profiles here:
      // 'https://www.linkedin.com/company/projet',
      // 'https://twitter.com/projet',
    ],
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

  const graph: Record<string, unknown>[] = [
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
    {
      '@type': 'WebPage',
      '@id': `${metadata.url}#webpage`,
      url: metadata.url,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': `${baseUrl}#website` },
      inLanguage: 'fr-FR',
    },
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${metadata.url}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
