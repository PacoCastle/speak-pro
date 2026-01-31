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
