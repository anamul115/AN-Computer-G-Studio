import React, { useState, useEffect } from "react";
import { PCComponent, CustomPCBuild } from "../types";
import { Cpu, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, Send } from "lucide-react";

interface CustomBuilderProps {
  components: PCComponent[];
  onSubmitBuild: (build: CustomPCBuild, name: string, email: string) => void;
  onConsultAI: (build: CustomPCBuild) => void;
}

const INITIAL_BUILD: CustomPCBuild = {
  id: "",
  userId: "",
  components: {},
  totalPrice: 0,
  totalWattage: 0,
  isValid: true,
  compatibilityErrors: [],
  createdAt: ""
};

export default function CustomBuilder({ components, onSubmitBuild, onConsultAI }: CustomBuilderProps) {
  const [build, setBuild] = useState<CustomPCBuild>(INITIAL_BUILD);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);

  const componentTypes = [
    { id: "cpu", label: "Processor (CPU)" },
    { id: "motherboard", label: "Motherboard" },
    { id: "gpu", label: "Graphics Card (GPU)" },
    { id: "ram", label: "Memory (RAM)" },
    { id: "storage", label: "Solid State Storage" },
    { id: "psu", label: "Power Supply (PSU)" },
    { id: "cooler", label: "System Cooler" },
    { id: "case", label: "Computer Chassis" }
  ];

  // Run architectural validation when build configuration updates
  useEffect(() => {
    const comps = build.components;
    let price = 0;
    let wattage = 0;
    let errors: string[] = [];

    // Sum price and wattage
    (Object.values(comps) as Array<PCComponent | undefined>).forEach((c) => {
      if (c) {
        price += c.price;
        if (c.specs.powerConsumption) {
          wattage += c.specs.powerConsumption;
        }
      }
    });

    // 1. Validate CPU and Motherboard socket match
    if (comps.cpu && comps.motherboard) {
      const cpuSocket = comps.cpu.specs.socket;
      const moboSocket = comps.motherboard.specs.socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        errors.push(`Socket Mismatch: ${comps.cpu.name} (${cpuSocket}) cannot be installed on ${comps.motherboard.name} (${moboSocket}).`);
      }
    }

    // 2. Validate Motherboard and RAM memory standard match
    if (comps.motherboard && comps.ram) {
      const moboRam = comps.motherboard.specs.ramType;
      const ramStandard = comps.ram.specs.ramType;
      if (moboRam && ramStandard && moboRam !== ramStandard) {
        errors.push(`Memory Standard Conflict: ${comps.motherboard.name} supports ${moboRam}, but you selected ${comps.ram.name} (${ramStandard}).`);
      }
    }

    // 3. Validate Power Supply capacity
    if (comps.psu) {
      // PSU capacity is represented as "850W", "1000W"
      const capacityWatts = parseInt(comps.psu.specs.capacity || "0");
      if (capacityWatts > 0 && wattage > 0) {
        // Enforce safety headroom: system load should not exceed 80% of PSU maximum output
        const safetyLoad = capacityWatts * 0.8;
        if (wattage > safetyLoad) {
          errors.push(`Critical Power Budget Alert: Total system power load (${wattage}W) exceeds safe operation overhead (80%) of your ${comps.psu.name} (${capacityWatts}W). We strongly recommend a 1000W+ PSU.`);
        }
      }
    } else if (wattage > 300) {
      // Alert user they need a PSU
      errors.push(`Power Requirement: Selected components draw approximately ${wattage}W. Please select an adequate Power Supply (PSU) to sustain high-precision operations.`);
    }

    setBuild(prev => ({
      ...prev,
      totalPrice: price,
      totalWattage: wattage,
      isValid: errors.length === 0,
      compatibilityErrors: errors
    }));
  }, [build.components]);

  const selectComponent = (type: string, component: PCComponent) => {
    setBuild((prev) => ({
      ...prev,
      components: {
        ...prev.components,
        [type]: component
      }
    }));
  };

  const removeComponent = (type: string) => {
    setBuild((prev) => {
      const updated = { ...prev.components };
      delete updated[type as keyof typeof updated];
      return {
        ...prev,
        components: updated
      };
    });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) return;
    onSubmitBuild(build, customerName, customerEmail);
    // Reset form states
    setShowOrderForm(false);
    setCustomerName("");
    setCustomerEmail("");
  };

  return (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="border-b border-zinc-200 pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Custom PC Configurator</h2>
              <p className="text-sm text-zinc-500 mt-1">Configure customized computing servers and rigs with live engineering checks.</p>
            </div>
            
            <button
              onClick={() => onConsultAI(build)}
              className="inline-flex items-center space-x-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-xs font-semibold hover:bg-indigo-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Optimize with Gemini AI</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Component Selection Slots */}
          <div className="lg:col-span-2 space-y-4">
            {componentTypes.map((typeSpec) => {
              const activeComp = build.components[typeSpec.id as keyof typeof build.components];
              const availableOptions = components.filter(c => c.type === typeSpec.id);

              return (
                <div key={typeSpec.id} className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{typeSpec.label}</span>
                    {activeComp && (
                      <button
                        onClick={() => removeComponent(typeSpec.id)}
                        className="text-[10px] text-red-500 hover:underline font-semibold"
                      >
                        Remove Parts
                      </button>
                    )}
                  </div>

                  {activeComp ? (
                    // Part Selected display
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-900">{activeComp.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                            Maker: {activeComp.manufacturer} 
                            {activeComp.specs.socket ? ` • Socket: ${activeComp.specs.socket}` : ""}
                            {activeComp.specs.powerConsumption ? ` • Power: ${activeComp.specs.powerConsumption}W` : ""}
                            {activeComp.specs.ramType ? ` • Gen: ${activeComp.specs.ramType}` : ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-zinc-950">৳ {activeComp.price.toLocaleString()}</div>
                    </div>
                  ) : (
                    // Selector Dropdown options
                    <div className="pt-4">
                      <select
                        onChange={(e) => {
                          const comp = availableOptions.find(o => o.id === e.target.value);
                          if (comp) selectComponent(typeSpec.id, comp);
                        }}
                        defaultValue=""
                        className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-600 font-medium"
                      >
                        <option value="" disabled>Select {typeSpec.label} option...</option>
                        {availableOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name} (৳ {opt.price.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Audit and Checkout sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm sticky top-24">
              <h3 className="text-md font-bold text-zinc-900 pb-3 border-b border-zinc-100">Configurator Audit</h3>
              
              {/* Build Specs Metrics */}
              <div className="py-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Selected Hardware:</span>
                  <span className="font-bold text-zinc-900">{Object.keys(build.components).length} / 8</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Power Draw:</span>
                  <span className="font-bold text-zinc-900">{build.totalWattage} W</span>
                </div>
                <div className="flex justify-between text-zinc-500 border-t border-dashed border-zinc-100 pt-3">
                  <span className="text-sm font-bold text-zinc-900">Configurator Total:</span>
                  <span className="text-lg font-extrabold text-zinc-950">৳ {build.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Compatibility Audit messages */}
              <div className="py-3 border-t border-zinc-100">
                <div className="text-xs font-bold text-zinc-800 uppercase tracking-wide mb-2.5 flex items-center">
                  <ShieldAlert className="h-3.5 w-3.5 text-zinc-700 mr-1.5" />
                  Engineering Validation Checks
                </div>

                {build.compatibilityErrors.length > 0 ? (
                  <div className="space-y-2">
                    {build.compatibilityErrors.map((err, i) => (
                      <div key={i} className="flex space-x-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-amber-800 text-[11px] leading-relaxed">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex space-x-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-800 text-[11px]">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>All architectural validations passed. System meets full performance safety standards. Ready for assembly.</span>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => setShowOrderForm(true)}
                  disabled={Object.keys(build.components).length === 0 || !build.isValid}
                  className="w-full rounded-lg bg-zinc-900 py-2.5 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
                >
                  Book Professional Assembly
                </button>
                <p className="text-[10px] text-center text-zinc-400">Professional wiring, assembly, stability test, & shipping included.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modular Booking Overlay */}
        {showOrderForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-xs p-4">
            <div className="w-full max-w-md bg-white rounded-xl border border-zinc-200 p-6 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <h3 className="text-md font-bold text-zinc-900">Confirm Custom PC Assembly</h3>
                <button 
                  onClick={() => setShowOrderForm(false)}
                  className="text-zinc-400 hover:text-zinc-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name..."
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Business Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                  />
                </div>

                <div className="rounded-lg bg-zinc-50 p-3 font-mono text-[10px] text-zinc-500 space-y-1">
                  <div className="font-bold text-zinc-800">Assembly Order Breakdown:</div>
                  <div className="flex justify-between">
                    <span>Parts Total:</span>
                    <span>৳ {build.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab Assembly & Benchmarking:</span>
                    <span>৳ 15,000</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-zinc-200 pt-1 font-bold text-zinc-900">
                    <span>Grand Total:</span>
                    <span>৳ {(build.totalPrice + 15000).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 py-2.5 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Reserve Assembly Build</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
