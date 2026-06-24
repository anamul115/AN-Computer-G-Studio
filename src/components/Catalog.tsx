import React, { useState } from "react";
import { Product } from "../types";
import { 
  Search, 
  ShoppingBag, 
  ArrowRight, 
  Settings, 
  Grid, 
  Layers, 
  Tag, 
  Eye, 
  EyeOff, 
  Sparkles, 
  RefreshCcw, 
  ShieldCheck,
  Info
} from "lucide-react";

interface CatalogProps {
  products: Product[];
  onBookSystem: (product: Product) => void;
}

export default function Catalog({ products, onBookSystem }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(800000);
  
  // New visual states for the user requests
  const [viewArrangement, setViewArrangement] = useState<"sections" | "categories" | "grid">("sections");
  const [staffMode, setStaffMode] = useState<boolean>(false);

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
    
    // Brand Filter
    const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;
    
    // Condition Filter (New / Pre-Owned)
    const matchesCondition = selectedCondition === "all" || 
      (selectedCondition === "new" && !p.isPreOwned) ||
      (selectedCondition === "preowned" && p.isPreOwned);
      
    // Price Filter
    const matchesPrice = p.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice;
  });

  // Calculate stats for staff ledger
  const totalSellingVal = filteredProducts.reduce((sum, p) => sum + p.price, 0);
  const totalBuyingVal = filteredProducts.reduce((sum, p) => sum + (p.buyingPrice || p.price * 0.8), 0);
  const projectedProfitVal = totalSellingVal - totalBuyingVal;
  const avgMarginPercent = totalSellingVal > 0 ? Math.round((projectedProfitVal / totalSellingVal) * 100) : 0;

  // Split logic for Layouts
  // 1. By Condition Sections
  const newProducts = filteredProducts.filter(p => !p.isPreOwned);
  const preOwnedProducts = filteredProducts.filter(p => p.isPreOwned);

  // 2. By Categories Sections
  const workstationProducts = filteredProducts.filter(p => p.category === "workstation");
  const gamingProducts = filteredProducts.filter(p => p.category === "gaming");
  const laptopProducts = filteredProducts.filter(p => p.category === "laptop");
  const serverProducts = filteredProducts.filter(p => p.category === "server");

  // Reusable Product Card Component
  const renderProductCard = (p: Product) => {
    const costPrice = p.buyingPrice || Math.round(p.price * 0.82);
    const marginAmt = p.price - costPrice;
    const marginPct = Math.round((marginAmt / p.price) * 100);

    return (
      <div 
        key={p.id}
        className={`group flex flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-1 ${
          staffMode 
            ? "border-amber-300 bg-amber-50/10 hover:shadow-md" 
            : "border-zinc-200 bg-white shadow-sm"
        }`}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
          <img
            src={p.image}
            alt={p.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {p.isPreOwned ? (
              <div className="flex items-center gap-1 rounded bg-amber-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                <RefreshCcw className="h-2.5 w-2.5" />
                <span>Pre-Owned (Certified)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded bg-teal-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                <Sparkles className="h-2.5 w-2.5" />
                <span>Brand New</span>
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2 rounded bg-zinc-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
            {p.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
              {p.brand || "AN Labs"}
            </span>
          </div>
          <h3 className="text-md font-bold text-zinc-900 tracking-tight leading-snug">{p.name}</h3>
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

          {/* Price blocks depending on Staff vs Buyer Mode */}
          {staffMode ? (
            <div className="mt-5 space-y-2 rounded-lg border border-amber-200 bg-amber-50/30 p-3 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-500 text-[10px] font-bold uppercase">
                <span>🔐 MERCHANDISING PROFILE</span>
                <span className="text-amber-700">STAFF VIEW</span>
              </div>
              <div className="flex justify-between text-zinc-600 border-t border-amber-100 pt-1.5">
                <span>Buying Price:</span>
                <span className="font-bold text-zinc-900">৳ {costPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Selling Price:</span>
                <span className="font-bold text-emerald-700">৳ {p.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-amber-200 pt-1.5 font-bold text-zinc-900">
                <span>Net Margin:</span>
                <span className="text-emerald-700">
                  ৳ {marginAmt.toLocaleString()} ({marginPct}%)
                </span>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
            <div>
              <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Selling Price</span>
              <span className="text-lg font-extrabold text-zinc-950">৳ {p.price.toLocaleString()}</span>
            </div>

            <button
              onClick={() => onBookSystem(p)}
              className="inline-flex items-center space-x-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              <span>Configure Order</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Section Header Generator
  const renderSectionHeader = (title: string, desc: string, count: number, accent: "teal" | "amber" | "indigo" | "rose") => {
    const accentColors = {
      teal: "border-teal-500",
      amber: "border-amber-500",
      indigo: "border-indigo-500",
      rose: "border-rose-500"
    };

    return (
      <div className={`border-l-4 ${accentColors[accent]} pl-4 py-2 mt-8 mb-4 flex items-center justify-between bg-zinc-50 pr-4 rounded-r-lg`}>
        <div>
          <h3 className="text-sm font-extrabold text-zinc-900 uppercase tracking-tight">{title}</h3>
          <p className="text-[11px] text-zinc-500">{desc}</p>
        </div>
        <span className="font-mono text-[10px] font-bold text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-200">
          {count} System{count !== 1 ? "s" : ""}
        </span>
      </div>
    );
  };

  return (
    <div className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Elite Engineered Systems</h2>
              {staffMode && (
                <span className="bg-amber-100 text-amber-800 font-mono text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase border border-amber-200 animate-pulse">
                  Staff Mode
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500 mt-1">Ready-to-deploy workstation, pre-owned budget rigs, and servers, curated by our lab engineers.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search specs or systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-zinc-50 pl-9 pr-4 py-2 text-sm focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Buyer Mode vs Staff Mode Switcher */}
            <button
              onClick={() => setStaffMode(!staffMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs border ${
                staffMode 
                  ? "bg-amber-100 border-amber-300 text-amber-900" 
                  : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
              }`}
              title={staffMode ? "Hide staff margins & buying prices" : "Reveal staff margins & buying prices"}
            >
              {staffMode ? (
                <>
                  <EyeOff className="h-3.5 w-3.5 text-amber-700" />
                  <span>Buyer View (Hide Cost)</span>
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 text-zinc-600" />
                  <span>Staff Mode (Show Buying Cost)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Arrangement Tab Controls (Category wise / Section wise) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-zinc-100 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">View Arrangement:</span>
            <div className="inline-flex rounded-lg bg-zinc-100 p-0.5">
              <button
                onClick={() => setViewArrangement("sections")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                  viewArrangement === "sections"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Section-Wise (New & Pre-Owned)</span>
              </button>
              <button
                onClick={() => setViewArrangement("categories")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                  viewArrangement === "categories"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <Tag className="h-3.5 w-3.5" />
                <span>Category-Wise Shelves</span>
              </button>
              <button
                onClick={() => setViewArrangement("grid")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                  viewArrangement === "grid"
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Unified Grid</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staff mode live valuation overview ledger */}
        {staffMode && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50/20 p-5 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4.5 w-4.5 text-amber-700" />
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-900">
                🔐 Internal Staff Inventory Valuation & Profitability Ledger
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Systems Selected</span>
                <span className="text-lg font-black text-zinc-950">{filteredProducts.length} Machines</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Purchasing cost</span>
                <span className="text-lg font-black text-zinc-950">৳ {totalBuyingVal.toLocaleString()}</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total retail valuation</span>
                <span className="text-lg font-black text-emerald-700">৳ {totalSellingVal.toLocaleString()}</span>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Projected profit margin</span>
                <span className="text-lg font-black text-amber-700">
                  ৳ {projectedProfitVal.toLocaleString()} ({avgMarginPercent}%)
                </span>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-amber-800 leading-relaxed flex items-center gap-1.5">
              <Info className="h-3 w-3 shrink-0" />
              <span>Security notice: Keep this valuation ledger secure. All acquisition prices are derived from direct customs & vendor invoice costs.</span>
            </p>
          </div>
        )}

        {/* Advanced Filters Block */}
        <div className="mb-8 bg-zinc-50 rounded-xl border border-zinc-200 p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Brand Manufacturer</label>
            <div className="flex flex-wrap gap-1.5">
              {["all", "AN Labs", "ASUS", "Lenovo", "HP", "Custom"].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedBrand === brand
                      ? "bg-zinc-950 border-zinc-950 text-white shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {brand === "all" ? "All Brands" : brand}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter (Pre-Owned Section) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Condition & Grade</label>
            <div className="flex gap-2">
              {[
                { id: "all", label: "All Items" },
                { id: "new", label: "Brand New" },
                { id: "preowned", label: "Pre-Owned" }
              ].map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all text-center ${
                    selectedCondition === cond.id
                      ? "bg-zinc-950 border-zinc-950 text-white shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-400">Pre-Owned units are completely refurbished and backed by AN Labs.</p>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Max Budget (BDT)</label>
              <span className="text-xs font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-2 py-0.5 rounded">
                ৳ {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="800000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>৳ 20k</span>
              <span>৳ 400k</span>
              <span>৳ 800k+</span>
            </div>
          </div>
        </div>

        {/* RENDER VIEW ACCORDING TO VIEW ARRANGEMENT SELECTION */}
        
        {/* VIEW 1: GROUP BY SECTION (New vs Pre-owned) */}
        {viewArrangement === "sections" && (
          <div className="space-y-12">
            {/* New Systems Section */}
            {newProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "Brand New Professional Hardware", 
                  "Pristine computational setups configured from current generation components. Fully boxed with local lab support.",
                  newProducts.length,
                  "teal"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {newProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}

            {/* Pre-Owned Systems Section */}
            {preOwnedProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "Pre-Owned Certified Rigs & Hardware", 
                  "Thoroughly stress-tested corporate assets, cleaned of dust, thermal paste replaced with high-grade compound, with full warranty.",
                  preOwnedProducts.length,
                  "amber"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {preOwnedProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}
            
            {newProducts.length === 0 && preOwnedProducts.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No matching systems found under these specific filter coordinates.
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: GROUP BY CATEGORY SHELVES */}
        {viewArrangement === "categories" && (
          <div className="space-y-12">
            {/* 1. Workstations */}
            {workstationProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "High-End Engineering Workstations",
                  "3D Rendering, Deep Learning, and Heavy Computation Rigs",
                  workstationProducts.length,
                  "indigo"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {workstationProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}

            {/* 2. Gaming Rigs */}
            {gamingProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "Immersive Gaming Systems",
                  "Framerate focused setups engineered for low thermals and custom acoustics",
                  gamingProducts.length,
                  "rose"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {gamingProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}

            {/* 3. Laptops */}
            {laptopProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "Premium Thin & Light Laptops",
                  "High-density battery backups and responsive portable workstations",
                  laptopProducts.length,
                  "teal"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {laptopProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}

            {/* 4. Servers */}
            {serverProducts.length > 0 && (
              <div>
                {renderSectionHeader(
                  "Enterprise Rackmount Clusters & Servers",
                  "Scalable local hosting nodes, high SLA network cards, and redundant storage pools",
                  serverProducts.length,
                  "amber"
                )}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {serverProducts.map((p) => renderProductCard(p))}
                </div>
              </div>
            )}

            {workstationProducts.length === 0 && gamingProducts.length === 0 && laptopProducts.length === 0 && serverProducts.length === 0 && (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No matching systems found under these specific filter coordinates.
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: UNIFIED FLAT GRID */}
        {viewArrangement === "grid" && (
          <div>
            {renderSectionHeader(
              "All Systems Grid Layout",
              "A comprehensive direct shelf view of all matching systems",
              filteredProducts.length,
              "indigo"
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => renderProductCard(p))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <Settings className="mx-auto h-12 w-12 text-zinc-300 animate-spin-slow" />
            <h3 className="mt-4 text-sm font-semibold text-zinc-900">No compute systems match</h3>
            <p className="mt-1 text-xs text-zinc-500">Try adjusting your filters, resetting price caps, or selecting a broader category tab.</p>
          </div>
        )}

      </div>
    </div>
  );
}
