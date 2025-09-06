import whatsappLogo from "@/assets/whatsapp-logo.svg";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/523310881011?text=Hola%21%20Me%20interesa%20el%20curso%20de%20Java.%20%C2%BFPuedes%20asesorarme%3F', '_blank');
  };

  return (
    <button
      onClick={handleClick}
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
  );
};

export default WhatsAppButton;