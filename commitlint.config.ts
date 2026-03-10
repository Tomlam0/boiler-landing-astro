import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['gitmoji'],
  rules: {
    'subject-case': [0], // Disable case checking to allow emojis
  },
};

export default config;
