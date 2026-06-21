export type CertificateCategory =
  | 'Todos'
  | 'Redes'
  | 'Seguridad'
  | 'Ciencia de Datos'
  | 'Hardware'
  | 'Habilidades Digitales'
  | 'IoT'
  | 'Militar y Conducta';

export interface Certificate {
  id: string;
  title: string;
  category: CertificateCategory;
  institution: string;
  hours?: number;
  year: number;
  filename: string;
  icon: string;
  type: 'pdf' | 'image';
  origin: 'SENATI' | 'Externo';
  verificationUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'ccna-intro-networks',
    title: 'CCNA: Introducción a Redes',
    category: 'Redes',
    institution: 'Cisco Networking Academy · SENATI',
    hours: 70,
    year: 2026,
    filename: 'CCNA Introduction to Networks.png',
    icon: '🌐',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/27c75cf9-7147-46c4-a313-fd782f371a63/public_url',
  },
  {
    id: 'ethical-hacker',
    title: 'Hacker Ético',
    category: 'Seguridad',
    institution: 'CyberGames · Cisco · UTP',
    hours: 70,
    year: 2026,
    filename: 'Ethical Hacker.png',
    icon: '🛡️',
    type: 'image',
    origin: 'Externo',
    verificationUrl: 'https://www.credly.com/badges/9db3352c-a1ac-481a-bb16-bd0dc858ca6c/public_url',
  },
  {
    id: 'english-for-it-1',
    title: 'English for IT 1',
    category: 'Habilidades Digitales',
    institution: 'Cisco Networking Academy · SENATI',
    hours: 50,
    year: 2026,
    filename: 'English_for_IT_1_certificate_.pdf',
    icon: '🗣️',
    type: 'pdf',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/a8a74690-e66b-439a-8715-2037ce899720/public_url',
  },
  {
    id: 'data-science',
    title: 'Introducción a la Ciencia de Datos',
    category: 'Ciencia de Datos',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Introduction to Data Science.png',
    icon: '📊',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/b2827544-2aa5-4119-9b89-c1e933573f5f/public_url',
  },
  {
    id: 'hardware-basics',
    title: 'Conceptos Básicos de Hardware',
    category: 'Hardware',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Computer Hardware Basics.png',
    icon: '🖥️',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/d4c819f4-edda-4ef2-ac01-5509191735e7/public_url',
  },
  {
    id: 'network-basics',
    title: 'Conceptos Básicos de Redes',
    category: 'Redes',
    institution: 'Academia SENATI',
    hours: 22,
    year: 2025,
    filename: 'Conceptos básicos de redes.png',
    icon: '📡',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/f6dc975e-4e9c-4f0b-a98d-235cea15a382/public_url',
  },
  {
    id: 'iot-digital-transformation',
    title: 'Introducción a IoT y Transformación Digital',
    category: 'IoT',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Introducción al Internet de las Cosas y Transformación Digital.png',
    icon: '🔗',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/b396e56a-1948-4e9d-9761-50e8c91ff520/public_url',
  },
  {
    id: 'digital-content-creation',
    title: 'Creación de Contenido Digital y Colaboración',
    category: 'Habilidades Digitales',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Create Digital Content, Communicate and Collaborate Online.png',
    icon: '✨',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/dabc2008-28da-4bcf-b3bb-fc1890fb825b/public_url',
  },
  {
    id: 'digital-awareness',
    title: 'Conciencia Digital',
    category: 'Habilidades Digitales',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Conciencia digital.png',
    icon: '🔐',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/053dd8a6-8f94-4ce3-bf11-4662cb823e6b/public_url',
  },
  {
    id: 'computers-mobile-devices',
    title: 'Uso de Computadoras y Dispositivos Móviles',
    category: 'Habilidades Digitales',
    institution: 'Academia SENATI',
    hours: 6,
    year: 2025,
    filename: 'Uso de Computadoras y Dispositivos Móviles.png',
    icon: '📱',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/0267aed0-26cb-447b-b52b-885b7895a1de/public_url',
  },
  {
    id: 'course-attendance-1',
    title: 'Asistencia a Curso (Red Hat System Administration I)',
    category: 'Habilidades Digitales',
    institution: 'SENATI',
    year: 2026,
    filename: 'Red Hat System Administration I.png',
    icon: '📑',
    type: 'image',
    origin: 'SENATI',
    verificationUrl: 'https://www.credly.com/badges/defb1ea8-4769-4cdf-a588-58eba768eca0/public_url',
  },
  {
    id: 'conducta',
    title: 'Certificado de Conducta',
    category: 'Militar y Conducta',
    institution: 'Fuerzas Armadas del Perú',
    year: 2024,
    filename: 'certificado de conducta.jpeg',
    icon: '🎖️',
    type: 'image',
    origin: 'Externo',
  },
  {
    id: 'especialidad',
    title: 'Certificado de Especialidad - Instructor Militar',
    category: 'Militar y Conducta',
    institution: 'Fuerzas Armadas del Perú',
    year: 2024,
    filename: 'certificado de especialidad.jpeg',
    icon: '🎖️',
    type: 'image',
    origin: 'Externo',
  },
  {
    id: 'licenciamiento',
    title: 'Certificado de Licenciamiento',
    category: 'Militar y Conducta',
    institution: 'Fuerzas Armadas del Perú',
    year: 2024,
    filename: 'certificado de licenciamiento.jpeg',
    icon: '🎖️',
    type: 'image',
    origin: 'Externo',
  },
];

export const categories: CertificateCategory[] = [
  'Todos',
  'Redes',
  'Seguridad',
  'Ciencia de Datos',
  'Hardware',
  'Habilidades Digitales',
  'IoT',
  'Militar y Conducta',
];
