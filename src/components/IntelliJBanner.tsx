import intellijLogo from "@/assets/intellij-logo.png";
import { Gift } from "lucide-react";

const IntelliJBanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-lg font-semibold">Incluye licencia gratis de</span>
          </div>
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 shadow-elegant">
            <img 
              src={intellijLogo} 
              alt="IntelliJ IDEA Ultimate" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg bg-gradient-accent bg-clip-text text-transparent">
              IntelliJ IDEA Ultimate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelliJBanner;
