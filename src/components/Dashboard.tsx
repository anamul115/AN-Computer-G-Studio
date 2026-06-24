import React from "react";
import { RepairBooking, SLAAgreement } from "../types";
import { Hammer, Truck, Shield, Calendar, Clock, Terminal } from "lucide-react";

interface DashboardProps {
  orders: RepairBooking[];
  slas: SLAAgreement[];
}

export default function Dashboard({ orders, slas }: DashboardProps) {
  const getStatusBadge = (status: RepairBooking["status"]) => {
    const configs: Record<RepairBooking["status"], { bg: string; text: string; label: string }> = {
      pending: { bg: "bg-zinc-100", text: "text-zinc-800", label: "Pending Queue" },
      diagnosing: { bg: "bg-blue-50", text: "text-blue-800", label: "Lab Diagnostic" },
      in_repair: { bg: "bg-amber-50", text: "text-amber-800", label: "Active Bench Repair" },
      testing: { bg: "bg-purple-50", text: "text-purple-800", label: "Stress Testing" },
      ready_for_pickup: { bg: "bg-emerald-50", text: "text-emerald-800", label: "Certified & Ready" }
    };
    const c = configs[status] || configs.pending;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const getSlaBadge = (status: SLAAgreement["status"]) => {
    const configs: Record<SLAAgreement["status"], { bg: string; text: string; label: string }> = {
      pending_review: { bg: "bg-zinc-100", text: "text-zinc-800", label: "IT Audit Review" },
      proposal_sent: { bg: "bg-blue-50", text: "text-blue-800", label: "Agreement Proposal Sent" },
      active: { bg: "bg-emerald-50", text: "text-emerald-800", label: "Active SLA Contract" },
      cancelled: { bg: "bg-red-50", text: "text-red-800", label: "Deactivated" }
    };
    const c = configs[status] || configs.pending_review;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="py-12 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="border-b border-zinc-200 pb-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Control Center Dashboard</h2>
            <p className="text-sm text-zinc-500 mt-1">Real-time telemetry of system orders, lab diagnostic repair slots, and enterprise support retainers.</p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold bg-white border border-zinc-200 rounded-lg p-2.5 text-zinc-600 shadow-xs">
            <Terminal className="h-4 w-4 text-zinc-700 animate-pulse" />
            <span>ISO SECURE TOKEN: AN-S_920K</span>
          </div>
        </div>

        {/* Top summary metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex items-center space-x-4">
            <div className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center rounded-lg">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-zinc-950">{orders.length}</div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Active System/Repair Tickets</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex items-center space-x-4">
            <div className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-zinc-950">{slas.filter(s => s.status === "active").length}</div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Active SLA Contracts</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs flex items-center space-x-4">
            <div className="h-10 w-10 bg-zinc-900 text-white flex items-center justify-center rounded-lg">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-zinc-950">
                ৳ {orders.reduce((sum, o) => sum + o.price, 0).toLocaleString()}
              </div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Total Operations Value</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Work Orders and Repairs */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">Live Support & Bench Repair Board</h3>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
                <Hammer className="h-10 w-10 text-zinc-300 mx-auto" />
                <h4 className="font-bold text-zinc-800 mt-3 text-sm">No Active Tickets Found</h4>
                <p className="text-xs text-zinc-500 mt-1">Book computer assemblies or diagnostics using our portals to populate the dashboard.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-3 mb-4">
                      <div>
                        <span className="font-mono text-xs font-bold text-zinc-400 mr-2">[{o.id}]</span>
                        <span className="text-sm font-bold text-zinc-900">{o.deviceType}</span>
                      </div>
                      <div>{getStatusBadge(o.status)}</div>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">{o.issueDescription}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px] text-zinc-500 bg-zinc-50 rounded-lg p-3">
                      <div>
                        <span className="block text-zinc-400">CUSTOMER:</span>
                        <span className="font-bold text-zinc-800">{o.customerName}</span>
                      </div>
                      <div>
                        <span className="block text-zinc-400">BOOKED SLOT:</span>
                        <span className="font-bold text-zinc-800 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {o.scheduledDate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-zinc-400">LAB ESTIMATE:</span>
                        <span className="font-bold text-zinc-800">৳ {o.price.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-zinc-400">BENCH STATE:</span>
                        <span className="font-bold text-zinc-800 uppercase">{o.serviceType}</span>
                      </div>
                    </div>

                    {o.notes && (
                      <div className="mt-4 border-l-2 border-zinc-200 pl-3 py-1 text-[10px] text-zinc-500 italic leading-relaxed">
                        Technician note: {o.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SLA Inquiries & active agreement parameters */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">Enterprise SLA Contracts</h3>

            {slas.length === 0 ? (
              <div className="bg-white rounded-xl border border-zinc-200 p-6 text-center">
                <Shield className="h-8 w-8 text-zinc-300 mx-auto" />
                <h4 className="font-bold text-zinc-800 mt-2 text-xs">No SLA agreements found</h4>
                <p className="text-[10px] text-zinc-400 mt-1">Inquire in our SLA tab to configure an enterprise support retainer.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {slas.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-zinc-400 mr-2">[{s.id}]</span>
                        <span className="text-xs font-bold text-zinc-900">{s.companyName}</span>
                      </div>
                      {getSlaBadge(s.status)}
                    </div>

                    <div className="space-y-2 font-mono text-[10px] text-zinc-500">
                      <div className="flex justify-between">
                        <span>CONTRACT TIER:</span>
                        <span className="font-bold text-zinc-800 uppercase">{s.tier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DEVICE QUOTA:</span>
                        <span className="font-bold text-zinc-800">{s.deviceCount} Systems</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MONTHLY RATE:</span>
                        <span className="font-bold text-zinc-950">৳ {s.monthlyCost.toLocaleString()}/mo</span>
                      </div>
                    </div>

                    {s.requirements && (
                      <div className="mt-3.5 border-t border-zinc-100 pt-3 text-[10px] text-zinc-500 leading-relaxed">
                        <span className="font-bold text-zinc-700 block mb-1">CONTRACT REQUIREMENTS:</span>
                        {s.requirements}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
