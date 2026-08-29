import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Sliders,
  RefreshCw,
  Check,
  X,
  Lock,
  Unlock,
  Eye,
  EyeOff,
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
  nestleOption?: boolean;
}

const DEFAULT_PRODUCTS: ProductItem[] = [
  // FRESAS CON CREMA
  {
    id: 'fresas-especial-oreo-mm',
    name: 'Vaso Especial Oreo & M&M',
    category: 'fresas',
    sizeDetail: '12 oz • Toppings Premium',
    description: 'Fresas frescas, crema de la casa, galleta Oreo, chocolates M&M, gomitas y salsa fudge.',
    price: 12.0,
    image: './assets/fresas-especial-oreo.jpg',
    badge: '⭐ Especial',
    inStock: true,
    toppings: ['Galleta Oreo', 'Chocolates M&M', 'Gomitas', 'Fudge de Chocolate', 'Crema de Autor']
  },
  {
    id: 'fresas-vaso-5oz',
    name: 'Fresas con Crema — 5 oz',
    category: 'fresas',
    sizeDetail: '5 oz • Vaso Personal',
    description: 'Fresas frescas del día con crema artesanal batida y salsa dulce.',
    price: 5.0,
    image: './assets/fresas-5oz.jpg',
    badge: '🍓 5 oz',
    inStock: true,
    toppings: ['Crema Chantilly', 'Leche Condensada', 'Fudge de Chocolate']
  },
  {
    id: 'fresas-vaso-8oz',
    name: 'Fresas con Crema — 8 oz',
    category: 'fresas',
    sizeDetail: '8 oz • Vaso Mediano',
    description: 'Generosa porción de fresas con crema especial y coulis de fresa natural.',
    price: 8.0,
    image: './assets/fresas-8oz.jpg',
    badge: '⭐ Más Pedido',
    inStock: true,
    toppings: ['Nutella', 'Fudge Artesanal', 'Leche Condensada', 'Chantilly Extra']
  },
  {
    id: 'fresas-vaso-10oz',
    name: 'Fresas con Crema — 10 oz',
    category: 'fresas',
    sizeDetail: '10 oz • Vaso Especial',
    description: 'Doble capa de fresas y crema artesanal con trozos de brownie y chispas.',
    price: 10.0,
    image: './assets/fresas-10oz.jpg',
    badge: '🔥 10 oz',
    inStock: true,
    toppings: ['Brownie Bits', 'Nutella', 'Fudge Casero', 'Leche Condensada']
  },
  {
    id: 'fresas-vaso-12oz',
    name: 'Fresas con Crema — 12 oz',
    category: 'fresas',
    sizeDetail: '12 oz • Vaso Familiar Mega',
    description: 'Tamaño supremo con abundante fresa, crema de autor y todos los toppings.',
    price: 12.0,
    image: './assets/fresas-12oz.jpg',
    badge: '👑 12 oz Mega',
    inStock: true,
    toppings: ['Nutella Premium', 'Brownie', 'Fudge', 'Chispas', 'Chantilly']
  },

  // HELADOS EN TAZÓN DE COCO
  {
    id: 'helado-coco-natural-bowl',
    name: 'Helado en Tazón de Coco',
    category: 'coco_bowl',
    sizeDetail: 'Servido en coco natural',
    description: 'Helado artesanal ultra cremoso servido en cáscara real de coco con topping a elección.',
    price: 12.0,
    image: './assets/helado-coco-natural.jpg',
    badge: '🥥 100% Coco Real',
    inStock: true,
    toppings: ['Sirope de Maracuyá', 'Fudge de Chocolate', 'Coco Rallado', 'Leche Condensada']
  },
  {
    id: 'helado-coco-maracuya-bowl',
    name: 'Helado en Coco + Maracuyá',
    category: 'coco_bowl',
    sizeDetail: 'Servido en coco natural',
    description: 'Helado artesanal en coco bañado con jalea y semillas naturales de maracuyá agridulce.',
    price: 12.0,
    image: './assets/helado-coco-maracuya.jpg',
    badge: '🔥 Tropical',
    inStock: true,
    toppings: ['Extra Maracuyá', 'Fudge Artesanal', 'Leche Condensada']
  },



  // PALETAS ARTESANALES (CON O SIN LECHE NESTLÉ)
  {
    id: 'paleta-coco-nestle',
    name: 'Paleta de Coco',
    category: 'paletas',
    sizeDetail: 'Con o Sin Leche Nestlé',
    description: 'Paleta de coco natural. Disponible rellena con leche Nestlé adentro o pura fruta sin leche.',
    price: 6.0,
    image: './assets/paleta-coco-poster.jpg',
    badge: '🥥 Coco',
    inStock: true,
    nestleOption: true,
    toppings: ['Con Leche Nestlé', 'Sin Leche Nestlé']
  },
  {
    id: 'paleta-arandano-nestle',
    name: 'Paleta de Arándano',
    category: 'paletas',
    sizeDetail: 'Con o Sin Leche Nestlé',
    description: 'Paleta artesanal de arándanos frescos con corazón de leche Nestlé adentro o 100% fruta natural.',
    price: 6.0,
    image: './assets/paleta-arandano-poster.jpg',
    badge: '🫐 Arándano',
    inStock: true,
    nestleOption: true,
    toppings: ['Con Leche Nestlé', 'Sin Leche Nestlé']
  },
  {
    id: 'paleta-lucuma-nestle',
    name: 'Paleta de Lúcuma',
    category: 'paletas',
    sizeDetail: 'Con o Sin Leche Nestlé',
    description: 'Pura lúcuma de seda en paleta cremosa. Disponible rellena con leche Nestlé o sin leche.',
    price: 6.0,
    image: './assets/paleta-lucuma-poster.jpg',
    badge: '✨ Lúcuma',
    inStock: true,
    nestleOption: true,
    toppings: ['Con Leche Nestlé', 'Sin Leche Nestlé']
  },
  {
    id: 'paleta-oreo-nestle',
    name: 'Paleta de Oreo',
    category: 'paletas',
    sizeDetail: 'Con o Sin Leche Nestlé',
    description: 'Helado cremoso con trozos de galleta Oreo original y opción de relleno Nestlé.',
    price: 6.0,
    image: './assets/paleta-oreo-poster.jpg',
    badge: '🍪 Oreo',
    inStock: true,
    nestleOption: true,
    toppings: ['Con Leche Nestlé', 'Sin Leche Nestlé']
  },
  {
    id: 'paleta-fudge-artesanal',
    name: 'Paleta Rellena de Fudge',
    category: 'paletas',
    sizeDetail: 'Centro de Fudge Casero',
    description: 'Pura fruta natural con centro cremoso de fudge de chocolate oscuro casero.',
    price: 6.0,
    image: './assets/paleta-fudge.jpg',
    badge: '🍫 Fudge',
    inStock: true,
    nestleOption: false,
    toppings: ['Centro de Fudge Casero']
  },
  {
    id: 'paleta-tropical-mango-aguaje',
    name: 'Paleta de Mango Tropical',
    category: 'paletas',
    sizeDetail: '100% Pulpa de Fruta',
    description: 'Paleta artesanal refrescante de mango natural sin conservantes.',
    price: 6.0,
    image: './assets/paleta-mango.jpg',
    badge: '🌴 Mango',
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
    const saved = localStorage.getItem('cocoricco_carta_v6');
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
    localStorage.setItem('cocoricco_carta_v6', JSON.stringify(updated));
    setSaveSuccessNotification(true);
    setTimeout(() => setSaveSuccessNotification(false), 2500);
  };

  const resetToDefault = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.setItem('cocoricco_carta_v6', JSON.stringify(DEFAULT_PRODUCTS));
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
      setAuthError('Contraseña incorrecta. Solo acceso administrador.');
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
    <div className="min-h-screen bg-[#08100c] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-lime-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Sleek Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#08100c]/90 border-b border-white/10 px-4 sm:px-8 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-white/10 p-0.5 border border-lime-400/40 shadow-sm flex items-center justify-center">
              <img
                src="./assets/logo.png"
                alt="Logo Coco Ricco"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-lime-400 via-white to-rose-400 bg-clip-text text-transparent">
                  COCO RICCO
                </h1>
                <span className="bg-lime-500/20 text-lime-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-lime-500/30">
                  Carta
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Jaén, Perú</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Admin Lock Button */}
            <button
              onClick={handleOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              title="Panel de Precios (Contraseña)"
            >
              {isAuthenticated ? (
                <Unlock className="w-3.5 h-3.5 text-lime-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-lime-400" />
              )}
              <span className="hidden sm:inline">Precios</span>
            </button>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/51938955940?text=Hola%20Coco%20Ricco,%20vi%20su%20Carta%20Virtual%20y%20deseo%20hacer%20un%20pedido"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Sticky Fast Category Filter Bar */}
      <section className="sticky top-[53px] z-30 bg-[#08100c]/95 backdrop-blur-xl border-b border-white/10 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'todos', label: '✨ Todos', icon: '🍨' },
            { id: 'fresas', label: '🍓 Fresas con Crema', icon: '🍓' },
            { id: 'coco_bowl', label: '🥥 Tazón de Coco', icon: '🥥' },
            { id: 'paletas', label: '🍡 Paletas Artesanales', icon: '🍡' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Visual Catalog Grid (Direct & Fast) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedProductView(product)}
              className={`group cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                product.inStock
                  ? 'bg-slate-900/60 border-white/10 hover:border-lime-400/50 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)] active:scale-[0.98]'
                  : 'bg-slate-950/40 border-red-500/20 opacity-70'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                  {/* Badge top-left */}
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag bottom-right */}
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-lime-500 text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-0.5">
                    <span>S/.</span>
                    <span>{product.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Info Text (Compact) */}
                <div className="p-3 sm:p-4 space-y-1">
                  <span className="text-[10px] sm:text-[11px] font-bold text-lime-400 block truncate">
                    {product.sizeDetail}
                  </span>

                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {product.nestleOption && (
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">
                      <Milk className="w-3 h-3 text-amber-400" />
                      <span>Con / Sin Nestlé</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Tap for details button */}
              <div className="p-3 pt-0 sm:p-4 sm:pt-0">
                <div className="w-full py-1.5 rounded-lg bg-white/5 group-hover:bg-lime-500 group-hover:text-slate-950 text-slate-400 text-[10px] sm:text-xs font-bold text-center transition-colors">
                  Ver Detalles
                </div>
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
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-slate-900 border border-white/15 p-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              <button
                onClick={() => setSelectedProductView(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto space-y-3 pr-0.5">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={selectedProductView.image}
                    alt={selectedProductView.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-3 py-1 rounded-xl bg-lime-500 text-slate-950 font-black text-sm shadow-md">
                    S/. {selectedProductView.price.toFixed(2)}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-lime-400 font-bold uppercase">{selectedProductView.sizeDetail}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{selectedProductView.name}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedProductView.description}</p>
                </div>

                {selectedProductView.nestleOption && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-xs">
                    <p className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Milk className="w-3.5 h-3.5 text-amber-400" />
                      <span>Opciones de Preparación:</span>
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className="p-1.5 rounded-lg bg-black/40 text-slate-300">
                        <span className="font-bold text-lime-400 block">🥛 Con Leche Nestlé</span>
                        <span className="text-[10px] text-slate-400">Rellena de leche condensada</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/40 text-slate-300">
                        <span className="font-bold text-emerald-400 block">🍃 Sin Leche Nestlé</span>
                        <span className="text-[10px] text-slate-400">Pura fruta natural</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProductView.toppings && selectedProductView.toppings.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-white/10">
                    <p className="text-[10px] font-bold text-rose-400 uppercase">Toppings / Ingredientes:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedProductView.toppings.map(t => (
                        <span key={t} className="text-[11px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                          ✓ {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Precio:</span>
                  <p className="text-xl font-black text-lime-400">S/. {selectedProductView.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setSelectedProductView(null)}
                  className="px-5 py-2 rounded-xl bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-lime-400"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Password Authentication Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-lime-500/30 p-6 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto rounded-2xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center text-lime-400 shadow-md">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-black text-white">Acceso Administrador</h3>
                <p className="text-xs text-slate-400 mt-1">Ingresa tu clave para editar precios y stock.</p>
              </div>

              <form onSubmit={handleVerifyPassword} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña..."
                    value={passwordInput}
                    onChange={e => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    autoFocus
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 py-1.5 rounded-xl">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-lime-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-lime-400"
                >
                  Desbloquear
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
              className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-lime-500/30 p-5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-lime-400" />
                  <div>
                    <h3 className="text-base font-black text-white">Editar Precios & Stock</h3>
                    <p className="text-[11px] text-slate-400">Cambios en vivo para la carta virtual</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1 rounded-lg bg-white/5 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {saveSuccessNotification && (
                <div className="my-2 p-2 rounded-xl bg-lime-500/20 border border-lime-500/40 text-lime-300 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>¡Cambios guardados al instante!</span>
                </div>
              )}

              {/* Items */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
                {products.map((prod, pIdx) => (
                  <div
                    key={prod.id}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={prod.image} alt={prod.name} className="w-9 h-9 rounded-lg object-cover bg-black" />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{prod.name}</h4>
                        <span className="text-[10px] text-lime-400">{prod.sizeDetail}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
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
                          className="w-16 px-1.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-bold text-lime-400 text-center"
                        />
                      </div>

                      <button
                        onClick={() => {
                          const updated = [...products];
                          updated[pIdx].inStock = !updated[pIdx].inStock;
                          saveCatalog(updated);
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                          prod.inStock
                            ? 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {prod.inStock ? 'Stock' : 'Agotado'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetToDefault}
                    className="px-3 py-1.5 rounded-xl bg-white/5 text-xs text-slate-400 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Restablecer</span>
                  </button>

                  <button
                    onClick={handleLogoutAdmin}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-semibold"
                  >
                    Cerrar Sesión
                  </button>
                </div>

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="px-5 py-2 rounded-xl bg-lime-500 text-slate-950 font-black text-xs uppercase"
                >
                  Guardar y Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-300">COCO RICCO • Jaén, Perú</p>
        <p className="text-[11px]">Pedidos al WhatsApp <strong>938 955 940</strong></p>
      </footer>
    </div>
  );
}
