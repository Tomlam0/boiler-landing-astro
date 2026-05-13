import { defineQuery } from 'groq';

import { IMAGE_FRAGMENT } from '@/sanity/lib/fragments';

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    image { ${IMAGE_FRAGMENT} }
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content[] {
      ...,
      _type == "image" => {
        ...,
        ${IMAGE_FRAGMENT}
      }
    },
    publishedAt,
    image { ${IMAGE_FRAGMENT} },
    seoTitle,
    seoDescription
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`);
