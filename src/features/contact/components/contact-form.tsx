'use client';

import { useState, type SubmitEventHandler } from 'react';

import { Button } from '@/shared/components/ui/button';

type FormStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; errors: Record<string, string[]> };

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setStatus({ kind: 'submitting' });

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as
        | { status: 'success' }
        | { status: 'error'; errors: Record<string, string[]> };

      if (data.status === 'success') {
        setStatus({ kind: 'success' });
      } else {
        setStatus({ kind: 'error', errors: data.errors ?? {} });
      }
    } catch {
      setStatus({
        kind: 'error',
        errors: { _form: ['Une erreur est survenue. Merci de réessayer.'] },
      });
    }
  };

  if (status.kind === 'success') {
    return (
      <div className="rounded-lg border border-accent/20 bg-accent/10 p-8 text-foreground">
        <p className="font-heading text-lg font-semibold">Message envoy&eacute;</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Nous vous r&eacute;pondrons dans les plus brefs d&eacute;lais.
        </p>
      </div>
    );
  }

  const errors = status.kind === 'error' ? status.errors : {};
  const isPending = status.kind === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot field — hidden from humans, traps bots */}
      <input
        name="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only absolute"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm
            text-foreground transition-colors duration-200 focus:border-accent focus:ring-1
            focus:ring-accent focus:outline-none"
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name[0]}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm
            text-foreground transition-colors duration-200 focus:border-accent focus:ring-1
            focus:ring-accent focus:outline-none"
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email[0]}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3
            text-sm text-foreground transition-colors duration-200 focus:border-accent focus:ring-1
            focus:ring-accent focus:outline-none"
        />
        {errors.message ? <p className="text-sm text-destructive">{errors.message[0]}</p> : null}
      </div>

      {errors._form ? <p className="text-sm text-destructive">{errors._form[0]}</p> : null}

      <Button type="submit" disabled={isPending} size="lg" className="mt-2 w-fit">
        {isPending ? 'Envoi en cours…' : 'Envoyer le message'}
      </Button>
    </form>
  );
}
