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
import { GoogleGenAI } from "@google/genai";



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
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEX////DGyhMTEzCFSLKPkvFFyVGRkbCKzVBQUE+Pj5DQ0NJSUm9AADDGynBABf+/v/AABD4+PhcXFx6eno5OTnm5ubrzM7CCx2/AArCABlQUFDGxsbv7++kpKRra2u3t7fz4+TblpuPj4+cnJzFxcWYmJiysrJzc3PV1dXo6Oibm5vY2Njlub3t19jMWWDTh4vTfYTjsbTdn6LJTVbHM0DRd3rpw8jNY2ju0dH06ejVjpHNbHTnuL3CKzbWkpbXhIfMU1yhssN+AAAGT0lEQVR4nO2c6XqiShBAUQRZFMEloDEanUSTMe5GYzIzyfs/1SWAQjeNgkug+9b5NaMyX51L9VJFczkOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgDAwj7QiuzAtffEk7hmsynpRyQmkyTjuOa2FMNTNnYzZn27RjuQrzspZzEZrmIu1oLs94aQk5H2u1Tjuiy7L9bPI5BN7a2MOxknZgl8JP0ACmNmNi5bDv0lvBEsphw1xO05gYjtvXEk/Sc4djgf7huCg2I/2+h6O+oXt1fCvowiFBZzh+0jsctx8HEjQwHPl52pGeRmVBmkH3lP3JRygtb9KO9gRuCvrBG1g2A/72cLxPO+CEbDfHElS/meqm/1ez9E7TcDQWlhnt5lJ64+4/grdZK9MzHNcF/ZifvRR+r4RvS8t3FKzlW9qhx2K7OTwAd4ZOJVx5KQd25Lz2kf26yniPtULY43BX6/f4wJRTyv6kurRyxD1o2HA/6rYzbT9qrewbFuLdwaCh093wLrOyv0+Nb4jUFesVz7ghVyk6E47OkGGzh1xX+cue4Tt6IYP38P9giPShPMPsd8RjG+ZW6NLHoKGgI1s0z/BPapHHJb6hXTFZ//yKyTPMfn2RxNAW8nttjBoGintWDe1U1d3inl1D28p5aPqXYUO7KpyMmb6HNqY5LTp/0FgyNIO/FLzeP0uG5muwC7WDgqdRSWr8eTH0VIMxQ85YmFjjnylDZwdqTHnEkSlDr4q4nwWb+ywactx4U9o7MmUYqOb95j5LhmjfcL10r9N6Uf9wZohtiPTvK5zh7tqYNeR2O2+mDLEnaQzeQ/YNsXM07Blizy12hv/SCTsB8asnq4DMNa4h3gnPIAkqYPTEl2c4TS/0mCSq8XnNPw/NhmE5pwnNwGGocq6p7ZrCnuFnuuHH4KAhz/e2U/S0sKCX584TGtfQpNqQLznjbvxlYY7L9f4ZMNWGGr+rl+ZN9Mwpb32NvV2bOUs1+jhEGJaRY6TtVx09FWaWXt1uovmaYuzxIBvamYhuYW6wg2GCZ0yrIeENEmOhkQ730WnIW8TTatsNoV9qfvx4xEkJG+qR5/FfVqFDxBQamnov+mSs8Y6fQzU3PxjraWCGpcn9wVd/xlhrnzZDLcbrlOgbQ3QZxnqTosK1Z5p/DU+TYfwzzW8Fa284uWp0l8A1tIsIvIY/yEI33ZKD/7pWYBfDNcROA/k8iL+Imbv9cB+0UWIo6BFviD51ZFWqPhC/W690agyRo04BGjVZzefzqlxrkL42/tmLI7+8bngXoGBa9hJIoN2XxbyLKJNT9X5imdk3XBX/kF7vNQaSkveRWrfEq+fFwrUDPJsecYbpVuU8QlSqbrPfESYx6jgDEEVU7tKO61I0avWw36FUpYz27/0EE0Ktk1OVJiqDlhLl56SqeEfTW4dhHloSOUEZSdWnTsQAZCRVG/04fvSmqvEoHhyAWKpWaUvVykBJ4Jd3NgDPaQedhFt8BxMDUaYnVUdDwg4mBjIlqfrclyJX+CPYqdpOO/wYVJMNQBQ7VbP/fx0anpShe+pPaQscpXZqjrrIYJg+/TMNsz+fsm/4eM5cSoXhr7DhgbsqtnBDcjM1S9zhhmr1TooSVDrP2P5OotKQG9TJglLNMLAbLHXTFjjKgGDIdYmloty3q6wq+g0NhnhKqh3701sxrCh/dxMrHeoMu7ihOPz++CmPKarSwPk9tkPwPs0yYcOa83lDRVRUyVsW+tQZPuDFr9h3v2hXAy6qOPJ+j62fCsWGXLuzl1Gq+54FNvdS0Oq/xQ2V37uvjKGXwcrQr3SxrKbA8ClkGIi55nwp1wIdGey/CI2GyNzRl91l0GdEneEI37+gK9ydLKMODeoMG7ghtpceYEv6M7pa+KM2s4QM64frobaKbAWUxx+K83TaqKGikg8l+Dy0grOp2D/86wyAGIpy/3iz3ngMdFhpMPRnDrU+HB2/gEOe81NgaOz2KKpcjd836+a9y7xdbJYxvLshVRPVQcajItJi6E4wyR962qlKiWFLzYv1/imPWLqK4lWTmcaoihHHnWJc25cUCgxbnTMa86NO53KhXAnj9qznY5Xsd4QBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGCc/wAuGoB3H3hxkAAAAABJRU5ErkJggg==",
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
    image:
      "data:image/png;base64,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",
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
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVEhUVFRUWFRYVFRAQEBUQFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGC0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xAA9EAABAwIEAwYEBQMBCQEAAAABAAIRAyEEBTFBElFhBhMicYGRQqGxwRQyUtHwB3LhkjNDYnOCg8LS8RX/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAjEQEBAQACAgICAgMAAAAAAAAAARECEgMhEzFBUQRxMlJh/9oADAMBAAIRAxEAPwDy9jVJ/Dz+Sk0WQMQVzaReRshOKhxKLnpiaJbn8lA8PM+yHKcBVlJpWjhVUw9A8j7FaeHpH9J9lOU2Ncanwjn8kF8bIz6LtmlOME8/CVxyugVNxF10eS9oO7IDiVjNy6p+lO7LKn6VvjsrNx7Lkebh4EFdVhK8rxLs1Wq0iA7RenZNjCQJXpl1xrrQUr8lWw9VWgVQk6aUpQRdPJUMXUIWg4rMzDQoOR7R5uGA3XnWa5vxzddF24wpcDErzbEMcFz52rCrVASTJVZ7lEqMrk0KGhMWN5n2UWGbJ3CFqRECQNCU/fnmUJ7lFMF6hiIvJldBlmfOZ8Rhck0q3ScpbZ9D03Lu1gi5WgO0wO68qa9WaNc80nlq9XoWJzydCudx+ePGhKo08VI1VLMKmicudwkajO0r4uUlzJcnWfk5L1i0BbQKlimrT4LKtVw5Oy6LWS3ylHZhnH4B7LdyzKwdQugoZa0DRakYed1MO6fywt3KMpmCQt6rl449Fp4HCAK9RXoZW2B4R7KyMvA2C0X8Ii6TniEqs0YQckanhhySqVRKRrgarOLov4ccgm7gckNmKBU3Vx19lqRKkyiFsZVi+EwsYYrofZXctBc4GDCqO9y+vIWtTcsPLWQAtmkFpkUpeqeEoQKVTxbJCtoNUIOLz/AcQK8yznLy0my9ozKlIXFZ7lJcLBY5RqPJcVSgqA8guuxvZpxWNWyWo34Ss4jMHkEJxKvVMG5uyqVGGdCoKrjG0p+86BSqtPJCIhAUGdkZqr055Kw0Hks1YM1/QIjKvQIIKK2gSLaqYoveKvUr+vmh1WuGoKC5TquiGt0CSBCS1iOmLbJqbVZ7u2oQQ2603WvlTQBdbIcIWFgqLjutFmHdzXSMIVD4kQILmQ5WQEBaVOVdo4PiQaey3craCs/lfwr0clBvClWycaQupo0xCIMMOS2za49uSdFapZHbRdUzDDkrDcMFWdcfTyEA6LYweVhuy2fw6KxnRAPD4eFaAATTCr1aqC0HKSzm4hW6VVAaAhPCLKE9BTrU5VHEYIHZahS4UVguykHZVcVkTSNF1QYEz6dtER5VnXZ+JIC4LNsCWHf9l7zmlAQbLy/tZhQCSFLFjgGsJSfSVks8RTvpjmFyVmlhGhRGuPMolUeqG1SgtNbOFpSshrL6hb2VsgDdIHxWBlqyaeTPcd42Xb08IHBdBluUNgWXTqmvK3ZHUGyS9jORN5JJ0hrzMGyfDMkoVN1lcy+JWI6VvZbhxCuYhoaE2BcAFWzLFCF1ZZlesONFFRY7a3FUhbTKYjRc/sM/ERC3clxvNcxiArWBqkLG5Ws9PRMJjJWpTxAXAYXMSCtfD5nzK7S6zY7SjUCOKgXK0s3HNX8Pj53WmG3KXGs9uK6odXGAboNCpVWbi6yq1swHNZ2Ixs7oNKhWutbDVFylPGAbrRwuPQdKHob3rLGO6pn43qg0O8TPqrJONQn45FxsCuifiFzb8wjdIZl1RGhmj7FeadpTJIXa4jElwXM5lgOKSpSPP6mDlUq9ItXXVMvvohYnJ5Gi59WnEVXFRDl01XJeiEMl6FMGLQN11mUt8IVGnkvRb+AwfCBZWQX6dWAukyTGAwuYqsgaIWFxxpmy3rOPUmPbCdcth82lovskqPMqQsrWEdCK2iYTdzC8nyx2xpUsXAWbj8USmLiFAtJS+aLgGXsJfK6OnosrCMh2i1WLXDyTGbFXEsRsNTRS1WaTFLyjUDdTKr1arhotQtsq1Smr3GQcVUnVb2T5s7RyoOopm0YuszyZUsda3M7aqnjc2garFFQodSSul80Z6h4jOqhNkMZo8pzh034Zc/kv7a6xJuYuCPTzxwQBQTHDp8tTq2MPnZMK67MjC52lh4KutC3PLqdV1mPdKtNrTussK1QNluc0xPEkxZZtPFuDoK036LJxAvKl54Y3MJVkIrmSszA4nmr34oLXyRnAq2HEqRw4I0TGrKOKtlPkjWM6pgRyQzgRyWg6sEN1UKfJDFMYIckUYYIhxCY4kJ8kMVq1BAGDCsvrphiE+SGEyhZJP+JST5YYxRTT9ypSnBXzdroGcOnGHCLKkFNVBmHVhjVEFSBVnKxEgEVhQQpSr3os8Si5AlKU71RQ0J+BClLiTvUF4E3CEOUpTtQTgCXdqEq7lWW1MRUFOmOpJ/K1vMlWW31BWbSkgASToBckrfy/sfXqXfFJv/Fd/wDpH3hdjk2RUsMPCOJ+9Qjxen6Qr7nzp7/svZw8H+zNrgc+ynD4NrHPL6nESCZbTAICxf8A9LCH4X+YqNP2XqTyN7rKxuR4Wreph6Ljz7tgd/qAld54+H6Z2uFY3D1PyVyw8qjbf6m/sp1cHUpiYDm/qYQ5vrGnqt5/YnB8QcG1GgfAKr+AnqSS6OgIC2MJgqNP/Z0mN2s0THU6lZ5eHjfr0dnAOrqu8rsM77NNeC+gA1+pZo13lyPyXGvYQSCIIsQbEFeLyznwuVuXTBT4yhwnhcdqiiqQk7EFCITEJ2omapUTVKiQoEJ2okapUe8KaFFO1DlxUS8piFEhNol3hSUISTaCQlCkAkFFwwCI0Jk4RDwnCYFOChiYShMCpShhQnAUS5SaUXCITQpJQhiMJ4TEp2lDE6FEvc1jRLnEADmSvQhiKWXUm0+HjqOHEQPidzJOg2CxOwWC46rqpFqYt/e7/E+6fNnfiMQ4j9XCP7W2H7+q938bhJO1Y5fpQzrtbiXNcGvFGxjgAJHLxGV2eS5h3+Go1h/vKbHHo4gcQ9DI9Fwna/Bdx4N4BPqr/wDTLMpw9WiZijVIaYcW8NQd5wzpIcXW2Dm816WXaucgveomsDoQUGo/c2Woh6j9VEPXmXbj+occVDBmTcPrahp3FPmeug67cl2X7bYnCOguNakTLmPcXG+pa43B+SqPfGPXPdr8ACBWaIMw+N+RPsb+StZJnNLFUxVoukHUaOa7drhsVcx5mk8H9JInTib4h8wFnnwnPjlJccBCaUq4hxA02/tNx8iFCV8jlMuOySaEgVB71A7lAJi5RLkBDCgVDjUBUQESJCG5yaZC1BIwmQpSVBu9SFRVXEypOPJZqjuqpxUVZjSp8BURZZUTl6FSYd1NzUUzXFF4lBgRWt6IE1SJTEEKBBQEY9E7xQpUyk4LUijOYhJjUSSlseg9kWGnheICXODnQNSb8I+QXFVc67o6ltRp8bXBzKrT1abjzXedn3D8PS6MHvumz3JcPi2huIpB8CGvEsrM/sqNuPovo8P8ZHN5pgcRVzSuabXQBerUie6pA8NgdXughoPU6BenYHCU6FNtKk0MYwQAL9SSd3EySdyVndn8moYKl3VAGC4uc55Dqj3zEvcAJgQBawCt1aq6RkaqQdb+cFch/UkVPwNQ0nubwlpeGkjipTDx0AmbbBdC6qq2JaHtcx12vaWuHNrhB+q0j5/FNM0eRUMypPoValBwJNN7mE8w02PqIPqqrsWRoI81OyY7f+n1eo3GU2UyWtfxd4BoWNaTfrIF+q9iZA/zc/NeQ/0kpl9atWP+7YGDq6oZPyZ816eaiumObzqiKdYsGgALP+WZgeh4h5AKgXra7R0eLgcNRLfQ3+3zWD3RBhfM/kTPJXXj9CByG9GNJBIMrjjWGTkp3BCa3qiGLlBlip8EJOagaq9IVLKEJ+FXdE+FMhklMnoScFKg1E7neVEBRfoSYUhIEqDWdVYp05bc7rUa3QnVY1SZVBTVaE2lQp4WN1OtSy6OpMdBQ2MdsFNtI72SSmUd1QKTQCqwcDunFt1rVxNziFDi5pyRuouHIqITWyj0yNEFrhCE2veIUhHedjcRNBzf0VHD0dDh9T7LZfUXD9lcb3dctP5agj/rbJHuC72C6urWXv8AFd4xiwqlS59/5/N1UqVVk9qO0FPB0xUqSbhoDY4jPIfP0WJhu3WCq6VuA8qgLPmbfNdpWa6l1VDfXi/t1PJZtLMab7tqMcOjgU5rbn0HIc/NVGVnnZHDYqqa1Q1WvIHF3b2sa4gQJBabwAJ6Kgf6e4LnXP8A3W/+i6I1lHvlQHIMppYNppUQ7hc4uJeQ5xdAGoAtAHzWr3qzala3lf2/xKzsw7SYelZ1UOdsxnjeTsICaNPNcRYecrLdUkymr4nidJsBAUHOadCF87y8u3O468fUFuQhNaSdUnPgC6Qk6LGAVZQbTKK5sXSxFwLgLPUwF1O+qRaQmHnKY1CTCSUwNxSYTqp1BH83Q6zSIM2TPSE5h5pKAbN51SWff6XFzvNp39kqjdygtrguOwkdYKdoLzGkrpYtg9KA0gnqESobQ02hV/w5A3jS4Ivujkt4QA3iO5/Yq/2suB4ik5pE778vNO+rt0v5qGo+In1IACi6lxFul721WUv/ABYbUgTvsovqcQiUOsBETB06qdGkACLkut5GNlTQO+EgC6RceKDKOcC3WOEDmRcxa/NWGV+HaS4EDmLCXX6SphAwIAJFjoo07glT/EAAQC6bGNAT0+6M2w4uBzQNL8TCYm4ifUShirScN7nqpd6OUKbg15sDOkC4kmyCGscYjax6JT2lTxEODhsQfUGfsuyo45tRoc03/TuDyHP6riXcLRNze8aQoHHFt2xEaAyI6rfi8l4VLNcz/U7NHVsV3Vw2laDI8ZEkkHpC41zF3uf4GliPEfBUj841I5OG4XF47DGkYe0jkQZaerSvbx5TlPTnYq0apY4OaYLSCD1BkL2PL8zFamyoPiaD5Hce68bAJsASTtqV2vZSpUo0y2qOFsywEjjAOsjYed7q0jt+/UDiFiHMm/wrPznOTTpOdTEusJsQ2fiI/mqahu2faHhacPTd4nDxkfCw/D5kfJZPYnKhUq94+zKZB83/AAj7rDw1B1Q8TibmS43JO/muzw2YspU202UzpzGu5PVc/Jzz1F4z26rF0aceE+aq/h2FgvvqqD8YHAbE67qOEqR8e/ovJXW1qMoNHxeqPSpmIBgblZ7MWwg8R8Q2EQfLqjtdTNpIJ6+EHkrCQesyLCCqzXSYIFkN1QAxNhyvcpqzmxZ0kz5gSs2Cbx4bRJOnRDDZm9/5ZBdiWgg8M+WkxZOyq0iXGDPp/LK4g3BYEkQSd9ITRyumqOaWiNj6dfso1Kjm6EbeoVxr6Sa5wFgkhsa4gH/yaElPbO1LC4UukAk3BJIEExJ3n/57WqNPhMkw63DMOg9D6qixxGsA3BI0Pn5wUZlWSATbnb80/RPSxqsZB8bg5lxZ15iZg3Gqo1qV7G28FxHpzVZ2NdLg0WFgTGvOPU+inTnXQajUC3M7K2xdHY9x4Q0mCNPFfby9VF1MtgwQPpqCLaG2sKTqjh8UiToBBm5bblKReIguk3hotA6lTIh6zJItAEA/5TUKsTEEgOIsLOAJnqYlNWqNs0OgiNDxweIbGFNobDjJna+pJEW1gAE3TPa5fsKmHEzfVxj4gCSY8h9kzaDSQCXDlBkTtMHSysGYF44t4E+H0P6lT43OIDXtc6btILXRM7jqROg9VLL+Eozg9tpgAjYEGRBgDf8AZHFRrx4QYaZAcWn0A876ke6DwNOrSYdJPUzAjXW6iGNIHBxt0IG5A5+HyVllhpsRVcPymJGo4REggR11Pop15DfDBIAnaTuJ5jT09zOADri1o0EwJOx3vumqVXlxLWeHkPFYc5MXBOwTDPwpgv4QKlhJiLGJ1jpKrUqfF4Whs39yQDb3K1Th3A2INuoNnEfQT6qOIp1AJpMJd+o7Cw569VDrdZeJy4kkaEQC7aSJEDyv+6q4/CflY2HAs8UDiv8AE4yLjYeq3aNN9mVIDuF0OaZA5B8jqYjRTwmAM+IzLSHGBvMRfYkrcthl/Tm6GWkNgDhm/h4GW8oEa6Hkg1MnqcPhfeeU29PI/uulFItcDxA66AOcI573+ysvdMkW5QAwQNo0lPk5RMcc3I60nidECbCTpIEfdQq5JWE6uEG0G7YvY/RdgRBANyW/2/ESpYdsD7yT7A/Va+Xkz1jiMPlNTSNIMEQeGLwN4I06j0mMMQdJte9h1XXvECxu7p4tdiREmPop1Kj3C7AdiS0E7bwncxzNOi8httduWuqOymZ38gNAOvutUMLZi3EJsYiTpO6lTmDMON7aAxeLb2WeyyMtuFaQCLydSD5z5bKTabhaAbzedP20WmHh0AkW5tJMTo3YDoU/cAXJBixi7gBpPS49k1YyQTfikDTlPVJrGzJJBGusa2VxtMcQAPFpPKAem37IrLN4XtDpsCBe5Gp9FNiYzWUQBPHqRta8Qi/hWbuM7QCOUfdW2llw9jjy4eEOBJ1ki6LTbIJaPDO9h+0wrLFZ5sPzCPLc/wAlEp8I3LtgdOn2+aKXNAgfTiB6XVplFrhBe0SNwBfaJ3sFF9so4Vm/HPoUlpOw1L9U+cT9Ulfa+1GqyHSbQRp8ynY3iIH08zdJJZvpPyl3Z8+nrrKkyk8ky7aCDf8AnmkkrI1ntZqVrFoAad7KpSZDrkW6FJJVqrU23JNyZ9rlOKlzxDWeXv5pJJWJQu8E+Q8lItYQIHi36pJLEL9aNTsbfO/18kRtQNFpjknSVzCJjEk2i40JM9FE0zBABBmdbdUySs9tKlXEvbYkj2v5otPEPIEOMBJJZs9s8qunEucBtZKowm8n0MD5J0lvF2qVbERqAdpIvHmE1SoHCWEzrB580kllnUgTxC02Ri0xB3SSVkEsRRDAOK+45fyyWGeC7xN2mxIHskkqWocB101Q6LjJBcR119kkkRA4a0G8+hv11RqVPh10iLfedSkkmKrVGT4SYHpfzhM+qJPCJHXe3JOksoTINjqYjzQcVWIJgCBsmSWsS/QTaoINryZ0hNYDUkpJKJpfiTsAEkkkxna//9k=",
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
  { name: "Samaco", logo: "samaco.png" },
  { name: "Fenikks", logo: "fenikks.png" },
  { name: "Teatro del Bicentenario", logo: "bicentenario.png" },
  { name: "Científica Cuyo", logo: "cientifica.png" },
  { name: "Cubos de Chacras", logo: "cubos.png" },
  { name: "Bermúdez Moya", logo: "bermudez.png" },
  { name: "Teatro Sarmiento", logo: "sarmiento.png" },
  { name: "Mendoza Plaza Shopping", logo: "shopping.png" },
];

// --- Helpers ---
const analyzeLeadWithAI = async (name: string, vision: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres el estratega jefe de Pinta MKT. Un prospecto llamado ${name} ha enviado esta visión: "${vision}". Genera una respuesta de exactamente 20 palabras que sea inspiradora y mencione que su proyecto tiene un potencial enorme para ser el próximo gran éxito de la colmena.`,
    });
    return (
      response.text ||
      "Tu visión tiene un potencial increíble. En Pinta MKT estamos listos para transformarla en resultados reales."
    );
  } catch {
    return "Tu visión tiene un potencial increíble. En Pinta MKT estamos listos para transformarla en resultados reales muy pronto.";
  }
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
    className="group relative w-full sm:w-[48%] lg:w-[31%] max-w-[400px] aspect-[14/11] overflow-hidden rounded-[2.5rem] border-[5px] border-black shadow-xl text-left transition-all hover:-translate-y-3 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.3)] isolate"
    style={{ transform: "translateZ(0)" }}
  >
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.3rem] z-0">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 will-change-transform"
      />
    </div>
    <div className="absolute top-7 right-7 z-20 w-12 h-12 md:w-16 md:h-16 bg-[#EBE300] border-[2.5px] border-black rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
      <img
        src="https://img.icons8.com/ios-filled/50/000000/bee.png"
        alt="Bee"
        className="w-6 h-6 md:w-8 md:h-8"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10 z-10">
      <span className="text-[#EBE300] text-xs md:text-sm font-black uppercase mb-1 tracking-[0.2em] drop-shadow-md">
        {project.category}
      </span>
      <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-[900] uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-lg">
        {project.title}
      </h3>
      <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/15 backdrop-blur-md border border-white/40 text-white font-black uppercase text-[10px] md:text-xs tracking-widest rounded-full transition-all group-hover:bg-[#EBE300] group-hover:text-black group-hover:border-black group-active:scale-95 w-fit">
        Ver Campaña <ArrowRight size={14} />
      </div>
    </div>
  </button>
);

//----- useEffect ----
useEffect(() => {
  if (!showRecaptcha) return;

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
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

// funcion para enviar el formulario con recaptch

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

  setShowRecaptcha(false);
  setRecaptchaToken("");

  // @ts-ignore
  if (window.grecaptcha && widgetIdRef.current !== null) {
    // @ts-ignore
    window.grecaptcha.reset(widgetIdRef.current);
  }
  widgetIdRef.current = null;
};

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
          <LogoText className="w-32 md:w-48 text-[#EBE300]" />
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
          <div className="flex justify-center mb-12">
            <img
              src="https://img.icons8.com/ios-filled/100/EBE300/bee.png"
              alt="Abeja"
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </div>
          <div className="mb-12 flex justify-center">
            <LogoText className="w-full max-w-[900px] text-[#EBE300]" />
          </div>
          <h1
            className="
  text-xl md:text-3xl lg:text-4xl
  font-[900] uppercase
  tracking-tight leading-[1.1]
  text-center mx-auto max-w-[980px]
  opacity-90 mb-12
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
            className="inline-flex items-center gap-4 px-12 py-6 bg-[#EBE300] text-black font-[900] text-xl uppercase tracking-tighter hover:bg-white transition-all rounded-full shadow-lg"
          >
            Descubrir <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-[#FDFCE6] px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="group">
              <span className="inline-block px-4 py-1 bg-black text-[#EBE300] font-black text-xs uppercase mb-6 rounded-full tracking-widest">
                NOSOTROS
              </span>
              <SectionTitle>POTENCIA COLECTIVA</SectionTitle>
              <p className="text-xl md:text-2xl text-gray-700 font-[900] mb-8 uppercase">
                Mirada estratégica y humana.
              </p>
              <div className="bg-white p-10 border-4 border-black rounded-[3rem] shadow-xl hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-500">
                <p className="text-lg md:text-xl font-bold leading-relaxed text-gray-800 italic">
                  "En pinta contamos con un equipo ágil, flexible y
                  estrategico."
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#EBE300] rounded-[3.5rem] opacity-0 group-hover:opacity-30 transition-all duration-700 scale-90 group-hover:scale-110 rotate-6" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                className="relative rounded-[3rem] border-4 border-black w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl z-10"
                alt="Equipo Pinta MKT"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="works" className="py-24 bg-white px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <SectionTitle>PROYECTOS</SectionTitle>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 md:gap-8 lg:gap-10">
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[900] uppercase tracking-tighter leading-none mb-6">
              ¿BUSCANDO UNA{" "}
              <span className="text-[#EBE300]">EXTENSIÓN DE TU</span>
              <br />
              EQUIPO?
            </h2>
            <p className="text-sm md:text-base font-black text-white/50 uppercase tracking-[0.2em] max-w-2xl mx-auto">
              OLVÍDATE DEL OUTSOURCING TRADICIONAL. SOMOS PINTA MKT, TU ALIADO
              ESTRATÉGICO DIARIO.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* 2x2 Grid with info cards */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "EQUIPO IN-HOUSE" },
                { label: "CREATIVIDAD" },
                { label: "CONSULTORÍA" },
                { label: "RESULTADOS" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#141414] border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:bg-white/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#EBE300]/10 border border-[#EBE300]/20 rounded-xl flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                    <img
                      src="https://img.icons8.com/ios-filled/50/EBE300/bee.png"
                      alt="Bee"
                      className="w-6 h-6"
                    />
                  </div>
                  <h3 className="font-black text-lg md:text-xl uppercase tracking-tighter leading-none">
                    {card.label}
                  </h3>
                </div>
              ))}
            </div>

            {/* Featured Highlight Card */}
            <div className="bg-[#EBE300] text-black rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(235,227,0,0.3)]">
              <div className="mb-10 relative z-10">
                <div className="mb-8">
                  <span className="inline-block px-5 py-2 bg-black text-[#EBE300] font-black text-[10px] uppercase tracking-widest rounded-full">
                    NUESTRO VALOR
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-10">
                  <LogoText className="w-48 text-black" />
                </div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-[900] uppercase tracking-tighter leading-[1.1] mb-12">
                  ESCALAMOS TUS RESULTADOS SIN LAS COMPLICACIONES DE AGENCIAS
                  TRADICIONALES.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-black text-base uppercase tracking-widest rounded-full hover:scale-105 transition-transform group shadow-xl"
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
                  className="w-64 h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#FDFCE6] px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <SectionTitle>CAPACIDADES</SectionTitle>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white border-[6px] border-black rounded-[3.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full transition-all hover:-translate-y-3 group"
              >
                <div className="mb-8 w-20 h-20 bg-[#EBE300] border-4 border-black rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  {React.cloneElement(service.icon as any, {
                    className: "w-10 h-10 text-black",
                  })}
                </div>
                <h3 className="text-3xl font-[900] uppercase mb-8 tracking-tighter leading-none">
                  {service.title}
                </h3>
                <ul className="flex-grow space-y-4 mb-10">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 font-black text-xs md:text-sm uppercase tracking-wider text-gray-800"
                    >
                      <div className="w-2.5 h-2.5 bg-[#EBE300] rounded-full border border-black" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section
        id="clients"
        className="py-24 bg-black text-white overflow-hidden relative"
      >
        <div className="container mx-auto max-w-7xl px-4 mb-16 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter text-[#EBE300]">
            MARCAS EN LA COLMENA
          </h2>
        </div>
        <div className="relative z-10 bg-[#141414] py-16 border-y-2 border-white/5">
          <div className="flex animate-scroll-right gap-20 md:gap-32 items-center">
            {[...CLIENTS_LIST, ...CLIENTS_LIST].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center h-16 w-48 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <span className="text-white/30 font-black uppercase text-xl">
                  {client.name}
                </span>
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
              <h2 className="text-[12vw] lg:text-[8rem] font-[900] uppercase tracking-tighter leading-[0.8] mb-12 text-black">
                HABLEMOS
              </h2>
              <p className="text-2xl font-[900] text-gray-500 uppercase tracking-[0.6px]  mb-16 italic drop-shadow-sm ">
                ¿ESTAS LISTO PARA TRANSFORMAR TU MARCA? Conectemos y hagamos
                crecer tu colmena
              </p>

              <div className="flex flex-col gap-8">
                {/* Email Highlight */}
                <a
                  href="mailto:PINTAMKT@GMAIL.COM"
                  className="flex items-center gap-6 group w-fit"
                >
                  <div className="w-16 h-16 bg-black text-[#EBE300] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Mail size={32} />
                  </div>
                  <span className="font-[900] text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter text-black">
                    PINTAMKT@GMAIL.COM
                  </span>
                </a>

                {/* Social Networks Icons - Now Before WhatsApp */}
                <div className="flex gap-6 items-center pt-2">
                  <a
                    href="https://www.instagram.com/pintamkt/"
                    target="_blank"
                    className="w-14 h-14 bg-black text-[#EBE300] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#EBE300] hover:text-black transition-all shadow-lg"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pinta-marketing/"
                    target="_blank"
                    className="w-14 h-14 bg-black text-[#EBE300] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#EBE300] hover:text-black transition-all shadow-lg"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>

                {/* WhatsApp Highlighted - Below Social Networks */}
                <a
                  href="https://wa.me/5492617007256"
                  target="_blank"
                  className="flex items-center gap-6 group w-fit pt-2"
                >
                  <div className="w-16 h-16 bg-[#EBE300] text-black border-4 border-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_20px_40px_-10px_rgba(235,227,0,0.4)]">
                    <MessageCircle size={32} fill="black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
                      WhatsApp Directo
                    </span>
                    <span className="font-[900] text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter text-black">
                      +54 9 261 700 7256
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[45%]">
              {submitted ? (
                <div className="bg-white border-4 border-black p-12 rounded-[3rem] text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-500">
                  <CheckCircle
                    className="mx-auto mb-6 text-[#EBE300]"
                    size={64}
                  />
                  <h3 className="text-3xl font-[900] uppercase mb-4 tracking-tighter">
                    ¡RECIBIDO!
                  </h3>
                  <p className="text-lg font-bold italic text-gray-700">
                    "{aiAnalysis}"
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <input
                    type="text"
                    placeholder="TU NOMBRE"
                    required
                    className="w-full px-10 py-5 bg-white border-[4px] border-black rounded-full font-[900] text-lg uppercase outline-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="TU EMAIL"
                    required
                    className="w-full px-10 py-5 bg-white border-[4px] border-black rounded-full font-[900] text-lg uppercase outline-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="CONTANOS TU VISIÓN..."
                    required
                    rows={4}
                    className="w-full px-10 py-8 bg-white border-[4px] border-black rounded-[2.5rem] font-[900] text-lg uppercase outline-none resize-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:-translate-y-1"
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-7 bg-black text-[#EBE300] font-[900] text-3xl uppercase rounded-full hover:bg-[#EBE300] hover:text-black transition-all flex items-center justify-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] mt-4 active:scale-95"
                  >
                    {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAJE"}{" "}
                    <Send
                      size={36}
                      className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform"
                    />
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
    </div>
  );
};

export default App;
