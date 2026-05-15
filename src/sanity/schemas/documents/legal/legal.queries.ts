import { defineQuery } from 'groq';

export const LEGAL_QUERY = defineQuery(`*[_type == "legal"][0]{
  lastUpdated,
  privacyPolicy,
  termsAndConditions,
  cookiePolicy,
  seoTitle,
  seoDescription
}`);
