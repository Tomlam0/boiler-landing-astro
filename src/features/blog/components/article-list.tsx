import { MotionPreset } from '@/shared/components/services/motion-preset';

import { urlFor } from '@/sanity/content/image';
import type { ARTICLES_QUERY_RESULT } from '@/sanity/sanity.types';

interface ArticleListProps {
  articles: ARTICLES_QUERY_RESULT;
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <section
      className="flex w-full flex-col items-center px-6 pt-20 pb-24 md:pt-28 md:pb-32 lg:px-8"
    >
      <div className="flex w-full max-w-5xl flex-col items-start gap-16 md:gap-20">
        {/* Header */}
        <header className="flex w-full max-w-xl flex-col gap-4">
          <MotionPreset
            slide={{ direction: 'up', offset: 30 }}
            fade
            delay={0.1}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium tracking-widest text-accent uppercase">Blog</span>
          </MotionPreset>
          <MotionPreset
            slide={{ direction: 'up', offset: 30 }}
            fade
            delay={0.15}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
              Articles
            </h1>
          </MotionPreset>
          <MotionPreset
            slide={{ direction: 'up', offset: 20 }}
            fade
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              D&eacute;couvrez nos derniers articles et actualit&eacute;s.
            </p>
          </MotionPreset>
        </header>

        {/* Articles */}
        {articles.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {articles.map((article, index) => (
              <MotionPreset
                key={article._id}
                slide={{ direction: 'up', offset: 30 }}
                fade
                delay={0.25 + index * 0.08}
                transition={{ duration: 0.5 }}
              >
                <a
                  href={`/blog/${article.slug}`}
                  draggable={false}
                  className="group rounded-lg focus-visible:ring-2 focus-visible:ring-ring
                    focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <article className="flex flex-col gap-4">
                    {/* Image */}
                    <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-muted">
                      {article.image?.asset ? (
                        <img
                          src={urlFor(article.image).url()}
                          alt={article.image.alt || article.title || ''}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover
                            transition-transform duration-500 group-hover:scale-105"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
                          draggable={false}
                        />
                      ) : (
                        <div
                          className="flex h-full items-center justify-center
                            text-muted-foreground/30"
                        >
                          <svg
                            className="size-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      {article.publishedAt ? (
                        <time className="text-xs tracking-wide text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      ) : null}

                      <h2
                        className="line-clamp-2 font-heading text-xl leading-snug font-semibold
                          tracking-tight transition-colors duration-200 group-hover:text-accent
                          md:text-2xl"
                      >
                        {article.title}
                      </h2>

                      {article.excerpt ? (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {article.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </a>
              </MotionPreset>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-4 py-20 text-center">
            <p className="font-heading text-xl text-muted-foreground">
              Aucun article pour le moment
            </p>
            <p className="text-sm text-muted-foreground/70">
              Les articles appara&icirc;tront ici une fois publi&eacute;s depuis le studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
