import React from "react";
import { ShieldCheck, HardDrive, Cpu, Terminal, Users } from "lucide-react";

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const pillars = [
    {
      icon: Cpu,
      title: "Enterprise Architecture",
      desc: "Designed and certified in-house. Workstations and rackmount structures configured for zero hardware bottlenecks."
    },
    {
      icon: ShieldCheck,
      title: "SLA Guaranteed Support",
      desc: "2-hour on-site diagnostic response with continuous hardware failover agreements for platinum corporate users."
    },
    {
      icon: HardDrive,
      title: "Hardware Lab Diagnostic",
      desc: "Full lab verification including high-precision component scoping, firmware hardening, and stability benchmarking."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-zinc-50 border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Main Typography content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
              <Terminal className="h-3.5 w-3.5" />
              <span>CTO Advisory: Q3 Hardware Operations</span>
            </div>

            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              AN Computers <br />
              <span className="bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                Elite Systems Lab
              </span>
            </h1>

            <p className="max-w-xl text-base text-zinc-600 sm:text-lg">
              We design, build, and maintain mission-critical compute clusters, corporate workstations, and specialized gaming setups. Fully compatible, thoroughly benchmarked, and protected by premium hardware service levels.
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onNavigate("builder")}
                className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-zinc-800 transition-colors"
              >
                Launch PC Configurator
              </button>
              
              <button
                onClick={() => onNavigate("consultant")}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Consult AI Architect
              </button>
            </div>

            <div className="flex items-center space-x-4 text-xs text-zinc-500">
              <div className="flex items-center space-x-1">
                <Users className="h-3.5 w-3.5" />
                <span>Over 1,200 Corporate Clients</span>
              </div>
              <span>•</span>
              <span>ISO 9001 Quality Certified Lab</span>
            </div>
          </div>

          {/* Visual Showcase (Styled Mockup Area) */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-zinc-100 opacity-50 blur-2xl"></div>
              
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                </div>
                <span className="font-mono text-xs text-zinc-400">spec_analyzer.sys</span>
              </div>

              <div className="mt-4 space-y-4 font-mono text-xs text-zinc-600">
                <div className="flex items-center justify-between rounded bg-zinc-50 p-2">
                  <span className="text-zinc-500">[SYSTEM]</span>
                  <span className="font-bold text-zinc-900">AN GRIDSERVER 2U OK</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>THERMALS:</span>
                    <span className="font-bold text-emerald-600">38°C (OPTIMAL)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100">
                    <div className="h-1.5 w-[38%] rounded-full bg-emerald-500"></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>MEMORY CHANNEL INVARIANTS:</span>
                    <span className="font-bold text-zinc-900">ECC REGISTERED</span>
                  </div>
                  <div className="text-[10px] text-zinc-400">OCTA-CHANNEL BANDWIDTH MAXIMIZED</div>
                </div>

                <div className="border-t border-zinc-100 pt-3 text-center">
                  <span className="text-zinc-400">Firmware integrity check passed: SECURE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Pillars Section */}
        <div className="mt-16 border-t border-zinc-200 pt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
