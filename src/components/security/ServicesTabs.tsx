import React, { useState } from 'react';
import type { SecurityService } from '../../data/security-services';

interface Props {
  services: SecurityService[];
  className?: string;
}

export default function ServicesTabs({ services }: Props) {
  // Guarda para evitar errores si los servicios no llegan
  if (!services || services.length === 0) {
    return null;
  }

  const [activeTab, setActiveTab] = useState(services[0].id);

  const activeService = services.find(service => service.id === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Pestañas de Navegación */}
      <div className="flex flex-wrap border-b border-gray-200 mb-8">
        {services.map(service => {
          // --- ESTA ES LA LÍNEA CRÍTICA QUE SOLUCIONA EL ERROR ---
          // Asignamos el ícono a una variable que empieza con Mayúscula.
          const IconComponent = service.icon;
          
          return (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 text-lg font-semibold 
                transition-colors duration-300 outline-none
                ${activeTab === service.id 
                  ? 'border-b-2 border-secondary text-primary' 
                  : 'text-gray-500 hover:text-primary'
                }
              `}
            >
              {/* Usamos la variable con Mayúscula para que React la reconozca */}
              <IconComponent className="w-5 h-5" />
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Pestaña Activa */}
      <div>
        {activeService && (
          <div className="prose prose-lg max-w-none">
            <p>{activeService.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}