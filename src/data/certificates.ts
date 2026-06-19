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
