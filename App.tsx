// App.tsx (COMPLETO)

import React, { useState, useEffect, useRef } from 'react';
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
  MessageCircle 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Configuration & API ---
<<<<<<< HEAD
const API_ENDPOINT = "https://api.pintamkt.online/contact.php";
=======
const API_ENDPOINT = "https://c2801498.ferozo.com/api/contact.php";
>>>>>>> 617de37 (Resolve merge conflict + fix API endpoint)

// --- Assets ---
const LogoText: React.FC<{ className?: string }> = ({ className = "w-48 h-auto" }) => (
  <svg viewBox="0 0 459 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M294.21 63.88C288.75 63.88 284.47 63.42 281.39 62.51C278.3 61.55 276.16 60.26 274.94 58.64C273.73 57.02 273.12 55.07 273.12 52.8C273.12 49.77 274.18 47.36 276.31 45.59C278.43 43.77 281.67 42.35 286.02 41.34C290.42 40.33 296.62 39.39 304.61 38.53L321.07 37.01L320.84 41.64L313.56 42.55C311.79 42.8 310.4 43.08 309.39 43.38C308.43 43.68 307.75 44.06 307.34 44.52C306.94 44.92 306.73 45.43 306.73 46.04C306.73 46.9 307.06 47.51 307.72 47.86C308.43 48.21 309.44 48.39 310.75 48.39C312.82 48.39 314.54 48.11 315.91 47.56C317.28 46.95 318.29 46.12 318.94 45.06C319.65 43.95 320 42.63 320 41.11V36.03C320 34.92 319.75 33.98 319.24 33.22C318.73 32.41 317.95 31.8 316.89 31.4C315.83 31 314.41 30.79 312.64 30.79C309.96 30.79 308.01 31.27 306.8 32.23C305.64 33.19 304.85 34.71 304.45 36.78H275.85C276.61 32.28 278.23 28.51 280.71 25.48C283.19 22.39 287.21 19.99 292.77 18.27C298.38 16.5 306 15.61 315.61 15.61C325.22 15.61 332.71 16.5 338.22 18.27C343.73 19.99 347.6 22.44 349.83 25.63C352.11 28.77 353.24 32.66 353.24 37.31V49.53L354.53 62.81H321.98V43.77H320.84C320.54 48.32 319.63 52.04 318.11 54.92C316.59 57.75 313.94 59.95 310.14 61.52C306.4 63.09 301.09 63.87 294.21 63.87V63.88ZM221.72 16.76H272.4V35.2H221.72V16.76ZM229.3 10.84L262.38 3.25V62.81H229.3V10.84ZM184.76 43.17C184.76 41.45 184.56 40.08 184.15 39.07C183.75 38.01 182.94 37.22 181.72 36.72C180.56 36.16 178.89 35.89 176.71 35.89C174.53 35.89 172.54 36.27 170.87 37.03C169.25 37.79 167.96 38.93 167 40.44C166.04 41.96 165.48 43.93 165.33 46.36H163.13C163.53 39.53 164.72 33.89 166.7 29.44C168.67 24.94 171.73 21.52 175.88 19.2C180.08 16.82 185.57 15.63 192.34 15.63C200.84 15.63 207.21 17.48 211.46 21.17C215.71 24.81 217.83 30.27 217.83 37.56V62.82H184.75V43.17H184.76ZM132.26 16.76H161.47L163.37 37.17H165.34V62.81H132.26V16.76ZM92.24 0H125.85V12.14H92.24V0ZM92.47 16.76H125.55V62.81H92.47V16.76ZM0 9.70999H51.9C62.47 9.70999 70.99 11.35 77.47 14.64C83.99 17.93 87.26 23.31 87.26 30.8C87.26 35.4 86.27 39.27 84.3 42.41C82.33 45.55 78.84 48 73.83 49.77C68.82 51.49 61.97 52.35 53.27 52.35H31.19V36.64L49.63 36.56C50.95 36.56 52.01 36.41 52.82 36.1C53.68 35.75 54.31 35.24 54.72 34.58C55.12 33.87 55.33 32.96 55.33 31.85C55.33 30.28 54.87 29.14 53.96 28.44C53.1 27.73 51.68 27.38 49.71 27.38H33.25V62.81H0.0200043V9.7L0 9.70999Z" fill="currentColor"/>
    <path d="M444.19 15.4608H436.07V10.2008H458.24V15.4608H450.12V62.8108H444.18V15.4608H444.19ZM407.9 10.2008H413.84V62.8108H407.9V10.2008ZM415.04 38.2408H413.01V33.8108H414.59L416.54 28.7708C418.85 23.1108 420.6 19.1008 421.8 16.7408C423 14.3308 424.28 12.6308 425.63 11.6308C426.98 10.5808 428.74 10.0508 430.89 10.0508H431.87V15.9908H431.12C429.82 15.9908 428.76 16.3708 427.96 17.1208C427.16 17.8708 426.36 19.1008 425.55 20.8008C424.75 22.4508 423.5 25.3908 421.79 29.5908C420.59 32.6508 419.54 35.2808 418.63 37.4808L418.33 31.4708L432.69 62.8108H426.15L415.03 38.2308L415.04 38.2408ZM365.59 10.2008H376.04L383.63 58.7608H382.43L390.32 10.2008H400.17V62.8108H394.46V16.4308H394.01L386.27 62.8108H379.66L371.69 16.4308H371.24V62.8108H365.6V10.2008H365.59Z" fill="currentColor"/>
  </svg>
);

// --- Types ---
interface NavLink { label: string; href: string; }
interface Service { id: number; title: string; items: string[]; cta: string; icon: React.ReactNode; tag: string; }
interface Project { id: number; title: string; category: string; image: string; description: string; results: { label: string; value: string; icon: React.ReactNode }[]; }
interface Client { name: string; logo: string; }

// --- Data ---
const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', href: '#home' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Trabajos', href: '#works' },
  { label: 'Servicios', href: '#services' },
  { label: 'Clientes', href: '#clients' },
  { label: 'Contacto', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: <Instagram size={24} />, href: 'https://www.instagram.com/pintamkt/', label: 'Instagram' },
  { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/company/pinta-marketing/?viewAsMember=true', label: 'LinkedIn' },
  { icon: <MessageCircle size={24} />, href: 'https://wa.me/5492617007256', label: 'WhatsApp' },
];

const SERVICES: Service[] = [
  { 
    id: 1, 
    title: 'MARKETING DIGITAL', 
    tag: 'ESTRATEGIA',
    icon: <Globe className="w-8 h-8 md:w-10 md:h-10" />,
    items: ['Branding y Posicionamiento', 'Meta y Google Ads', 'Gestión de Redes Sociales', 'Google My Business', 'Email Marketing'],
    cta: 'Potenciarme'
  },
  {
    id: 2,
    title: 'PRODUCCIÓN AV',
    tag: 'CONTENIDO',
    icon: <Video className="w-8 h-8 md:w-10 md:h-10" />,
    items: ['Podcasts y Reels dinámicos', 'Spots Publicitarios', 'Documentales Corporativos', 'Streaming Profesional'],
    cta: 'Info Producción'
  },
  {
    id: 3, 
    title: 'WEB & AUTOMATIZACIÓN',
    tag: 'TECNOLOGÍA',
    icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
    items: ['Desarrollo Web / eCommerce', 'Chatbots con IA', 'Automatización de CRM', 'Soporte Técnico'],
    cta: 'Automatizar'
  }
];

const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'SAMACO CAMPAIGN', 
    category: 'MARKETING DIGITAL', 
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    description: 'Estrategia integral de pauta publicitaria y contenido orgánico que disparó el engagement y las ventas de unidades en tiempo récord.',
    results: [
      { label: 'Conversiones', value: '+45%', icon: <TrendingUp size={16}/> },
      { label: 'Alcance Ads', value: '250k', icon: <Users size={16}/> },
      { label: 'ROI', value: '12x', icon: <Award size={16}/> }
    ]
  },
  { 
    id: 2, 
    title: 'FENIKKS WEB', 
    category: 'DESARROLLO WEB', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Rediseño de ecosistema digital con enfoque en UI/UX brutalista, optimizando el funnel de conversión.',
    results: [
      { label: 'Velocidad', value: '98/100', icon: <Zap size={16}/> },
      { label: 'Tasa Rebote', value: '-30%', icon: <TrendingUp size={16}/> },
      { label: 'Mobile traffic', value: '75%', icon: <Users size={16}/> }
    ]
  },
  { 
    id: 3, 
    title: 'BURGERY REELS', 
    category: 'PRODUCCIÓN AV', 
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    description: 'Estrategia de Reels dinámicos para Burgery que impulsó el tráfico al local físico y viralizó sus nuevos lanzamientos.',
    results: [
      { label: 'Views', value: '1M+', icon: <TrendingUp size={16}/> },
      { label: 'Engagement', value: '+200%', icon: <Users size={16}/> },
      { label: 'Ventas', value: '+40%', icon: <Award size={16}/> }
    ]
  }
];

const CLIENTS_LIST: Client[] = [
  { name: 'Samaco', logo: 'samaco.png' },
  { name: 'Fenikks', logo: 'fenikks.png' },
  { name: 'Teatro del Bicentenario', logo: 'bicentenario.png' },
  { name: 'Científica Cuyo', logo: 'cientifica.png' },
  { name: 'Cubos de Chacras', logo: 'cubos.png' },
  { name: 'Bermúdez Moya', logo: 'bermudez.png' },
  { name: 'Teatro Sarmiento', logo: 'sarmiento.png' },
  { name: 'Mendoza Plaza Shopping', logo: 'shopping.png' },
];

// --- Helpers ---
const analyzeLeadWithAI = async (name: string, vision: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres el estratega jefe de Pinta MKT. Un prospecto llamado ${name} ha enviado esta visión: "${vision}". Genera una respuesta de exactamente 20 palabras que sea inspiradora y mencione que su proyecto tiene un potencial enorme para ser el próximo gran éxito de la colmena.`,
    });
    return response.text || "Tu visión tiene un potencial increíble. En Pinta MKT estamos listos para transformarla en resultados reales.";
  } catch {
    return "Tu visión tiene un potencial increíble. En Pinta MKT estamos listos para transformarla en resultados reales muy pronto.";
  }
};

// ✅ CAMBIO CLAVE: robust parse + logs + no rompe por HTML/vacío
const notifyBackend = async (data: any) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Backend ${response.status}`);
    }

    const result = await response.json();
    return result.status === 'success';
  } catch (error) {
    console.error("Backend error:", error);
    alert("No se pudo enviar el formulario (backend). Revisá la consola para ver el error real.");
    return false;
  }
};


// --- Components ---
const SectionTitle: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <h2 className={`text-4xl md:text-6xl lg:text-8xl font-[900] mb-10 uppercase tracking-tighter leading-[0.85] text-[#1A1A1A] ${className}`}>
    {children}
  </h2>
);

const ProjectCard: React.FC<{ project: Project; onOpenProject: (p: Project) => void }> = ({ project, onOpenProject }) => (
  <button 
    onClick={() => onOpenProject(project)} 
    className="group relative w-full sm:w-[48%] lg:w-[31%] max-w-[400px] aspect-[14/11] overflow-hidden rounded-[2.5rem] border-[5px] border-black shadow-xl text-left transition-all hover:-translate-y-3 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.3)] isolate"
    style={{ transform: 'translateZ(0)' }}
  >
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.3rem] z-0">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 will-change-transform" 
      />
    </div>

    <div className="absolute top-7 right-7 z-20 w-12 h-12 md:w-16 md:h-16 bg-[#EBE300] border-[2.5px] border-black rounded-full flex items-center justify-center animate-organic-flight shadow-lg group-hover:scale-110 transition-transform">
      <img src="https://img.icons8.com/ios-filled/50/000000/bee.png" alt="Bee" className="w-6 h-6 md:w-8 md:h-8" />
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10 z-10">
      <span className="text-[#EBE300] text-xs md:text-sm font-black uppercase mb-1 tracking-[0.2em] drop-shadow-md">
        {project.category}
      </span>
      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-[900] uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-lg">
        {project.title}
      </h3>
      <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/15 backdrop-blur-md border border-white/40 text-white font-black uppercase text-[10px] md:text-xs tracking-widest rounded-full transition-all group-hover:bg-[#EBE300] group-hover:text-black group-hover:border-black group-active:scale-95 w-fit">
        Ver Campaña <ArrowRight size={14}/>
      </div>
    </div>
  </button>
);

const Header: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <header className={`fixed w-full top-0 left-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/95 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}><LogoText className="w-32 md:w-48 text-[#EBE300]" /></a>
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`font-black text-[11px] uppercase tracking-[0.2em] transition-all relative py-2 ${activeSection === link.href.replace('#', '') ? 'text-[#EBE300]' : 'text-white hover:text-[#EBE300]/80'}`}>
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#EBE300] transform transition-transform duration-300 ${activeSection === link.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#EBE300] p-2">{isOpen ? <X size={32} /> : <Menu size={32} />}</button>
      </div>
      <div className={`fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-8 lg:hidden transition-all duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-[#EBE300]"><X size={40} /></button>
        <LogoText className="w-64 text-[#EBE300] mb-10" />
        {NAV_LINKS.map(link => (<a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-[900] text-4xl uppercase text-white">{link.label}</a>))}
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.5] });
    ['home', 'about', 'works', 'services', 'clients', 'contact'].forEach(id => {
      const el = document.getElementById(id); if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ✅ CAMBIO CLAVE: no marcar “RECIBIDO” si backend falla
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const analysis = await analyzeLeadWithAI(formState.name, formState.message);
    setAiAnalysis(analysis);

    const ok = await notifyBackend({ ...formState, ai_analysis: analysis });

    setIsSubmitting(false);

    if (!ok) {
      alert("No se pudo enviar el formulario (backend). Revisá la consola para ver el error real.");
      return;
    }

    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCE6] selection:bg-[#EBE300] selection:text-black">
      <Header activeSection={activeSection} />
      
      {/* Hero */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-[#1A1A1A] overflow-hidden px-4">
        <div className="z-10 text-center max-w-6xl mx-auto">
          <div className="flex justify-center mb-12"><img src="https://img.icons8.com/ios-filled/100/EBE300/bee.png" alt="Abeja" className="w-16 h-16 md:w-24 md:h-24 animate-organic-flight" /></div>
          <div className="mb-12 flex justify-center"><LogoText className="w-full max-w-[900px] text-[#EBE300]" /></div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-[900] text-white uppercase tracking-tight max-w-4xl mx-auto opacity-90 leading-tight mb-12">Transformamos ideas en resultados. <br/><span className="text-[#EBE300] inline-block mt-2">Estrategia pura para tu negocio.</span></h1>
          <a href="#about" className="inline-flex items-center gap-4 px-12 py-6 bg-[#EBE300] text-black font-[900] text-xl uppercase tracking-tighter hover:bg-white transition-all rounded-full shadow-lg">Descubrir <ArrowRight size={24} /></a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-[#FDFCE6] px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="group">
              <span className="inline-block px-4 py-1 bg-black text-[#EBE300] font-black text-xs uppercase mb-6 rounded-full tracking-widest">NOSOTROS</span>
              <SectionTitle>POTENCIA COLECTIVA</SectionTitle>
              <p className="text-xl md:text-2xl text-gray-700 font-[900] mb-8 uppercase">Mirada estratégica y humana.</p>
              <div className="bg-white p-10 border-4 border-black rounded-[3rem] shadow-xl hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-500">
                <p className="text-lg md:text-xl font-bold leading-relaxed text-gray-800 italic">"Donde otros venden ruido, nosotros entregamos resultados reales. Sinergia pura."</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#EBE300] rounded-[3.5rem] opacity-0 group-hover:opacity-30 transition-all duration-700 scale-90 group-hover:scale-110 rotate-6" />
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" className="relative rounded-[3rem] border-4 border-black w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:-translate-y-6 transition-all duration-1000 shadow-2xl z-10" alt="Equipo Pinta MKT" />
            </div>
          </div>
        </div>
      </section>

      {/* Works - Row Horizontal Estática */}
      <section id="works" className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <SectionTitle>NUESTRA COSECHA</SectionTitle>
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 md:gap-8 lg:gap-10">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenProject={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#FDFCE6] px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center"><SectionTitle>CAPACIDADES</SectionTitle></div>
          <div className="grid md:grid-cols-3 gap-10">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white border-[6px] border-black rounded-[3.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full transition-all hover:-translate-y-3 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group">
                <div className="mb-8 w-20 h-20 bg-[#EBE300] border-4 border-black rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  {React.cloneElement(service.icon as any, { className: 'w-10 h-10 text-black' })}
                </div>
                <h3 className="text-3xl font-[900] uppercase mb-8 tracking-tighter leading-none">{service.title}</h3>
                <ul className="flex-grow space-y-4 mb-10">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-black text-xs md:text-sm uppercase tracking-wider text-gray-800">
                      <div className="w-2.5 h-2.5 bg-[#EBE300] rounded-full border border-black" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-24 bg-black text-white overflow-hidden relative">
        <div className="container mx-auto max-w-7xl px-4 mb-16 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-[#EBE300]">MARCAS EN LA COLMENA</h2>
        </div>
        <div className="relative z-10 bg-[#141414] py-16 border-y-2 border-white/5">
          <div className="flex animate-scroll-right gap-20 md:gap-32 items-center">
            {[...CLIENTS_LIST, ...CLIENTS_LIST].map((client, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center h-16 w-48 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-full max-w-full object-contain" 
                  onError={(e) => { 
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if(parent && !parent.querySelector('.fallback')) {
                      const span = document.createElement('span');
                      span.className = 'fallback text-white/30 font-black uppercase text-xl';
                      span.innerText = client.name;
                      parent.appendChild(span);
                    }
                  }} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 bg-[#FDFCE6] px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="w-full lg:w-[55%]">
              <h2 className="text-[12vw] lg:text-[8rem] font-[900] uppercase tracking-tighter leading-[0.8] mb-8 text-black">HABLEMOS</h2>
              <p className="text-2xl font-[900] text-gray-500 uppercase tracking-tighter mb-16 italic drop-shadow-sm">¿LISTO PARA QUE TU MARCA BRILLE?</p>
              
              <div className="flex flex-col gap-10">
                <a href="mailto:PINTAMKT@GMAIL.COM" className="flex items-center gap-6 group w-fit">
                  <div className="w-16 h-16 bg-black text-[#EBE300] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Mail size={32} />
                  </div>
                  <span className="font-[900] text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter text-black">PINTAMKT@GMAIL.COM</span>
                </a>
                
                <div className="flex gap-6 items-center">
                  <a href="https://www.instagram.com/pintamkt/" target="_blank" className="w-14 h-14 bg-black text-[#EBE300] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#EBE300] hover:text-black transition-all shadow-lg">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.linkedin.com/company/pinta-marketing/" target="_blank" className="w-14 h-14 bg-black text-[#EBE300] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#EBE300] hover:text-black transition-all shadow-lg">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://wa.me/5492617007256" target="_blank" className="w-14 h-14 bg-black text-[#EBE300] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#EBE300] hover:text-black transition-all shadow-lg">
                    <MessageCircle size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[45%]">
              {submitted ? (
                <div className="bg-white border-4 border-black p-12 rounded-[3rem] text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-500">
                  <CheckCircle className="mx-auto mb-6 text-[#EBE300]" size={64} />
                  <h3 className="text-3xl font-[900] uppercase mb-4 tracking-tighter">¡RECIBIDO!</h3>
                  <p className="text-lg font-bold italic text-gray-700">"{aiAnalysis}"</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input type="text" placeholder="TU NOMBRE" required className="w-full px-10 py-5 bg-white border-[4px] border-black rounded-full font-[900] text-lg uppercase outline-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) => setFormState({...formState, name: e.target.value})} />
                  <input type="email" placeholder="TU EMAIL" required className="w-full px-10 py-5 bg-white border-[4px] border-black rounded-full font-[900] text-lg uppercase outline-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) => setFormState({...formState, email: e.target.value})} />
                  <textarea placeholder="CONTANOS TU VISIÓN..." required rows={4} className="w-full px-10 py-8 bg-white border-[4px] border-black rounded-[2.5rem] font-[900] text-lg uppercase outline-none resize-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) => setFormState({...formState, message: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="group w-full py-7 bg-black text-[#EBE300] font-[900] text-3xl uppercase rounded-full hover:bg-[#EBE300] hover:text-black transition-all flex items-center justify-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] mt-4 active:scale-95">
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'} <Send size={36} className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black text-white px-4 border-t border-white/10">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-center">
          <LogoText className="w-40 text-[#EBE300]" />
          <div className="text-[11px] text-gray-500 font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} PINTA MKT - ESTRATEGIA DIGITAL</div>
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((s, i) => (<a key={i} href={s.href} target="_blank" className="text-gray-500 hover:text-[#EBE300] transition-colors">{s.icon}</a>))}
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-[300] bg-black overflow-y-auto animate-in fade-in duration-500">
          <div className="sticky top-0 z-[310] flex justify-between items-center p-6 bg-black/80 backdrop-blur-lg">
            <button onClick={() => { setSelectedProject(null); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:opacity-80 transition-opacity"><LogoText className="w-32 text-[#EBE300]" /></button>
            <button onClick={() => setSelectedProject(null)} className="p-3 bg-[#EBE300] text-black rounded-full hover:scale-110 transition-transform flex items-center gap-2 font-black uppercase text-xs shadow-lg"><X size={20} /> <span>Cerrar</span></button>
          </div>
          <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-4 py-1.5 bg-[#EBE300] text-black font-black text-xs uppercase mb-6 rounded-full tracking-widest">CAMPAÑA ACTIVA</span>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-[900] text-white uppercase tracking-tighter leading-[0.85] mb-8">{selectedProject.title}</h1>
                <p className="text-lg md:text-xl text-white/70 font-bold leading-snug max-w-xl mb-12">{selectedProject.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProject.results.map((res, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                      <div className="text-[#EBE300] mb-3">{res.icon}</div>
                      <div className="text-2xl font-black text-white mb-1 tracking-tighter">{res.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2"><img src={selectedProject.image} alt={selectedProject.title} className="w-full aspect-[4/3] object-cover rounded-[2rem] border-2 border-white/20 shadow-2xl" /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
