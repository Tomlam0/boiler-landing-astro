// Tags stamped on cached responses so the webhook can purge them granularly.
// Add via `Astro.response.headers.append('Cache-Tag', ...)` in page frontmatter
// (or the helper below). Each tag = one purge axis.
//
//   settings       → footer / favicon / OG image — touches every page
//   homepage       → /
//   blogPage       → /blog
//   contactPage    → /contact
//   legal          → /mentions-legales
//   article-<id>   → /blog/<slug> of that specific article
//   blog           → /blog list (refreshes when any article is created/deleted)

// Accept anything exposing `headers` — covers both real Responses (API routes)
// and `Astro.response` (ResponseInit with a readonly Headers reference).
export function addCacheTags(target: { headers: Headers }, ...tags: string[]) {
  for (const tag of tags) target.headers.append('Cache-Tag', tag);
}

// Maps a mutated Sanity doc → list of tags to purge. Strip the `drafts.` prefix
// so a draft edit and a published mutation both target the same cache entries.
export function tagsForDoc(doc: { _id: string; _type: string }): string[] {
  const id = doc._id.replace(/^drafts\./, '');

  switch (doc._type) {
    case 'settings':
      return ['settings'];
    case 'homepage':
      return ['homepage'];
    case 'blogPage':
      return ['blogPage', 'blog'];
    case 'contactPage':
      return ['contactPage'];
    case 'legal':
      return ['legal'];
    case 'article':
      // Article changes refresh both the list page and the article page.
      return ['blog', `article-${id}`];
    default:
      return [];
  }
}
