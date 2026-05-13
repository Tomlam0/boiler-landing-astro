import { defineQuery } from 'groq';

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  copyright,
  "faviconUrl": favicon.asset->url,
  "ogImageUrl": ogImage.asset->url,
  socialTwitter,
  socialLinkedin,
  socialGithub,
  socialInstagram,
  socialFacebook,
  socialYoutube
}`);
