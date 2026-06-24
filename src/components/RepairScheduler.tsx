import React, { useState } from "react";
import { RepairBooking } from "../types";
import { Calendar, Hammer, HeartPulse, Sparkles, Send } from "lucide-react";

interface RepairSchedulerProps {
  onBookRepair: (booking: Omit<RepairBooking, "id" | "status" | "price" | "createdAt">) => void;
}

export default function RepairScheduler({ onBookRepair }: RepairSchedulerProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [serviceType, setServiceType] = useState("diagnostic");
  const [scheduledDate, setScheduledDate] = useState("");

  const servicePackages = [
    { id: "diagnostic", title: "Complete System Diagnostic", cost: 2500, desc: "Full hardware scoping, voltage rail testing, RAM pattern verification, and bios diagnostics.", icon: HeartPulse },
    { id: "hardware", title: "Hardware Repair & Part Swap", cost: 5000, desc: "Replacement of faulty power supplies, graphics cards, custom fans, liquid cooling loops, or motherboards.", icon: Hammer },
    { id: "software", title: "OS Recovery & Virus Removers", cost: 3500, desc: "Complete partition rebuilding, registry repair, malware cleansing, and cloud backup setup.", icon: Sparkles },
    { id: "cleanup", title: "Thermal Optimization & Decalc", cost: 2000, desc: "De-dusting, replacement of thermal compounds with high-grade liquid metal, and chassis fan tuning.", icon: Calendar }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !deviceType || !issueDescription || !scheduledDate) return;

    onBookRepair({
      customerName,
      customerEmail,
      deviceType,
      issueDescription,
      serviceType,
      scheduledDate
    });

    // Reset fields
    setCustomerName("");
    setCustomerEmail("");
    setDeviceType("");
    setIssueDescription("");
    setScheduledDate("");
  };

  return (
    <div className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-zinc-200 pb-5 mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Lab Diagnostic & Repair Desk</h2>
          <p className="text-sm text-zinc-500 mt-1">Book your system into our ISO certified diagnostic laboratory for repair, de-dusting, or performance tuning.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Service Package Pricing List */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">Available Service Levels</h3>
            <div className="space-y-3">
              {servicePackages.map((pkg) => {
                const IconComponent = pkg.icon;
                const isSelected = serviceType === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setServiceType(pkg.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-md"
                        : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50 text-zinc-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"
                      }`}>
                        <IconComponent className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold">{pkg.title}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                          Base lab fee: ৳ {pkg.cost.toLocaleString()} BDT
                        </div>
                      </div>
                    </div>
                    <p className={`text-[10px] mt-2.5 leading-relaxed ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                      {pkg.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Scheduling Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
              <h3 className="text-md font-bold text-zinc-900 border-b border-zinc-100 pb-3 mb-5">Lab Scheduling Form</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Customer Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Business Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Device Model / Manufacturer</label>
                    <input
                      type="text"
                      required
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      placeholder="e.g. Dell XPS 15, Custom Ryzen 5000"
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Requested Booking Date</label>
                    <input
                      type="date"
                      required
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Detailed Hardware Malfunction Description</label>
                  <textarea
                    rows={4}
                    required
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Describe symptoms, e.g. blue-screen bug checks, computer failing to post, fan grinding noises..."
                    className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white text-zinc-800"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-900 py-3 text-xs font-bold text-white shadow-md hover:bg-zinc-800 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span>Register Booking Slot</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
