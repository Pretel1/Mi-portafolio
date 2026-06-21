export default {
  name: 'profile',
  title: 'Perfil y Configuración',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'profession',
      title: 'Profesión / Especialidad',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'Texto de la sección "Sobre Mí"',
      type: 'text',
    },
    {
      name: 'cvExperience',
      title: 'Experiencia Laboral (CV)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Puesto / Cargo', type: 'string' },
            { name: 'company', title: 'Empresa', type: 'string' },
            { name: 'period', title: 'Período (Ej: Ene 2024 - Presente)', type: 'string' },
            { name: 'description', title: 'Descripción de las tareas', type: 'text' },
          ],
        },
      ],
    },
  ],
};
