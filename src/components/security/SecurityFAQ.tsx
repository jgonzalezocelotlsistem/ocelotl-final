import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INICIO DE LA CORRECCIÓN ARQUITECTÓNICA ---

// PLANO 1: Definimos la forma de un solo objeto de FAQ.
interface FAQItemData {
  question: string;
  answer: string;
}

// PLANO 2: Definimos la forma de los "props" que recibe el sub-componente.
interface AccordionItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onClick: () => void;
}

// --- FIN DE LA CORRECCIÓN ARQUITECTÓNICA ---


const faqData: FAQItemData[] = [ // Aplicamos el tipo aquí también
  {
    question: '¿Por qué es crucial el pentesting para mi empresa?',
    answer: 'El pentesting simula un ataque real para encontrar vulnerabilidades antes que los ciberdelincuentes. Es la forma más efectiva de validar tus defensas y proteger tus datos, evitando pérdidas financieras y de reputación.'
  },
  {
    question: '¿Mi pequeña empresa realmente necesita servicios de ciberseguridad?',
    answer: 'Absolutamente. Los atacantes a menudo ven a las pymes como objetivos fáciles por tener menos defensas. Una brecha de seguridad puede ser devastadora para un negocio pequeño. Nuestros servicios son escalables y se adaptan a tu tamaño y presupuesto.'
  },
  {
    question: '¿Qué es un SOC y cómo me beneficia?',
    answer: 'Un Centro de Operaciones de Seguridad (SOC) es un equipo de expertos que monitorea tu red 24/7. Te beneficia al detectar y responder a amenazas de inmediato, reduciendo el tiempo de inactividad y el daño potencial de un ataque.'
  }
];

// Aplicamos el tipo de los props aquí
const AccordionItem = ({ item, isOpen, onClick }: AccordionItemProps) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
      aria-expanded={isOpen}
    >
      {item.question}
      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
          role="region"
        >
          <p className="pt-4 text-gray-600">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function SecurityFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {faqData.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}