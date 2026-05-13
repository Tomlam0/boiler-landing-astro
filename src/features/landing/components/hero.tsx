import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';
import { MotionPreset } from '@/shared/components/services/motion-preset';

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 py-32">
        {/* Overline */}
        <MotionPreset fade delay={0} transition={{ duration: 0.6 }}>
          <span className="text-accent font-body text-xs font-medium tracking-widest uppercase">
            Boilerplate Astro &times; Sanity
          </span>
        </MotionPreset>

        {/* Headline — the signature element */}
        <MotionPreset
          className="flex"
          slide={{ direction: 'up', offset: 40 }}
          fade
          delay={0.1}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="font-heading text-center text-5xl leading-tight font-semibold tracking-tight
              text-balance sm:text-6xl md:text-7xl lg:text-8xl lg:leading-none"
          >
            Votre vitrine,
            <br />
            <span className="text-accent italic">sublim&eacute;e.</span>
          </h1>
        </MotionPreset>

        {/* Subtitle */}
        <MotionPreset
          className="flex"
          slide={{ direction: 'up', offset: 30 }}
          fade
          delay={0.25}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-muted-foreground max-w-xl text-center text-lg leading-relaxed
              font-light"
          >
            Un site vitrine &eacute;l&eacute;gant et administrable, con&ccedil;u pour mettre en
            valeur votre marque avec une exp&eacute;rience fluide et captivante.
          </p>
        </MotionPreset>

        {/* CTA */}
        <MotionPreset
          className="flex items-center gap-4 pt-4"
          slide={{ direction: 'up', offset: 20 }}
          fade
          delay={0.4}
          transition={{ duration: 0.5 }}
        >
          <Button asChild size="lg">
            <a href="/blog" draggable={false}>
              D&eacute;couvrir le blog
              <ArrowRightIcon className="ml-1" />
            </a>
          </Button>
          <Button variant="ghost" asChild size="lg">
            <a href="/contact" draggable={false}>
              Nous contacter
            </a>
          </Button>
        </MotionPreset>
      </div>
    </section>
  );
}
