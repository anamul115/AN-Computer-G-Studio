import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database for active demo session
const products = [
  {
    id: "ws-pro-1",
    name: "AN Titan Workstation Pro (Dhaka Edition)",
    category: "workstation",
    description: "Enterprise-grade 64-core engineering computer. Optimized for scientific computing, AI training, and thermal durability in high ambient temperatures like Dhaka.",
    price: 580000,
    buyingPrice: 490000,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600",
    stock: 5,
    featured: true,
    isPreOwned: false,
    brand: "AN Labs",
    specs: {
      "Processor": "AMD Ryzen Threadripper PRO 7975WX (32 Cores, 64 Threads)",
      "Graphics": "Dual NVIDIA RTX 6000 Ada Generation 48GB",
      "Memory": "256GB ECC DDR5 Octa-Channel RAM",
      "Storage": "4TB PCIe 5.0 NVMe Enterprise SSD + 12TB RAID HDD",
      "Operating System": "Ubuntu Workstation 24.04 LTS / Windows 11 Pro Workstation"
    }
  },
  {
    id: "ws-creator-1",
    name: "AN Studio Elite (Bangla Creator)",
    category: "workstation",
    description: "High-performance workstation customized for freelance developers and content creators in Bangladesh. Perfect for Premiere Pro, 3D modeling, and compiler tasks.",
    price: 295000,
    buyingPrice: 240000,
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600",
    stock: 12,
    featured: true,
    isPreOwned: false,
    brand: "AN Labs",
    specs: {
      "Processor": "Intel Core i9-14900K (24 Cores, 5.8 GHz)",
      "Graphics": "NVIDIA GeForce RTX 4080 Super 16GB",
      "Memory": "64GB DDR5 6000MHz Dual-Channel",
      "Storage": "2TB WD Black SN850X PCIe 4.0 SSD",
      "Power Supply": "1000W 80+ Gold Fully Modular"
    }
  },
  {
    id: "gaming-nebula",
    name: "AN Nebula Aurora Gaming Rig",
    category: "gaming",
    description: "The ultimate AAA gaming rig custom built in Bangladesh, featuring customized dust filters, professional cable management, and high-quality liquid cooling.",
    price: 375000,
    buyingPrice: 310000,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=600",
    stock: 8,
    featured: true,
    isPreOwned: false,
    brand: "AN Labs",
    specs: {
      "Processor": "AMD Ryzen 7 7800X3D (V-Cache Gaming Champ)",
      "Graphics": "NVIDIA GeForce RTX 4090 24GB",
      "Memory": "32GB G.Skill Trident Z5 Neo DDR5-6000",
      "Storage": "2TB Samsung 990 Pro SSD",
      "Cooling": "360mm Custom Liquid AIO loop"
    }
  },
  {
    id: "laptop-expert",
    name: "AN Vaporbook Pro 16",
    category: "laptop",
    description: "Sleek aluminum chassis laptop. Certified local warranty support in Dhaka & Chittagong. Liquid Retina display optimized for color-accurate designing.",
    price: 225000,
    buyingPrice: 185000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600",
    stock: 15,
    featured: true,
    isPreOwned: false,
    brand: "AN Labs",
    specs: {
      "Processor": "Intel Core Ultra 7 155H (16 Cores, Built-in NPU)",
      "Graphics": "NVIDIA GeForce RTX 4060 Mobile 8GB",
      "Display": "16-inch IPS 2560x1600, 165Hz, DCI-P3 100%",
      "Memory": "32GB LPDDR5X Dual-Channel",
      "Weight": "1.8 kg"
    }
  },
  {
    id: "server-rack-1",
    name: "AN GridServer 2U (Dhaka Data Center)",
    category: "server",
    description: "Enterprise rackmount machine designed for local Bangladeshi ISP nodes, financial hypervisors, and corporate intranets in Motijheel or Gulshan.",
    price: 765000,
    buyingPrice: 650000,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    stock: 3,
    featured: false,
    isPreOwned: false,
    brand: "AN Labs",
    specs: {
      "Processor": "Dual AMD EPYC 9354 (64 Cores total)",
      "Memory": "512GB Registered ECC DDR5",
      "Network": "Quad 10G SFP+ Enterprise NIC ports",
      "Storage": "8x 2.4TB Enterprise SAS SSD Hot-Swap Bays",
      "Redundant PSU": "Dual 1600W Hot-Swap Titanium Units"
    }
  },
  {
    id: "preowned-game-1",
    name: "Pre-Owned Custom Core i7 Gaming PC",
    category: "gaming",
    description: "Budget powerhouse, thoroughly dust-cleaned and stress-tested for thermal performance in high ambient room temperatures. Pristine custom chassis.",
    price: 65000,
    buyingPrice: 45000,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600",
    stock: 2,
    featured: false,
    isPreOwned: true,
    brand: "Custom",
    specs: {
      "Processor": "Intel Core i7-11700K (8 Cores, 5.0 GHz)",
      "Graphics": "NVIDIA GeForce RTX 3070 8GB",
      "Memory": "16GB G.Skill Ripjaws 3200MHz DDR4",
      "Storage": "1TB NVMe PCIe Gen4 SSD",
      "Condition": "Certified Grade-A (9.5/10), 6 Months Labs Warranty"
    }
  },
  {
    id: "preowned-lenovo-1",
    name: "Pre-Owned Lenovo ThinkPad X1 Carbon Gen 8",
    category: "laptop",
    description: "Ultra-premium business laptop imported from corporate stocks. Renowned keyboard, legendary durability, and lightweight premium carbon fiber lid.",
    price: 55000,
    buyingPrice: 35000,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600",
    stock: 4,
    featured: false,
    isPreOwned: true,
    brand: "Lenovo",
    specs: {
      "Processor": "Intel Core i7-10610U vPro Processor",
      "Memory": "16GB LPDDR3 2133MHz",
      "Storage": "512GB PCIe NVMe SSD",
      "Display": "14-inch Full HD IPS Anti-glare",
      "Condition": "Grade-A Executive Used, 1 Year Service Warranty"
    }
  },
  {
    id: "preowned-asus-1",
    name: "Pre-Owned ASUS ROG Strix G15 Gaming Laptop",
    category: "gaming",
    description: "Slightly used high-performance gaming laptop with pristine thermal paste, RGB lighting accents, and robust construction. Certified by AN Labs Dhaka.",
    price: 85000,
    buyingPrice: 60000,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600",
    stock: 1,
    featured: false,
    isPreOwned: true,
    brand: "ASUS",
    specs: {
      "Processor": "AMD Ryzen 7 5800H (8 Cores)",
      "Graphics": "NVIDIA GeForce RTX 3060 6GB",
      "Display": "15.6-inch Full HD 144Hz IPS Panel",
      "Memory": "16GB DDR4 Dual-Channel",
      "Condition": "Grade-B+ (Minor bezel scuffs), 6 Months Labs Warranty"
    }
  },
  {
    id: "preowned-hp-1",
    name: "Pre-Owned HP Z4 G4 Server Workstation",
    category: "workstation",
    description: "Heavy-duty workspace engine. Perfect for computational simulations, hosting local databases, 3D architecture design, or virtualization.",
    price: 110000,
    buyingPrice: 80000,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600",
    stock: 1,
    featured: false,
    isPreOwned: true,
    brand: "HP",
    specs: {
      "Processor": "Intel Xeon W-2135 (6 Cores, 12 Threads, ECC Support)",
      "Graphics": "NVIDIA Quadro RTX 4000 8GB GDDR6",
      "Memory": "64GB DDR4 ECC Registered RAM",
      "Storage": "1TB NVMe PCIe M.2 SSD + 2TB Enterprise Enterprise HDD",
      "Condition": "Grade-A Refurbished, 1 Year Motherboard Warranty"
    }
  }
];

const components = [
  // CPUs
  { id: "c1", name: "AMD Ryzen 7 7800X3D", type: "cpu", price: 47000, manufacturer: "AMD", specs: { socket: "AM5", powerConsumption: 120 } },
  { id: "c2", name: "Intel Core i9-14900K", type: "cpu", price: 62000, manufacturer: "Intel", specs: { socket: "LGA1700", powerConsumption: 253 } },
  { id: "c3", name: "AMD Ryzen 9 7950X", type: "cpu", price: 65000, manufacturer: "AMD", specs: { socket: "AM5", powerConsumption: 170 } },
  // Motherboards
  { id: "m1", name: "ASUS ROG STRIX B650-A Gaming", type: "motherboard", price: 27000, manufacturer: "ASUS", specs: { socket: "AM5", formFactor: "ATX", ramType: "DDR5" } },
  { id: "m2", name: "MSI PRO Z790-A MAX WiFi", type: "motherboard", price: 28000, manufacturer: "MSI", specs: { socket: "LGA1700", formFactor: "ATX", ramType: "DDR5" } },
  // GPUs
  { id: "g1", name: "NVIDIA GeForce RTX 4090 24GB", type: "gpu", price: 188000, manufacturer: "NVIDIA", specs: { powerConsumption: 450 } },
  { id: "g2", name: "NVIDIA GeForce RTX 4070 Super 12GB", type: "gpu", price: 71000, manufacturer: "NVIDIA", specs: { powerConsumption: 220 } },
  { id: "g3", name: "AMD Radeon RX 7800 XT 16GB", type: "gpu", price: 59000, manufacturer: "AMD", specs: { powerConsumption: 263 } },
  // Memory
  { id: "r1", name: "Corsair Vengeance RGB 32GB DDR5 6000MHz", type: "ram", price: 14000, manufacturer: "Corsair", specs: { capacity: "32GB", ramType: "DDR5", powerConsumption: 10 } },
  { id: "r2", name: "G.Skill Ripjaws S5 32GB DDR5 5600MHz", type: "ram", price: 11500, manufacturer: "G.Skill", specs: { capacity: "32GB", ramType: "DDR5", powerConsumption: 8 } },
  // Storage
  { id: "s1", name: "Samsung 990 Pro 2TB NVMe M.2", type: "storage", price: 20000, manufacturer: "Samsung", specs: { capacity: "2TB", powerConsumption: 7 } },
  { id: "s2", name: "Crucial P3 Plus 1TB PCIe 4.0 M.2", type: "storage", price: 8100, manufacturer: "Crucial", specs: { capacity: "1TB", powerConsumption: 5 } },
  // Power Supplies (PSUs)
  { id: "p1", name: "Corsair RM850x 850W Gold Fully Modular", type: "psu", price: 15000, manufacturer: "Corsair", specs: { capacity: "850W", powerConsumption: 0 } },
  { id: "p2", name: "EVGA SuperNOVA 1000G GT 1000W Gold", type: "psu", price: 18500, manufacturer: "EVGA", specs: { capacity: "1000W", powerConsumption: 0 } },
  // Coolers
  { id: "cl1", name: "NZXT Kraken Elite 360 RGB AIO Liquid", type: "cooler", price: 26000, manufacturer: "NZXT", specs: { powerConsumption: 15 } },
  { id: "cl2", name: "Noctua NH-D15 Dual-Tower Air Cooler", type: "cooler", price: 13000, manufacturer: "Noctua", specs: { powerConsumption: 8 } },
  // Cases
  { id: "cs1", name: "Lian Li O11 Dynamic EVO Mid-Tower", type: "case", price: 19000, manufacturer: "Lian Li", specs: { formFactor: "ATX", powerConsumption: 0 } },
  { id: "cs2", name: "Corsair 4000D Airflow Mid-Tower", type: "case", price: 11000, manufacturer: "Corsair", specs: { formFactor: "ATX", powerConsumption: 0 } }
];

const orders: any[] = [
  {
    id: "AN-1002",
    customerName: "Imtiaz Ahmed",
    customerEmail: "imtiaz@dhakatech.com",
    deviceType: "Custom High-End Simulation PC",
    issueDescription: "Assembly & Precision Cable Management",
    serviceType: "custom_build",
    scheduledDate: "2026-06-25",
    status: "in_repair",
    price: 220000,
    notes: "Requires custom professional wiring. Delivery to Dhanmondi, Dhaka. bKash payment confirmed.",
    createdAt: new Date().toISOString()
  },
  {
    id: "AN-1001",
    customerName: "Sadia Rahman",
    customerEmail: "sadia@creativebd.org",
    deviceType: "AN Studio Elite (Bangla Creator)",
    issueDescription: "Complete Dust Removal & High-Grade Liquid Metal Repasting",
    serviceType: "hardware",
    scheduledDate: "2026-06-24",
    status: "diagnosing",
    price: 5000,
    notes: "High priority freelance video workstation.",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const slas: any[] = [
  {
    id: "SLA-901",
    companyName: "Bengal Financials Ltd.",
    contactEmail: "it@bengalfinancials.com",
    tier: "platinum",
    deviceCount: 45,
    requirements: "24/7 hypervisor backup monitoring. 2-hour emergency technician on-site response in Motijheel Commercial Area, Dhaka.",
    status: "active",
    monthlyCost: 150000,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Lazy Gemini API Initializer to prevent startup crash on empty key
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not defined or is placeholder.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API Endpoints
app.get("/api/products", (req, res) => {
  res.json({ products, components });
});

app.get("/api/orders", (req, res) => {
  res.json({ orders, slas });
});

app.post("/api/orders/custom", (req, res) => {
  const { customerName, customerEmail, build } = req.body;
  if (!customerName || !customerEmail || !build) {
    return res.status(400).json({ error: "Missing required booking details." });
  }
  const newOrder = {
    id: `AN-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    customerEmail,
    deviceType: "Custom Built PC (Bangladesh)",
    issueDescription: `Custom PC Builder Assembly. Spec summary: CPU: ${build.components.cpu?.name || 'N/A'}, GPU: ${build.components.gpu?.name || 'N/A'}.`,
    serviceType: "custom_build",
    scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days lead time
    status: "pending",
    price: build.totalPrice + 15000, // Parts + 15,000 BDT Assembly Fee
    notes: "Specs validated by AN Labs Dhaka. Professional assembly scheduled.",
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);
  res.status(201).json({ message: "Custom build order booked successfully!", order: newOrder });
});

app.post("/api/orders/repair", (req, res) => {
  const { customerName, customerEmail, deviceType, issueDescription, serviceType, scheduledDate } = req.body;
  if (!customerName || !customerEmail || !deviceType || !issueDescription || !serviceType || !scheduledDate) {
    return res.status(400).json({ error: "Missing required repair fields." });
  }
  const pricingMap: Record<string, number> = {
    diagnostic: 2500,
    hardware: 5000,
    software: 3500,
    cleanup: 2000
  };
  const newOrder = {
    id: `AN-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    customerEmail,
    deviceType,
    issueDescription,
    serviceType,
    scheduledDate,
    status: "pending",
    price: pricingMap[serviceType] || 3500,
    notes: "Direct booking portal ticket. Service location: AN Labs Dhaka.",
    createdAt: new Date().toISOString()
  };
  orders.unshift(newOrder);
  res.status(201).json({ message: "Repair booked successfully!", order: newOrder });
});

app.post("/api/orders/sla", (req, res) => {
  const { companyName, contactEmail, tier, deviceCount, requirements } = req.body;
  if (!companyName || !contactEmail || !tier || !deviceCount) {
    return res.status(400).json({ error: "Missing corporate SLA parameters." });
  }
  const baseCostMap: Record<string, number> = {
    silver: 30000,
    gold: 75000,
    platinum: 150000
  };
  const monthlyCost = (baseCostMap[tier] || 50000) + (deviceCount * 1500);
  const newSLA = {
    id: `SLA-${Math.floor(100 + Math.random() * 900)}`,
    companyName,
    contactEmail,
    tier,
    deviceCount,
    requirements,
    status: "pending_review",
    monthlyCost,
    createdAt: new Date().toISOString()
  };
  slas.unshift(newSLA);
  res.status(201).json({ message: "SLA inquiry registered successfully!", sla: newSLA });
});

app.post("/api/recommend", async (req, res) => {
  const { chatHistory, currentBuild } = req.body;
  
  // Format current build for prompt context
  let buildContextText = "User has not selected any custom components yet.";
  if (currentBuild && currentBuild.components) {
    const comps = currentBuild.components;
    buildContextText = `User is currently building a PC with:
- CPU: ${comps.cpu ? `${comps.cpu.name} (Socket: ${comps.cpu.specs.socket}, Power: ${comps.cpu.specs.powerConsumption}W)` : "Not selected"}
- GPU: ${comps.gpu ? `${comps.gpu.name} (Power: ${comps.gpu.specs.powerConsumption}W)` : "Not selected"}
- Motherboard: ${comps.motherboard ? `${comps.motherboard.name} (Socket: ${comps.motherboard.specs.socket}, Memory: ${comps.motherboard.specs.ramType})` : "Not selected"}
- RAM: ${comps.ram ? `${comps.ram.name} (Type: ${comps.ram.specs.ramType}, Size: ${comps.ram.specs.capacity})` : "Not selected"}
- Power Supply: ${comps.psu ? `${comps.psu.name} (Capacity: ${comps.psu.specs.capacity})` : "Not selected"}
- Cooler: ${comps.cooler ? `${comps.cooler.name}` : "Not selected"}
- Case: ${comps.case ? `${comps.case.name}` : "Not selected"}
Estimated build price: ৳${currentBuild.totalPrice.toLocaleString()} BDT
Estimated power draw: ${currentBuild.totalWattage}W`;
  }

  const lastUserMessage = chatHistory && chatHistory.length > 0 
    ? chatHistory[chatHistory.length - 1].text 
    : "Hello, I need custom PC recommendation help.";

  try {
    const ai = getGeminiClient();
    const systemInstruction = `You are the Lead Hardware Engineer and System Architect at AN Computers Limited in Dhaka, Bangladesh.
You are helping a customer configure a high-performance computer or troubleshoot computer hardware issues under Bangladeshi environmental and power conditions.
Your tone must be highly professional, structured, technically precise, and customer-focused.
If talking about PC building, pay extremely close attention to component compatibility (e.g., AM5 CPUs need AM5 motherboards, Intel Core i9-14900K is LGA1700, DDR5 motherboards need DDR5 memory modules, and the power supply wattage must comfortably exceed the sum of GPU, CPU, and other component power draw plus 20% overhead).

Where relevant, mention local environmental factors like high summer heat/humidity (cooling optimization), dust filters, pure sine-wave UPS requirements for load shedding, and quote prices in Bangladeshi Taka (৳ BDT). Use Markdown layout, direct headers, and scannable bullet points in your response. Highlight potential bottlenecks, custom cooling specs, and optimized options. Keep responses concise (around 150-250 words) and directly actionable. Avoid fluff.`;

    const chatMessages = chatHistory.map((m: any) => ({
      role: m.sender === "user" ? "user" as const : "model" as const,
      parts: [{ text: m.text }]
    }));

    // Insert system & build context as an initial guide
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: `CONTEXT INFORMATION:\n${buildContextText}\n\nUSER MESSAGE: ${lastUserMessage}` }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.warn("Gemini client fallback mode triggered:", error.message);
    
    // Fallback response generator if Gemini key is missing
    let fallbackText = `### AN Computers AI Assistant (Diagnostic Offline Fallback)

We are currently running in **High-Reliability offline diagnostic mode**. Based on your query:

1. **Custom PC Compatibility**: Ensure that your Processor socket matches the Motherboard socket exactly (AM5 vs. LGA1700). 
2. **Power Supply Safety**: Your PSU capacity (e.g. 850W) should be at least 150W higher than your total estimated GPU & CPU combined wattage.
3. **Memory Sizing**: We highly recommend DDR5-6000 memory for AMD Ryzen 7000/9000 systems to maximize productivity speeds.

*To activate full conversational neural recommendations, please supply a valid \`GEMINI_API_KEY\` in your AI Studio secrets dashboard.*`;

    if (lastUserMessage.toLowerCase().includes("gaming")) {
      fallbackText = `### Premium Gaming Rig Optimization Guide (Offline Mode)
      
Recommended specs for a pristine 4K AAA gaming experience:
- **Processor**: AMD Ryzen 7 7800X3D (Enables lowest gaming frame latencies)
- **Graphics Card**: NVIDIA RTX 4070 Ti Super or RTX 4080 Super (For DLSS 3 Frame Generation)
- **Cooling**: A high-efficiency AIO 360mm Liquid Cooler to manage boost thermals
- **PSU**: At least an 850W 80-Gold Certified modular supply.

*Please feel free to use the Custom PC Builder tab to add these options and submit your reservation directly.*`;
    } else if (lastUserMessage.toLowerCase().includes("workstation") || lastUserMessage.toLowerCase().includes("render")) {
      fallbackText = `### Professional Creative & Multi-Threaded Workstation Spec Sheet
      
Optimized for multi-threaded compilation, video production, and high-load simulations:
- **CPU**: AMD Threadripper PRO 7965WX or Intel Core i9-14900K (Max cores)
- **GPU**: NVIDIA RTX 4080 / 4090 with plenty of VRAM for CUDA processing
- **RAM**: 64GB or 128GB of dual-channel system memory (ECC optional for mission-critical reliability)
- **Storage**: Blazing-fast NVMe PCIe Gen 4.0 SSD arrays in RAID-0 configuration.

*Use our custom builder menu to configure these parts, or explore pre-builts in our catalog.*`;
    }

    res.json({ text: fallbackText });
  }
});

// Configure Vite or production static server middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up production static file hosting...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AN Computers Enterprise Server running on port ${PORT}`);
  });
}

startServer();
