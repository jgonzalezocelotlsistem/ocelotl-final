import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// --- 1. CORRECCIÓN: Importamos los íconos con sus nombres correctos ---
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

type Step = 'name' | 'email' | 'message' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [step, setStep] = useState<Step>('name');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    // La lógica de validación y envío se queda igual...
    switch (step) {
      case 'name':
        if (formData.name.trim().length < 2) {
          setError('El nombre parece demasiado corto.');
          return;
        }
        setStep('email');
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Por favor, introduce un correo válido.');
          return;
        }
        setStep('message');
        break;
      case 'message':
        if (formData.message.trim().length < 10) {
          setError('Tu mensaje debería ser un poco más largo.');
          return;
        }
        submitForm();
        break;
    }
    setError('');
  };

  const submitForm = async () => {
    setStep('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xblkrnan', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      if (response.ok) setStep('success');
      else throw new Error('Error en la respuesta del servidor.');
    } catch (e) {
      setError('No se pudo enviar el mensaje. Inténtalo más tarde.');
      setStep('error');
    }
  };
  
  const renderStep = () => {
    // --- 2. MEJORA: Creamos un contenedor para el ícono y el input ---
    const inputContainerClasses = "flex items-center border-b-2 border-gray-300 focus-within:border-secondary transition-colors py-2";
    const inputClasses = "w-full text-xl md:text-2xl bg-transparent outline-none placeholder-gray-400";
    const iconClasses = "text-gray-400 mr-4 flex-shrink-0";
    
    switch (step) {
      case 'name':
        return (
          <div className={inputContainerClasses}>
            <FiUser size={28} className={iconClasses} />
            <input type="text" placeholder="Primero, ¿cuál es tu nombre?" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClasses} autoFocus />
          </div>
        );
      case 'email':
        return (
          <div className={inputContainerClasses}>
            <FiMail size={28} className={iconClasses} />
            <input type="email" placeholder={`Gracias, ${formData.name}. Ahora tu correo...`} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClasses} autoFocus />
          </div>
        );
      case 'message':
        return (
          <div className={`${inputContainerClasses} items-start`}>
            <FiMessageSquare size={28} className={`${iconClasses} mt-2`} />
            <textarea placeholder="Perfecto. ¿En qué podemos ayudarte?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`${inputClasses} resize-none`} rows={3} autoFocus />
          </div>
        );
      case 'submitting':
        return <p className="text-xl text-gray-500">Enviando tu mensaje...</p>;
      case 'success':
        return <p className="text-xl text-green-600 font-semibold">¡Mensaje enviado! Gracias por contactarnos.</p>;
      case 'error':
        return <p className="text-xl text-red-600 font-semibold">{error}</p>;
    }
  };

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleNext}>
            {renderStep()}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {['name', 'email', 'message'].includes(step) && (
              <motion.button 
                type="submit"
                className="mt-6 bg-secondary text-white font-bold py-2 px-6 rounded-full hover:bg-primary transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Siguiente
              </motion.button>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}