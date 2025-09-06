import { useState, useEffect } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.svg";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Abrir chat cuando el usuario haga scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Se abre después de hacer scroll de 100px
        setIsOpen(true);
        // Remover el event listener después de abrir para que solo se abra una vez
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/523310881011?text=Hola%20Joaquín,%20me%20interesa%20el%20curso%20de%20Java', '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <button
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
        <div className="fixed bottom-20 right-6 z-40 w-80 max-w-full animate-in slide-in-from-bottom-4 duration-300">
          {/* Chat Container */}
          <div className="bg-card border border-border rounded-2xl shadow-glow-lg">
            {/* Header */}
            <div 
              className="flex items-center gap-3 p-4 rounded-t-2xl text-white"
              style={{ 
                background: 'linear-gradient(135deg, #25D366, #128C7E)'
              }}
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold">Joaquín - Instructor Java</h3>
                <p className="text-sm text-white/90">En línea</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Message */}
            <div className="p-4 space-y-3">
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm text-foreground">
                  ¡Hola! 👋 Soy Joaquín, tu instructor de Java.
                </p>
              </div>
              
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm text-foreground">
                  ¿Te interesa el curso? Escríbeme por WhatsApp y te ayudo con cualquier duda sobre el contenido, metodología o formas de pago. 🚀
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  💡 ¡Oferta especial limitada activa!
                </p>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="p-4 border-t border-border">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                }}
              >
                <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5" />
                Enviar mensaje por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;