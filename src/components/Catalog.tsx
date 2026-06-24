import React, { useState } from "react";
import { Product } from "../types";
import { Search, ShoppingBag, ArrowRight, Settings } from "lucide-react";

interface CatalogProps {
  products: Product[];
  onBookSystem: (product: Product) => void;
}

export default function Catalog({ products, onBookSystem }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Hardware" },
    { id: "workstation", label: "Workstations" },
    { id: "gaming", label: "Gaming Rigs" },
    { id: "laptop", label: "Premium Laptops" },
    { id: "server", label: "Enterprise Servers" }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 pb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Elite Engineered Systems</h2>
            <p className="text-sm text-zinc-500 mt-1">Ready-to-deploy workstation and cluster environments, curated by our lab engineers.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search specs or systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-zinc-50 pl-9 pr-4 py-2 text-sm focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {filteredProducts.map((p) => (
            <div 
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 rounded bg-zinc-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                  {p.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">{p.name}</h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed line-clamp-2">{p.description}</p>

                {/* Technical specs block */}
                <div className="mt-4 flex-1 rounded-lg bg-zinc-50 p-3 text-[11px] font-mono text-zinc-600 space-y-1.5">
                  <div className="font-bold border-b border-zinc-100 pb-1 text-zinc-800 uppercase text-[9px] tracking-wider">Lab Technical Specifications</div>
                  {Object.entries(p.specs).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-zinc-400">{key}:</span>
                      <span className="font-semibold text-zinc-800 text-right truncate max-w-[150px]">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Pricing Level</span>
                    <span className="text-xl font-extrabold text-zinc-950">৳ {p.price.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => onBookSystem(p)}
                    className="inline-flex items-center space-x-1 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                  >
                    <span>Configure Order</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <Settings className="mx-auto h-12 w-12 text-zinc-300 animate-spin-slow" />
            <h3 className="mt-4 text-sm font-semibold text-zinc-900">No compute systems match</h3>
            <p className="mt-1 text-xs text-zinc-500">Try adjusting your filters or search terms.</p>
          </div>
        )}

      </div>
    </div>
  );
}
