import React from 'react';
import type { StructureResolver } from 'sanity/structure';

import { BookOpen, Cog, Home, Mail, Newspaper, Scale } from 'lucide-react';

const colorIcon = (Icon: React.ElementType) => {
  const IconComponent = () => React.createElement(Icon, { color: 'hsl(0 0% 98%)', strokeWidth: 2 });
  IconComponent.displayName = `ColorIcon(${typeof Icon === 'function' ? Icon.displayName || Icon.name || 'Component' : 'Icon'})`;
  return IconComponent;
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Articles')
        .icon(colorIcon(Newspaper))
        .child(
          S.documentTypeList('article')
            .title('Articles')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Accueil')
        .icon(colorIcon(Home))
        .child(S.document().schemaType('homepage').documentId('homepage').title('Accueil')),
      S.listItem()
        .title('Blog')
        .icon(colorIcon(BookOpen))
        .child(S.document().schemaType('blogPage').documentId('blogPage').title('Blog')),
      S.listItem()
        .title('Contact')
        .icon(colorIcon(Mail))
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact')),
      S.divider(),
      S.listItem()
        .title('Legal')
        .icon(colorIcon(Scale))
        .child(S.document().schemaType('legal').documentId('legal').title('Legal')),
      S.divider(),
      S.listItem()
        .title('Paramètres')
        .icon(colorIcon(Cog))
        .child(
          S.document().schemaType('settings').documentId('settings').title('Paramètres du site')
        ),
    ]);
