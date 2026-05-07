import { ACCENT, uid, hoy } from "./constants.js";

// ── Catálogo de servicios con categorías (fuente de verdad) ───────
export const DEF_CATEGORIAS_SERVICIOS = [
  {
    id: "cat_seo", nombre: "SEO", creadoEn: "2026-01-01",
    servicios: [
      { id:"seo_health",    name:"Revisión Salud Sitio",                              min:350,  max:600,  creadoEn:"2026-01-01" },
      { id:"seo_crecim",    name:'Paquete "Crecimiento Orgánico"',                    min:800,  max:1500, creadoEn:"2026-01-01" },
      { id:"seo_dominio",   name:"Dominio de Mercado (SEO + PPC + Automatización)",   min:1500, max:3000, creadoEn:"2026-01-01" },
      { id:"seo_migracion", name:"SEO para Migraciones o Lanzamientos",              min:1200, max:2500, creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_local", nombre: "SEO Local & Google Maps", creadoEn: "2026-01-01",
    servicios: [
      { id:"local_puesta",  name:"Puesta a Punto",                min:300,  max:500,  creadoEn:"2026-01-01" },
      { id:"local_dominio", name:"Dominio Local",                 min:600,  max:1000, creadoEn:"2026-01-01" },
      { id:"local_multi",   name:"Multi-Ubicación / Franquicias", min:1200, max:2500, creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_web", nombre: "Diseño Web", creadoEn: "2026-01-01",
    servicios: [
      { id:"web_landing",    name:'Landing Page "Alta Conversión"',            min:800,  max:1400, creadoEn:"2026-01-01" },
      { id:"web_corp",       name:'Web Corporativa "SEO-Ready"',               min:1200, max:2500, creadoEn:"2026-01-01" },
      { id:"web_autoridad",  name:'Web "Autoridad Sectorial" (Personalizada)', min:2500, max:5000, creadoEn:"2026-01-01" },
      { id:"web_ecommerce",  name:'E-commerce "Rentable"',                     min:1800, max:4000, creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_auto", nombre: "Automatizaciones", creadoEn: "2026-01-01",
    servicios: [
      { id:"auto_content",   name:'"SEO Content Engine" (Automatización de Contenidos)',         min:600, max:1200, creadoEn:"2026-01-01" },
      { id:"auto_review",    name:'"Local Review Booster" (Gestión Automática de Reputación)',   min:400, max:800,  creadoEn:"2026-01-01" },
      { id:"auto_lead",      name:'"Lead-to-Action" (Nutrición de Leads en tiempo real)',        min:600, max:1200, creadoEn:"2026-01-01" },
      { id:"auto_dashboard", name:'"Dashboard SEO Ejecutivo" (Reporte Automatizado)',            min:300, max:600,  creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_content", nombre: "Content Marketing", creadoEn: "2026-01-01",
    servicios: [
      { id:"cont_autoridad", name:'"Autoridad Semántica" (SEO Pillar Strategy)',         min:800, max:1500, creadoEn:"2026-01-01" },
      { id:"cont_motor",     name:'"Motor de Contenidos Mensual" (Inbound Marketing)',   min:600, max:1200, creadoEn:"2026-01-01" },
      { id:"cont_leadmag",   name:'"Lead Magnet & Lead Nurturing" (El Funnel de Contenido)', min:500, max:1000, creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_marca", nombre: "Soluciones Marca", creadoEn: "2026-01-01",
    servicios: [
      { id:"marca_social",    name:'Pack "Social Authority" (Mensual)',                  min:500,  max:900,  creadoEn:"2026-01-01" },
      { id:"marca_identidad", name:'Kit de "Identidad para Pymes" (Branding)',           min:800,  max:1500, creadoEn:"2026-01-01" },
      { id:"marca_pack",      name:'Pack "Conversión Publicitaria" (Flyers + Roll-ups)', min:300,  max:600,  creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_marca_pyme", nombre: "Soluciones Marca Pymes", creadoEn: "2026-01-01",
    servicios: [
      { id:"pyme_express",  name:'Pack "Marca Express" (El Lanzamiento)',  min:600,  max:1200, creadoEn:"2026-01-01" },
      { id:"pyme_visual",   name:'Identidad Visual "Pro-Business"',        min:800,  max:1500, creadoEn:"2026-01-01" },
      { id:"pyme_integral", name:'Estrategia de Marca "Integral 360°"',    min:1500, max:3000, creadoEn:"2026-01-01" },
    ],
  },
  {
    id: "cat_extra", nombre: "Servicios Extra", creadoEn: "2026-01-01",
    servicios: [
      { id:"extra_copy",   name:"Pack Copywriting",      min:400, max:800,  creadoEn:"2026-01-01" },
      { id:"extra_mant",   name:"Mantenimiento Técnico", min:150, max:300,  creadoEn:"2026-01-01" },
      { id:"extra_onpage", name:"SEO On-Page Inicial",   min:300, max:600,  creadoEn:"2026-01-01" },
      { id:"extra_form",   name:"Formación 1-to-1",      min:200, max:200,  perSession:true, creadoEn:"2026-01-01" },
    ],
  },
];

// Aplanado: extrae todos los servicios de todas las categorías
export function flattenServicios(categorias) {
  return (categorias || []).flatMap(cat => cat.servicios || []);
}

// Alias para compatibilidad con imports existentes
export const DEF_SERVICIOS_AGENCIA = flattenServicios(DEF_CATEGORIAS_SERVICIOS);

export const DEF_PAQUETES_GLOBAL = [
  {
    id:"arranque", name:"Arranque digital", price:500, minMonths:3, color:"#378add", creadoEn:"2026-01-01",
    subServicios:[
      { id:"seo_health",   ratio:0.5, qty:1 },  // Revisión Salud Sitio
      { id:"local_puesta", ratio:0.5, qty:1 },  // Puesta a Punto Local
      { id:"extra_onpage", ratio:0.5, qty:1 },  // SEO On-Page Inicial
    ],
  },
  {
    id:"crecimiento", name:"Crecimiento activo", price:1200, minMonths:3, color:ACCENT, creadoEn:"2026-01-01",
    subServicios:[
      { id:"seo_crecim",   ratio:0.5, qty:1 },  // Paquete Crecimiento Orgánico
      { id:"web_corp",     ratio:0.4, qty:1 },  // Web Corporativa SEO-Ready
      { id:"cont_motor",   ratio:0.5, qty:1 },  // Motor de Contenidos Mensual
      { id:"extra_onpage", ratio:0.5, qty:1 },  // SEO On-Page Inicial
    ],
  },
  {
    id:"socio", name:"Socio estratégico", price:2500, minMonths:6, color:"#533ab7", creadoEn:"2026-01-01",
    subServicios:[
      { id:"seo_dominio",    ratio:0.5, qty:1 },  // Dominio de Mercado SEO+PPC
      { id:"web_autoridad",  ratio:0.5, qty:1 },  // Web Autoridad Sectorial
      { id:"cont_autoridad", ratio:0.5, qty:1 },  // Autoridad Semántica
      { id:"auto_content",   ratio:0.5, qty:1 },  // SEO Content Engine
      { id:"auto_dashboard", ratio:0.5, qty:1 },  // Dashboard SEO Ejecutivo
    ],
  },
];

export const DEF_TRAMOS = [
  { id:"t1", min:1,  max:10,   rate:40, label:"1–10h",  pct:0    },
  { id:"t2", min:11, max:20,   rate:37, label:"11–20h", pct:-7.5 },
  { id:"t3", min:21, max:40,   rate:34, label:"21–40h", pct:-15  },
  { id:"t4", min:41, max:80,   rate:32, label:"41–80h", pct:-20  },
  { id:"t5", min:81, max:9999, rate:30, label:"80+h",   pct:-25  },
];

export const SH = [
  { id:"seo_cont",   name:"SEO contenidos",      min:40, max:60  },
  { id:"seo_tec",    name:"SEO técnico",          min:55, max:80  },
  { id:"ux",         name:"Diseño web UX/UI",     min:60, max:90  },
  { id:"dev",        name:"Desarrollo web",       min:55, max:85  },
  { id:"social",     name:"Social Media/Ads",     min:40, max:65  },
  { id:"estrategia", name:"Estrategia marketing", min:70, max:100 },
  { id:"email_cro",  name:"Email marketing/CRO",  min:50, max:75  },
];

export const MODS = [
  { id:"urgencia", label:"Urgencia <48h",             value:0.375, sign:1  },
  { id:"retainer", label:"Retainer mensual",          value:0.1,   sign:-1 },
  { id:"pack",     label:"Pack servicios combinados", value:0.1,   sign:-1 },
  { id:"largo",    label:"Proyecto largo 3+ meses",   value:0.125, sign:-1 },
];

// ── Merge helpers ─────────────────────────────────────────────────
export function mergeServicios(catalogo, clienteServs) {
  const map = Object.fromEntries((clienteServs || []).map(s => [s.id, s]));
  return catalogo.map(sv => {
    const over = map[sv.id];
    if (!over) return { ...sv };
    const merged = { ...sv, ...over };
    // Si el cliente tiene un precio pactado único, fija min=max=precio
    if (over.precio != null && over.precio > 0) {
      merged.min = over.precio;
      merged.max = over.precio;
      merged._precioPactado = true;
    }
    return merged;
  });
}

export function mergePaquetes(catalogo, clientePkgs) {
  const map = Object.fromEntries((clientePkgs || []).map(p => [p.id, p]));
  return catalogo.map(pkg => {
    const over = map[pkg.id];
    if (over) return { ...pkg, ...over };
    return pkg;
  });
}

// ── Client factory ────────────────────────────────────────────────
export const mkClient = (o = {}) => ({
  id: uid(), name: "Nuevo cliente", tipo: "contrato",
  tarifaBase: 40, creadoEn: hoy(),
  estado: "activo",
  fechaFin: null,
  periodos: [],
  paquetesHoras: [],
  paquetesActivos: false,
  serviciosActivos: false,
  paquetesOverrides: [],
  servicios: [],
  tramosActivos: false,
  tramos: DEF_TRAMOS.map(t => ({ ...t, id: uid() })),
  // Identificación
  apellidos: "",
  razonSocial: "",
  nif: "",
  // Contacto
  email: "",
  telefono: "",
  // Ubicación
  direccion: "",
  ciudad: "",
  pais: "España",
  // Datos B2B
  cargo: "",
  web: "",
  // Marketing
  origen: "",
  sector: "",
  rangoEdad: "",
  // Financiero
  iban: "",
  condicionesPago: "",
  ...o,
});

// ── Demo clients ──────────────────────────────────────────────────
export const DEMO_CLIENTS = [
  mkClient({
    id:"global", name:"Global (predeterminado)", tipo:"ambos", creadoEn:"2026-01-01",
    paquetesActivos:true, serviciosActivos:true, tramosActivos:true,
    paquetesOverrides: DEF_PAQUETES_GLOBAL.map(p => ({
      id: p.id, price: p.price, minMonths: p.minMonths, subServicios: [...p.subServicios],
    })),
    servicios: DEF_SERVICIOS_AGENCIA.map(s => ({ ...s })),
    tramos: DEF_TRAMOS.map(t => ({ ...t })),
  }),
  mkClient({
    id:"retailmax", name:"RetailMax S.L.", tipo:"ambos", tarifaBase:55, creadoEn:"2026-01-08",
    paquetesActivos:true, serviciosActivos:false, tramosActivos:true,
    paquetesOverrides:[
      { id:"arranque",    price:750,  minMonths:3, subServicios:[{id:"seo_audit",ratio:0.5,qty:1},{id:"landing",ratio:0.3,qty:1}] },
      { id:"crecimiento", price:2000, minMonths:6, subServicios:[{id:"web",ratio:0.6,qty:1},{id:"email_setup",ratio:0.5,qty:1},{id:"consulta",ratio:0,qty:2}] },
    ],
    servicios:[],
    tramos:[
      {id:"rm1",min:1,max:10,rate:55,label:"1–10h",pct:0},
      {id:"rm2",min:11,max:20,rate:50,label:"11–20h",pct:-9},
      {id:"rm3",min:21,max:40,rate:44,label:"21–40h",pct:-20},
      {id:"rm4",min:41,max:80,rate:40,label:"41–80h",pct:-27},
      {id:"rm5",min:81,max:9999,rate:36,label:"80+h",pct:-35},
    ],
  }),
  mkClient({
    id:"clinica", name:"Clínica Verde", tipo:"contrato", tarifaBase:65, creadoEn:"2026-02-03",
    estado:"inactivo", fechaFin:"2026-03-31",
    paquetesActivos:true, serviciosActivos:true, tramosActivos:false,
    paquetesOverrides:[
      { id:"arranque",    price:600,  minMonths:3, subServicios:[{id:"seo_audit",ratio:0,qty:1}] },
      { id:"crecimiento", price:1400, minMonths:6, subServicios:[{id:"web",ratio:0.4,qty:1},{id:"branding",ratio:0.3,qty:1},{id:"consulta",ratio:0,qty:3}] },
      { id:"socio",       price:2800, minMonths:6, subServicios:[{id:"web",ratio:0.8,qty:1},{id:"branding",ratio:0.7,qty:1},{id:"seo_audit",ratio:0.8,qty:1},{id:"email_setup",ratio:0.6,qty:1},{id:"consulta",ratio:0,qty:5}] },
    ],
    servicios:[
      {id:"web",         name:"Web corporativa clínica", min:1500, max:3000, creadoEn:"2026-02-03"},
      {id:"seo_audit",   name:"Auditoría SEO médica",    min:400,  max:700,  creadoEn:"2026-02-03"},
      {id:"consulta",    name:"Consultoría estratégica", min:200,  max:200,  perSession:true, creadoEn:"2026-02-03"},
      {id:"branding",    name:"Branding sanitario",      min:1800, max:3500, creadoEn:"2026-02-03"},
      {id:"email_setup", name:"Setup email marketing",   min:500,  max:900,  creadoEn:"2026-02-03"},
      {id:"landing",     name:"Landing page + Ads",      min:900,  max:1600, creadoEn:"2026-02-03"},
    ],
  }),
  mkClient({
    id:"construfast", name:"ConstruFast Group", tipo:"horas", tarifaBase:45, creadoEn:"2026-02-14",
    tramosActivos:true, paquetesOverrides:[], servicios:[],
    tramos:[
      {id:"cf1",min:1,max:10,rate:45,label:"1–10h",pct:0},
      {id:"cf2",min:11,max:20,rate:42,label:"11–20h",pct:-7},
      {id:"cf3",min:21,max:40,rate:38,label:"21–40h",pct:-16},
      {id:"cf4",min:41,max:80,rate:34,label:"41–80h",pct:-24},
      {id:"cf5",min:81,max:9999,rate:30,label:"80+h",pct:-33},
    ],
  }),
];

export const DEMO_RECORDS = [
  {id:1,ts:"2026-01-10T10:00:00Z",tipo:"contrato",cliente:"RetailMax S.L.",clienteId:"retailmax",paquete:"Arranque digital",meses:3,sinIva:2250,conIva:2722.5},
  {id:2,ts:"2026-01-15T12:00:00Z",tipo:"horas",cliente:"RetailMax S.L.",clienteId:"retailmax",horas:25,tarifa:44,sinIva:1100,conIva:1331},
  {id:3,ts:"2026-02-01T09:00:00Z",tipo:"contrato",cliente:"RetailMax S.L.",clienteId:"retailmax",paquete:"Crecimiento activo",meses:6,sinIva:12000,conIva:14520},
  {id:4,ts:"2026-02-14T11:00:00Z",tipo:"horas",cliente:"ConstruFast Group",clienteId:"construfast",horas:40,tarifa:38,sinIva:1520,conIva:1839.2},
  {id:5,ts:"2026-02-20T15:00:00Z",tipo:"contrato",cliente:"Clínica Verde",clienteId:"clinica",paquete:"Crecimiento activo",meses:6,sinIva:8400,conIva:10164},
  {id:6,ts:"2026-03-05T10:00:00Z",tipo:"horas",cliente:"RetailMax S.L.",clienteId:"retailmax",horas:15,tarifa:50,sinIva:750,conIva:907.5},
  {id:7,ts:"2026-03-12T16:00:00Z",tipo:"horas",cliente:"ConstruFast Group",clienteId:"construfast",horas:55,tarifa:34,sinIva:1870,conIva:2262.7},
  {id:8,ts:"2026-03-20T09:00:00Z",tipo:"contrato",cliente:"Clínica Verde",clienteId:"clinica",paquete:"Socio estratégico",meses:6,sinIva:16800,conIva:20328},
  {id:9,ts:"2026-04-02T10:00:00Z",tipo:"horas",cliente:"RetailMax S.L.",clienteId:"retailmax",horas:20,tarifa:50,sinIva:1000,conIva:1210},
  {id:10,ts:"2026-04-10T14:00:00Z",tipo:"horas",cliente:"ConstruFast Group",clienteId:"construfast",horas:30,tarifa:38,sinIva:1140,conIva:1379.4},
];
