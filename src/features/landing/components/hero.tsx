import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';
import { MotionPreset } from '@/shared/components/services/motion-preset';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-36 pb-32
        select-none"
    >
      {/* Decorative line */}
      <MotionPreset
        className="absolute top-1/4 left-1/2 h-32 w-px -translate-x-1/2 bg-accent/20"
        fade
        slide={{ direction: 'down', offset: 40 }}
        delay={0}
        transition={{ duration: 1.2 }}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        {/* Eyebrow */}
        <MotionPreset className="flex" fade delay={0.1} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Site vitrine &mdash; Portfolio &mdash; Landing page
          </span>
        </MotionPreset>

        {/* Headline — extreme serif scale */}
        <MotionPreset
          className="flex"
          slide={{ direction: 'up', offset: 30 }}
          fade
          delay={0.2}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-center font-heading text-5xl leading-none font-normal tracking-tight
              text-balance sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            Votre marque, <em className="text-accent">sublimée</em>
          </h1>
        </MotionPreset>

        {/* Description */}
        <MotionPreset
          className="flex"
          slide={{ direction: 'up', offset: 20 }}
          fade
          delay={0.35}
          transition={{ duration: 0.7 }}
        >
          <p
            className="max-w-xl text-center text-lg leading-relaxed font-light
              text-muted-foreground"
          >
            Un site élégant et intuitif qui met en valeur votre identité, avec une expérience fluide
            et captivante sur tous les écrans.
          </p>
        </MotionPreset>

        {/* CTAs */}
        <MotionPreset
          className="flex w-full flex-col items-center gap-4 pt-4 sm:w-auto sm:flex-row"
          slide={{ direction: 'up', offset: 15 }}
          fade
          delay={0.5}
          transition={{ duration: 0.6 }}
        >
          <Button variant="default" size="lg" asChild>
            <a href="/" draggable={false}>
              Découvrir
              <ArrowRightIcon className="ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/contact" draggable={false}>
              Nous contacter
            </a>
          </Button>
        </MotionPreset>
      </div>

      {/* Bottom decorative element */}
      <MotionPreset
        className="absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        fade
        delay={0.8}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">
          Défiler
        </span>
        <div className="h-10 w-px bg-foreground/15" />
      </MotionPreset>
    </section>
  );
}
