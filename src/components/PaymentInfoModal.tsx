import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PaymentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  imageUrl?: string;
  title?: string;
  conditions?: string[];
  note?: string;
}

const PaymentInfoModal = ({ 
  isOpen, 
  onClose, 
  onContinue, 
  imageUrl = "/lovable-uploads/e2b392f1-4e3e-4231-a8b4-3e3bdcd41721.png",
  title = "Información Importante - Planes de Cuotas",
  conditions = [
    "NO debe estar aplicado ningún cupón de descuento",
    "Debes ingresar una tarjeta de crédito válida", 
    "Marca la opción \"Pagar en cuotas (meses sin intereses)\""
  ],
  note = "Una vez que completes estos pasos, podrás seleccionar entre las diferentes opciones de cuotas (3, 6, 9 o 12 meses)."
}: PaymentInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[98vh] p-3 overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="w-4 h-4 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-2 min-h-0">
          <div className="bg-muted/30 p-2 rounded-lg border border-primary/20 flex-shrink-0">
            <h3 className="font-semibold text-foreground mb-1 text-sm">
              Para acceder a las opciones de meses sin intereses:
            </h3>
            <ul className="space-y-0.5 text-xs text-muted-foreground">
              {conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={imageUrl} 
              alt="Opciones de planes de cuotas disponibles" 
              className="w-full h-auto max-h-[50vh] object-contain"
            />
          </div>
          
          <div className="bg-tech-cyan/10 p-1.5 rounded-lg border border-tech-cyan/20 flex-shrink-0">
            <p className="text-xs text-foreground">
              <strong>Nota:</strong> {note}
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2 mt-2 flex-shrink-0">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancelar
          </Button>
          <Button onClick={onContinue} className="bg-gradient-accent hover:opacity-90 text-white" size="sm">
            Entendido, Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentInfoModal;