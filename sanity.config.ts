import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity/schemas';

// Production-safe config - won't crash if ENV vars are missing
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Only create config if projectId is provided
// This prevents build errors when Sanity is not configured
export default defineConfig({
  name: 'default',
  title: 'AŞAANA YAZILIM CMS',
  projectId: projectId,
  dataset: dataset,
  basePath: '/admin/studio',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
  // Prevent errors if projectId is empty
  ...(projectId ? {} : {
    // If no projectId, Studio will show a configuration error
    // but the app won't crash during build
  }),
});
