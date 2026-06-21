import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './schema';
import { projectId, dataset } from './client';

export default defineConfig({
  basePath: '/studio', // La URL donde estará el panel
  projectId,
  dataset,
  title: 'Panel de Administrador - Portafolio',
  plugins: [structureTool()],
  schema,
});
