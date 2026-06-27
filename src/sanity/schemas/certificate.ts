export default {
  name: 'certificate',
  title: 'Certificados',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título del Certificado',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Redes', value: 'Redes' },
          { title: 'Seguridad', value: 'Seguridad' },
          { title: 'Ciencia de Datos', value: 'Ciencia de Datos' },
          { title: 'Hardware', value: 'Hardware' },
          { title: 'Habilidades Digitales', value: 'Habilidades Digitales' },
          { title: 'IoT', value: 'IoT' },
          { title: 'Militar y Conducta', value: 'Militar y Conducta' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'institution',
      title: 'Institución (Ej: SENATI, Cisco)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'hours',
      title: 'Cantidad de Horas',
      type: 'number',
    },
    {
      name: 'year',
      title: 'Año de emisión',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1900).max(2100),
    },
    {
      name: 'image',
      title: 'Imagen del Certificado',
      type: 'image',
      options: {
        hotspot: true, // Permite recortar la imagen en el panel
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icono (Emoji)',
      type: 'string',
      description: 'Pega aquí un emoji, ej: 🌐, 🛡️, 📊',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'origin',
      title: 'Origen',
      type: 'string',
      options: {
        list: [
          { title: 'SENATI', value: 'SENATI' },
          { title: 'Externo', value: 'Externo' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'verificationUrl',
      title: 'URL de Verificación (Opcional)',
      type: 'url',
    },
  ],
};
