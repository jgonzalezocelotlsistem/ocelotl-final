import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioItem } from '../../data/portfolio-items';

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioModal({ items }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.itemId) {
        document.body.style.overflow = 'hidden';
        setSelectedId(customEvent.detail.itemId);
      }
    };
    document.addEventListener('openPortfolioModal', handleOpenModal);
    
    return () => {
      document.removeEventListener('openPortfolioModal', handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    setSelectedId(null);
  }

  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            layoutId={selectedItem.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="p-8">
              <span className="text-secondary font-bold">{selectedItem.category}</span>
              <h2 className="text-3xl font-bold text-primary my-2">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-6">{selectedItem.description}</p>
              <h3 className="text-xl font-bold text-primary mb-3">Detalles Clave</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedItem.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}