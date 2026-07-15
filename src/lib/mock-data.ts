/** Datos de ejemplo — se reemplazan por Supabase en la Etapa 6. */

export interface MockEvent {
  slug: string;
  title: string;
  date: string;
  location: string;
  spotsLeft: number;
  price: string;
  description: string;
}

export const mockEvents: MockEvent[] = [
  {
    slug: "encuentro-agosto",
    title: "Un café, una pausa",
    date: "9 de agosto, 2026 · 10:00 am",
    location: "Café Presidente, Hermosillo",
    spotsLeft: 6,
    price: "$150 MXN — incluye tu café",
    description:
      "Abrimos el mes con una conversación sobre cómo sostener la fe en medio de temporadas ocupadas. Llega diez minutos antes para elegir tu café con calma.",
  },
  {
    slug: "encuentro-septiembre",
    title: "Historias que sanan",
    date: "13 de septiembre, 2026 · 10:00 am",
    location: "Café Presidente, Hermosillo",
    spotsLeft: 14,
    price: "$150 MXN — incluye tu café",
    description:
      "Un espacio para compartir en voz baja las historias que normalmente no contamos. Habrá una dinámica breve para romper el hielo si vienes sola.",
  },
  {
    slug: "encuentro-octubre",
    title: "Gratitud en comunidad",
    date: "11 de octubre, 2026 · 10:00 am",
    location: "Por confirmar",
    spotsLeft: 20,
    price: "$150 MXN — incluye tu café",
    description:
      "Cerramos el trimestre con un encuentro enfocado en gratitud — qué significa practicarla cuando la vida no está color de rosa.",
  },
];

export interface MockTestimonial {
  name: string;
  quote: string;
}

export const mockTestimonials: MockTestimonial[] = [
  {
    name: "Fernanda R.",
    quote:
      "Nunca me había sentido tan en paz hablando de fe. Se siente como sentarme con amigas, no como ir a una reunión religiosa.",
  },
  {
    name: "Paola G.",
    quote:
      "Llegué sin saber qué esperar y me fui con ganas de volver al siguiente mes. El ambiente es cálido de verdad.",
  },
  {
    name: "Karla M.",
    quote:
      "Es el único espacio donde puedo conectar con Dios sin sentirme juzgada. Se nota que está hecho con intención.",
  },
  {
    name: "Renata S.",
    quote:
      "Fui por curiosidad y me quedé por la comunidad. Ya llevo cinco meses seguidos sin faltar a ninguno.",
  },
  {
    name: "Mariana T.",
    quote:
      "No esperaba llorar en mi primer encuentro, pero fue el buen tipo de llanto. Aquí sí se puede ser honesta.",
  },
  {
    name: "Daniela C.",
    quote:
      "Vine sola la primera vez, con miedo de no encajar. Hoy son de las amigas que más veo cada mes.",
  },
];

export interface MockFaq {
  question: string;
  answer: string;
}

export const mockFaqs: MockFaq[] = [
  {
    question: "¿Tengo que ser religiosa para asistir?",
    answer:
      "No. Café con Fe es para cualquier mujer que busque una pausa cálida y una conexión honesta, sin importar en qué punto de su fe se encuentre.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El café y el espacio tienen un costo simbólico que se confirma al registrarte a cada encuentro — nunca es la razón para quedarte fuera, escríbenos si es una barrera.",
  },
  {
    question: "¿Dónde son los encuentros?",
    answer:
      "Nos reunimos una vez al mes en una cafetería de Hermosillo. La sede exacta se confirma en cada evento.",
  },
  {
    question: "¿Puedo ir sola?",
    answer:
      "Sí — de hecho, la mayoría llega sola la primera vez. Es un espacio pensado justo para conocer mujeres nuevas.",
  },
];
