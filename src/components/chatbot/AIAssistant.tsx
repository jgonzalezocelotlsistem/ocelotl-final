import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

// Definimos la forma de nuestros mensajes
interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

// Nuestra "Base de Conocimiento" simple
const knowledgeBase: { [key: string]: string } = {
  "servicios": "Ofrecemos desarrollo de software a medida, pentesting y consultoría en ciberseguridad. ¿Te gustaría que te diera más detalles sobre alguno?",
  "seguridad": "Nuestros servicios de seguridad incluyen análisis de vulnerabilidades, hacking ético y monitoreo de incidentes para proteger tus activos digitales.",
  "contacto": "Puedes contactarnos a través del formulario en nuestra página de contacto o enviando un correo a contacto@ocelotlsistem.com.",
  "precio": "Nuestros precios varían según el proyecto. La mejor forma de darte una cotización es agendando una breve llamada para entender tus necesidades."
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! Soy OcelotlAsistente. Pregúntame sobre nuestros servicios, seguridad o cómo contactarnos.", sender: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll hacia el último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Añadir el mensaje del usuario
    const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const lowerCaseInput = userInput.toLowerCase();
      let botResponseText = "No estoy seguro de entender. Un especialista se pondrá en contacto. Mientras tanto, ¿puedo ayudarte con algo más sobre nuestros servicios, seguridad o formas de contacto?";
      
      for (const keyword in knowledgeBase) {
        if (lowerCaseInput.includes(keyword)) {
          botResponseText = knowledgeBase[keyword];
          break;
        }
      }
      
      const botMessage: Message = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Header del Chat */}
            <header className="bg-primary text-white p-4 rounded-t-2xl text-center font-bold shadow-md">
              Asistente Virtual
            </header>

            {/* Cuerpo de Mensajes */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex my-2 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <p className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'bot' 
                    ? 'bg-primary text-white rounded-bl-none' 
                    : 'bg-gray-200 text-gray-800 rounded-br-none'
                  }`}>
                    {msg.text}
                  </p>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex my-2 justify-start">
                  <p className="max-w-[80%] p-3 rounded-2xl bg-primary text-white rounded-bl-none">
                    <span className="typing-indicator"><span>.</span><span>.</span><span>.</span></span>
                  </p>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input del Usuario */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
                disabled={isTyping}
              />
              <button type="submit" className="ml-3 p-3 bg-secondary text-white rounded-full hover:bg-primary transition-colors" disabled={isTyping}>
                <FiSend size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir chat"
      >
        <AnimatePresence>
          {isOpen ? <FiX size={30} /> : <FiMessageSquare size={30} />}
        </AnimatePresence>
      </motion.button>
      <style>{`
        .typing-indicator span {
          animation: blink 1.4s infinite both;
          font-size: 2rem;
          line-height: 0;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}