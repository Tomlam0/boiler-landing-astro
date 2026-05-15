import { defineQuery } from 'groq';

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  seoTitle,
  seoDescription
}`);
