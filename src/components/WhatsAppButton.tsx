import { useState, useEffect } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.svg";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Abrir chat cuando el usuario haga scroll más allá del video
  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        const videoRect = videoElement.getBoundingClientRect();
        const videoBottom = videoRect.bottom;
        
        // Si el video ya pasó por completo (bottom < 0), abrir el chat
        if (videoBottom < 0) {
          setIsOpen(true);
          // Remover el event listener después de abrir para que solo se abra una vez
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cerrar chat al hacer clic en la página
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatContainer = document.querySelector('[data-chat-container]');
      const whatsappButton = document.querySelector('[data-whatsapp-button]');
      
      if (isOpen && 
          chatContainer && 
          whatsappButton &&
          !chatContainer.contains(event.target as Node) &&
          !whatsappButton.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsFadingOut(false);
    }, 300); // Duración del fadeout
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/523310881011?text=Hola%20Joaquín,%20me%20interesa%20el%20curso%20de%20Java', '_blank');
    handleClose();
  };

  return (
    <>
      <button
        data-whatsapp-button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        style={{ 
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 0 30px rgba(37, 211, 102, 0.3)'
        }}
        aria-label="Contactar por WhatsApp"
      >
        <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7" />
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-card border border-border text-card-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-card">
          Contactar por WhatsApp
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45"></div>
        </div>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className={`fixed bottom-20 right-6 z-40 w-80 max-w-full transition-all duration-300 ${
          isFadingOut 
            ? 'animate-out fade-out slide-out-to-bottom-4' 
            : 'animate-in slide-in-from-bottom-4 fade-in'
        }`}>
          {/* Chat Container */}
          <div data-chat-container className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-3 p-4" style={{ background: 'linear-gradient(135deg, #4CAF50, #2E7D32)' }}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/f5bf41a1-4ab7-4d61-a0a5-526490853347.png" 
                  alt="Joaquín" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-base">Joaquín - Instructor Java</h3>
                <p className="text-sm text-white/90">Típicamente responderemos en minutos</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            
            {/* Messages */}
            <div className="p-4 bg-gray-100 space-y-3 min-h-[200px]">
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm max-w-[80%] border border-gray-200">
                  <p className="text-gray-800 text-sm">¡Hola!</p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-[85%] border border-gray-200">
                  <p className="text-gray-800 text-sm">
                    ¿Estás pensando en aprender Java y tienes dudas?
                  </p>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm max-w-[80%] border border-gray-200">
                  <p className="text-gray-800 text-sm">Yo te puedo ayudar.</p>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="p-4 bg-gray-100">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 text-white font-medium rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg"
                style={{ background: 'linear-gradient(135deg, #25D366, #20B358)' }}
              >
                <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
                Contactar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;