import React from "react";
import { Laptop, Cpu, PhoneCall, ShieldAlert, Layers, Building2 } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

export default function Header({ activeTab, setActiveTab, cartCount }: HeaderProps) {
  const navItems = [
    { id: "catalog", label: "Product Systems", icon: Laptop },
    { id: "builder", label: "Custom PC Builder", icon: Cpu },
    { id: "consultant", label: "AI Hardware Consultant", icon: ShieldAlert },
    { id: "repair", label: "Repair Service Desk", icon: PhoneCall },
    { id: "sla", label: "Enterprise SLA Portal", icon: Layers },
    { id: "erp", label: "ERP Suite & Ledger", icon: Building2 },
    { id: "dashboard", label: "Control Center", icon: Cpu }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab("catalog")}
          className="flex cursor-pointer items-center space-x-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-md">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <span className="font-mono text-xl font-bold tracking-tight text-zinc-900">
              AN COMPUTERS
            </span>
            <span className="ml-1.5 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-600">
              LIMITED
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden space-x-1 md:flex">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === "dashboard" && cartCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right action metrics */}
        <div className="flex items-center space-x-4">
          <div className="hidden flex-col text-right text-xs sm:flex">
            <span className="font-mono font-bold text-emerald-600">● SYSTEMS LIVE</span>
            <span className="text-zinc-400">CTO Dashboard Portal</span>
          </div>
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
            title="Account Management"
          >
            <Cpu className="h-5 w-5 text-zinc-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Subbar */}
      <div className="flex overflow-x-auto border-t border-zinc-100 py-2 px-2 md:hidden scrollbar-none">
        <div className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
