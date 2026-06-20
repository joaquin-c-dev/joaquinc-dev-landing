import type { LegacyMockCourse } from "./course-mapper";

const OG_BASE =
  "https://res.cloudinary.com/joaquin-test/image/upload/w_1200,h_630,c_fill,f_auto,q_auto/v1757136018/joaquin%20c.%20dev/java%20desde%20cero/Screenshot_at_Aug_26_23-53-12_vavqyx.png";

export const MOCK_COURSES: LegacyMockCourse[] = [
  {
    slug: "java-intermedio",
    title: "Java Intermedio",
    subtitle: "Spring Boot Profesional",
    description:
      "Lleva tus conocimientos de Java al siguiente nivel. Aprende patrones de diseño, testing profesional, seguridad con JWT, persistencia con JPA y mucho más para crear aplicaciones backend robustas y listas para producción.",
    level: "Intermedio a Avanzado",
    durationInHours: 40,
    stripeUrl:
      "https://buy.stripe.com/6oU4gB1mm91hgjLavab3q05?client_reference_id=69e4199d168fb564dd8e7a78",
    stripeCoupon: "INTERMEDIO",
    hero: {
      titleLine1: "Java",
      titleHighlight: "Intermedio",
    },
    seo: {
      title: "Curso de Java Intermedio con Spring Boot | Joaquín C. Dev",
      description:
        "Curso de Java Intermedio en vivo: Spring Boot, APIs REST, Spring Security con JWT, Spring Data JPA, RabbitMQ, Docker y testing profesional con proyectos reales.",
      keywords: [
        "java intermedio",
        "spring boot",
        "spring security",
        "apis rest java",
        "jwt spring",
        "spring data jpa",
        "docker java",
      ],
      ogImage: OG_BASE,
    },
    listing: {
      icon: "rocket",
      color: "from-tech-purple to-pink-500",
      bgColor: "bg-tech-purple/10",
      borderColor: "border-tech-purple/20",
      features: ["Spring Boot", "APIs REST", "Spring Security"],
      showOnHome: true,
    },
    promo: {
      endsAt: "2026-06-28T23:59:59-06:00",
      bannerDesktop:
        "Java Intermedio: $2,000 de descuento + hasta 12 meses sin intereses",
      bannerMobile: "$2,000 OFF + 12MSI",
    },
    curriculum: {
      sectionId: "temario-intermedio",
      summary:
        "8 módulos con 40 horas de contenido práctico y proyectos reales",
      modules: [
        {
          icon: "boxes",
          title: "Patrones de Diseño y Arquitectura",
          duration: "5 hrs",
          topics: [
            "Principios SOLID aplicados a proyectos reales",
            "Patrones más usados en backend: Strategy",
            "Factory",
            "Template Method",
            "Decorator",
          ],
        },
        {
          icon: "test-tube",
          title: "Testing Profesional: JUnit, Mockito y TDD",
          duration: "5 hrs",
          topics: [
            "Fundamentos de testing unitario y buenas prácticas",
            "JUnit 5: estructura, anotaciones y assertions",
            "Uso de Mockito para mocks, stubs y spies",
            "Introducción a TDD (Test Driven Development)",
            "Testing de servicios y lógica de negocio",
          ],
        },
        {
          icon: "layers",
          title: "Introducción a Spring y Spring Boot",
          duration: "5 hrs",
          topics: [
            "¿Qué es Spring y Spring Boot?",
            "Conceptos previos a Spring",
            "Inyección de dependencias y el contenedor IoC",
            "Configuración de un proyecto con Spring Initializr",
            "Dependencias starter de Spring Boot",
          ],
        },
        {
          icon: "shield",
          title: "Seguridad: JWT con Spring Security",
          duration: "5 hrs",
          topics: [
            "Fundamentos de autenticación y autorización",
            "Configuración de Spring Security",
            "Implementación de JWT (login, filtros y validación)",
            "Protección de endpoints y roles de usuario",
            "Manejo de errores y seguridad básica en APIs REST",
          ],
        },
        {
          icon: "database",
          title: "Persistencia de datos con Spring Data JPA (MySQL)",
          duration: "5 hrs",
          topics: [
            "Configuración de JPA con MySQL",
            "Entidades, repositorios y relaciones",
            "Queries con métodos derivados y JPQL",
            "Paginación y ordenamiento",
            "Buenas prácticas de acceso a datos",
          ],
        },
        {
          icon: "message-square",
          title: "Asincronía: RabbitMQ y Cron Jobs",
          duration: "5 hrs",
          topics: [
            "Conceptos de mensajería y procesamiento asíncrono",
            "Introducción a RabbitMQ y colas",
            "Productores y consumidores con Spring AMQP",
            "Manejo de tareas programadas con Cron Jobs",
            "Casos de uso reales (emails, procesos en background)",
          ],
        },
        {
          icon: "file-text",
          title: "Documentación con Swagger / OpenAPI",
          duration: "5 hrs",
          topics: [
            "Importancia de documentar APIs",
            "Configuración de Swagger en Spring Boot",
            "Uso de anotaciones OpenAPI",
            "Documentación de endpoints, parámetros y respuestas",
            "Buenas prácticas para APIs consumibles",
          ],
        },
        {
          icon: "container",
          title: "Docker para desarrollo",
          duration: "5 hrs",
          topics: [
            "¿Qué es Docker y por qué usarlo?",
            "Creación de Dockerfiles para aplicaciones Java",
            "Uso de imágenes y contenedores",
            "Docker Compose para entornos locales",
            "Flujo de desarrollo con Docker",
          ],
        },
      ],
    },
    prerequisites: {
      intro:
        "Para aprovechar al máximo este curso, te recomendamos cumplir con los siguientes requisitos",
      items: [
        "Java Basics",
        "POO (Programación Orientada a Objetos)",
        "Nociones de Spring y Spring Boot",
        "Desarrollo de API REST",
      ],
      equipment: [
        "8 GB de RAM (mínimo)",
        "2.5 GB de espacio en disco",
        "Procesador multicore",
        "Resolución mínima 1024x768",
      ],
      equipmentNote: "Conexión a internet por cable (recomendado)",
      prerequisiteCourseLink: {
        label: "Comienza con Java desde Cero",
        path: "/java-desde-cero",
      },
      footerNote:
        "Puedes tomar el curso sin cumplir estos requisitos, pero te recomendamos tenerlos para aprovecharlo al 100%.",
    },
    pricing: {
      subtitle:
        "Diferentes opciones de pago para que puedas llevar tu carrera de Java al siguiente nivel",
      fullPrice: 8500,
      discountPrice: 6500,
      stripeUrl:
        "https://buy.stripe.com/6oU4gB1mm91hgjLavab3q05?client_reference_id=69e4199d168fb564dd8e7a78",
      stripePromoUrl:
        "https://buy.stripe.com/6oU4gB1mm91hgjLavab3q05?prefilled_promo_code=INTERMEDIO&client_reference_id=69e4199d168fb564dd8e7a78",
      whatsappCourseName: "Java Intermedio",
      recommendedModal: {
        promoCodeLabel: "INTERMEDIO",
        conditions: [
          "El cupón INTERMEDIO debe estar activo",
          "Debes ingresar una tarjeta de crédito válida",
          'Da clic en la opción "Pagar en cuotas (meses sin intereses)"',
        ],
        note: "Tienes opciones de 3, 6, 9 y 12 meses sin intereses con este plan.",
      },
    },
  },
  {
    slug: "introduccion-programacion",
    title: "Introducción a la Programación",
    subtitle: "Para principiantes absolutos",
    description:
      "Aprende los fundamentos de la programación desde cero. Un curso completo en vivo que te llevará desde los conceptos básicos de algoritmos hasta la programación orientada a objetos con Java.",
    level: "Principiante",
    durationInHours: 30,
    stripeUrl:
      "https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04?client_reference_id=69e702bf846b18f8c93221bb",
    stripeCoupon: "INTRO",
    seo: {
      title: "Introducción a la Programación desde Cero | Joaquín C. Dev",
      description:
        "Curso en vivo de introducción a la programación para principiantes absolutos. Aprende lógica de programación y tus primeros pasos en código con acompañamiento en tiempo real.",
      keywords: [
        "introducción a la programación",
        "aprender a programar",
        "programación desde cero",
        "lógica de programación",
        "curso para principiantes",
      ],
      ogImage: OG_BASE,
    },
    listing: {
      icon: "book-open",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      features: [
        "Lógica de programación",
        "Primeros pasos en código",
        "Ejercicios prácticos",
      ],
      showOnHome: true,
    },
    hero: {
      titleLine1: "Introducción a la",
      titleHighlight: "Programación",
    },
    promo: {
      endsAt: "2026-05-02T23:59:59-06:00",
      bannerDesktop:
        "Introducción a la Programación: $2,000 de descuento (plan preferente)",
      bannerMobile: "$2,000 OFF",
    },
    curriculum: {
      sectionId: "temario-introduccion",
      summary:
        "Un programa estructurado de 30 hrs que te llevará desde los fundamentos de la programación hasta la introducción a la programación orientada a objetos.",
      modules: [
        {
          icon: "code",
          title: "Introducción a la programación",
          duration: "3 hrs",
          topics: [
            "¿Qué es un algoritmo?",
            "¿Cómo descomponer un problema en pasos pequeños?",
            "Paradigmas de programación",
            "Lenguajes compilados e interpretados",
            "Lenguajes de alto nivel",
            "Pseudocódigo",
            "Diagramas de flujo",
          ],
        },
        {
          icon: "terminal",
          title: "Entradas y salidas (I/O)",
          duration: "3 hrs",
          topics: [
            "La Consola/Terminal",
            'Primer programa "Hola mundo"',
            "System.out.println (Output)",
            "Scanner (Input)",
          ],
        },
        {
          icon: "type",
          title: "Variables y tipos de datos",
          duration: "4 hrs",
          topics: [
            "Declaración e inicialización",
            "Tipos primitivos",
            "int, boolean, char, float",
            "Tipos estructurados",
            "Arreglos, Cadenas de texto",
            "Constantes",
          ],
        },
        {
          icon: "calculator",
          title: "Operadores",
          duration: "2 hrs",
          topics: [
            "Aritméticos (+, -, *, /)",
            "Relacionales (>, <, !=, ==...)",
            "Lógicos (&&, ||)",
          ],
        },
        {
          icon: "git-branch",
          title: "Estructuras de control",
          duration: "4 hrs",
          topics: [
            "if",
            "else",
            "else - if",
            "Operador ternario",
            "Anidamiento de condiciones",
            "Estructura switch",
          ],
        },
        {
          icon: "rotate-ccw",
          title: "Ciclos",
          duration: "4 hrs",
          topics: ["while", "do-while", "for", "Contadores y acumuladores"],
        },
        {
          icon: "grid-3x3",
          title: "Arreglos",
          duration: "4 hrs",
          topics: [
            "Propiedades de los arreglos",
            "Arreglos: declaración, inicialización, recorrido",
            "Matrices: declaración, inicialización, recorrido",
          ],
        },
        {
          icon: "zap",
          title: "Funciones",
          duration: "3 hrs",
          topics: [
            "Definición y sintaxis",
            "Parámetros y retorno de valores",
            "Alcance de variables (local vs global)",
            "Paso de parámetros por valor y por referencia",
          ],
        },
        {
          icon: "layers",
          title: "Introducción a POO",
          duration: "3 hrs",
          topics: [
            "Abstracción: Clase y Objeto",
            "Encapsulamiento",
            "Herencia",
            "Polimorfismo",
          ],
        },
      ],
    },
    prerequisites: {
      intro:
        "Este curso está diseñado para principiantes, solo necesitas lo básico",
      items: [
        "Conocimientos básicos de computación",
        "Saber instalar programas",
        "Crear y organizar carpetas",
        "Tomar llamadas por Zoom o similar",
        "Dominio a nivel usuario de tu sistema operativo",
      ],
      equipment: [
        "8 GB de RAM (mínimo)",
        "2.5 GB de espacio en disco",
        "Procesador multicore",
        "Resolución mínima 1024x768",
      ],
      equipmentNote: "Conexión a internet estable (recomendado por cable)",
      footerNote:
        "Puedes tomar el curso sin cumplir todos estos requisitos, pero te recomendamos tenerlos para aprovecharlo al 100%.",
      noExperienceNote:
        "¡No necesitas saber programar! Este curso es tu punto de partida ideal.",
    },
    pricing: {
      subtitle:
        "Diferentes opciones de pago para que puedas comenzar tu camino en la programación",
      fullPrice: 6500,
      discountPrice: 4500,
      stripeUrl:
        "https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04?client_reference_id=69e702bf846b18f8c93221bb",
      stripePromoUrl:
        "https://buy.stripe.com/6oU3cxghggtJ1oR9r6b3q04?prefilled_promo_code=INTRO&client_reference_id=69e702bf846b18f8c93221bb",
      whatsappCourseName: "Introducción a la Programación",
      recommendedModal: {
        promoCodeLabel: "INTRO",
        conditions: [
          "NO debe estar aplicado ningún cupón de descuento",
          "Debes ingresar una tarjeta de crédito válida",
          'Marca la opción "Pagar en cuotas (meses sin intereses)"',
        ],
        note: "Una vez que completes estos pasos, podrás seleccionar entre las diferentes opciones de cuotas (3, 6, 9 o 12 meses).",
      },
    },
  },
  {
    slug: "java-desde-cero",
    title: "Java desde Cero",
    subtitle: "Fundamentos hasta profesional",
    description:
      "Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional. Más de 9 años de experiencia en desarrollo backend me respaldan para guiarte en tiempo real en cada paso de tu carrera como developer.",
    level: "Principiante a Intermedio",
    durationInHours: 40,
    stripeUrl: "https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01",
    stripeCoupon: "LANZAMIENTO",
    seo: {
      title: "Curso de Java desde Cero en Vivo | Joaquín C. Dev",
      description:
        "Curso de Java en vivo y en línea desde los fundamentos hasta nivel profesional: POO, colecciones, Streams y MongoDB. Más de 9 años de experiencia backend guiándote en tiempo real.",
      keywords: [
        "java",
        "curso java",
        "programación java",
        "aprender java",
        "java desde cero",
        "desarrollo java",
        "POO java",
      ],
      ogImage: OG_BASE,
    },
    listing: {
      icon: "code",
      color: "from-primary to-tech-cyan",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      features: ["POO completo", "Colecciones y Streams", "MongoDB"],
      featured: true,
      showOnHome: true,
    },
    hero: {
      titleLine1: "Aprende",
      titleHighlight: "Java",
      video: {
        src: "https://res.cloudinary.com/joaquin-test/video/upload/v1756623620/joaquin%20c.%20dev/java%20desde%20cero/GMT20250831-012428_Recording.cutfile.20250831065554802_1920x1080_fhlezz.mp4",
        poster:
          "https://res.cloudinary.com/joaquin-test/image/upload/v1756607596/Screenshot_at_Aug_30_20-32-46_qgh3zx.png",
      },
    },
    promo: {
      endsAt: "2026-01-17T23:59:59-06:00",
      bannerDesktop:
        "Precio especial $2,000 de descuento + hasta 12 meses sin intereses",
      bannerMobile: "$2,000 OFF + 12MSI",
    },
    curriculum: {
      sectionId: "curriculum",
      summary:
        "Un programa estructurado de 40 hrs que te llevará desde los fundamentos hasta implementaciones enterprise de Java y Spring Boot.",
      modules: [
        {
          icon: "book-open",
          title: "Introducción a Java",
          duration: "4 hrs",
          topics: [
            "¿Qué es Java y cómo trabaja?",
            "Java Virtual Machine (JVM)",
            "JDK y JRE",
            "Comandos java, javac",
            "Java ES, Java EE, Jakarta",
            "Empaquetado de aplicaciones (JAR y WAR)",
            "Versiones en Java",
            "Instalación del JDK y variable de entorno",
          ],
        },
        {
          icon: "code2",
          title: "Fundamentos de Java",
          duration: "8 hrs",
          topics: [
            "Estructura de un programa en Java",
            "Variables y tipos de datos",
            "Palabra reservada 'var' y 'final'",
            "Operadores (asignación, aritméticos, relacionales, lógicos)",
            "Sentencias de control (if, else, switch)",
            "Ciclos (while, do-while, for, forEach)",
            "Métodos y sobrecarga",
            "Arreglos y uso de paquetes",
          ],
        },
        {
          icon: "boxes",
          title: "Programación Orientada a Objetos",
          duration: "8 hrs",
          topics: [
            "Abstracción, clases y objetos",
            "Métodos y atributos",
            "Constructor y sobrecarga de constructor",
            "Palabras reservadas 'this' y 'super'",
            "Contexto estático",
            "Encapsulamiento y operadores de visibilidad",
            "Setter y getters",
            "Herencia y palabra reservada 'extends'",
            "Sobreescritura de métodos (@Override)",
            "Polimorfismo, clases abstractas e interfaces",
          ],
        },
        {
          icon: "settings",
          title: "Enumerables, Genericos y Collections",
          duration: "4 hrs",
          topics: [
            "Enumerables y sus atributos/métodos",
            "Genericos y convenciones",
            "Collections API",
            "Listas (ArrayList, LinkedList)",
            "Set - HashSet",
            "Map - HashMap",
          ],
        },
        {
          icon: "shield",
          title: "Excepciones y Programación Funcional",
          duration: "6 hrs",
          topics: [
            "Checked y Unchecked Exceptions",
            "Throwable, Exception, RunTimeException",
            "try, catch, finally",
            "Throw y Throws",
            "¿Qué es la programación funcional?",
            "Expresiones Lambda y sintaxis",
            "Interfaces funcionales",
            "Métodos referenciados",
            "Stream API y pipeline",
            "Operaciones intermedias y terminales",
          ],
        },
        {
          icon: "globe",
          title: "Introducción al Desarrollo Web",
          duration: "4 hrs",
          topics: [
            "¿Qué es el desarrollo web?",
            "Arquitectura Cliente-Servidor",
            "HTTP: protocolo de comunicación",
            "Métodos HTTP (GET, POST, PUT, DELETE)",
            "Estructura de una URL",
            "Códigos de estado HTTP (200, 404, 500)",
            "APIs y servicios REST",
          ],
        },
        {
          icon: "zap",
          title: "Spring Framework/Spring Boot",
          duration: "4 hrs",
          topics: [
            "Introducción al ecosistema Spring",
            "¿Qué es Spring Framework y por qué usarlo?",
            "Inversión de Control (IoC) y Dependency Injection (DI)",
            "Creación y gestión de Beans (@Component, @Service, @Repository)",
            "Spring Boot y estructura de un proyecto",
            "Controladores REST (@RestController, @GetMapping, @PostMapping)",
            "Manejo de parámetros y excepciones (@ExceptionHandler)",
          ],
        },
        {
          icon: "database",
          title: "Persistencia de Datos con MongoDB",
          duration: "2 hrs",
          topics: [
            "Introducción a MongoDB",
            "Creación de documentos con @Document",
            "Definición de identificadores con @Id",
            "Uso de MongoTemplate",
            "Inserción de documentos (insert, save)",
          ],
        },
      ],
    },
    prerequisites: {
      intro:
        "Para aprovechar al máximo este curso, te recomendamos cumplir con los siguientes requisitos",
      items: [
        "Nociones básicas de programación",
        "Variables, tipos de datos y operadores",
        "Condiciones (if, else, else-if)",
        "Arreglos y ciclos",
        "Funciones",
      ],
      equipment: [
        "8 GB de RAM (mínimo)",
        "2.5 GB de espacio en disco",
        "Procesador multicore",
        "Resolución mínima 1024x768",
      ],
      equipmentNote: "Conexión a internet por cable (recomendado)",
      prerequisiteCourseLink: {
        label: "Comienza con Introducción a la Programación",
        path: "/introduccion-programacion",
      },
      footerNote:
        "Puedes tomar el curso sin cumplir estos requisitos, pero te recomendamos tenerlos para aprovecharlo al 100%.",
    },
    pricing: {
      subtitle:
        "Diferentes opciones de pago para que puedas comenzar tu carrera como Java Developer",
      fullPrice: 8500,
      discountPrice: 6500,
      stripeUrl: "https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01",
      stripePromoUrl:
        "https://buy.stripe.com/bJe3cx4yy1yP9Vn46Mb3q01?prefilled_promo_code=LANZAMIENTO",
      whatsappCourseName: "curso de Java",
      recommendedModal: {
        promoCodeLabel: "LANZAMIENTO",
        conditions: [
          "El cupón LANZAMIENTO debe estar activo",
          "Debes ingresar una tarjeta de crédito válida",
          'Da clic en la opción "Pagar en cuotas (meses sin intereses)"',
        ],
        note: "Tienes opciones de 3, 6, 9 y 12 meses sin intereses con este plan.",
      },
    },
  },
];

export default MOCK_COURSES;
