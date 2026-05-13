import type { SchemaTypeDefinition } from 'sanity';

import { article } from './documents/article/article.schema';
import { blogPage } from './documents/blog-page/blog-page.schema';
import { contactPage } from './documents/contact-page/contact-page.schema';
import { homepage } from './documents/homepage/homepage.schema';
import { legal, legalText } from './documents/legal/legal.schema';
import { settings } from './documents/settings/settings.schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, blogPage, contactPage, homepage, legal, legalText, settings],
};
