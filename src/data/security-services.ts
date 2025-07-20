import type { IconType } from 'react-icons';
import { FiShield, FiBarChart2, FiCode } from 'react-icons/fi';

export interface SecurityService {
  id: string;
  title: string;
  icon: IconType;
  content: string;
}

export const services: SecurityService[] = [
  {
    id: 'pentesting',
    title: 'Pentesting',
    icon: FiShield,
    content: 'Simulamos ataques cibernéticos controlados para encontrar y evaluar las vulnerabilidades en tus sistemas, redes y aplicaciones. Te entregamos un reporte detallado con los hallazgos y un plan de remediación claro para fortalecer tus defensas antes de que un atacante real pueda explotarlas.'
  },
  {
    id: 'analisis',
    title: 'Análisis de Vulnerabilidades',
    icon: FiBarChart2,
    content: 'Realizamos un escaneo exhaustivo de tu infraestructura tecnológica utilizando herramientas automatizadas y análisis manual para identificar debilidades conocidas. Este servicio es ideal para mantener una postura de seguridad proactiva y cumplir con normativas de la industria.'
  },
  {
    id: 'auditoria',
    title: 'Auditoría de Código',
    icon: FiCode,
    content: 'Nuestros expertos revisan el código fuente de tus aplicaciones línea por línea para encontrar fallos de seguridad, errores de lógica de negocio y vulnerabilidades ocultas que los escáneres automatizados no pueden detectar. Asegura que tu software sea robusto desde su núcleo.'
  }
];