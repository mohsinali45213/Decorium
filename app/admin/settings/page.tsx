"use client";

import { useState } from "react";
import {
  Store,
  Globe,
  Bell,
  ShieldCheck,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "catalog" | "notifications" | "security">("general");
  const [isSaved, setIsSaved] = useState(false);

  // General Settings State
  const [studioName, setStudioName] = useState("DECORIUM Surface Gallery");
  const [contactEmail, setContactEmail] = useState("concierge@decorium.com");
  const [whatsappNumber, setWhatsappNumber] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("INR");
  const [showroomAddress, setShowroomAddress] = useState("100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038");

  // Catalog Settings State
  const [autoSku, setAutoSku] = useState(true);
  const [displayPrice, setDisplayPrice] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState("5");

  // Notifications State
  const [emailInquiries, setEmailInquiries] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // Security State
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      
      {/* 01. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e]">
        <div>
          <span className="font-label-caps text-label-caps text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
            ADMINISTRATION / CONFIGURATION
          </span>
          <h1 className="font-raleway text-headline-lg font-light uppercase tracking-wide text-[#1c1b1b] dark:text-[#f4f0ef]">
            SETTINGS
          </h1>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="inline-flex items-center gap-1.5 font-label-caps text-label-caps-sm text-emerald-600 dark:text-emerald-400 uppercase animate-fadeIn">
              <CheckCircle2 className="size-4" />
              Changes Saved
            </span>
          )}
          <Button
            onClick={handleSave}
            variant="primary"
            size="md"
            icon={Save}
            iconPosition="left"
            className="px-6 py-3"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* 02. TABBED SETTINGS NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-[#c4c7c7]/30 dark:border-[#2e2e2e] pb-px overflow-x-auto">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2.5 px-5 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === "general"
              ? "border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold"
              : "border-transparent text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
          }`}
        >
          <Store className="size-4" />
          <span>General & Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex items-center gap-2.5 px-5 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === "catalog"
              ? "border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold"
              : "border-transparent text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
          }`}
        >
          <Globe className="size-4" />
          <span>Catalog & Spec</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2.5 px-5 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold"
              : "border-transparent text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
          }`}
        >
          <Bell className="size-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2.5 px-5 py-3 font-label-caps text-label-caps uppercase transition-all duration-300 cursor-pointer border-b-2 whitespace-nowrap ${
            activeTab === "security"
              ? "border-[#1c1b1b] dark:border-[#f4f0ef] text-[#1c1b1b] dark:text-[#f4f0ef] font-semibold"
              : "border-transparent text-[#5d5f5f] dark:text-[#8e8e8e] hover:text-[#1c1b1b] dark:hover:text-[#f4f0ef]"
          }`}
        >
          <ShieldCheck className="size-4" />
          <span>Security & Access</span>
        </button>
      </div>

      {/* 03. TAB CONTENT CONTAINERS */}
      <form onSubmit={handleSave} className="space-y-8">
        
        {/* TAB 1: GENERAL & STUDIO */}
        {activeTab === "general" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-raleway text-body-lg font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
                STUDIO IDENTITY
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                    Studio Name
                  </label>
                  <input
                    type="text"
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                    Default Currency
                  </label>
                  <div className="relative">
                    <Coins className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="INR">INR (₹) — Indian Rupee</option>
                      <option value="USD">USD ($) — US Dollar</option>
                      <option value="EUR">EUR (€) — Euro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                  Showroom Physical Address
                </label>
                <textarea
                  rows={3}
                  value={showroomAddress}
                  onChange={(e) => setShowroomAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-raleway text-body-lg font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
                CONCIERGE CONTACT LINES
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                    Concierge Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" />
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                    Direct WhatsApp Hotline
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" />
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG & SPEC */}
        {activeTab === "catalog" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-raleway text-body-lg font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
                CATALOG AUTOMATION & DISPLAY
              </h3>

              <div className="flex items-center justify-between py-4 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Automatic SKU Generation
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Automatically format specimen codes based on quarry origin and material class (e.g., DEC-MAR-001).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoSku(!autoSku)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    autoSku ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      autoSku ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Public Specimen Price Display
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Display estimated price ranges publicly on catalog product cards.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDisplayPrice(!displayPrice)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    displayPrice ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      displayPrice ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2">
                <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                  Low Specimen Inventory Alert Threshold
                </label>
                <input
                  type="number"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  className="w-full max-w-xs px-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-raleway text-body-lg font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
                NOTIFICATION ROUTING
              </h3>

              <div className="flex items-center justify-between py-4 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Email Inquiry Alerts
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Receive instant email notifications whenever an architect or client submits a product inquiry.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailInquiries(!emailInquiries)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    emailInquiries ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      emailInquiries ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    WhatsApp Lead Forwarding
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Forward high-priority WhatsApp concierge inquiries directly to showroom managers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    whatsappAlerts ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      whatsappAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Daily Analytics & Catalog Digest
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Receive a daily 9am email summary of catalog page views, popular slabs, and showroom visits.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDailyDigest(!dailyDigest)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    dailyDigest ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      dailyDigest ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & ACCESS */}
        {activeTab === "security" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#f7f3f2]/40 dark:bg-[#181818] border border-[#c4c7c7]/30 dark:border-[#2e2e2e] rounded-xl p-6 sm:p-8 space-y-6">
              <h3 className="font-raleway text-body-lg font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] uppercase tracking-wide">
                AUTHENTICATION & ACCESS
              </h3>

              <div className="flex items-center justify-between py-4 border-b border-[#c4c7c7]/20 dark:border-[#2e2e2e]">
                <div>
                  <h4 className="font-hanken-grotesk font-semibold text-body-md text-[#1c1b1b] dark:text-[#f4f0ef]">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] mt-1">
                    Require an authenticator app code when logging into the admin management portal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                    twoFactor ? "bg-[#1c1b1b] dark:bg-[#f4f0ef]" : "bg-[#c4c7c7]/60 dark:bg-[#2e2e2e]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-[#121212] shadow-sm ring-0 transition duration-300 ease-in-out ${
                      twoFactor ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2">
                <label className="font-label-caps text-label-caps-sm text-[#5d5f5f] dark:text-[#8e8e8e] uppercase block mb-2">
                  Admin Inactivity Session Timeout (Minutes)
                </label>
                <div className="relative max-w-xs">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#5d5f5f] dark:text-[#8e8e8e]" />
                  <input
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#fdf8f8] dark:bg-[#121212] border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded-lg text-[#1c1b1b] dark:text-[#f4f0ef] font-body-md focus:outline-none focus:border-[#1c1b1b] dark:focus:border-[#f4f0ef] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
