import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = 'uer4d251'; // El ID del proyecto de Sanity
export const dataset = 'production'; // Dataset por defecto
export const apiVersion = '2024-06-20'; // Fecha de API actual

// Cliente para acceder a los datos de Sanity
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` si quieres asegurar los datos más recientes de inmediato, pero `true` es mejor para producción y velocidad
});

// Builder para procesar las URLs de las imágenes almacenadas en Sanity
const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
