import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Phone,
  Clock,
  Sliders,
  Store,
  ChevronRight,
  RefreshCw,
  Heart,
  Check,
  X,
  Info,
  Layers,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogOut,
  Milk
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'fresas' | 'coco_bowl' | 'helados' | 'paletas';
  sizeDetail: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  inStock: boolean;
  toppings: string[];
  nestleOption?: boolean; // Indicates if available with or without Nestlé milk inside
}

const DEFAULT_PRODUCTS: ProductItem[] = [
  // FRESAS CON CREMA
  {
    id: 'fresas-especial-oreo-mm',
    name: 'Vaso Especial Coco Ricco (Oreo & M&M)',
    category: 'fresas',
    sizeDetail: 'Vaso Especial 12 oz con Toppings Premium',
    description: 'Nuestra creación estrella: abundantes fresas frescas, crema de la casa, coronado con galleta Oreo, M&M, gomitas y salsa fudge.',
    price: 12.0,
    image: '/assets/fresas-especial-oreo.jpg',
    badge: '⭐ Especial de la Casa',
    inStock: true,
    toppings: ['Galleta Oreo', 'M&M Chocolates', 'Gomitas', 'Fudge de Chocolate', 'Crema de Autor']
  },
  {
    id: 'fresas-vaso-5oz',
    name: 'Fresas con Crema — Vaso 5 oz',
    category: 'fresas',
    sizeDetail: 'Medida 5 oz (Vaso Personal)',
    description: 'Fresas frescas seleccionadas del día, crema artesanal batida de la casa y salsa dulce.',
    price: 5.0,
    image: '/assets/fresas-5oz.jpg',
    badge: '🍓 Vaso 5 oz',
    inStock: true,
    toppings: ['Crema Chantilly', 'Leche Condensada', 'Fudge de Chocolate']
  },
  {
    id: 'fresas-vaso-8oz',
    name: 'Fresas con Crema — Vaso 8 oz',
    category: 'fresas',
    sizeDetail: 'Medida 8 oz (Vaso Mediano)',
    description: 'Generosa porción de fresas frescas con capas de crema especial y coulis de fresa natural.',
    price: 8.0,
    image: '/assets/fresas-8oz.jpg',
    badge: '⭐ El Más Pedido',
    inStock: true,
    toppings: ['Nutella', 'Fudge Artesanal', 'Leche Condensada', 'Chantilly Extra']
  },
  {
    id: 'fresas-vaso-10oz',
    name: 'Fresas con Crema — Vaso 10 oz',
    category: 'fresas',
    sizeDetail: 'Medida 10 oz (Vaso Especial)',
    description: 'Doble capa de fresas y crema artesanal con trozos de brownie y chispas de chocolate.',
    price: 10.0,
    image: '/assets/fresas-10oz.jpg',
    badge: '🔥 Vaso 10 oz',
    inStock: true,
    toppings: ['Brownie Bits', 'Nutella', 'Fudge Casero', 'Leche Condensada']
  },
  {
    id: 'fresas-vaso-12oz',
    name: 'Fresas con Crema — Vaso 12 oz',
    category: 'fresas',
    sizeDetail: 'Medida 12 oz (Vaso Familiar Mega)',
    description: 'El tamaño supremo: abundante fresa, crema de autor, todos los toppings y coronado con chocolate.',
    price: 12.0,
    image: '/assets/fresas-12oz.jpg',
    badge: '👑 Vaso 12 oz Mega',
    inStock: true,
    toppings: ['Nutella Premium', 'Brownie', 'Fudge', 'Chispas', 'Chantilly']
  },

  // HELADOS EN TAZÓN DE COCO
  {
    id: 'helado-coco-natural-bowl',
    name: 'Helado en Tazón de Coco Natural',
    category: 'coco_bowl',
    sizeDetail: 'Servido en cáscara real de coco',
    description: 'Helado artesanal ultra cremoso servido en coco natural con sticker Coco Ricco y topping a elección.',
    price: 12.0,
    image: '/assets/helado-coco-natural.jpg',
    badge: '🥥 100% Coco Real',
    inStock: true,
    toppings: ['Sirope de Maracuyá', 'Fudge de Chocolate', 'Coco Rallado', 'Leche Condensada']
  },
  {
    id: 'helado-coco-maracuya-bowl',
    name: 'Helado en Coco con Jalea de Maracuyá',
    category: 'coco_bowl',
    sizeDetail: 'Servido en cáscara real de coco',
    description: 'Helado artesanal en tazón de coco bañado con jalea y semillas naturales de maracuyá agridulce.',
    price: 12.0,
    image: '/assets/helado-coco-maracuya.jpg',
    badge: '🔥 Favorito Tropical',
    inStock: true,
    toppings: ['Extra Maracuyá', 'Fudge Artesanal', 'Leche Condensada']
  },

  // HELADO EN COPA
  {
    id: 'helado-copa-artesanal',
    name: 'Helado Artesanal en Copa (2 Bolas)',
    category: 'helados',
    sizeDetail: '2 Bolas generosas de helado',
    description: 'Helado 100% natural de pura fruta. Sabores: Fresa, Maracuyá, Mango, Lúcuma, Chocolate Belga o Vainilla.',
    price: 8.0,
    image: '/assets/helado-copa-artesanal.jpg',
    badge: '🍨 2 Bolas Artesanales',
    inStock: true,
    toppings: ['Fudge de Chocolate', 'Chispas de Colores', 'Barquillo', 'Manjar Blanco']
  },

  // PALETAS ARTESANALES (CON O SIN LECHE NESTLÉ)
  {
    id: 'paleta-coco-nestle',
    name: 'Helado / Paleta de Coco',
    category: 'paletas',
    sizeDetail: 'Opción: Con Leche Nestlé o Sin Leche',
    description: 'Deliciosa paleta de coco natural sobre coco rallado fresco. Pídela rellena con leche condensada Nestlé por dentro o pura fruta sin leche.',
    price: 6.0,
    image: '/assets/paleta-coco-poster.jpg',
    badge: '🥥 Clásico Coco Ricco',
    inStock: true,
    nestleOption: true,
    toppings: ['Disponible CON Leche Nestlé', 'Disponible SIN Leche Nestlé']
  },
  {
    id: 'paleta-arandano-nestle',
    name: 'Helado / Paleta de Arándano',
    category: 'paletas',
    sizeDetail: 'Opción: Con Leche Nestlé o Sin Leche',
    description: 'Paleta artesanal de arándanos frescos seleccionados. Disponible con corazón líquido de leche Nestlé adentro o 100% fruta natural.',
    price: 6.0,
    image: '/assets/paleta-arandano-poster.jpg',
    badge: '🫐 Frutos Rojos',
    inStock: true,
    nestleOption: true,
    toppings: ['Disponible CON Leche Nestlé', 'Disponible SIN Leche Nestlé']
  },
  {
    id: 'paleta-lucuma-nestle',
    name: 'Helado / Paleta de Lúcuma',
    category: 'paletas',
    sizeDetail: 'Opción: Con Leche Nestlé o Sin Leche',
    description: 'Pura lúcuma de seda en una paleta ultra cremosa. Disponible rellena con leche Nestlé o estilo tradicional.',
    price: 6.0,
    image: '/assets/paleta-lucuma-poster.jpg',
    badge: '✨ Lúcuma de Seda',
    inStock: true,
    nestleOption: true,
    toppings: ['Disponible CON Leche Nestlé', 'Disponible SIN Leche Nestlé']
  },
  {
    id: 'paleta-oreo-nestle',
    name: 'Helado / Paleta de Oreo',
    category: 'paletas',
    sizeDetail: 'Opción: Con Leche Nestlé o Sin Leche',
    description: 'Cremoso helado con trocitos crocantes de galleta Oreo original. Disponible con relleno de leche Nestlé.',
    price: 6.0,
    image: '/assets/paleta-oreo-poster.jpg',
    badge: '🍪 Oreo Lover',
    inStock: true,
    nestleOption: true,
    toppings: ['Disponible CON Leche Nestlé', 'Disponible SIN Leche Nestlé']
  },
  {
    id: 'paleta-fudge-artesanal',
    name: 'Paleta Rellena de Fudge de Chocolate',
    category: 'paletas',
    sizeDetail: 'Paleta artesanal rellena',
    description: 'Pura fruta natural con centro cremoso de fudge de chocolate oscuro casero.',
    price: 6.0,
    image: '/assets/paleta-fudge.jpg',
    badge: '🍫 Choco Lover',
    inStock: true,
    nestleOption: false,
    toppings: ['Centro de Fudge Casero']
  },
  {
    id: 'paleta-tropical-mango-aguaje',
    name: 'Paleta Tropical de Mango / Aguaje',
    category: 'paletas',
    sizeDetail: 'Paleta 100% pulpa de fruta',
    description: 'Paleta artesanal refrescante a base de frutos tropicales y amazónicos sin conservantes.',
    price: 6.0,
    image: '/assets/paleta-mango.jpg',
    badge: '🌴 Fruta Natural',
    inStock: true,
    nestleOption: false,
    toppings: ['Pulpa 100% Natural']
  }
];

export default function App() {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [saveSuccessNotification, setSaveSuccessNotification] = useState(false);
  const [selectedProductView, setSelectedProductView] = useState<ProductItem | null>(null);

  // Load from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('cocoricco_carta_v5');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved catalog', e);
      }
    }
  }, []);

  const saveCatalog = (updated: ProductItem[]) => {
    setProducts(updated);
    localStorage.setItem('cocoricco_carta_v5', JSON.stringify(updated));
    setSaveSuccessNotification(true);
    setTimeout(() => setSaveSuccessNotification(false), 2500);
  };

  const resetToDefault = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.setItem('cocoricco_carta_v5', JSON.stringify(DEFAULT_PRODUCTS));
    setSaveSuccessNotification(true);
    setTimeout(() => setSaveSuccessNotification(false), 2500);
  };

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setPasswordInput('');
      setAuthError('');
      setIsAuthModalOpen(true);
    }
  };

  const handleVerifyPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPass = passwordInput.trim().toLowerCase();
    
    if (cleanPass === 'cocorico2026' || cleanPass === 'cocoricco2026') {
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setIsAdminOpen(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Solo acceso para el administrador de Coco Ricco.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  const filteredProducts = activeCategory === 'todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#09110d] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Banner */}
      <div className="relative z-20 bg-gradient-to-r from-lime-600 via-rose-600 to-lime-600 text-white text-xs sm:text-sm font-semibold py-2 px-4 text-center shadow-md flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>¡Lo natural hecho helado! • Carta Virtual Oficial Coco Ricco • Jaén</span>
        <Sparkles className="w-4 h-4 animate-spin" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#09110d]/90 border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-white/10 p-1 border border-lime-400/40 shadow-[0_0_20px_rgba(132,204,22,0.25)] flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Logo Coco Ricco"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-lime-400 via-white to-rose-400 bg-clip-text text-transparent">
                  COCO RICCO
                </h1>
                <span className="bg-lime-500/20 text-lime-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-lime-500/30">
                  Carta Virtual
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Heladería Artesanal & Fresas con Crema • Jaén
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Admin Dashboard Trigger */}
            <button
              onClick={handleOpenAdmin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm group"
              title="Panel de Control para editar precios y stock (Requiere Contraseña)"
            >
              {isAuthenticated ? (
                <Unlock className="w-4 h-4 text-lime-400" />
              ) : (
                <Lock className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
              )}
              <span className="hidden sm:inline">
                {isAuthenticated ? 'Panel Dueño (Abierto)' : 'Panel Dueño (Precios)'}
              </span>
            </button>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/51938955940?text=Hola%20Coco%20Ricco,%20vi%20su%20Carta%20Virtual%20y%20deseo%20hacer%20una%20consulta"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-transform active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Fresas Seleccionadas • Crema de Autor • Helados y Paletas 100% Naturales</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Carta Virtual de <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Fresas con Crema</span>, Paletas y Helados en <span className="text-lime-400">Tazón de Coco</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Disfruta de nuestros vasitos de fresas en medidas de <strong>5 oz, 8 oz, 10 oz y 12 oz</strong>, helados servidos en <strong>tazón de coco natural (S/ 12.00)</strong> y paletas artesanales (S/ 6.00) con opción de <strong>leche Nestlé adentro o sin leche Nestlé</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#carta"
                className="px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(132,204,22,0.4)] transition-all flex items-center gap-2"
              >
                <span>Ver Productos y Precios</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-4 text-xs text-slate-400 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-lime-400" /> Atención en local & Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-rose-400" /> Jaén, Perú
                </span>
              </div>
            </div>
          </div>

          {/* Right Showcase Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="/assets/banner-fresas.jpg"
                  alt="Fresas con Crema Coco Ricco"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-lime-300 text-xs font-bold uppercase tracking-wider">¡El Sabor de la Casa!</span>
                  <p className="text-white text-base font-bold">Fresas frescas con crema única, toppings y helados artesanales</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="text-xl">🥥</span>
                  <div>
                    <p className="font-bold text-white">Tazón de Coco</p>
                    <p className="text-[10px] text-slate-400">S/. 12.00 en coco natural</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <span className="text-xl">🍡</span>
                  <div>
                    <p className="font-bold text-white">Paletas Artesanales</p>
                    <p className="text-[10px] text-slate-400">Con / Sin Leche Nestlé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="carta" className="sticky top-[69px] z-30 bg-[#09110d]/95 backdrop-blur-xl border-y border-white/10 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'todos', label: '✨ Toda la Carta', icon: '🍨' },
            { id: 'fresas', label: '🍓 Fresas con Crema & Vasitos', icon: '🍓' },
            { id: 'coco_bowl', label: '🥥 Helado en Tazón de Coco (S/ 12)', icon: '🥥' },
            { id: 'helados', label: '🍦 Helado en Copa 2 Bolas (S/ 8)', icon: '🍦' },
            { id: 'paletas', label: '🍡 Paletas (Con / Sin Nestlé)', icon: '🍡' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(132,204,22,0.4)] scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Visual Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                product.inStock
                  ? 'bg-slate-900/50 border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_30px_rgba(132,204,22,0.15)]'
                  : 'bg-slate-950/40 border-red-500/20 opacity-70'
              }`}
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-lg">
                        {product.badge}
                      </span>
                    )}
                    {product.nestleOption && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-slate-950 shadow-md flex items-center gap-1">
                        <Milk className="w-3 h-3" />
                        <span>Con / Sin Nestlé</span>
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-lg">
                        Agotado
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-lime-500 text-slate-950 font-black text-base shadow-xl flex items-center gap-1">
                    <span>S/.</span>
                    <span>{product.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-lime-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{product.sizeDetail}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Nestlé option pill */}
                  {product.nestleOption && (
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5">
                      <Milk className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Disponible con <strong>leche Nestlé</strong> por dentro o <strong>sin leche</strong>.</span>
                    </div>
                  )}

                  {/* Toppings tag list */}
                  {product.toppings && product.toppings.length > 0 && !product.nestleOption && (
                    <div className="pt-2">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Toppings incluidos / disponibles:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.toppings.map(t => (
                          <span key={t} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedProductView(product)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 bg-white/10 hover:bg-lime-500 hover:text-slate-950 text-white border border-white/10 hover:border-lime-400 transition-all active:scale-95"
                >
                  <Info className="w-4 h-4" />
                  <span>Ver Detalles & Variantes</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProductView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedProductView(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={selectedProductView.image}
                    alt={selectedProductView.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-lime-500 text-slate-950 font-black text-base shadow-lg">
                    S/. {selectedProductView.price.toFixed(2)}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-lime-400 font-bold uppercase tracking-wider">{selectedProductView.sizeDetail}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedProductView.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedProductView.description}</p>
                </div>

                {/* Nestlé option details in modal */}
                {selectedProductView.nestleOption && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <Milk className="w-4 h-4 text-amber-400" />
                      <span>Opciones de Preparación:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-slate-300">
                        <span className="font-bold text-lime-400 block">🥛 Con Leche Nestlé</span>
                        <span className="text-[10px] text-slate-400">Rellena de abundante leche condensada por dentro</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-slate-300">
                        <span className="font-bold text-emerald-400 block">🍃 Sin Leche Nestlé</span>
                        <span className="text-[10px] text-slate-400">Pura pulpa natural de fruta fresca</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProductView.toppings && selectedProductView.toppings.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <p className="text-xs font-bold text-rose-400 uppercase">Toppings y Salsas:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProductView.toppings.map(t => (
                        <span key={t} className="text-xs bg-rose-500/10 text-rose-300 border border-rose-500/20 px-2.5 py-1 rounded-lg font-medium">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Precio en Carta:</span>
                  <p className="text-2xl font-black text-lime-400">S/. {selectedProductView.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setSelectedProductView(null)}
                  className="px-6 py-2.5 rounded-xl bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-lime-400"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Password Authentication Modal for Admin Panel */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-lime-500/30 p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3 pt-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center text-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.3)]">
                  <Lock className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-black text-white">Acceso Administrador</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Ingresa la contraseña de seguridad para acceder al Panel de Control de Precios y Stock de Coco Ricco.
                </p>
              </div>

              <form onSubmit={handleVerifyPassword} className="space-y-4 mt-6">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña de administrador..."
                    value={passwordInput}
                    onChange={e => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    autoFocus
                    className="w-full px-4 py-3 pr-11 rounded-2xl bg-black/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-rose-400 font-semibold text-center bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-xl">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(132,204,22,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Desbloquear Panel</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel Modal (Edit Prices & Stock in Real Time) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-lime-500/30 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-lime-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white">Panel de Control de Precios y Stock (Dueño)</h3>
                      <span className="px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-400 text-[10px] font-bold border border-lime-500/30">
                        Sesión Activa
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Modifica los precios y la disponibilidad en tiempo real para la carta virtual</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notification badge */}
              {saveSuccessNotification && (
                <div className="my-2 p-2.5 rounded-xl bg-lime-500/20 border border-lime-500/40 text-lime-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>¡Precios actualizados y guardados en la carta virtual al instante!</span>
                </div>
              )}

              {/* Table of items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                {products.map((prod, pIdx) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-black flex-shrink-0">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                        <span className="text-[10px] text-lime-400 font-semibold">{prod.sizeDetail}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Price input */}
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400 font-bold">S/.</span>
                        <input
                          type="number"
                          step="0.5"
                          value={prod.price}
                          onChange={e => {
                            const updated = [...products];
                            updated[pIdx].price = parseFloat(e.target.value) || 0;
                            saveCatalog(updated);
                          }}
                          className="w-20 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-bold text-lime-400 focus:outline-none focus:border-lime-400"
                        />
                      </div>

                      {/* Stock Switch */}
                      <button
                        onClick={() => {
                          const updated = [...products];
                          updated[pIdx].inStock = !updated[pIdx].inStock;
                          saveCatalog(updated);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          prod.inStock
                            ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {prod.inStock ? '✓ Stock' : '✗ Agotado'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Admin Footer */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetToDefault}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restablecer Fábrica</span>
                  </button>

                  <button
                    onClick={handleLogoutAdmin}
                    className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-semibold flex items-center gap-1.5"
                    title="Cerrar sesión de administrador"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-lime-400"
                >
                  Guardar y Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-10 px-4 sm:px-8 mt-12 text-center text-xs text-slate-500 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-base font-black text-white">COCO RICCO</span>
          <span className="text-slate-600">•</span>
          <span className="text-lime-400 font-semibold">Heladería Artesanal & Fresas con Crema</span>
        </div>
        <p className="max-w-md mx-auto">
          Jaén, Cajamarca, Perú • Consultas y Ubicación al WhatsApp <strong>938 955 940</strong>
        </p>
        <p className="text-[10px] text-slate-600">
          © {new Date().getFullYear()} Coco Ricco. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
