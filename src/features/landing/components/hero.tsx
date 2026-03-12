import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/components/ui/button';
import { MotionPreset } from '@/shared/components/services/motion-preset';

export default function Hero() {
  return (
    <section
      className="mx-auto flex min-h-screen max-w-245 flex-col items-center justify-center gap-8
        select-none"
    >
      <MotionPreset
        className="flex"
        slide={{ direction: 'up' }}
        fade
        delay={0.1}
        transition={{ duration: 0.4 }}
      >
        <h1
          className="text-center text-3xl leading-tight font-bold tracking-tighter md:text-5xl
            lg:leading-[1.1]"
        >
          Project boilerplate
        </h1>
      </MotionPreset>
      <MotionPreset
        className="flex"
        slide={{ direction: 'up' }}
        fade
        delay={0.2}
        transition={{ duration: 0.4 }}
      >
        <p className="max-w-187.5 text-center text-lg font-light text-foreground">
          Découvrez notre site vitrine élégant et intuitif, conçu pour mettre en valeur votre marque
          tout en offrant une expérience utilisateur fluide et captivante, tant sur desktop que sur
          mobile.
        </p>
      </MotionPreset>
      <MotionPreset
        className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6"
        slide={{ direction: 'up' }}
        fade
        delay={0.3}
        transition={{ duration: 0.4 }}
      >
        <Button variant="default" asChild>
          <a href="/" draggable={false}>
            Visiter
            <ArrowRightIcon className="ml-2" />
          </a>
        </Button>
      </MotionPreset>
    </section>
  );
}
