"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { LUXURY_TRANSITION } from "@/lib/motionConfig";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed. Please check credentials.");
      }

      // Successful login -> Redirect to Admin Dashboard
      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full relative flex items-center justify-center bg-[#0a0a0a] text-[#f4f0ef] font-hanken-grotesk overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 01. FULL BLEED BACKGROUND ARCHITECTURAL IMAGE & SCRIM                    */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/desktop/pexels-artbovich-7166636.jpg"
          alt="Decorium Architectural Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 filter scale-105 transform transition-transform duration-1000"
        />
        {/* Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />
      </div>

      {/* Floating Ambient Light Glow Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/3 size-96 rounded-full bg-amber-600/20 blur-3xl pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/3 size-96 rounded-full bg-stone-400/15 blur-3xl pointer-events-none z-0"
      />

      {/* Decorative Refined Background Logo Watermark (85% Screen Width & Floating Animated) */}
      <motion.div
        animate={{
          opacity: [0.15, 0.28, 0.15],
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none font-raleway font-light text-[17.5vw] uppercase tracking-tighter text-[#f4f0ef]/25 whitespace-nowrap z-5 select-none text-center"
      >
        DECORIUM
      </motion.div>

      {/* ========================================================================= */}
      {/* 02. LUXURY ANIMATED LOGIN CARD                                            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={LUXURY_TRANSITION}
        className="relative z-10 w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl bg-[#141414]/90 backdrop-blur-2xl border border-[#2e2e2e]/80 shadow-2xl flex flex-col text-left transition-all duration-300"
      >
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LUXURY_TRANSITION, delay: 0.1 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <motion.div
              animate={{
                y: [0, -3, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              }}
              className="size-10 rounded-xl bg-[#f4f0ef] text-[#121212] flex items-center justify-center font-raleway font-bold text-lg shadow-md group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300 shrink-0"
            >
              D
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...LUXURY_TRANSITION, delay: 0.15 }}
              className="flex flex-col"
            >
              <span className="font-raleway text-sm font-semibold tracking-widest text-[#f4f0ef] uppercase group-hover:text-amber-400 transition-colors">
                DECORIUM
              </span>
              <span className="font-label-caps text-[9px] tracking-widest text-[#8e8e8e] uppercase">
                AUTHORIZED PERSONNEL ONLY
              </span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Error Alert Box */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 flex items-start gap-3 font-body-sm text-xs"
          >
            <AlertCircle className="size-4 text-red-400 shrink-0 mt-0.5" />
            <span className="flex-1 leading-snug">{errorMessage}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...LUXURY_TRANSITION, delay: 0.2 }}
            className="space-y-2"
          >
            <label className="font-label-caps text-[10px] uppercase text-[#8e8e8e] tracking-wider block">
              ADMIN EMAIL ADDRESS
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8e8e8e] group-focus-within:text-amber-400 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@decorium.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl text-[#f4f0ef] placeholder-[#666666] font-hanken-grotesk text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...LUXURY_TRANSITION, delay: 0.25 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-[10px] uppercase text-[#8e8e8e] tracking-wider">
                PASSWORD
              </label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8e8e8e] group-focus-within:text-amber-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl text-[#f4f0ef] placeholder-[#666666] font-hanken-grotesk text-sm focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e8e8e] hover:text-[#f4f0ef] transition-colors p-1"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...LUXURY_TRANSITION, delay: 0.3 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#f4f0ef] text-[#121212] font-label-caps text-xs uppercase tracking-widest font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 mt-2 active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin text-[#121212]" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In To Atelier</span>
                <ArrowRight className="size-4" strokeWidth={2} />
              </>
            )}
          </motion.button>
        </form>

        {/* Return to Storefront Helper Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LUXURY_TRANSITION, delay: 0.35 }}
          className="mt-6 pt-5 border-t border-[#2e2e2e] flex flex-col items-center"
        >
          <Link
            href="/"
            className="font-label-caps text-[10px] text-[#8e8e8e] hover:text-[#f4f0ef] uppercase tracking-wider transition-colors"
          >
            ← Return to Main Storefront
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
