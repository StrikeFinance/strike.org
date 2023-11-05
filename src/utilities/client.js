import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'm2neccov',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-06-01'
});

export default client;
