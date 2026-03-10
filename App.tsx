// App.tsx (COMPLETO)

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  CheckCircle,
  Zap,
  Send,
  Globe,
  Video,
  Cpu,
  TrendingUp,
  Award,
  Users,
  MessageCircle,
} from "lucide-react";

// import { GoogleGenAI } from "@google/genai";
//Configuracion de la app
// --- Configuration & API ---
const API_ENDPOINT = "/api/contact.php";

// --- Assets ---
const LogoText: React.FC<{ className?: string }> = ({
  className = "w-48 h-auto",
}) => (
  <svg
    viewBox="0 0 459 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M294.21 63.88C288.75 63.88 284.47 63.42 281.39 62.51C278.3 61.55 276.16 60.26 274.94 58.64C273.73 57.02 273.12 55.07 273.12 52.8C273.12 49.77 274.18 47.36 276.31 45.59C278.43 43.77 281.67 42.35 286.02 41.34C290.42 40.33 296.62 39.39 304.61 38.53L321.07 37.01L320.84 41.64L313.56 42.55C311.79 42.8 310.4 43.08 309.39 43.38C308.43 43.68 307.75 44.06 307.34 44.52C306.94 44.92 306.73 45.43 306.73 46.04C306.73 46.9 307.06 47.51 307.72 47.86C308.43 48.21 309.44 48.39 310.75 48.39C312.82 48.39 314.54 48.11 315.91 47.56C317.28 46.95 318.29 46.12 318.94 45.06C319.65 43.95 320 42.63 320 41.11V36.03C320 34.92 319.75 33.98 319.24 33.22C318.73 32.41 317.95 31.8 316.89 31.4C315.83 31 314.41 30.79 312.64 30.79C309.96 30.79 308.01 31.27 306.8 32.23C305.64 33.19 304.85 34.71 304.45 36.78H275.85C276.61 32.28 278.23 28.51 280.71 25.48C283.19 22.39 287.21 19.99 292.77 18.27C298.38 16.5 306 15.61 315.61 15.61C325.22 15.61 332.71 16.5 338.22 18.27C343.73 19.99 347.6 22.44 349.83 25.63C352.11 28.77 353.24 32.66 353.24 37.31V49.53L354.53 62.81H321.98V43.77H320.84C320.54 48.32 319.63 52.04 318.11 54.92C316.59 57.75 313.94 59.95 310.14 61.52C306.4 63.09 301.09 63.87 294.21 63.87V63.88ZM221.72 16.76H272.4V35.2H221.72V16.76ZM229.3 10.84L262.38 3.25V62.81H229.3V10.84ZM184.76 43.17C184.76 41.45 184.56 40.08 184.15 39.07C183.75 38.01 182.94 37.22 181.72 36.72C180.56 36.16 178.89 35.89 176.71 35.89C174.53 35.89 172.54 36.27 170.87 37.03C169.25 37.79 167.96 38.93 167 40.44C166.04 41.96 165.48 43.93 165.33 46.36H163.13C163.53 39.53 164.72 33.89 166.7 29.44C168.67 24.94 171.73 21.52 175.88 19.2C180.08 16.82 185.57 15.63 192.34 15.63C200.84 15.63 207.21 17.48 211.46 21.17C215.71 24.81 217.83 30.27 217.83 37.56V62.82H184.75V43.17H184.76ZM132.26 16.76H161.47L163.37 37.17H165.34V62.81H132.26V16.76ZM92.24 0H125.85V12.14H92.24V0ZM92.47 16.76H125.55V62.81H92.47V16.76ZM0 9.70999H51.9C62.47 9.70999 70.99 11.35 77.47 14.64C83.99 17.93 87.26 23.31 87.26 30.8C87.26 35.4 86.27 39.27 84.3 42.41C82.33 45.55 78.84 48 73.83 49.77C68.82 51.49 61.97 52.35 53.27 52.35H31.19V36.64L49.63 36.56C50.95 36.56 52.01 36.41 52.82 36.1C53.68 35.75 54.31 35.24 54.72 34.58C55.12 33.87 55.33 32.96 55.33 31.85C55.33 30.28 54.87 29.14 53.96 28.44C53.1 27.73 51.68 27.38 49.71 27.38H33.25V62.81H0.0200043V9.7L0 9.70999Z"
      fill="currentColor"
    />
    <path
      d="M444.19 15.4608H436.07V10.2008H458.24V15.4608H450.12V62.8108H444.18V15.4608H444.19ZM407.9 10.2008H413.84V62.8108H407.9V10.2008ZM415.04 38.2408H413.01V33.8108H414.59L416.54 28.7708C418.85 23.1108 420.6 19.1008 421.8 16.7408C423 14.3308 424.28 12.6308 425.63 11.6308C426.98 10.5808 428.74 10.0508 430.89 10.0508H431.87V15.9908H431.12C429.82 15.9908 428.76 16.3708 427.96 17.1208C427.16 17.8708 426.36 19.1008 425.55 20.8008C424.75 22.4508 423.5 25.3908 421.79 29.5908C420.59 32.6508 419.54 35.2808 418.63 37.4808L418.33 31.4708L432.69 62.8108H426.15L415.03 38.2308L415.04 38.2408ZM365.59 10.2008H376.04L383.63 58.7608H382.43L390.32 10.2008H400.17V62.8108H394.46V16.4308H394.01L386.27 62.8108H379.66L371.69 16.4308H371.24V62.8108H365.6V10.2008H365.59Z"
      fill="currentColor"
    />
  </svg>
);

// --- Types ---
interface NavLink {
  label: string;
  href: string;
}
interface Service {
  id: number;
  title: string;
  items: string[];
  cta: string;
  icon: React.ReactNode;
  tag: string;
}
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  results: { label: string; value: string; icon: React.ReactNode }[];
}
interface Client {
  name: string;
  logo: string;
}

// --- Data ---
const NAV_LINKS: NavLink[] = [
  { label: "Servicios", href: "#services" },
  { label: "Proyectos", href: "#works" },
  { label: "Clientes", href: "#clients" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    icon: <Instagram size={24} />,
    href: "https://www.instagram.com/pintamkt/",
    label: "Instagram",
  },
  {
    icon: <Linkedin size={24} />,
    href: "https://www.linkedin.com/company/pinta-marketing/?viewAsMember=true",
    label: "LinkedIn",
  },
  {
    icon: <MessageCircle size={24} />,
    href: "https://wa.me/5492617007256",
    label: "WhatsApp",
  },
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "MARKETING DIGITAL Y TRADICIONAL",
    tag: "ESTRATEGIA",
    icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
    items: [
      "Branding y posicionamiento",
      "Campañas pagas en meta y google ads",
      "Campañas en medios tradicionales",
      "Gestión de redes sociales",
      "Google My Business",
      "Planificación de contenidos",
      "Email marketing",
      "Reportes y métricas de resultados",
    ],
    cta: "Potenciarme",
  },
  {
    id: 2,
    title: "PRODUCCIÓN AUDIOVISUAL & STREAMING",
    tag: "CONTENIDO",
    icon: <Video className="w-8 h-8 md:w-10 md:h-10" />,
    items: [
      "Podcasts y clips",
      "Spots publicitarios",
      "Documentales",
      "Asesoría creativa y técnica",
      "Streaming y eventos",
    ],
    cta: "Info Producción",
  },
  {
    id: 3,
    title: "DESAROLLO WEB, AUTOMATIZACIÓN Y CHAT BOT",
    tag: "TECNOLOGÍA",
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
    items: [
      "Desarrollo Web / eCommerce",
      "Chatbots con IA",
      "Automatización de CRM",
      "Soporte Técnico",
    ],
    cta: "Automatizar",
  },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "BERMÚDEZ MOYA",
    category: "MARKETING INMOBILIARIO",
    image: "/proyects/PORTADAS_BERMUDEZ.webp", // Ruta al archivo en public
    description:
      "Estrategia de marketing inmobiliario para Bermúdez Moya en San Juan: contenidos, pauta en Meta Ads y generación de leads calificados para compra, venta y alquiler.",
    results: [
      { label: "Leads", value: "+35%", icon: <TrendingUp size={16} /> },
      { label: "Alcance", value: "120k", icon: <Users size={16} /> },
      { label: "Consultas", value: "+28%", icon: <Award size={16} /> },
    ],
  },
  {
    id: 2,
    title: "SAMACO",
    category: "MARKETING & PERFORMANCE",
    image: "/proyects/PORTADAS_SAMACO.webp",
    description:
      "Campañas de performance para Samaco en Mendoza: Meta Ads y Google Ads, creatividad y optimización del embudo para aumentar consultas y ventas en múltiples canales.",
    results: [
      { label: "ROAS", value: "8x", icon: <Award size={16} /> },
      { label: "Clicks", value: "+42%", icon: <TrendingUp size={16} /> },
      { label: "Alcance", value: "200k", icon: <Users size={16} /> },
    ],
  },
  {
    id: 3,
    title: "ACTIVACIÓN FÚTBOL / STREAMING",
    category: "PRODUCCIÓN AV",
    image: "/proyects/PORTADAS_STREAMING.webp",
    description:
      "Cobertura y producción audiovisual para activación deportiva: reels, contenido en vivo y piezas de alto impacto para aumentar alcance, comunidad y recordación de marca.",
    results: [
      { label: "Views", value: "300k+", icon: <TrendingUp size={16} /> },
      { label: "Engagement", value: "+90%", icon: <Users size={16} /> },
      { label: "Retención", value: "+25%", icon: <Zap size={16} /> },
    ],
  },
];

const CLIENTS_LIST: Client[] = [
  { name: "ProBands", logo: "/clients/ProBands.png" },
  { name: "Teatro Sarmiento", logo: "/clients/Teatro_Sarmiento.png" },
  { name: "Cubos de Chacras", logo: "/clients/Cubos_de_Chacras.png" },
  { name: "Científica Cuyo", logo: "/clients/Científica_Cuyo.png" },
  { name: "Burgery", logo: "/clients/Burgery.png" },
  { name: "Bermúdez Moya", logo: "/clients/Bermúdez_Moya.png" },
  { name: "GrandBar", logo: "/clients/GrandBar.png" },
  {
    name: "Teatro del Bicentenario",
    logo: "/clients/Teatro_del_Bicentenario.png",
  },
];

// --- Helpers ---
const analyzeLeadWithAI = async (name: string, message: string) => {
  // Aquí podrías usar el name o message para personalizar, pero por ahora:
  return "Tu visión tiene un potencial increíble. En Pinta MKT estamos listos para transformarla en resultados reales.";
};

const notifyBackend = async (data: any) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Backend ${response.status}`);
    const result = await response.json();
    return result.status === "success";
  } catch (error) {
    console.error("Backend error:", error);
    return false;
  }
};

// --- Components ---
const SectionTitle: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <h2
    className={`text-4xl md:text-6xl lg:text-8xl font-[900] mb-10 uppercase tracking-tighter leading-[0.85] text-[#1A1A1A] ${className}`}
  >
    {children}
  </h2>
);

const ProjectCard: React.FC<{
  project: Project;
  onOpenProject: (p: Project) => void;
}> = ({ project, onOpenProject }) => (
  <button
    onClick={() => onOpenProject(project)}
    // CAMBIOS AQUÍ: Reducimos max-w de 400px a 340px y ajustamos porcentajes
    className="group relative w-full sm:w-[45%] lg:w-[28%] max-w-[340px] aspect-[14/11] overflow-hidden rounded-[2.5rem] border-[5px] border-black shadow-xl text-left transition-all hover:-translate-y-3 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.3)] isolate"
    style={{ transform: "translateZ(0)" }}
  >
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.3rem] z-0">
      <img
        src={project.image}
        alt={project.title}
        // grayscale por defecto, color al hover
        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
      />
    </div>

    {/* Icono de abeja - Ajustado un poco más pequeño */}
    <div className="absolute top-5 right-5 z-20 w-10 h-10 md:w-12 md:h-12 bg-[#EBE300] border-[2px] border-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
      <img
        src="https://img.icons8.com/ios-filled/50/000000/bee.png"
        alt="Bee"
        className="w-5 h-5 md:w-6 md:h-6"
      />
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 z-10">
      <span className="text-[#EBE300] text-[10px] md:text-xs font-black uppercase mb-1 tracking-[0.2em] drop-shadow-md">
        {project.category}
      </span>
      {/* Reducimos un poco el tamaño de la fuente del título */}
      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-[900] uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-lg">
        {project.title}
      </h3>
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-sm tracking-wide rounded-full transition-all duration-300 group-hover:bg-[#EBE300] group-hover:text-black group-hover:border-black group-hover:gap-4 w-fit">
        Ver campaña{" "}
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  </button>
);

const Header: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(href.replace("#", ""));
    if (element)
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-[100] transition-all duration-500 ${scrolled ? "bg-black/95 py-3 shadow-2xl" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")}>
          <LogoText className="w-24 md:w-32 text-[#EBE300]" />
        </a>
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-black text-[11px] uppercase tracking-[0.2em] transition-all relative py-2 ${activeSection === link.href.replace("#", "") ? "text-[#EBE300]" : "text-white hover:text-[#EBE300]/80"}`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#EBE300] transform transition-transform duration-300 ${activeSection === link.href.replace("#", "") ? "scale-x-100" : "scale-x-0"}`}
              />
            </a>
          ))}
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#EBE300] p-2"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-8 lg:hidden transition-all duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-[#EBE300]"
        >
          <X size={40} />
        </button>
        <LogoText className="w-64 text-[#EBE300] mb-10" />
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-[900] text-4xl uppercase text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  //--- Estados nuevos agregados ---
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const recaptchaDivRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  // use effect nuevo
  useEffect(() => {
    if (!showRecaptcha) return;

    const siteKey = (import.meta as any).env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      alert("Falta VITE_RECAPTCHA_SITE_KEY en el entorno.");
      setShowRecaptcha(false);
      return;
    }

    const timer = setInterval(() => {
      // @ts-ignore
      const grecaptcha = window.grecaptcha;

      if (grecaptcha && recaptchaDivRef.current) {
        if (widgetIdRef.current === null) {
          widgetIdRef.current = grecaptcha.render(recaptchaDivRef.current, {
            sitekey: siteKey,
            callback: (token: string) => setRecaptchaToken(token),
            "expired-callback": () => setRecaptchaToken(""),
            "error-callback": () => setRecaptchaToken(""),
          });
        }
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [showRecaptcha]);

  // ✅ Enviar formulario (cuando apretás "CONFIRMAR Y ENVIAR")
  const sendFormNow = async () => {
    if (!recaptchaToken) return;

    setIsSubmitting(true);

    const analysis = await analyzeLeadWithAI(formState.name, formState.message);

    setAiAnalysis(analysis);

    const ok = await notifyBackend({
      ...formState,
      ai_analysis: analysis,
      recaptcha_token: recaptchaToken,
    });

    setIsSubmitting(false);

    if (!ok) {
      alert("No se pudo enviar el formulario. Intentá nuevamente.");
      return;
    }

    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });

    // cerrar modal y limpiar token
    setShowRecaptcha(false);
    setRecaptchaToken("");

    // reset widget
    // @ts-ignore
    if (window.grecaptcha && widgetIdRef.current !== null) {
      // @ts-ignore
      window.grecaptcha.reset(widgetIdRef.current);
    }
    widgetIdRef.current = null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.5] },
    );
    [
      "home",
      "about",
      "works",
      "extension",
      "services",
      "clients",
      "contact",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRecaptcha(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFCE6] selection:bg-[#EBE300] selection:text-black">
      <Header activeSection={activeSection} />

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] overflow-hidden px-4"
      >
        <div className="z-10 text-center max-w-6xl mx-auto">
          <div className="flex justify-center mb-10">
            {" "}
            {/* Reducido el margen inferior (mb-12)*/}
            <img
              src="https://img.icons8.com/ios-filled/100/EBE300/bee.png"
              alt="Abeja"
              className="w-8 h-8 md:w-16 md:h-16 animate-bee" /* Reducido tamaño (w-16 h-16 md:w-24 md:h-24) */
            />
          </div>
          <div className="mb-8 flex justify-center">
            {" "}
            {/* Reducido el margen (mb-12 flex justify-center)*/}
            <LogoText className="w-90 md:w-120 text-[#EBE300]" />{" "}
            {/* Ajuste en el tamaño ("w-full max-w-[900px] text-[#EBE300])*/}
          </div>

          {/* H1 anterior
          text-xl md:text-3xl lg:text-4xl 
  font-[900] uppercase
  tracking-tight leading-[1.1]
  text-center mx-auto max-w-[980px]
  opacity-90 mb-12
  whitespace-pre-line */}
          <h1
            className="
    text-lg md:text-2xl lg:text-3xl
    font-[800] uppercase
    tracking-tight leading-tight
    text-center mx-auto max-w-[960px]
    opacity-95 mb-8
    whitespace-pre-line
  "
          >
            <span className="text-white">
              {"COMO LAS ABEJAS TRANSFORMAN NECTAR\nEN MIEL, "}
            </span>
            <span className="text-[#EBE300]">
              {"NOSOTROS TRANSFORMAMOS\nIDEAS EN NEGOCIOS."}
            </span>
          </h1>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("contact");
              if (el) {
                window.scrollTo({
                  top: el.offsetTop - 80, // altura del header
                  behavior: "smooth",
                });
              }
            }}
            className="inline-flex items-center gap-4 px-8 py-5 bg-[#EBE300] text-black font-[800] text-xl uppercase tracking-tighter hover:bg-white transition-all rounded-full shadow-lg"
          >
            {/*inline-flex items-center gap-4 px-12 py-6 bg-[#EBE300] text-black font-[900] text-xl uppercase tracking-tighter hover:bg-white transition-all rounded-full shadow-lg"*/}
            Descubrir <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative min-h-screen flex flex-col justify-center bg-[#FDFCE6] py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Columna Izquierda: Texto */}
            <div className="order-2 md:order-1">
              <span className="inline-block px-4 py-1 bg-black text-[#EBE300] font-semibold text-xs mb-6 rounded-full">
                Nosotros
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800] tracking-tight leading-[1.1] text-[#1A1A1A] max-w-[18ch]">
                EN PINTA CONTAMOS
                <br />
                CON UN EQUIPO
              </h2>
              <p className="text-2xl md:text-3xl text-gray-700 font-[900] mb-8 uppercase mt-3 tracking-tighter leading-tight">
                ÁGIL, FLEXIBLE Y ESTRATÉGICO
              </p>
              <div className="bg-white p-6 border-[3px] border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  <span className="font-medium">
                    Donde otros venden ruido,{" "}
                  </span>
                  <span className="font-bold italic">
                    nosotros entregamos resultados reales. Sinergia pura.
                  </span>
                </p>
              </div>
            </div>

            {/* Columna Derecha: Imagen con Margen y Glow Suave */}
            <div className="relative group order-1 md:order-2 flex justify-center md:justify-end lg:pr-16">
              {/* Glow Amarillo: Sutil, centrado y expansivo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#EBE300] rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Contenedor de la imagen para asegurar el recorte suave */}
              <div className="relative overflow-hidden rounded-[3rem] border-[3px] border-black shadow-2xl z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  className="w-full max-w-[400px] md:max-w-[480px] aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt="Equipo Pinta MKT"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works */}

      <section
        id="works"
        className="min-h-screen w-full bg-white flex flex-col justify-center py-20"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <SectionTitle>Proyectos</SectionTitle>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenProject={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEW Section: Team Extension */}
      <section id="extension" className="py-24 bg-black text-white px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[900] uppercase tracking-tighter leading-tight mb-6">
              ¿BUSCANDO UNA{" "}
              <span className="text-[#EBE300]">
                <br />
                EXTENSIÓN DE TU{" "}
              </span>
              EQUIPO?
            </h2>
            <p className="text-sm md:text-base font-black text-white/50 uppercase tracking-[0.2em] max-w-2xl mx-auto">
              SOMOS PINTA MKT, TU ALIADO ESTRATÉGICO.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 items-stretch">
            {/* 2x2 Grid with info cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  label: "EQUIPO IN-HOUSE",
                  icon: "/icons/ICONOS WEB_EQUIPO INHOUSE.svg",
                },
                {
                  label: "CREATIVIDAD",
                  icon: "/icons/ICONOS WEB_CREATIVIDAD.svg",
                },
                {
                  label: "CONSULTORÍA",
                  icon: "/icons/ICONOS WEB_consultoria.svg",
                },
                {
                  label: "RESULTADOS",
                  icon: "/icons/ICONOS WEB_RESULTADOS.svg",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#141414] border border-white/5 p-6 rounded-[1rem] flex flex-col justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#EBE300]/10 border border-[#EBE300]/20 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <img
                      src={card.icon}
                      alt={card.label}
                      // Subimos de w-6 a w-8 para compensar el margen interno del SVG
                      className="w-8 h-8 object-contain"
                      style={{ filter: "brightness(1.1)" }} // Un toque de brillo extra para el amarillo
                    />
                  </div>
                  <h3 className="font-black text-sm md:text-lg uppercase tracking-tighter leading-none">
                    {card.label}
                  </h3>
                </div>
              ))}
            </div>

            {/* Featured Highlight Card */}
            <div className="bg-[#EBE300] text-black rounded-[2rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(235,227,0,0.3)]">
              <div className="mb-8 relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-5 py-1.5 bg-black text-[#EBE300] font-black text-[13px] mb-6 rounded-full tracking-tight">
                    Nuestro valor
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <LogoText className="w-48 text-black" />
                </div>
                <p className="text-xl md:text-2xl lg:text-3xl font-[900] uppercase tracking-tighter leading-[1.1] mb-8">
                  ESCALAMOS TUS RESULTADOS SIN LAS COMPLICACIONES DE AGENCIAS
                  TRADICIONALES.
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("contact");
                    if (el) {
                      window.scrollTo({
                        top: el.offsetTop - 80, // altura del header
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="inline-flex items-center gap-4 px-8 py-4 bg-black text-white font-black text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-transform group shadow-xl"
                >
                  Saber más{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </a>
              </div>
              {/* Graphic background element */}
              <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
                <img
                  src="https://img.icons8.com/ios-filled/200/000000/bee.png"
                  alt=""
                  className="w-48 h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-16 bg-[#FDFCE6] px-4">
        {/*py-20 md:py-24 bg-[#FDFCE6] px-4*/}
        <div className="container mx-auto max-w-6xl">
          {/*container mx-auto max-w-7xl*/}
          <div className="mb-10 md:mb-12 text-center">
            {/*mb-14 md:mb-20 text-center*/}
            <SectionTitle className="text-4xl md:text-5xl lg:text-6xl">
              CAPACIDADES
            </SectionTitle>
          </div>

          {/* Grid responsive real */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="
            bg-white
            border-[4px] border-black {/* Reducido de 6px a 4px */}
            rounded-[2rem] md:rounded-[2.5rem] {/* Bordes menos exagerados */}
            p-6 md:p-8 {/* Reducido padding interno de 10 a 8 */}
            shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] {/* Sombra más sutil */}
            flex flex-col
            min-h-[420px] md:min-h-[480px] {/* Reducida altura mínima significativa */}
            transition-all
            hover:-translate-y-2
            group
            max-w-[400px] mx-auto {/* Reducido ancho máximo de 520px a 400px */}
            w-full
          "
              >
                {/* Icon - Más pequeño */}
                <div className="mb-5 md:mb-6 w-12 h-12 md:w-14 md:h-14 bg-[#EBE300] border-[3px] border-black rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  {React.cloneElement(service.icon as any, {
                    className: "w-6 h-6 md:w-7 md:h-7 text-black", // Icono más pequeño
                  })}
                </div>

                {/* Title - Ajustado tamaño de fuente */}
                <h3
                  className="
              font-[900] uppercase tracking-tighter leading-[0.95]
              text-[22px] md:text-[26px] {/* Reducido tamaño de fuente */}
              mb-4 md:mb-6
              break-words
              [text-wrap:balance]
            "
                >
                  {service.title}
                </h3>

                {/* Items - Más compactos */}
                <ul className="flex-grow space-y-2 md:space-y-3 mb-0">
                  {" "}
                  {/* Reducido espacio entre items */}
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="
                  flex items-start gap-3
                  font-black uppercase
                  text-[10px] md:text-[12px] {/* Texto un poco más pequeño */}
                  tracking-wide
                  text-gray-800
                "
                    >
                      <span className="mt-[5px] w-2 h-2 bg-[#EBE300] rounded-full border border-black flex-shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="
            bg-white
            border-[5px] md:border-[6px] border-black
            rounded-[2.5rem] md:rounded-[3.5rem]
            p-7 md:p-10
            shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            flex flex-col
            min-h-[520px] md:min-h-[560px]
            transition-all
            hover:-translate-y-2
            group
            max-w-[520px] mx-auto
            w-full
          "
              >*/}

      {/* Icon 
            
             <div className="mb-6 md:mb-8 w-16 h-16 md:w-20 md:h-20 bg-[#EBE300] border-4 border-black rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  {React.cloneElement(service.icon as any, {
                    className: "w-8 h-8 md:w-10 md:h-10 text-black",
                  })}
                </div>  
                */}
      {/* Title 
           
             <h3
                  className="
              font-[900] uppercase tracking-tighter leading-[0.95]
              text-[26px] md:text-3xl
              mb-6 md:mb-8
              break-words
              [text-wrap:balance]
            "
                >
                  {service.title}
                </h3>     */}

      {/* Items
             
              <ul className="flex-grow space-y-3 md:space-y-4 mb-0">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="
                  flex items-start gap-3 md:gap-4
                  font-black uppercase
                  text-[11px] md:text-sm
                  tracking-wide md:tracking-wider
                  text-gray-800
                "
                    >
                      <span className="mt-[6px] md:mt-[7px] w-2.5 h-2.5 bg-[#EBE300] rounded-full border border-black flex-shrink-0" />
                      <span className="leading-snug md:leading-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
*/}

      {/* Clients */}
      <section
        id="clients"
        className="w-full bg-[#1A1A1A] py-16 flex flex-col justify-center border-y border-white/10"
      >
        <div className="container mx-auto px-4 mb-10">
          <h2 className="text-center text-[#EBE300] text-3xl md:text-5xl font-black uppercase tracking-tighter">
            MARCAS EN LA COLMENA
          </h2>
        </div>

        {/* Contenedor relativo para los faders */}
        <div className="relative bg-[#121212] py-8 overflow-hidden">
          {/* Fader Izquierdo */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />

          {/* Fader Derecho */}
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />

          {/* El carrusel se mantiene igual */}
          <div className="flex items-center gap-12 animate-scroll">
            {[...CLIENTS_LIST, ...CLIENTS_LIST].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-44 md:h-52 w-[480px] md:w-[640px] opacity-70 hover:opacity-100 transition-all"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-full w-full object-contain scale-[1.25] md:scale-[1.45]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*href="https://wa.me/5492617007256"
href="mailto:PINTAMKT@GMAIL.COM"
href="https://www.instagram.com/pintamkt/"
href="https://www.linkedin.com/company/pinta-marketing/?viewAsMember=true"*/}

      {/* Contact */}
      <section id="contact" className="py-12 md:py-16 bg-[#FDFCE6] px-4">
        <div className="container mx-auto max-w-5xl">
          {" "}
          {/* Reducido de 6xl a 5xl para cerrar el diseño */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Columna Izquierda: Minimalista */}
            <div className="w-full lg:w-[45%]">
              <h2 className="text-4xl md:text-5xl font-[900] uppercase tracking-tighter leading-none mb-4 text-black">
                HABLEMOS
              </h2>

              <div className="mb-8">
                <p className="leading-[1.9] inline">
                  <span className="bg-[#EBE300] text-black px-1.5 py-1 font-black uppercase tracking-widest text-[14px] md:text-[15px]">
                    ¿ESTÁS LISTO PARA TRANSFORMAR TU MARCA?{" "}
                  </span>
                  <br />
                  <span className="bg-[#EBE300] text-black px-1.5 py-1 font-medium italic text-[15px] md:text-[17px]">
                    Conectemos y hagamos crecer tu colmena
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {/* WhatsApp Mini */}
                <a
                  href="https://wa.me/5492617007256"
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white border-[2px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2.5 flex items-center justify-between transition-all hover:translate-x-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#EBE300] border-[2px] border-black rounded-md flex items-center justify-center group-hover:rotate-6 transition-transform">
                      <MessageCircle size={16} className="text-black" />
                    </div>
                    <div className="font-[900] text-xs uppercase tracking-tighter">
                      +54 9 261 700 7256
                    </div>
                  </div>
                  <span className="text-[8px] font-black opacity-40">CHAT</span>
                </a>

                {/* Email Mini */}
                <a
                  href="mailto:PINTAMKT@GMAIL.COM"
                  className="group bg-white border-[2px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-2.5 flex items-center gap-3 transition-all hover:translate-x-1"
                >
                  <div className="w-8 h-8 bg-[#EBE300] border-[2px] border-black rounded-md flex items-center justify-center">
                    <Mail size={16} className="text-black" />
                  </div>
                  <div className="font-[900] text-xs uppercase tracking-tighter">
                    PINTAMKT@GMAIL.COM
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <a
                    href="https://www.instagram.com/pintamkt/"
                    className="bg-black text-white rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-[#EBE300] hover:text-black transition-all"
                  >
                    <Instagram size={14} />{" "}
                    <span className="font-black uppercase text-[9px]">IG</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pinta-marketing/?viewAsMember=true"
                    className="bg-black text-white rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-[#EBE300] hover:text-black transition-all"
                  >
                    <Linkedin size={14} />{" "}
                    <span className="font-black uppercase text-[9px]">IN</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Formulario Compacto */}

            <div className="w-full lg:w-[55%]">
              {submitted ? (
                /* ✅ MENSAJE DE ÉXITO: COHERENCIA TOTAL CON LA PIEZA GRÁFICA */
                <div
                  className="
      relative
      bg-[#EBE300]
      border-[4px] border-black
      rounded-[3.5rem]
      p-10 md:p-12
      shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
      overflow-hidden
      flex flex-col items-center text-center
      min-h-[450px] justify-center
      animate-in fade-in zoom-in duration-500
    "
                >
                  {/* Overlay sutil para profundidad (igual al formulario) */}
                  <div className="pointer-events-none absolute inset-0 bg-black/5 rounded-[3.5rem]" />

                  <div className="relative flex flex-col items-center">
                    {/* Tag superior (estructura editorial) */}
                    <span className="inline-block px-4 py-1 bg-black text-[#EBE300] font-black text-xs uppercase tracking-widest rounded-full mb-8">
                      ESTADO: ENVIADO
                    </span>

                    {/* Icono con fondo negro para contraste neobrutalista */}
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)]">
                      <CheckCircle size={40} className="text-[#EBE300]" />
                    </div>

                    <h3 className="text-4xl md:text-5xl font-[900] uppercase mb-4 tracking-tighter leading-none text-black">
                      ¡RECIBIDO!
                    </h3>

                    <p className="text-lg md:text-xl font-bold italic text-black/80 max-w-[280px] md:max-w-md leading-tight">
                      "{aiAnalysis}"
                    </p>

                    {/* Botón para resetear (opcional, por si quieren mandar otro) */}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-10 text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors underline"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                // ✅ CONTENEDOR “PIEZA GRÁFICA” (refinado)
                <div
                  className="
        relative
        bg-[#EBE300]
        border-[4px] border-black
        rounded-[3.5rem]
        p-10 md:p-12
        shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
        overflow-hidden
      "
                >
                  {/* overlay sutil para profundidad */}
                  <div className="pointer-events-none absolute inset-0 bg-black/5 rounded-[3.5rem]" />

                  <div className="relative">
                    {/* tag superior (estructura editorial) */}
                    <span className="inline-block px-5 py-1.5 bg-black text-[#EBE300] font-black text-[13px] mb-6 rounded-full tracking-tight">
                      Formulario
                    </span>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <input
                        type="text"
                        placeholder="TU NOMBRE"
                        required
                        className="w-full px-5 py-3 bg-[#FDFCE6] border-[2px] border-black rounded-full font-[900] text-sm uppercase outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 transition-all"
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                      />

                      <input
                        type="email"
                        placeholder="TU EMAIL"
                        required
                        className="w-full px-5 py-3 bg-[#FDFCE6] border-[2px] border-black rounded-full font-[900] text-sm uppercase outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 transition-all"
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                      />

                      <textarea
                        placeholder="CONTANOS TU VISIÓN..."
                        required
                        rows={4}
                        className="w-full px-5 py-4 bg-[#FDFCE6] border-[2px] border-black rounded-2xl font-[900] text-sm uppercase outline-none resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 transition-all"
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full py-4 bg-black text-[#EBE300] font-[900] text-lg uppercase rounded-full transition-all flex items-center justify-center gap-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95"
                      >
                        {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}{" "}
                        <Send
                          size={36}
                          className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-white px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-center">
          <LogoText className="w-40 text-[#EBE300]" />
          <div className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} PINTA MKT - ESTRATEGIA DIGITAL
          </div>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                className="text-gray-500 hover:text-[#EBE300] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-[300] bg-black overflow-y-auto animate-in fade-in duration-500">
          <div className="sticky top-0 z-[310] flex justify-between items-center p-6 bg-black/80 backdrop-blur-lg">
            <button
              onClick={() => setSelectedProject(null)}
              className="hover:opacity-80 transition-opacity"
            >
              <LogoText className="w-32 text-[#EBE300]" />
            </button>
            <button
              onClick={() => setSelectedProject(null)}
              className="p-3 bg-[#EBE300] text-black rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
          <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
              <div>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-[900] text-white uppercase tracking-tighter leading-[0.85] mb-8">
                  {selectedProject.title}
                </h1>
                <p className="text-lg md:text-xl text-white/70 font-bold mb-12">
                  {selectedProject.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProject.results.map((res, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-6 rounded-[2rem]"
                    >
                      <div className="text-[#EBE300] mb-3">{res.icon}</div>
                      <div className="text-2xl font-black text-white mb-1 tracking-tighter">
                        {res.value}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full aspect-[4/3] object-cover rounded-[2rem] border-2 border-white/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
      {showRecaptcha && (
        <div className="fixed inset-0 z-[600] bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-2xl font-[900] uppercase tracking-tighter">
                Verificación
              </h3>

              <button
                type="button"
                onClick={() => {
                  setShowRecaptcha(false);
                  setRecaptchaToken("");

                  // @ts-ignore
                  if (window.grecaptcha && widgetIdRef.current !== null) {
                    // @ts-ignore
                    window.grecaptcha.reset(widgetIdRef.current);
                  }
                  widgetIdRef.current = null;
                }}
                className="w-10 h-10 rounded-full bg-black text-[#EBE300] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-sm font-bold text-gray-600 mb-6">
              Confirmá que no sos un bot para enviar el mensaje.
            </p>

            <div ref={recaptchaDivRef} />

            <button
              type="button"
              onClick={sendFormNow}
              disabled={!recaptchaToken || isSubmitting}
              className="mt-8 w-full py-5 bg-black text-[#EBE300] font-[900] text-xl uppercase rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBE300] hover:text-black transition-all"
            >
              {isSubmitting ? "ENVIANDO..." : "CONFIRMAR Y ENVIAR"}
            </button>
          </div>
        </div>
      )}
      {/* BOTÓN FLOTANTE DEFINITIVO - CLEAN & GLOW */}
      <a
        href="#contact"
        aria-label="Contactar con Pinta MKT"
        title="Contactar"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("contact");
          if (el)
            window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        }}
        className="
          fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[90]
          group flex items-center gap-4 bg-[#EBE300] 
          border-[2px] border-black rounded-full 
          px-4 py-2 md:px-5 md:py-2.5
          shadow-lg
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          
          /* HOVER: Escala equilibrada y Glow Amarillo */
          hover:scale-[1.05]
          hover:shadow-[0_0_25px_5px_rgba(235,227,0,0.6)]
          active:scale-95
          cursor-pointer
        "
      >
        {/* Texto: Mantenemos el peso visual fuerte */}
        <div className="relative z-10 flex flex-col leading-tight text-left pl-1">
          <span className="text-[10px] md:text-[11px] font-[900] uppercase text-black tracking-tight select-none">
            NOT PINTA <br /> NOT MKT
          </span>
        </div>

        {/* Círculo Icono: Se mantiene estático y centrado */}
        <div
          className="
          relative z-10 flex-shrink-0
          w-7 h-7 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center
          transition-transform duration-500 group-hover:rotate-[12deg]
        "
        >
          <MessageCircle
            size={14}
            className="text-[#EBE300] transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Brillo de barrido (Shine) */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-0">
          <div
            className="
            absolute -inset-full top-0 block h-full w-1/2 
            -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent 
            opacity-0 group-hover:opacity-100 group-hover:animate-shine
          "
          />
        </div>
      </a>
    </div>
  );
};

export default App;
