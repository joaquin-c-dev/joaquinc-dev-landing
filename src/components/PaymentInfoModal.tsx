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
}

const PaymentInfoModal = ({ isOpen, onClose, onContinue }: PaymentInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[90vw] max-h-[95vh] p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-4 h-4 text-primary" />
            Información Importante - Planes de Cuotas
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          <div className="bg-muted/30 p-3 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2 text-sm">
              Para acceder a las opciones de meses sin intereses:
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>NO debe estar aplicado ningún cupón de descuento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Debes ingresar una tarjeta de crédito válida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Marca la opción "Pagar en cuotas (meses sin intereses)"</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/e2b392f1-4e3e-4231-a8b4-3e3bdcd41721.png" 
              alt="Opciones de planes de cuotas disponibles" 
              className="w-full h-auto max-h-[250px] object-contain"
            />
          </div>
          
          <div className="bg-tech-cyan/10 p-2 rounded-lg border border-tech-cyan/20">
            <p className="text-xs text-foreground">
              <strong>Nota:</strong> Una vez que completes estos pasos, podrás seleccionar 
              entre las diferentes opciones de cuotas (3, 6, 9 o 12 meses).
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2 mt-3">
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