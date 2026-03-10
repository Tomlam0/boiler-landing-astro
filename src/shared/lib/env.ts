import { z } from 'zod';

const envSchema = z.object({
  SITE_URL: z.url(),
});

function getEnv() {
  if (import.meta.env.SKIP_ENV_VALIDATION) {
    return import.meta.env as unknown as z.infer<typeof envSchema>;
  }

  const parsed = envSchema.safeParse({
    SITE_URL: import.meta.env.SITE_URL || 'http://localhost:4321',
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.issues);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = getEnv();
