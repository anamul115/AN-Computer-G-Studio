import React, { useState } from "react";
import { SLAAgreement } from "../types";
import { Shield, Check, Heart, Server, HelpCircle, Send } from "lucide-react";

interface SLAQuoteProps {
  onRegisterSLA: (sla: Omit<SLAAgreement, "id" | "status" | "monthlyCost" | "createdAt">) => void;
}

export default function SLAQuote({ onRegisterSLA }: SLAQuoteProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [tier, setTier] = useState<"silver" | "gold" | "platinum">("gold");
  const [deviceCount, setDeviceCount] = useState<number>(10);
  const [requirements, setRequirements] = useState("");

  const tiers = [
    {
      id: "silver" as const,
      name: "Silver Retainer",
      baseCost: 30000,
      perDevice: 1500,
      response: "Next business day response",
      hours: "9 AM - 5 PM Support window",
      features: ["Standard phone & email support", "Parts procurement prioritization", "Bi-annual deep dusting", "ISO certification report"],
      icon: Heart
    },
    {
      id: "gold" as const,
      name: "Gold Dedicated",
      baseCost: 75000,
      perDevice: 1500,
      response: "4-Hour on-site response",
      hours: "8 AM - 10 PM Support window",
      features: ["Priority technician scheduling", "Spares buffer inventory kept in lab", "Quarterly complete health audits", "Remote endpoint network diagnostics"],
      icon: Shield
    },
    {
      id: "platinum" as const,
      name: "Platinum High-Avail",
      baseCost: 150000,
      perDevice: 1500,
      response: "2-Hour on-site response",
      hours: "24/7/365 Support SLA",
      features: ["Assigned lead systems engineer", "Dedicated on-site standby units", "Monthly security & firmware hardening", "Continuous automatic server replication check"],
      icon: Server
    }
  ];

  const activeTierObj = tiers.find(t => t.id === tier) || tiers[1];
  const calculatedMonthly = activeTierObj.baseCost + (deviceCount * activeTierObj.perDevice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail || deviceCount <= 0) return;

    onRegisterSLA({
      companyName,
      contactEmail,
      tier,
      deviceCount,
      requirements
    });

    setCompanyName("");
    setContactEmail("");
    setDeviceCount(10);
    setRequirements("");
  };

  return (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-zinc-200 pb-5 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Corporate Service Level Agreement (SLA) Portal</h2>
          <p className="text-sm text-zinc-500 mt-1">Configure mission-critical B2B retainers. Align support tiers, device quotas, and on-site technician response goals.</p>
        </div>

        {/* Tier comparison board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((t) => {
            const IconComp = t.icon;
            const isSelected = tier === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTier(t.id)}
                className={`cursor-pointer rounded-2xl border p-6 flex flex-col transition-all ${
                  isSelected
                    ? "border-zinc-950 bg-white shadow-lg ring-2 ring-zinc-900/10"
                    : "border-zinc-200 bg-white hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
                  }`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  {isSelected && (
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                      Target Selection
                    </span>
                  )}
                </div>

                <h3 className="text-md font-bold mt-4 text-zinc-900">{t.name}</h3>
                <div className="mt-2 font-mono text-xs text-zinc-500">
                  Base Retainer: ৳ {t.baseCost.toLocaleString()}/mo + ৳ {t.perDevice.toLocaleString()}/device
                </div>

                <div className="mt-4 rounded bg-zinc-50 p-3 font-mono text-[10px] space-y-1 text-zinc-600">
                  <div className="flex justify-between font-bold text-zinc-900">
                    <span>RESPONSE:</span>
                    <span>{t.response}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>COVERAGE:</span>
                    <span>{t.hours}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  {t.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2 text-[11px] text-zinc-600">
                      <Check className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* SLA Form and dynamic calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
              <h3 className="text-md font-bold text-zinc-900 border-b border-zinc-100 pb-3 mb-5">SLA Proposal Form</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Company / Entity Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enterprise Systems Ltd."
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Corporate IT Contact Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="it@company.com"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Active Device Density (Qty)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={500}
                      value={deviceCount}
                      onChange={(e) => setDeviceCount(parseInt(e.target.value) || 10)}
                      placeholder="Number of workstations/servers..."
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Retainer Tier Selected</label>
                    <select
                      value={tier}
                      onChange={(e) => setTier(e.target.value as any)}
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 text-zinc-600 font-semibold"
                    >
                      <option value="silver">Silver Retainer Tier</option>
                      <option value="gold">Gold Dedicated Tier</option>
                      <option value="platinum">Platinum High-Availability Tier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Custom Infrastructure & Failover Requirements</label>
                  <textarea
                    rows={4}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="E.g. database hot-standby, proprietary GPU driver validation, cluster automatic provisioning specifications..."
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 py-3 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Proposal Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Dynamic retal cost sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 pb-3 border-b border-zinc-100">Live SLA Retainer Calculator</h3>
              
              <div className="py-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Selected Tier:</span>
                  <span className="font-bold text-zinc-900 uppercase">{tier}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Base Fee:</span>
                  <span className="font-bold text-zinc-900">৳ {activeTierObj.baseCost.toLocaleString()}/mo</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Devices:</span>
                  <span className="font-bold text-zinc-900">{deviceCount} × ৳ {activeTierObj.perDevice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500 border-t border-dashed border-zinc-100 pt-3">
                  <span className="text-sm font-bold text-zinc-900">Estimated Monthly Rate:</span>
                  <span className="text-lg font-extrabold text-zinc-950">৳ {calculatedMonthly.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-3 flex space-x-2 rounded-lg bg-zinc-50 p-3 text-[10px] text-zinc-500">
                <HelpCircle className="h-4 w-4 shrink-0 text-zinc-400 mt-0.5" />
                <span>retainer pricing is audited quarterly. All services billed on Net-30 payment terms automatically.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
