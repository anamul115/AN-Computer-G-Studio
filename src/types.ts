/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: "workstation" | "gaming" | "laptop" | "server" | "component";
  subCategory?: string;
  description: string;
  price: number;
  specs: Record<string, string>;
  image: string;
  featured?: boolean;
  stock: number;
}

export interface PCComponent {
  id: string;
  name: string;
  type: "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu" | "cooler" | "case";
  price: number;
  manufacturer: string;
  specs: {
    socket?: string; // e.g. AM5, LGA1700 (for CPU & Motherboard compatibility)
    powerConsumption?: number; // Watts (for PSU validation)
    capacity?: string; // RAM or storage size
    formFactor?: string; // Motherboard & Case sizing (ATX, Micro-ATX)
    speed?: string;
    ramType?: "DDR4" | "DDR5"; // For RAM & Motherboard compatibility
  };
}

export interface CustomPCBuild {
  id: string;
  userId: string;
  components: {
    cpu?: PCComponent;
    gpu?: PCComponent;
    motherboard?: PCComponent;
    ram?: PCComponent;
    storage?: PCComponent;
    psu?: PCComponent;
    cooler?: PCComponent;
    case?: PCComponent;
  };
  totalPrice: number;
  totalWattage: number;
  isValid: boolean;
  compatibilityErrors: string[];
  createdAt: string;
}

export interface RepairBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  deviceType: string;
  issueDescription: string;
  serviceType: string; // "hardware", "software", "cleanup", "diagnostic"
  scheduledDate: string;
  status: "pending" | "diagnosing" | "in_repair" | "testing" | "ready_for_pickup";
  price: number;
  notes?: string;
  createdAt: string;
}

export interface SLAAgreement {
  id: string;
  companyName: string;
  contactEmail: string;
  tier: "silver" | "gold" | "platinum";
  deviceCount: number;
  requirements: string;
  status: "pending_review" | "proposal_sent" | "active" | "cancelled";
  monthlyCost: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
