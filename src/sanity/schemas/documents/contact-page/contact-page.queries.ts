import { defineQuery } from 'groq';

export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage"][0]{
  seoTitle,
  seoDescription
}`);
