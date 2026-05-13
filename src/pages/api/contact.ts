import type { APIRoute } from 'astro';
import { z } from 'zod';

import { contactSchema } from '@/features/contact/schemas/contact.schema';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('honeypot') ?? '',
  };

  // Bot detection: honeypot field should be empty
  if (raw.honeypot) {
    return new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return new Response(
      JSON.stringify({
        status: 'error',
        errors: z.flattenError(result.error).fieldErrors,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // TODO: implement email sending (e.g. Resend, Cloudflare Email Routing)
  // await sendEmail(result.data);
  console.log('[contact] new submission:', result.data);

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
