export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string; // Usaremos una imagen de placeholder
  description: string;
  details: string[];
}

export const items: PortfolioItem[] = [
  {
    id: 'prod-01',
    title: 'Sistema de Gestión de Clientes (CRM)',
    category: 'Desarrollo Web',
    imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Una plataforma web robusta para la gestión de relaciones con clientes.',
    details: ['Base de datos SQL', 'Autenticación JWT', 'API RESTful', 'Dashboard de Analíticas']
  },
  {
    id: 'prod-02',
    title: 'Servicios de Postura de Seguridad (Network)',
    category: 'Ciberseguridad',
    imageUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Servicio de hacking ético para identificar y remediar fallos de seguridad.',
    details: ['OWASP Top 10', 'Análisis de Red', 'Ingeniería Social', 'Reporte Detallado']
  },
  {
    id: 'prod-03',
    title: 'Aplicación Móvil de E-commerce',
    category: 'Desarrollo Móvil',
    imageUrl: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'App para iOS y Android con pasarela de pagos integrada.',
    details: ['React Native', 'Integración con Stripe', 'Notificaciones Push', 'Gestión de Inventario']
  }
];