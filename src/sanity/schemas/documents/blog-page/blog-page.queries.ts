import { defineQuery } from 'groq';

export const BLOG_PAGE_QUERY = defineQuery(`*[_type == "blogPage"][0]{
  seoTitle,
  seoDescription
}`);
