import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-course-darker border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Sígueme en mis redes sociales</h3>

          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.facebook.com/profile.php?id=61579829160975"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Facebook className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>

            <a
              href="https://instagram.com/joaquinc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Instagram className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>

            <a
              href="https://www.linkedin.com/in/joaquincr/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 group"
            >
              <Linkedin className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 Joaquín C. - Java Developer | Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
