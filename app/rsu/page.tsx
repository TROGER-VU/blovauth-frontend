"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, Zap, Database, Search, Terminal as TerminalIcon, Radio, RefreshCw, Cpu } from "lucide-react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;


export default function RSUPage() {
  const [vcInput, setVcInput] = useState("");
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState<"IDLE" | "AUTHORIZED" | "REJECTED">("IDLE");
  const [isScanning, setIsScanning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleVerify = async () => {
    if (!vcInput.trim()) return;

    setIsScanning(true);
    setStatus("IDLE");

    try {
      const parsed = JSON.parse(vcInput);

      const res = await axios.post(`${API}/verify`, {
        did: parsed.did,
        hash: hash,
      });

      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
      setStatus("REJECTED");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pt-28 pb-20 px-6 font-sans">
      
      {/* Structural Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TOP NAV BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Node Cluster: South-Asia-04</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-slate-900">
              Identity <span className="font-bold">Validator</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
              <Database size={16} className="text-blue-500" />
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase">Ledger: Active</span>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
              <Cpu size={16} className="text-blue-500" />
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase">Auth: RSA-4096</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: INPUT AREA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Search size={14} /> VC Payload Descriptor
                    </label>
                  </div>
                  <textarea
                    value={vcInput}
                    placeholder='Input JSON manifest...'
                    onChange={(e) => setVcInput(e.target.value)}
                    className="w-full h-64 bg-slate-50 border border-slate-200 p-6 rounded-2xl text-sm font-mono text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-400 resize-none shadow-inner"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} /> Verification Hash
                    </label>
                    <input
                      placeholder="0x..."
                      onChange={(e) => setHash(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-mono text-slate-700 focus:bg-white focus:border-blue-500/50 outline-none transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button 
                      onClick={handleVerify}
                      disabled={isScanning || !vcInput}
                      className="w-full py-4 rounded-xl bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 text-white text-[11px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3 disabled:text-slate-400"
                    >
                      {isScanning ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : "Confirm & Authenticate"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MONITORING */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* STATUS CARD */}
            <div className={`relative overflow-hidden rounded-3xl border p-10 flex flex-col items-center justify-center text-center transition-all duration-500 ${
              status === "AUTHORIZED" ? "bg-emerald-50 border-emerald-200 shadow-xl" :
              status === "REJECTED" ? "bg-rose-50 border-rose-200 shadow-xl" :
              "bg-white border-slate-200 shadow-md"
            }`}>
              <AnimatePresence mode="wait">
                {status === "IDLE" && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center mx-auto bg-slate-50">
                      <Radio className="text-slate-300 animate-pulse" size={32} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Standing By</p>
                  </motion.div>
                )}

                {status === "AUTHORIZED" && (
                  <motion.div key="auth" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                      <ShieldCheck className="text-white" size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 uppercase">Validated</h3>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Access Token Issued</p>
                    </div>
                  </motion.div>
                )}

                {status === "REJECTED" && (
                  <motion.div key="rej" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-rose-200">
                      <ShieldAlert className="text-white" size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 uppercase">Unauthorized</h3>
                      <p className="text-[10px] text-rose-600 font-bold uppercase mt-1">Verification Terminated</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* LOGS PANEL */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col h-64 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
                <TerminalIcon size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Verbose</span>
              </div>
              <div className="overflow-y-auto font-mono text-[11px] space-y-3 pr-2 custom-scrollbar">
                {mounted && (
                  <>
                    <p className="text-slate-400">[{new Date().toLocaleTimeString()}] System kernel operational.</p>
                    {status !== "IDLE" && (
                      <p className="text-blue-600 font-bold">[{new Date().toLocaleTimeString()}] Fetching ledger state...</p>
                    )}
                    {status === "AUTHORIZED" && (
                      <p className="text-emerald-600 font-bold">[{new Date().toLocaleTimeString()}] SIGNATURE_MATCH: 0x82...f2 verified.</p>
                    )}
                    {status === "REJECTED" && (
                      <p className="text-rose-600 font-bold">[{new Date().toLocaleTimeString()}] ERROR: Invalid proof provided.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}