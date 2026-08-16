'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  specs: string;
  image: string;
  color: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    price: 1199,
    rating: 4.9,
    specs: 'A18 Pro chip · 6.9" Super Retina XDR · 48MP Fusion Camera · Titanium',
    image: '📱',
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: '2',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    price: 1299,
    rating: 4.8,
    specs: 'Snapdragon 8 Elite · 200MP Quad Camera · S Pen · Galaxy AI',
    image: '📱',
    color: 'from-blue-900 to-slate-900',
  },
  {
    id: '3',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    price: 1099,
    rating: 4.7,
    specs: 'Google Tensor G4 · Gemini Advanced AI · 50MP Triple Camera',
    image: '📱',
    color: 'from-emerald-900 to-slate-900',
  },
  {
    id: '4',
    name: 'OnePlus 13 5G',
    brand: 'OnePlus',
    price: 899,
    rating: 4.8,
    specs: 'Snapdragon 8 Elite · 6000mAh Battery · 100W SUPERVOOC · Hasselblad',
    image: '📱',
    color: 'from-red-900 to-slate-900',
  },
  {
    id: '5',
    name: 'Xiaomi 15 Ultra',
    brand: 'Xiaomi',
    price: 999,
    rating: 4.7,
    specs: 'Leica Quad Camera · 1-inch Sensor · 200MP Telephoto · 120Hz AMOLED',
    image: '📱',
    color: 'from-amber-900 to-slate-900',
  },
];

export default function TechMobileDemo() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.specs.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [search, selectedBrand]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>⚡ TechMobile</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-600/30 text-red-400 border border-red-500/40">LIVE DEMO</span>
          </h1>
        </div>

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCheckout(true)}
          className="relative px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2"
        >
          <span>🛒 Cart</span>
          <span className="bg-white text-black text-[11px] font-bold px-1.5 py-0.5 rounded-full">{totalCartCount}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Banner */}
        <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-red-900/40 via-purple-900/30 to-slate-900 border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="max-w-xl relative z-10">
            <span className="text-xs font-mono text-red-400 tracking-widest uppercase">Flagship Smartphone Showcase</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">Experience Next-Gen Mobile Technology</h2>
            <p className="text-sm text-gray-300">Discover premium smartphones with AI camera systems, titanium builds, and flagship processors.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-xl border transition-all ${
                  selectedBrand === brand ? 'bg-red-600 text-white border-red-500 shadow-md' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search phones, specs, chips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-mono text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-full md:w-72"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/50 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className={`h-44 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center text-6xl shadow-inner mb-4`}>
                  {product.image}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-red-400 font-semibold">{product.brand}</span>
                  <span className="text-xs font-mono text-amber-400 font-bold">★ {product.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-xs text-gray-400 mb-4 font-mono">{product.specs}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xl font-mono font-bold text-white">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-white/10 hover:bg-red-600 text-white text-xs font-mono font-semibold rounded-lg border border-white/20 hover:border-red-500 transition-all"
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Modal */}
      {isCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F19] border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Your Shopping Cart</h3>
              <button onClick={() => setIsCheckout(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-xs font-mono text-gray-400 text-center py-8">Your cart is empty.</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                    <div>
                      <p className="font-semibold text-white">{product.name}</p>
                      <p className="text-gray-400">${product.price} x {qty}</p>
                    </div>
                    <span className="font-bold text-white">${product.price * qty}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 pt-4 flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-gray-400">Total Amount:</span>
              <span className="text-xl font-mono font-bold text-white">${totalCartPrice}</span>
            </div>

            <button
              onClick={() => {
                alert('Order Placed Successfully! (Demo Simulation)');
                setCart([]);
                setIsCheckout(false);
              }}
              disabled={cart.length === 0}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-lg"
            >
              Checkout Now 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
