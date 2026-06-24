import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import CustomBuilder from "./components/CustomBuilder";
import AIConsultant from "./components/AIConsultant";
import RepairScheduler from "./components/RepairScheduler";
import SLAQuote from "./components/SLAQuote";
import Dashboard from "./components/Dashboard";
import { Product, PCComponent, CustomPCBuild, RepairBooking, SLAAgreement, ChatMessage } from "./types";
import { Cpu } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("catalog");
  const [products, setProducts] = useState<Product[]>([]);
  const [components, setComponents] = useState<PCComponent[]>([]);
  const [orders, setOrders] = useState<RepairBooking[]>([]);
  const [slas, setSLAs] = useState<SLAAgreement[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  // Custom builder active specification state
  const [currentBuild, setCurrentBuild] = useState<CustomPCBuild>({
    id: "build-session",
    userId: "demo-user",
    components: {},
    totalPrice: 0,
    totalWattage: 0,
    isValid: true,
    compatibilityErrors: [],
    createdAt: new Date().toISOString()
  });

  // Fetch product catalog & current operations state from server on mount
  useEffect(() => {
    async function initData() {
      try {
        const prodRes = await fetch("/api/products");
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
        setComponents(prodData.components || []);

        const orderRes = await fetch("/api/orders");
        const orderData = await orderRes.json();
        setOrders(orderData.orders || []);
        setSLAs(orderData.slas || []);
      } catch (err) {
        console.error("Error connecting to full-stack Express server:", err);
      }
    }
    initData();
  }, []);

  // Post new custom built computer to server
  const handleSubmitBuild = async (build: CustomPCBuild, customerName: string, customerEmail: string) => {
    try {
      const res = await fetch("/api/orders/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerEmail, build })
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(prev => [data.order, ...prev]);
        // Reset local build custom configuration
        setCurrentBuild({
          id: "build-session",
          userId: "demo-user",
          components: {},
          totalPrice: 0,
          totalWattage: 0,
          isValid: true,
          compatibilityErrors: [],
          createdAt: new Date().toISOString()
        });
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error("Failed submitting custom build order:", err);
    }
  };

  // Post new repair diagnostic book slot to server
  const handleBookRepair = async (booking: Omit<RepairBooking, "id" | "status" | "price" | "createdAt">) => {
    try {
      const res = await fetch("/api/orders/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(prev => [data.order, ...prev]);
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error("Failed submitting repair appointment booking:", err);
    }
  };

  // Post corporate B2B Service Level Agreement to server
  const handleRegisterSLA = async (sla: Omit<SLAAgreement, "id" | "status" | "monthlyCost" | "createdAt">) => {
    try {
      const res = await fetch("/api/orders/sla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sla)
      });
      const data = await res.json();
      if (res.ok) {
        setSLAs(prev => [data.sla, ...prev]);
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error("Failed submitting SLA registration:", err);
    }
  };

  // Pre-configured system selections
  const handleBookSystemDirect = (p: Product) => {
    // Autopopulate some parts for the PC Configurator matching this product style
    const prefilledCpu = components.find(c => c.type === "cpu" && p.specs["Processor"]?.includes(c.manufacturer));
    const prefilledGpu = components.find(c => c.type === "gpu" && p.specs["Graphics"]?.includes(c.manufacturer));
    const prefilledMobo = components.find(c => c.type === "motherboard" && c.specs.socket === prefilledCpu?.specs.socket);
    const prefilledRam = components.find(c => c.type === "ram");
    const prefilledStorage = components.find(c => c.type === "storage");
    const prefilledPsu = components.find(c => c.type === "psu" && (prefilledGpu ? parseInt(prefilledGpu.specs.powerConsumption ? String(prefilledGpu.specs.powerConsumption) : "0") < 300 : true));
    const prefilledCase = components.find(c => c.type === "case");
    const prefilledCooler = components.find(c => c.type === "cooler");

    setCurrentBuild({
      id: "build-session",
      userId: "demo-user",
      components: {
        cpu: prefilledCpu,
        gpu: prefilledGpu,
        motherboard: prefilledMobo,
        ram: prefilledRam,
        storage: prefilledStorage,
        psu: prefilledPsu,
        cooler: prefilledCooler,
        case: prefilledCase
      },
      totalPrice: p.price,
      totalWattage: 0,
      isValid: true,
      compatibilityErrors: [],
      createdAt: new Date().toISOString()
    });

    setActiveTab("builder");
  };

  // Consult the AI consultant with the active custom build loaded as context
  const handleConsultWithBuild = (buildContext: CustomPCBuild) => {
    setActiveTab("consultant");
    const componentSummary = Object.entries(buildContext.components)
      .map(([type, part]) => part ? `${type.toUpperCase()}: ${part.name}` : "")
      .filter(Boolean)
      .join(", ");
    
    const messageText = `Hi, I am configuring a custom build with: ${componentSummary || "No parts selected yet"}. Could you review my setup and advise on any potential bottlenecks, power issues, or cooling recommendations?`;
    
    // Auto-trigger a message in chat
    const simulatedUserMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory([simulatedUserMsg]);
    
    // Auto query backend
    const fetchAIResponse = async () => {
      try {
        const response = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatHistory: [simulatedUserMsg],
            currentBuild: buildContext
          })
        });
        const data = await response.json();
        const simulatedBotMsg: ChatMessage = {
          id: Math.random().toString(),
          sender: "bot",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setChatHistory(prev => [...prev, simulatedBotMsg]);
      } catch (err) {
        console.error("AI Auto spec review failed:", err);
      }
    };
    fetchAIResponse();
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "catalog":
        return <Catalog products={products} onBookSystem={handleBookSystemDirect} />;
      case "builder":
        return (
          <CustomBuilder
            components={components}
            onSubmitBuild={handleSubmitBuild}
            onConsultAI={handleConsultWithBuild}
          />
        );
      case "consultant":
        return (
          <AIConsultant
            currentBuild={currentBuild}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        );
      case "repair":
        return <RepairScheduler onBookRepair={handleBookRepair} />;
      case "sla":
        return <SLAQuote onRegisterSLA={handleRegisterSLA} />;
      case "dashboard":
        return <Dashboard orders={orders} slas={slas} />;
      default:
        return <Catalog products={products} onBookSystem={handleBookSystemDirect} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={orders.length} 
      />
      
      {activeTab === "catalog" && <Hero onNavigate={setActiveTab} />}
      
      <main className="flex-1">
        {renderActiveView()}
      </main>

      <footer className="bg-zinc-900 text-white border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-6 w-6 text-emerald-400" />
                <span className="font-mono text-lg font-bold tracking-tight">AN COMPUTERS</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ISO 9001 certified technology laboratory designing next-generation computing systems, rack servers, and high-SLA corporate support models.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Lab Portals</h4>
              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li><button onClick={() => setActiveTab("catalog")} className="hover:text-white">Product Catalog</button></li>
                <li><button onClick={() => setActiveTab("builder")} className="hover:text-white">Custom PC Builder</button></li>
                <li><button onClick={() => setActiveTab("consultant")} className="hover:text-white">AI Hardware Advisor</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Operations</h4>
              <ul className="mt-4 space-y-2 text-xs text-zinc-400">
                <li><button onClick={() => setActiveTab("repair")} className="hover:text-white">Repair Scheduling</button></li>
                <li><button onClick={() => setActiveTab("sla")} className="hover:text-white">Enterprise SLA Retainers</button></li>
                <li><button onClick={() => setActiveTab("dashboard")} className="hover:text-white">Control Dashboard</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">Corporate Compliance</h4>
              <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                AN Computers Limited is registered in Bangladesh. RJSC and BCS member. ISO 9001:2015 accredited labs. All operations subject to Net-30 enterprise SLA terms.
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-500">
            © 2026 AN Computers Limited. All rights reserved. Designed for Enterprise Reliability.
          </div>
        </div>
      </footer>
    </div>
  );
}
