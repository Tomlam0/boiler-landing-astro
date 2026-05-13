import { createClient } from '@sanity/client';

import { apiVersion, dataset, projectId, studioUrl } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'href') return false;
      if (props.sourcePath.at(-1) === 'slug') return false;
      return props.filterDefault(props);
    },
  },
});
