import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                features: "Features",
                courses: "Courses",
                kids: "Kids",
                contact: "Contact",
                login: "Student Login",
                freeTest: "Free Level Test"
            },
            hero: {
                title1: "SpeakPro Academy",
                title2: "English for Everyone",
                subtitle: "Professional and engaging online classes for adults and kids. Master English with native certified teachers.",
                cta_start: "Start Learning",
                cta_teachers: "Meet Teachers"
            },
            kids: {
                badge: "SpeakPro Kids",
                title1: "Safe Online Classes",
                title2: "Supervised & Fun!",
                description: "Our program is designed for peace of mind. Parents can easily supervise classes, track progress, and ensure a safe, productive learning environment for their children.",
                features: [
                    "Parental Supervision Tools",
                    "Certified Child-Safe Teachers",
                    "Real-time Progress Tracking",
                    "Engaging 1-on-1 Sessions"
                ],
                cta: "Book a Kids Trial",
                parents: "Trusted by Parents"
            },
            testimonials: {
                title: "What Our Students Say",
                subtitle: "Join thousands of successful students who changed their lives with SpeakPro."
            },
            placement: {
                title: "Not sure about your level?",
                subtitle: "Take our free placement test and get a personalized learning path in 15 minutes.",
                cta_adults: "Test for Adults",
                cta_kids: "Test for Kids"
            },
            teachers_section: {
                title: "Meet Your Teachers",
                subtitle: "Learn from the best. Our tutors are certified native speakers passionate about your success.",
                cta: "View All 50+ Teachers"
            },
            courses_section: {
                title_prefix: "Explore Our",
                title_highlight: "Courses",
                subtitle: "Designed for every goal and fluency level. Start your journey today.",
                cta: "View All Programs"
            },
            // Dynamic Data Strings
            teachers: {
                samuel: {
                    role: "Business English Expert",
                    bio: "Specializing in Business communication and presentations.",
                    tags: {
                        business: "Business",
                        interview: "Interview Prep"
                    }
                }
            },
            courses: {
                general: {
                    title: "General English",
                    level: "All Levels",
                    desc: "Master the 4 core skills: speaking, listening, reading, and writing. Perfect for everyday communication.",
                    price: "From $25/lesson",
                    tags: { popular: "Popular", conversation: "Conversation" }
                },
                business: {
                    title: "Business English",
                    level: "Intermediate - Advanced",
                    desc: "Boost your career. specialized vocabulary for meetings, presentations, and negotiations.",
                    price: "From $35/lesson",
                    tags: { career: "Career", professional: "Professional" }
                },
                ielts: {
                    title: "IELTS Preparation",
                    level: "Advanced",
                    desc: "Intensive training to achieve your target band score. Mock tests and personalized feedback included.",
                    price: "From $40/lesson",
                    tags: { exam: "Exam", academic: "Academic" }
                }
            }
        }
    },
    es: {
        translation: {
            nav: {
                home: "Inicio",
                features: "Ventajas",
                courses: "Cursos",
                kids: "Niños",
                contact: "Contacto",
                login: "Acceso Alumnos",
                freeTest: "Prueba de Nivel Gratis"
            },
            hero: {
                title1: "Academia SpeakPro",
                title2: "Inglés para Todos",
                subtitle: "Clases online profesionales y divertidas para adultos y niños. Domina el inglés con profesores nativos certificados.",
                cta_start: "Empezar a Aprender",
                cta_teachers: "Ver Profesores"
            },
            kids: {
                badge: "SpeakPro Kids",
                title1: "Clases Online Seguras",
                title2: "¡Supervisado y Divertido!",
                description: "Nuestro programa está diseñado para tu tranquilidad. Los padres pueden supervisar fácilmente las clases y asegurar un entorno de aprendizaje seguro y productivo.",
                features: [
                    "Herramientas de Supervisión Parental",
                    "Profesores Certificados para Niños",
                    "Seguimiento de Progreso en Vivo",
                    "Sesiones 1-a-1 Atractivas"
                ],
                cta: "Reserva Prueba para Niños",
                parents: "Confianza de Padres"
            },
            testimonials: {
                title: "Lo que dicen nuestros alumnos",
                subtitle: "Únete a miles de estudiantes que cambiaron sus vidas con SpeakPro."
            },
            placement: {
                title: "¿No estás seguro de tu nivel?",
                subtitle: "Haz nuestra prueba de nivel gratuita y obtén un plan personalizado en 15 minutos.",
                cta_adults: "Prueba para Adultos",
                cta_kids: "Prueba para Niños"
            },
            teachers_section: {
                title: "Conoce a tus Profesores",
                subtitle: "Aprende de los mejores. Tutores nativos certificados apasionados por tu éxito.",
                cta: "Ver los 50+ Profesores"
            },
            courses_section: {
                title_prefix: "Explora Nuestros",
                title_highlight: "Cursos",
                subtitle: "Diseñado para cada meta y nivel. Comienza tu viaje hoy.",
                cta: "Ver Todos los Programas"
            },
            teachers: {
                samuel: {
                    role: "Experto en Inglés de Negocios",
                    bio: "Especialista en comunicación empresarial y presentaciones.",
                    tags: {
                        business: "Negocios",
                        interview: "Prep. Entrevistas"
                    }
                }
            },
            courses: {
                general: {
                    title: "Inglés General",
                    level: "Todos los Niveles",
                    desc: "Domina las 4 habilidades: hablar, escuchar, leer y escribir. Perfecto para la comunicación diaria.",
                    price: "Desde $25/clase",
                    tags: { popular: "Popular", conversation: "Conversación" }
                },
                business: {
                    title: "Inglés de Negocios",
                    level: "Intermedio - Avanzado",
                    desc: "Impulsa tu carrera. Vocabulario especializado para reuniones, presentaciones y negociaciones.",
                    price: "Desde $35/clase",
                    tags: { career: "Carrera", professional: "Profesional" }
                },
                ielts: {
                    title: "Preparación IELTS",
                    level: "Avanzado",
                    desc: "Entrenamiento intensivo para lograr tu puntaje objetivo. Incluye simulacros y retroalimentación.",
                    price: "Desde $40/clase",
                    tags: { exam: "Examen", academic: "Académico" }
                }
            }
        }
    },
    it: {
        translation: {
            nav: {
                home: "Home",
                features: "Vantaggi",
                courses: "Corsi",
                kids: "Bambini",
                contact: "Contatto",
                login: "Accesso Studenti",
                freeTest: "Test Livello Gratuito"
            },
            hero: {
                title1: "Accademia SpeakPro",
                title2: "Inglese per Tutti",
                subtitle: "Classi online professionali e coinvolgenti per adulti e bambini. Padroneggia l'inglese con insegnanti madrelingua certificati.",
                cta_start: "Inizia a Imparare",
                cta_teachers: "Incontra gli Insegnanti"
            },
            kids: {
                badge: "SpeakPro Kids",
                title1: "Classi Online Sicure",
                title2: "Supervisionato e Divertente!",
                description: "Il nostro programma è progettato per la tua tranquillità. I genitori possono supervisionare facilmente le lezioni e garantire un ambiente di apprendimento sicuro.",
                features: [
                    "Strumenti di Supervisione Genitoriale",
                    "Insegnanti Certificati per Bambini",
                    "Monitoraggio dei Progressi in Tempo Reale",
                    "Sessioni 1-a-1 Coinvolgenti"
                ],
                cta: "Prenota Prova per Bambini",
                parents: "Fiducia dai Genitori"
            },
            testimonials: {
                title: "Cosa dicono i nostri studenti",
                subtitle: "Unisciti a migliaia di studenti che hanno cambiato la loro vita con SpeakPro."
            },
            placement: {
                title: "Non sei sicuro del tuo livello?",
                subtitle: "Fai il nostro test di livello gratuito e ottieni un percorso personalizzato in 15 minuti.",
                cta_adults: "Test per Adulti",
                cta_kids: "Test per Bambini"
            },
            teachers_section: {
                title: "Incontra i tuoi Insegnanti",
                subtitle: "Impara dai migliori. Tutor madrelingua certificati appassionati del tuo successo.",
                cta: "Vedi tutti i 50+ Insegnanti"
            },
            courses_section: {
                title_prefix: "Esplora i Nostri",
                title_highlight: "Corsi",
                subtitle: "Progettato per ogni obiettivo e livello. Inizia il tuo viaggio oggi.",
                cta: "Vedi Tutti i Programmi"
            },
            teachers: {
                samuel: {
                    role: "Esperto Inglese Commerciale",
                    bio: "Specializzato in comunicazione aziendale e presentazioni.",
                    tags: {
                        business: "Business",
                        interview: "Prep. Colloqui"
                    }
                }
            },
            courses: {
                general: {
                    title: "Inglese Generale",
                    level: "Tutti i Livelli",
                    desc: "Padroneggia le 4 abilità: parlare, ascoltare, leggere e scrivere.",
                    price: "Da $25/lezione",
                    tags: { popular: "Popolare", conversation: "Conversazione" }
                },
                business: {
                    title: "Inglese Commerciale",
                    level: "Intermedio - Avanzato",
                    desc: "Migliora la tua carriera. Vocabolario specializzato per riunioni e presentazioni.",
                    price: "Da $35/lezione",
                    tags: { career: "Carriera", professional: "Professionale" }
                },
                ielts: {
                    title: "Preparazione IELTS",
                    level: "Avanzato",
                    desc: "Formazione intensiva per raggiungere il tuo punteggio obiettivo.",
                    price: "Da $40/lezione",
                    tags: { exam: "Esame", academic: "Accademico" }
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
