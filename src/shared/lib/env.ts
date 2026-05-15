import { z } from 'zod';

const envSchema = z.object({
  SITE_URL: z.url().transform((url) => (url.endsWith('/') ? url : `${url}/`)),

  // Sanity CMS — required (landing depends on Sanity for content)
  SANITY_PROJECT_ID: z.string().min(1, 'SANITY_PROJECT_ID is required'),
  SANITY_DATASET: z.string().default('production'),
});

function getEnv() {
  if (import.meta.env.SKIP_ENV_VALIDATION) {
    return import.meta.env as unknown as z.infer<typeof envSchema>;
  }

  const parsed = envSchema.safeParse({
    SITE_URL: import.meta.env.SITE_URL || 'http://localhost:4321',
    SANITY_PROJECT_ID: import.meta.env.SANITY_PROJECT_ID,
    SANITY_DATASET: import.meta.env.SANITY_DATASET,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.issues);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = getEnv();
