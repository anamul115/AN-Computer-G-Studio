import React, { useState } from "react";
import { 
  Building2, 
  Package, 
  ArrowLeftRight, 
  FileText, 
  Receipt, 
  ShoppingCart, 
  Users, 
  Contact,
  TrendingUp, 
  Wallet, 
  Layers, 
  Calculator, 
  BookOpen, 
  FileSpreadsheet, 
  Printer, 
  Barcode, 
  FolderOpen, 
  UserCheck, 
  ShieldAlert, 
  Settings as SettingsIcon,
  Plus, 
  Search, 
  Trash2, 
  Download, 
  Check, 
  ExternalLink, 
  TrendingDown, 
  Mail, 
  Eye, 
  Globe, 
  Bell, 
  Palette,
  FileCode
} from "lucide-react";
import { Product } from "../types";

interface ERPManagementProps {
  products: Product[];
  onAddProduct?: (p: Product) => void;
}

export default function ERPManagement({ products }: ERPManagementProps) {
  // Navigation State
  const [activeSubTab, setActiveSubTab] = useState<string>("inventory");

  // Local Data State (Prepopulated with realistic Dhaka computer market data)
  const [erpProducts, setErpProducts] = useState<Product[]>(() => [
    ...products,
    {
      id: "prod-additional-1",
      name: "Intel Core i7-14700K Desktop Processor",
      category: "workstation",
      description: "Intel 14th Gen LGA1700 processor, high thermal output, requiring customized tuning.",
      price: 48500,
      buyingPrice: 41000,
      image: "https://images.unsplash.com/photo-1591447012918-2bc375f75f12?auto=format&fit=crop&q=80&w=300",
      stock: 22,
      brand: "Intel"
    },
    {
      id: "prod-additional-2",
      name: "ASUS TUF Gaming GeForce RTX 4070 Ti SUPER",
      category: "gaming",
      description: "Dual axial-tech fans, high-durability military grade capacitors.",
      price: 112000,
      buyingPrice: 96000,
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=300",
      stock: 9,
      brand: "ASUS"
    }
  ]);

  // Transfers state
  const [transfers, setTransfers] = useState([
    { id: "TR-001", item: "NVIDIA RTX 6000 Ada", from: "Elephant Road Branch", to: "Dhaka Main Lab", qty: 2, status: "Completed", date: "2026-06-20" },
    { id: "TR-002", item: "Ryzen Threadripper 7975WX", from: "IDB Bhaban Branch", to: "Dhaka Main Lab", qty: 1, status: "In Transit", date: "2026-06-23" },
    { id: "TR-003", item: "ThinkPad X1 Carbon Gen 8", from: "Dhaka Main Lab", to: "Chittagong Outlet", qty: 3, status: "Completed", date: "2026-06-18" }
  ]);

  // Invoices state
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-089", customer: "Chowdhury & Sons Ltd", date: "2026-06-22", total: 580000, status: "Paid", items: "Enterprise AI Workstation x1" },
    { id: "INV-2026-090", customer: "Freelance Studio Dhaka", date: "2026-06-23", total: 295000, status: "Partial", items: "Developer High-Spec System x1" },
    { id: "INV-2026-091", customer: "Dr. Kamal Ahmed (DU)", date: "2026-06-24", total: 65000, status: "Draft", items: "Pre-Owned Core i7 Gaming PC x1" }
  ]);

  // Estimates state
  const [estimates, setEstimates] = useState([
    { id: "EST-9901", customer: "Standard Chartered Dhaka HQ", date: "2026-06-24", validUntil: "2026-07-24", amount: 1530000, status: "Sent" },
    { id: "EST-9902", customer: "Pathao Tech Team", date: "2026-06-23", validUntil: "2026-07-23", amount: 2250000, status: "Accepted" }
  ]);

  // Purchase Orders state
  const [purchaseOrders, setPurchaseOrders] = useState([
    { id: "PO-7708", vendor: "UCC Corporation Bangladesh", date: "2026-06-21", total: 450000, status: "Approved" },
    { id: "PO-7709", vendor: "Global Brand Pvt Ltd", date: "2026-06-23", total: 1200000, status: "Pending" }
  ]);

  // Customers state
  const [customers, setCustomers] = useState([
    { id: "CST-01", name: "Chowdhury & Sons Ltd", email: "info@chowdhury.com.bd", phone: "+880-1711-223344", address: "Gulshan-2, Dhaka" },
    { id: "CST-02", name: "Freelance Studio Dhaka", email: "workshops@gmail.com", phone: "+880-1912-887766", address: "Dhanmondi, Dhaka" },
    { id: "CST-03", name: "Pathao Tech Team", email: "sysops@pathao.com", phone: "+880-1811-998822", address: "Banani, Dhaka" }
  ]);

  // Vendors state
  const [vendors, setVendors] = useState([
    { id: "VND-01", name: "UCC Corporation Bangladesh", contact: "Tanveer Rahman", phone: "+880-1712-445566", category: "Processors & Boards" },
    { id: "VND-02", name: "Global Brand Pvt Ltd", contact: "Asif Chowdhury", phone: "+880-1811-332211", category: "ASUS & Lenovo Stocks" },
    { id: "VND-03", name: "Smart Technologies BD Ltd", contact: "Zahirul Islam", phone: "+880-1911-558877", category: "Storage & Servers" }
  ]);

  // Accounting Ledger State
  const [chartOfAccounts, setChartOfAccounts] = useState([
    { code: "1010", name: "Cash in Hand (Dhaka Lab Vault)", type: "Asset", balance: 450000 },
    { code: "1020", name: "Dutch-Bangla Bank Corporate A/C", type: "Asset", balance: 3580000 },
    { code: "1200", name: "Inventory Stock Ledger", type: "Asset", balance: 4890000 },
    { code: "2010", name: "Accounts Payable (UCC BD)", type: "Liability", balance: 1200000 },
    { code: "3010", name: "Paid-up Share Capital", type: "Equity", balance: 5000000 },
    { code: "4010", name: "Sales Revenue (Hardware Systems)", type: "Revenue", balance: 2850000 },
    { code: "5010", name: "Cost of Goods Sold (COGS)", type: "Expense", balance: 1950000 },
    { code: "5020", name: "Lab Power & Aircon Utilities", type: "Expense", balance: 80000 }
  ]);

  const [journalEntries, setJournalEntries] = useState([
    { id: "JE-01", date: "2026-06-20", ref: "Sale of Enterprise AI Unit", debitAcc: "1020", creditAcc: "4010", amount: 580000 },
    { id: "JE-02", date: "2026-06-22", ref: "Procurement of Intel Batch-A", debitAcc: "1200", creditAcc: "2010", amount: 450000 },
    { id: "JE-03", date: "2026-06-23", ref: "Elec Utility Bill Dhaka Lab", debitAcc: "5020", creditAcc: "1010", amount: 35000 }
  ]);

  // Unclassified Trans
  const [unclassifiedSales, setUnclassifiedSales] = useState([
    { id: "US-99", date: "2026-06-24", desc: "BKash direct retail deposit reference #99831", amount: 45000, possibleMatch: "Repair diagnostic booking" },
    { id: "US-100", date: "2026-06-24", desc: "Cash counter deposit - Client overpaid custom builder tips", amount: 3000, possibleMatch: "Lab tip box allocation" }
  ]);

  const [unclassifiedPurchases, setUnclassifiedPurchases] = useState([
    { id: "UP-88", date: "2026-06-23", desc: "Multiplan Center Petty Cash Purchase of custom zip ties", amount: 1200, possibleMatch: "Consumable lab expense" },
    { id: "UP-89", date: "2026-06-24", desc: "Elephant Road local hardware courier fee", amount: 800, possibleMatch: "Shipping transport cost" }
  ]);

  // Template custom values
  const [selectedInvoiceTemplate, setSelectedInvoiceTemplate] = useState<"modern" | "classic" | "thermal">("modern");
  const [selectedBarcodeItem, setSelectedBarcodeItem] = useState<string>("prod-additional-1");
  const [barcodeQty, setBarcodeQty] = useState<number>(10);

  // Users state
  const [users, setUsers] = useState([
    { id: "USR-01", name: "Niaz Ahmed", email: "niaz.ahmed@ancomputers.com.bd", role: "Super Administrator", permissions: "Full Read/Write Access" },
    { id: "USR-02", name: "Ariful Islam", email: "arif.acc@ancomputers.com.bd", role: "Chief Accountant", permissions: "Financial Ledger & Taxes" },
    { id: "USR-03", name: "Sumaiya Khan", email: "sumaiya.ops@ancomputers.com.bd", role: "Procurement & Merchandising", permissions: "Inventory & Vendors" },
    { id: "USR-04", name: "Sajid Hasan", email: "sajid.lab@ancomputers.com.bd", role: "Lead Lab Technician", permissions: "Repairs & Benchmarking" }
  ]);

  // File manager
  const [files, setFiles] = useState([
    { name: "SLA_Chowdhury_Sons_Signed.pdf", size: "2.4 MB", date: "2026-06-22", category: "Contracts" },
    { name: "ASUS_Distributor_Invoice_June.pdf", size: "4.1 MB", date: "2026-06-19", category: "Purchase Invoices" },
    { name: "Dhaka_Lab_ISO_9001_Accreditation.pdf", size: "1.8 MB", date: "2026-05-15", category: "Audit & Compliance" }
  ]);

  // Settings State Group
  const [erpSettings, setErpSettings] = useState({
    generalName: "AN Computers Limited HQ",
    appearanceTheme: "Modern Slate Dark",
    mailServer: "smtp.mailgun.org",
    currencySymbol: "৳ BDT",
    contactEmail: "corporate@ancomputers.com.bd",
    socialWhatsApp: "+8801700000000",
    seoDescription: "High Performance Workstation Architectures in Bangladesh",
    notifSystemEmail: true
  });

  // Inputs for adding new item transfers
  const [newTransferItem, setNewTransferItem] = useState("");
  const [newTransferFrom, setNewTransferFrom] = useState("Elephant Road Branch");
  const [newTransferTo, setNewTransferTo] = useState("Dhaka Main Lab");
  const [newTransferQty, setNewTransferQty] = useState(1);

  // Inputs for adding custom invoice
  const [newInvCustomer, setNewInvCustomer] = useState("");
  const [newInvTotal, setNewInvTotal] = useState(50000);
  const [newInvItems, setNewInvItems] = useState("");

  // Adding product state
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState(50000);
  const [newProdBuyingPrice, setNewProdBuyingPrice] = useState(40000);
  const [newProdCategory, setNewProdCategory] = useState("workstation");
  const [newProdBrand, setNewProdBrand] = useState("AN Labs");
  const [newProdStock, setNewProdStock] = useState(5);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;
    const added: Product = {
      id: "prod-user-" + Date.now(),
      name: newProdName,
      price: newProdPrice,
      buyingPrice: newProdBuyingPrice,
      category: newProdCategory,
      description: `Custom registered ${newProdBrand} computational hardware added via ERP Inventory Management.`,
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=300",
      stock: newProdStock,
      brand: newProdBrand,
      specs: { "Origin": "ERP Registered Vendor stock" }
    };
    setErpProducts([added, ...erpProducts]);
    // Reset fields
    setNewProdName("");
  };

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransferItem) return;
    const added = {
      id: "TR-" + (transfers.length + 101),
      item: newTransferItem,
      from: newTransferFrom,
      to: newTransferTo,
      qty: newTransferQty,
      status: "In Transit",
      date: new Date().toISOString().split('T')[0]
    };
    setTransfers([added, ...transfers]);
    setNewTransferItem("");
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvCustomer) return;
    const added = {
      id: `INV-2026-0${invoices.length + 90}`,
      customer: newInvCustomer,
      date: new Date().toISOString().split('T')[0],
      total: Number(newInvTotal),
      status: "Draft",
      items: newInvItems || "Custom Hardware Assembly Bundle"
    };
    setInvoices([added, ...invoices]);
    setNewInvCustomer("");
    setNewInvTotal(50000);
    setNewInvItems("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-xs my-8" id="erp-accounting-suite">
      
      {/* Upper header */}
      <div className="border-b border-zinc-200 pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-zinc-950 text-white rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-zinc-950 tracking-tight">Enterprise ERP & Accounting Ledger</h1>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                  Connected
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Unified corporate ledger, supply chain operations, barcode generator, multiplan compliance, and tax tools.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-zinc-200 font-mono text-[10px] text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM BASE RATE: ৳ BDT (ISO Bangladesh Standard)</span>
          </div>
        </div>
      </div>

      {/* Main ERP Layout - Sidebar + Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Navigation (ERP Map Categorization) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Group 1: Inventory & Merchandising */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-950 text-white px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" />
              <span>Supply Chain & Warehouse</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "inventory", label: "Product Inventory", icon: Package },
                { id: "transfers", label: "Item Transfers", icon: ArrowLeftRight },
                { id: "pos", label: "Purchase Orders", icon: ShoppingCart },
                { id: "vendors", label: "Vendors & Suppliers", icon: Contact },
                { id: "customers", label: "Customers CRM", icon: Users }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Invoicing & Sales */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Receipt className="h-3.5 w-3.5" />
              <span>Invoicing & Estimates</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "invoices", label: "Invoices Console", icon: Receipt },
                { id: "estimates", label: "Estimates Desk", icon: FileText }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Financial Accounting */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5" />
              <span>General Accounting</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "chart_accounts", label: "Chart of Accounts", icon: Layers },
                { id: "journal_entries", label: "Journal Entries", icon: BookOpen },
                { id: "sales_unclassified", label: "Sales Unclassified", icon: TrendingUp },
                { id: "purchases_unclassified", label: "Purchase Unclassified", icon: TrendingDown },
                { id: "general_ledger", label: "General Ledger", icon: Calculator }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 4: Accounting Reports */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Accounting Reports</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "trial_balance", label: "Trial Balance Sheet", icon: FileSpreadsheet },
                { id: "balance_sheet", label: "Balance Sheet snapshot", icon: FileSpreadsheet },
                { id: "income_statement", label: "Income Statement (P&L)", icon: FileSpreadsheet },
                { id: "cash_flow", label: "Cash Flow Statement", icon: FileSpreadsheet }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 5: Tools & Templates */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Printer className="h-3.5 w-3.5" />
              <span>Design Templates & Files</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "file_manager", label: "Corporate File Manager", icon: FolderOpen },
                { id: "barcode_template", label: "Barcode Generator", icon: Barcode },
                { id: "invoice_template", label: "Invoice Template config", icon: Printer },
                { id: "estimate_template", label: "Estimate Template designer", icon: FileCode }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 6: Users & Access Control */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Users & Permissions</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "users", label: "Staff & Users List", icon: Users },
                { id: "roles", label: "All Employee Roles", icon: UserCheck },
                { id: "permissions", label: "Permissions Access Matrix", icon: ShieldAlert }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 7: Global Settings */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
            <div className="bg-zinc-900 text-zinc-100 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <SettingsIcon className="h-3.5 w-3.5" />
              <span>Corporate Settings</span>
            </div>
            <div className="p-1.5 space-y-1">
              {[
                { id: "settings", label: "Global Settings Panel", icon: SettingsIcon }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = activeSubTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSubTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors text-left ${
                      isSelected 
                        ? "bg-zinc-100 text-zinc-950" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Content Console (Modules Rendering) */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-zinc-200 p-6 shadow-xs min-h-[500px]">
          
          {/* MODULE 1: PRODUCT INVENTORY */}
          {activeSubTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Merchandise & Product Inventory</h3>
                  <p className="text-xs text-zinc-500">Track acquisition costs vs retail margins of physical stock components.</p>
                </div>
                <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-700">
                  Total Items: {erpProducts.length} components
                </div>
              </div>

              {/* Add Inventory Item Form */}
              <form onSubmit={handleCreateProduct} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Register Stock Item (Local Invoice Intake)</h4>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Product Name</label>
                  <input 
                    type="text" 
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Gigabyte Z790 Motherboard"
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Manufacturer Brand</label>
                  <input 
                    type="text" 
                    value={newProdBrand}
                    onChange={(e) => setNewProdBrand(e.target.value)}
                    placeholder="ASUS, Intel, Custom, etc."
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Category Shelf</label>
                  <select 
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  >
                    <option value="workstation">Workstation</option>
                    <option value="gaming">Gaming</option>
                    <option value="laptop">Laptop</option>
                    <option value="server">Server</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Buying Cost Price (৳)</label>
                  <input 
                    type="number" 
                    value={newProdBuyingPrice}
                    onChange={(e) => setNewProdBuyingPrice(Number(e.target.value))}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Selling Retail Price (৳)</label>
                  <input 
                    type="number" 
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Opening Stock Qty</label>
                  <input 
                    type="number" 
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="bg-zinc-950 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-zinc-800 transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Intake Stock Item</span>
                  </button>
                </div>
              </form>

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50">
                      <th className="py-2.5 px-3">SKU / Component</th>
                      <th className="py-2.5 px-3">Brand</th>
                      <th className="py-2.5 px-3 text-right">Buying Price</th>
                      <th className="py-2.5 px-3 text-right">Selling Price</th>
                      <th className="py-2.5 px-3 text-center">Stock</th>
                      <th className="py-2.5 px-3 text-right">Potential Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                    {erpProducts.map((p) => {
                      const cost = p.buyingPrice || Math.round(p.price * 0.82);
                      const profitPerUnit = p.price - cost;
                      const totalMargin = profitPerUnit * p.stock;
                      return (
                        <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-bold text-zinc-900 block">{p.name}</span>
                            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{p.category}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {p.brand || "AN Labs"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-zinc-500">৳ {cost.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">৳ {p.price.toLocaleString()}</td>
                          <td className="py-3 px-3 text-center font-mono">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.stock < 5 ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"}`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-amber-700">৳ {totalMargin.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 2: ITEM TRANSFERS */}
          {activeSubTab === "transfers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Inter-Branch Item Transfers</h3>
                  <p className="text-xs text-zinc-500">Log stock redistribution between Elephant Road, IDB Bhaban, and Dhaka Central HQ labs.</p>
                </div>
              </div>

              {/* Create Transfer Request */}
              <form onSubmit={handleCreateTransfer} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-4">
                  <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Dispatch stock Transfer Order</h4>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Item Component Name</label>
                  <input 
                    type="text" 
                    value={newTransferItem}
                    onChange={(e) => setNewTransferItem(e.target.value)}
                    placeholder="e.g. NVIDIA RTX 4090 Dual-Sided"
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">From Location</label>
                  <select 
                    value={newTransferFrom}
                    onChange={(e) => setNewTransferFrom(e.target.value)}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  >
                    <option value="Elephant Road Branch">Elephant Road Branch</option>
                    <option value="IDB Bhaban Branch">IDB Bhaban Branch</option>
                    <option value="Dhaka Main Lab">Dhaka Main Lab</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">To Destination</label>
                  <select 
                    value={newTransferTo}
                    onChange={(e) => setNewTransferTo(e.target.value)}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  >
                    <option value="Dhaka Main Lab">Dhaka Main Lab</option>
                    <option value="Elephant Road Branch">Elephant Road Branch</option>
                    <option value="IDB Bhaban Branch">IDB Bhaban Branch</option>
                    <option value="Chittagong Outlet">Chittagong Outlet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Transfer Qty</label>
                  <input 
                    type="number" 
                    value={newTransferQty}
                    onChange={(e) => setNewTransferQty(Number(e.target.value))}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div className="md:col-span-3 flex items-end justify-end">
                  <button type="submit" className="bg-zinc-950 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    Dispatch Transfer Waybill
                  </button>
                </div>
              </form>

              {/* Transfers Ledger */}
              <div className="space-y-3">
                {transfers.map((t) => (
                  <div key={t.id} className="flex justify-between items-center p-3.5 rounded-lg border border-zinc-200 bg-white hover:shadow-xs transition-shadow">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-zinc-900">{t.item}</span>
                        <span className="font-mono text-[9px] text-zinc-400">({t.id})</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                        <span>{t.from}</span>
                        <ArrowLeftRight className="h-3 w-3 text-zinc-400" />
                        <span className="font-semibold text-zinc-800">{t.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-zinc-900">QTY: {t.qty} units</div>
                      <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 mt-1 rounded ${
                        t.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800 animate-pulse"
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 3: PURCHASE ORDERS */}
          {activeSubTab === "pos" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Purchase Orders (PO) Desk</h3>
                  <p className="text-xs text-zinc-500">Draft and approve procurement orders sent to brand distributors (ASUS, UCC, Smart BD).</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50">
                      <th className="py-2 px-3">PO Reference</th>
                      <th className="py-2 px-3">Supplier Vendor</th>
                      <th className="py-2 px-3">PO Date</th>
                      <th className="py-2 px-3 text-right">Est Investment</th>
                      <th className="py-2 px-3 text-center">Authorization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                    {purchaseOrders.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50">
                        <td className="py-3 px-3 font-mono font-bold text-zinc-900">{p.id}</td>
                        <td className="py-3 px-3 font-semibold">{p.vendor}</td>
                        <td className="py-3 px-3 text-zinc-500">{p.date}</td>
                        <td className="py-3 px-3 text-right font-mono font-black text-zinc-900">৳ {p.total.toLocaleString()}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                            p.status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 4: VENDORS */}
          {activeSubTab === "vendors" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Verified Vendors & Distributors</h3>
                <p className="text-xs text-zinc-500">Maintain logistics directory for original equipment importers in Bangladesh.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vendors.map((v) => (
                  <div key={v.id} className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">{v.id}</span>
                    <h4 className="text-sm font-bold text-zinc-900">{v.name}</h4>
                    <div className="text-xs text-zinc-600 space-y-1 font-mono">
                      <div>Contact: <span className="text-zinc-950 font-semibold">{v.contact}</span></div>
                      <div>Phone: <span className="text-zinc-950">{v.phone}</span></div>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-100 px-2 py-1 rounded text-[10px] font-bold text-zinc-500 text-center uppercase tracking-wider">
                      Category: {v.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 5: CUSTOMERS */}
          {activeSubTab === "customers" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Client CRM & Corporate Accounts</h3>
                <p className="text-xs text-zinc-500">Review corporate contacts, email registers, and customer diagnostic targets.</p>
              </div>

              <div className="space-y-3">
                {customers.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-zinc-200 bg-white flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-950">{c.name}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{c.address}</p>
                    </div>
                    <div className="text-left md:text-right text-xs font-mono text-zinc-600">
                      <div>Email: <span className="text-zinc-950 font-bold">{c.email}</span></div>
                      <div>Phone: <span className="text-zinc-950">{c.phone}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 6: INVOICES CONSOLE */}
          {activeSubTab === "invoices" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Invoices & Sales Console</h3>
                  <p className="text-xs text-zinc-500">Track paid BBDT sales, generate dynamic PDF receipts, and verify status.</p>
                </div>
              </div>

              {/* Generate Invoice Form */}
              <form onSubmit={handleCreateInvoice} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Generate Real Invoice (Direct Sales Counter)</h4>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Customer Name</label>
                  <input 
                    type="text" 
                    value={newInvCustomer}
                    onChange={(e) => setNewInvCustomer(e.target.value)}
                    placeholder="e.g. Niaz Ahmed"
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Invoice Items</label>
                  <input 
                    type="text" 
                    value={newInvItems}
                    onChange={(e) => setNewInvItems(e.target.value)}
                    placeholder="e.g. Customized Ryzen 7 Setup"
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase">Invoice Total Price (৳)</label>
                  <input 
                    type="number" 
                    value={newInvTotal}
                    onChange={(e) => setNewInvTotal(Number(e.target.value))}
                    className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="bg-zinc-950 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                    Draft & Save Invoice
                  </button>
                </div>
              </form>

              {/* Invoice List */}
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-4 rounded-xl border border-zinc-200 bg-white flex justify-between items-center hover:border-zinc-300 transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-400">{inv.id}</span>
                        <span className="text-xs font-bold text-zinc-900">{inv.customer}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-1">Items: <span className="text-zinc-700">{inv.items}</span></p>
                      <span className="text-[10px] font-mono text-zinc-400 mt-1 block">Date: {inv.date}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-zinc-950 font-mono">৳ {inv.total.toLocaleString()}</div>
                      <span className={`inline-block px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded mt-1.5 ${
                        inv.status === "Paid" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : inv.status === "Partial" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-zinc-100 text-zinc-600"
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 7: ESTIMATES */}
          {activeSubTab === "estimates" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Corporate Price Estimates (RFPs)</h3>
                <p className="text-xs text-zinc-500">Draft preliminary computational specs before locking real client invoices.</p>
              </div>

              <div className="space-y-3.5">
                {estimates.map((est) => (
                  <div key={est.id} className="p-4 rounded-xl border border-zinc-200 bg-white flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-mono text-zinc-400">{est.id}</span>
                        <h4 className="text-xs font-extrabold text-zinc-900">{est.customer}</h4>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">Valid Until: <span className="font-mono">{est.validUntil}</span></p>
                    </div>
                    <div className="text-right">
                      <span className="block font-mono font-black text-zinc-950 text-sm">৳ {est.amount.toLocaleString()}</span>
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 mt-1">
                        {est.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 8: CHART OF ACCOUNTS */}
          {activeSubTab === "chart_accounts" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Chart of Accounts (Double-Entry Root)</h3>
                <p className="text-xs text-zinc-500">System ledger mapping of Assets, Liabilities, Equity, Revenues, and Operational Expenses.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chartOfAccounts.map((acc) => (
                  <div key={acc.code} className="p-4 rounded-xl border border-zinc-200 bg-white flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 font-bold block">CODE {acc.code}</span>
                      <h4 className="text-xs font-bold text-zinc-900 mt-0.5">{acc.name}</h4>
                      <span className="inline-block mt-2 px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider bg-zinc-100 text-zinc-600 rounded">
                        {acc.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-black text-xs text-zinc-950 block">৳ {acc.balance.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 9: JOURNAL ENTRIES */}
          {activeSubTab === "journal_entries" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">General Journal Entries Ledger</h3>
                <p className="text-xs text-zinc-500">Verify double-entry records mapped across accounts to avoid ledger deviations.</p>
              </div>

              <div className="space-y-3.5">
                {journalEntries.map((je) => (
                  <div key={je.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-200 px-1.5 py-0.5 rounded">{je.id}</span>
                        <span className="text-xs font-bold text-zinc-900">{je.ref}</span>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        Debit Acc: <span className="text-zinc-800 font-bold">{je.debitAcc}</span> | Credit Acc: <span className="text-zinc-800 font-bold">{je.creditAcc}</span>
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="block font-mono font-black text-emerald-700 text-xs">Debit/Credit Match: ৳ {je.amount.toLocaleString()}</span>
                      <span className="text-[9px] text-zinc-400 block font-mono">Date: {je.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 10: SALES UNCLASSIFIED */}
          {activeSubTab === "sales_unclassified" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Unclassified Sales Receipts (Direct Inflow Clearings)</h3>
                <p className="text-xs text-zinc-500">Sales transactions pending matching against official invoices or support slots.</p>
              </div>

              <div className="space-y-3">
                {unclassifiedSales.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/20 flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-100 text-rose-800 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-widest uppercase">Unclassified</span>
                        <span className="text-xs font-bold text-zinc-900">{s.desc}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono">Predicted Allocation: <span className="text-emerald-700 font-bold">{s.possibleMatch}</span></p>
                    </div>
                    <div className="text-left md:text-right font-mono">
                      <span className="text-sm font-black text-rose-700 block">৳ {s.amount.toLocaleString()}</span>
                      <span className="text-[9px] text-zinc-400">{s.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 11: PURCHASE UNCLASSIFIED */}
          {activeSubTab === "purchases_unclassified" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Unclassified Purchase Outflows</h3>
                <p className="text-xs text-zinc-500">Outflow payments to local Multiplan courier runners awaiting receipt uploads.</p>
              </div>

              <div className="space-y-3">
                {unclassifiedPurchases.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-zinc-200 text-zinc-700 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-widest uppercase">Pending Receipt</span>
                        <span className="text-xs font-bold text-zinc-900">{p.desc}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono">Possible Expense category: <span className="text-zinc-800 font-bold">{p.possibleMatch}</span></p>
                    </div>
                    <div className="text-left md:text-right font-mono">
                      <span className="text-sm font-black text-zinc-800 block">৳ {p.amount.toLocaleString()}</span>
                      <span className="text-[9px] text-zinc-400">{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 12: GENERAL LEDGER */}
          {activeSubTab === "general_ledger" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Audit General Ledger (All Chronological Postings)</h3>
                <p className="text-xs text-zinc-500">Unified audit trail reporting all double-entry debit/credit matches.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Reference / Transaction</th>
                      <th className="py-2.5 px-3 text-right">Debit Amt (৳)</th>
                      <th className="py-2.5 px-3 text-right">Credit Amt (৳)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-3 text-zinc-500 font-mono">2026-06-24</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-zinc-900 block">Elec Utility Bill Dhaka Lab</span>
                        <span className="text-[9px] text-zinc-400">Account: Lab Power & Utilities (5020)</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-zinc-900">৳ 35,000</td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-400">-</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-3 text-zinc-500 font-mono">2026-06-22</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-zinc-900 block">Procurement of Intel Batch-A</span>
                        <span className="text-[9px] text-zinc-400">Account: Accounts Payable UCC (2010)</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-400">-</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-zinc-900">৳ 450,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-3 text-zinc-500 font-mono">2026-06-20</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-zinc-900 block">Sale of Enterprise AI Unit</span>
                        <span className="text-[9px] text-zinc-400">Account: DBBL Corporate Bank A/C (1020)</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-zinc-900">৳ 580,000</td>
                      <td className="py-3 px-3 text-right font-mono text-zinc-400">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 13: TRIAL BALANCE */}
          {activeSubTab === "trial_balance" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Trial Balance Verification Sheet</h3>
                <p className="text-xs text-zinc-500">Calculates overall trial balances to ensure perfect double entry compliance.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50">
                      <th className="py-2.5 px-3">Ledger Code</th>
                      <th className="py-2.5 px-3">Account Name</th>
                      <th className="py-2.5 px-3 text-right">Debit Balance</th>
                      <th className="py-2.5 px-3 text-right">Credit Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700 font-mono">
                    <tr>
                      <td className="py-2.5 px-3">1010</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Cash in Hand</td>
                      <td className="py-2.5 px-3 text-right">৳ 450,000</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">1020</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Dutch-Bangla Bank Corporate A/C</td>
                      <td className="py-2.5 px-3 text-right">৳ 3,580,000</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">1200</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Inventory Stock Ledger</td>
                      <td className="py-2.5 px-3 text-right">৳ 4,890,000</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">2010</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Accounts Payable</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                      <td className="py-2.5 px-3 text-right font-bold text-zinc-900">৳ 1,200,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">3010</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Share Capital</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                      <td className="py-2.5 px-3 text-right font-bold text-zinc-900">৳ 5,000,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">4010</td>
                      <td className="py-2.5 px-3 text-zinc-900 font-semibold">Sales Revenue</td>
                      <td className="py-2.5 px-3 text-right text-zinc-300">-</td>
                      <td className="py-2.5 px-3 text-right font-bold text-zinc-900">৳ 2,850,000</td>
                    </tr>
                    <tr className="border-t-2 border-double border-zinc-900 font-black text-zinc-950">
                      <td className="py-3 px-3" colSpan={2}>VERIFIED GRAND TOTALS</td>
                      <td className="py-3 px-3 text-right">৳ 8,920,000</td>
                      <td className="py-3 px-3 text-right">৳ 8,920,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 14: BALANCE SHEET */}
          {activeSubTab === "balance_sheet" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Audit Balance Sheet Snapshot</h3>
                <p className="text-xs text-zinc-500">Corporate assets must match total liability and equity ratios perfectly.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
                {/* Left: Assets */}
                <div className="space-y-4">
                  <h4 className="font-bold text-zinc-900 border-b border-zinc-200 pb-2 text-xs uppercase tracking-wider">Total Corporate Assets</h4>
                  <div className="flex justify-between py-1">
                    <span>Cash & Bank Balances:</span>
                    <span className="font-bold">৳ 4,030,000</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Physical Inventory Ledger:</span>
                    <span className="font-bold">৳ 4,890,000</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-900 pt-2 font-black text-sm text-emerald-800">
                    <span>SUM TOTAL ASSETS:</span>
                    <span>৳ 8,920,000</span>
                  </div>
                </div>

                {/* Right: Liabilities & Equity */}
                <div className="space-y-4">
                  <h4 className="font-bold text-zinc-900 border-b border-zinc-200 pb-2 text-xs uppercase tracking-wider">Equity & Liabilities</h4>
                  <div className="flex justify-between py-1">
                    <span>Accounts Payable UCC:</span>
                    <span className="font-bold">৳ 1,200,000</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Owner Capital Stock:</span>
                    <span className="font-bold">৳ 5,000,000</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Retained Lab Reserves:</span>
                    <span className="font-bold">৳ 2,720,000</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-900 pt-2 font-black text-sm text-zinc-950">
                    <span>SUM EQUITIES & LIAB:</span>
                    <span>৳ 8,920,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 15: INCOME STATEMENT */}
          {activeSubTab === "income_statement" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Profit & Loss (Income Statement)</h3>
                <p className="text-xs text-zinc-500">Calculates overall gross profit and operational cost margins in Bangladesh.</p>
              </div>

              <div className="p-5 rounded-xl border border-zinc-200 space-y-4 font-mono text-xs max-w-xl bg-zinc-50">
                <div className="flex justify-between text-zinc-600">
                  <span>Gross Sales Revenue (A):</span>
                  <span className="font-bold text-zinc-900">৳ 2,850,000</span>
                </div>
                <div className="flex justify-between text-zinc-600 border-b border-zinc-200 pb-2">
                  <span>Cost of Goods Sold (COGS) (B):</span>
                  <span className="font-bold text-zinc-900">৳ (1,950,000)</span>
                </div>
                <div className="flex justify-between font-black text-zinc-900">
                  <span>GROSS PROFIT MARGIN (A - B):</span>
                  <span className="text-emerald-700">৳ 900,000</span>
                </div>
                
                <div className="pt-4 border-t border-zinc-300">
                  <div className="flex justify-between text-zinc-600">
                    <span>Lab Power, Aircon & Maintenance:</span>
                    <span className="font-bold">৳ (80,000)</span>
                  </div>
                  <div className="flex justify-between text-zinc-600 border-b border-zinc-200 pb-2">
                    <span>Multiplan courier transport costs:</span>
                    <span className="font-bold">৳ (12,000)</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-sm text-zinc-950 border-t-2 border-double border-zinc-900 pt-2 bg-white px-3 py-1.5 rounded border">
                  <span>NET CORPORATE INCOME:</span>
                  <span className="text-emerald-800">৳ 808,000</span>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 16: CASH FLOW STATEMENT */}
          {activeSubTab === "cash_flow" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Cash Flow Statement Ledger</h3>
                <p className="text-xs text-zinc-500">Direct cash deposits, bank clearings, and vendor transfers tracked dynamically.</p>
              </div>

              <div className="space-y-4 font-mono text-xs max-w-xl">
                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
                  <h4 className="font-bold text-zinc-800 text-[10px] uppercase">1. Operating cash flows</h4>
                  <div className="flex justify-between text-zinc-600">
                    <span>Cash collected from computer buyers:</span>
                    <span className="text-emerald-700 font-bold">৳ +2,400,000</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Cash paid to logistics courier runners:</span>
                    <span className="text-rose-700 font-bold">৳ -32,000</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
                  <h4 className="font-bold text-zinc-800 text-[10px] uppercase">2. Investing cash flows</h4>
                  <div className="flex justify-between text-zinc-600">
                    <span>Purchased pristine lab diagnostic rigs:</span>
                    <span className="text-rose-700 font-bold">৳ -120,000</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
                  <h4 className="font-bold text-zinc-800 text-[10px] uppercase">3. Financing Cash flows</h4>
                  <div className="flex justify-between text-zinc-600">
                    <span>Share capital seed injection:</span>
                    <span className="text-emerald-700 font-bold">৳ +5,000,000</span>
                  </div>
                </div>

                <div className="flex justify-between font-black text-sm text-zinc-950 border-t border-zinc-900 pt-3">
                  <span>NET INCREASE IN LIQUID CASH:</span>
                  <span className="text-emerald-800">৳ +7,248,000</span>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 17: FILE MANAGER */}
          {activeSubTab === "file_manager" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Corporate File Manager</h3>
                <p className="text-xs text-zinc-500">Secure cloud repository for custom spec blueprints, signed corporate SLAs, and certificates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {files.map((f, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3 relative group hover:border-zinc-300">
                    <div className="h-10 w-10 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center">
                      <FolderOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 truncate">{f.name}</h4>
                      <p className="text-[10px] text-zinc-400 font-mono mt-1">Size: {f.size} | Date: {f.date}</p>
                    </div>
                    <span className="inline-block bg-zinc-100 text-zinc-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {f.category}
                    </span>
                    <button className="absolute top-2 right-2 p-1.5 rounded-full border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                      <Download className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 18: BARCODE TEMPLATE */}
          {activeSubTab === "barcode_template" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Custom Serial Barcode Label Generator</h3>
                <p className="text-xs text-zinc-500">Configure scannable barcoded labels to paste on client rigs, processors, or custom cases.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Configure Barcode Parameters</h4>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Target Stock Item</label>
                    <select 
                      value={selectedBarcodeItem} 
                      onChange={(e) => setSelectedBarcodeItem(e.target.value)}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    >
                      {erpProducts.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Label Batch Quantity</label>
                    <input 
                      type="number" 
                      value={barcodeQty}
                      onChange={(e) => setBarcodeQty(Number(e.target.value))}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>

                  <button className="w-full bg-zinc-950 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors">
                    <Printer className="h-4 w-4" />
                    <span>Print Batch Sheet (PDF)</span>
                  </button>
                </div>

                {/* Printable Mock Visual */}
                <div className="bg-white border-2 border-dashed border-zinc-300 p-5 rounded-lg flex flex-col items-center justify-center space-y-4">
                  <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase">PREVIEW PRINTABLE LABEL</div>
                  <div className="text-center font-bold text-xs text-zinc-900">
                    {erpProducts.find(p => p.id === selectedBarcodeItem)?.name || "Select item"}
                  </div>
                  
                  {/* Generated Mock Barcode Pattern */}
                  <div className="bg-zinc-950 text-white p-3 font-mono text-[9px] tracking-[4px] font-black uppercase text-center w-full max-w-[200px] border">
                    ||||| | ||| || ||| |
                  </div>
                  
                  <div className="text-[10px] text-zinc-500 font-mono">
                    SERIAL: AN-LABS-{(erpProducts.find(p => p.id === selectedBarcodeItem)?.id || "000").toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 19: INVOICE TEMPLATE */}
          {activeSubTab === "invoice_template" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Invoice Template Customizer</h3>
                <p className="text-xs text-zinc-500">Toggle design style variants exported to corporate clients after custom diagnostic checks.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "modern", name: "Modern Minimalist Slate", desc: "Clean layout styled with deep zinc headers, Inter typography, and light margins." },
                  { id: "classic", name: "Corporate Classic (English)", desc: "Formal layout with legal stamp placeholders, ISO credentials, and detailed spec tables." },
                  { id: "thermal", name: "80mm POS Receipt Thermal", desc: "Compact layout optimized for fast receipt printers used in local branch outlets." }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedInvoiceTemplate(t.id as any)}
                    className={`p-4 rounded-xl border text-left space-y-3 transition-all ${
                      selectedInvoiceTemplate === t.id 
                        ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-950" 
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">{t.id}</span>
                      {selectedInvoiceTemplate === t.id && <Check className="h-4 w-4 text-zinc-950" />}
                    </div>
                    <h4 className="text-xs font-bold text-zinc-900">{t.name}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 20: ESTIMATE TEMPLATE DESIGNER */}
          {activeSubTab === "estimate_template" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Estimate Quote Template Designer</h3>
                <p className="text-xs text-zinc-500">Lock parameters for RFPs. Easily print custom computer build quotes for corporations.</p>
              </div>

              <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 max-w-2xl font-sans text-zinc-800 space-y-6">
                <div className="flex justify-between items-start border-b border-zinc-300 pb-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-zinc-900 uppercase">AN Computers Limited</h4>
                    <p className="text-[10px] text-zinc-500 leading-relaxed">Dhaka Labs Main Branch, Bangladesh. RJSC Registered.</p>
                  </div>
                  <span className="bg-zinc-950 text-white text-[10px] font-mono font-bold px-3 py-1 rounded">
                    ESTIMATE / SPEC-PROPOSAL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                  <div>
                    <span className="block text-zinc-400 uppercase font-bold text-[9px]">QUOTE ISSUED TO:</span>
                    <span className="text-zinc-950 font-bold">Standard Chartered Dhaka HQ</span>
                    <p className="text-zinc-500 mt-1">Gulshan Branch Operations Team</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-zinc-400 uppercase font-bold text-[9px]">ESTIMATE REFERENCE:</span>
                    <span className="text-zinc-950 font-bold">AN-EST-2026-9912</span>
                    <p className="text-zinc-500 mt-1 font-mono text-[9px]">Issued Date: 2026-06-24</p>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-4">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="border-b border-zinc-300 font-bold text-zinc-600">
                        <th className="pb-2">Computational Hardware & Service Items</th>
                        <th className="pb-2 text-right">Qty</th>
                        <th className="pb-2 text-right">Unit Price</th>
                        <th className="pb-2 text-right">Aggregate Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-700">
                      <tr>
                        <td className="py-2">Enterprise Rackmount Machine - 128 Core Epyc Core Server Node</td>
                        <td className="py-2 text-right">1</td>
                        <td className="py-2 text-right">৳ 765,000</td>
                        <td className="py-2 text-right">৳ 765,000</td>
                      </tr>
                      <tr>
                        <td className="py-2">Dual-Rig NVIDIA RTX 6000 AI Engineering Rig</td>
                        <td className="py-2 text-right">1</td>
                        <td className="py-2 text-right">৳ 580,000</td>
                        <td className="py-2 text-right">৳ 580,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-t-2 border-zinc-900 pt-4 flex justify-between items-center font-black text-sm text-zinc-950">
                  <span>ESTIMATED TOTAL CONFIGURATION:</span>
                  <span>৳ 1,345,000</span>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 21: USERS */}
          {activeSubTab === "users" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Authorized Personnel & Users List</h3>
                <p className="text-xs text-zinc-500">Configure access coordinates for employees in Elephant Road & IDB branches.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((u) => (
                  <div key={u.id} className="p-4 rounded-xl border border-zinc-200 bg-white space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-zinc-400 font-mono">{u.id}</span>
                      <span className="bg-zinc-100 text-zinc-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {u.role}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-950">{u.name}</h4>
                    <p className="text-xs text-zinc-500 font-mono">Email: {u.email}</p>
                    <p className="text-[10px] text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded border border-zinc-100 font-mono">
                      Scope: {u.permissions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 22: ROLES */}
          {activeSubTab === "roles" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Corporate Employee Roles Registry</h3>
                <p className="text-xs text-zinc-500">Employee groups authorized to post general ledger journal entries.</p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Super Administrator", desc: "All permissions, full ledger clearance, custom stock additions, and tax auditing rights." },
                  { name: "Chief Accountant", desc: "Full access to general journal, balance sheets, and unclassified clearings maps." },
                  { name: "Procurement & Merchandising", desc: "Configure vendors, dispatch purchase orders (PO), and handle inter-branch item transfers." },
                  { name: "Lead Lab Technician", desc: "Manage repair schedules, configure custom builds, and log diagnostic estimates." }
                ].map((r, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-200 bg-white">
                    <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider">{r.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 23: PERMISSIONS ACCESS MATRIX */}
          {activeSubTab === "permissions" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Permissions Access Control Matrix</h3>
                <p className="text-xs text-zinc-500">Security lock matrix limiting operational features per employee group.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50">
                      <th className="py-2.5 px-3">Operational Scope</th>
                      <th className="py-2.5 px-3 text-center">Super Admin</th>
                      <th className="py-2.5 px-3 text-center">Accountant</th>
                      <th className="py-2.5 px-3 text-center">Operations</th>
                      <th className="py-2.5 px-3 text-center">Lab Tech</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-zinc-900">Post Ledger Journals</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-rose-500">✖ No</td>
                      <td className="text-center text-rose-500">✖ No</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-zinc-900">Modify Vendor Details</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-rose-500">✖ No</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-zinc-900">Generate Invoices</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-zinc-900">Redistribute Branch Stock</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-rose-500">✖ No</td>
                      <td className="text-center text-emerald-600 font-bold">✔ Yes</td>
                      <td className="text-center text-rose-500">✖ No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 24: GLOBAL SETTINGS PANEL */}
          {activeSubTab === "settings" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-bold text-zinc-900">Global Corporate settings</h3>
                <p className="text-xs text-zinc-500">Adjust metadata, branding parameters, contact points, and mail server integration.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* General Settings */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    <span>General & Contact Coordinates</span>
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Registered Company Name</label>
                    <input 
                      type="text" 
                      value={erpSettings.generalName}
                      onChange={(e) => setErpSettings({...erpSettings, generalName: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Support Email (Corporate)</label>
                    <input 
                      type="email" 
                      value={erpSettings.contactEmail}
                      onChange={(e) => setErpSettings({...erpSettings, contactEmail: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                </div>

                {/* Theme & Styling */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="h-4 w-4" />
                    <span>Appearance & Styling</span>
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Active Dashboard Accent</label>
                    <select 
                      value={erpSettings.appearanceTheme} 
                      onChange={(e) => setErpSettings({...erpSettings, appearanceTheme: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    >
                      <option value="Modern Slate Dark">Modern Slate Dark</option>
                      <option value="Light Minimal Zinc">Light Minimal Zinc</option>
                      <option value="Dhaka Green Accent">Dhaka Green Accent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Base Currency Symbol</label>
                    <input 
                      type="text" 
                      value={erpSettings.currencySymbol}
                      onChange={(e) => setErpSettings({...erpSettings, currencySymbol: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                </div>

                {/* Mail Settings */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    <span>Mail Gateway Config</span>
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">SMTP Outgoing Server</label>
                    <input 
                      type="text" 
                      value={erpSettings.mailServer}
                      onChange={(e) => setErpSettings({...erpSettings, mailServer: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                </div>

                {/* Social & SEO */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    <span>Social Media & SEO Metadata</span>
                  </h4>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">WhatsApp Helpdesk URL</label>
                    <input 
                      type="text" 
                      value={erpSettings.socialWhatsApp}
                      onChange={(e) => setErpSettings({...erpSettings, socialWhatsApp: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Global Search SEO Description</label>
                    <input 
                      type="text" 
                      value={erpSettings.seoDescription}
                      onChange={(e) => setErpSettings({...erpSettings, seoDescription: e.target.value})}
                      className="mt-1 w-full text-xs p-2 rounded-lg border border-zinc-300 bg-white"
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3 md:col-span-2">
                  <h4 className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Bell className="h-4 w-4" />
                    <span>Notifications & Alerts</span>
                  </h4>
                  <label className="flex items-center gap-2.5 text-xs text-zinc-700">
                    <input 
                      type="checkbox" 
                      checked={erpSettings.notifSystemEmail}
                      onChange={(e) => setErpSettings({...erpSettings, notifSystemEmail: e.target.checked})}
                      className="rounded border-zinc-300 accent-zinc-950" 
                    />
                    <span>Notify Chief Accountant immediately on unclassified sales direct deposit bKash reference triggers.</span>
                  </label>
                </div>

              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-100">
                <button 
                  type="button" 
                  onClick={() => alert("Corporate general configuration metadata has been locked and synced to .env config parameters.")}
                  className="bg-zinc-950 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Save & Apply Settings
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
