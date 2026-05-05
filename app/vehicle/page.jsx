"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Key, FileText, Cpu, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API;

const short = (str) => {
  if (!str) return "";
  return str.slice(0, 6) + "..." + str.slice(-6);
};

const generateHash = async (did) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(did);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

export default function VehiclePage() {
  const [did, setDid] = useState("");
  const [vc, setVc] = useState(null);
  const [hash, setHash] = useState("");
  const [mounted, setMounted] = useState(false);
  const [tx, setTx] = useState("");
  const [vehicleAddress, setVehicleAddress] = useState("");
  const [explorerTx, setExplorerTx] = useState("");
  const [explorerAccount, setExplorerAccount] = useState("");

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleDID = () => {
      const random = Math.random().toString(16).slice(2);
      setDid("vehicle-" + random);
    };
    
    const handleRegister = async () => {
    try {
      const generatedHash = await generateHash(did);

      const res = await axios.post(`${API}/register`, {
        did,
        hash: generatedHash,
      });

      setHash(generatedHash);

      setTx(res.data.tx);
      setVehicleAddress(res.data.vehicleAddress);
      setExplorerTx(res.data.explorerTx);
      setExplorerAccount(res.data.explorerAccount);

      localStorage.setItem("vehicle_did", did);
      localStorage.setItem("vehicle_hash", generatedHash);

      console.log("PDA:", res.data.vehicleAddress);
      console.log("HASH:", generatedHash);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 font-sans bg-slate-50/50">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-blue-600">
            <Cpu size={20} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">On-Board Unit (OBU) Interface</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Vehicle Identity <span className="text-blue-600">Provisioning</span>
          </h1>
          <p className="text-slate-500 max-w-2xl font-light">
            Initialize your vehicle node by generating a unique DID and securing a signed 
            Verifiable Credential for decentralized network access.
          </p>
        </header>

        {/* STEP FLOW GRID */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* STEP 1: DID GENERATION */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${
              did ? "bg-white border-blue-100" : "bg-white/60 backdrop-blur-xl border-slate-200"
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`p-3 rounded-2xl ${did ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                <Key size={24} />
              </div>
              <span className="text-4xl font-black text-slate-100 tracking-tighter">01</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">Identity Generation</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Create a cryptographically unique DID for this vehicle node.</p>

            <button 
              onClick={handleDID}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              {did ? "Regenerate DID" : "Initialize Identity"}
            </button>

            <AnimatePresence>
              {did && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100"
                >
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Generated DID</p>
                  <p className="text-[11px] font-mono text-blue-900 break-all leading-tight">{did}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 2: CREDENTIAL ISSUANCE */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${
              vc ? "bg-white border-blue-100" : "bg-white/60 backdrop-blur-xl border-slate-200 opacity-60"
            }`}
          >
             <div className="flex justify-between items-start mb-8">
              <div className={`p-3 rounded-2xl ${vc ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                <FileText size={24} />
              </div>
              <span className="text-4xl font-black text-slate-100 tracking-tighter">02</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">Credential Issuance</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Verify claims with the Trusted Authority to receive a signed VC.</p>

            <button 
              disabled={!did}
              onClick={handleRegister}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              Request VC
            </button>

            <AnimatePresence>
              {vc && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Verified Claims</p>
                  <pre className="text-[10px] font-mono text-slate-400 overflow-hidden text-ellipsis italic">
                    {JSON.stringify(vc, null, 2).substring(0, 80)}...
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* STEP 3: SECURITY HASH */}
          <motion.div 
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${
              hash ? "bg-white border-emerald-100" : "bg-white/60 backdrop-blur-xl border-slate-200 opacity-60"
            }`}
          >
             <div className="flex justify-between items-start mb-8">
              <div className={`p-3 rounded-2xl ${hash ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                <ShieldCheck size={24} />
              </div>
              <span className="text-4xl font-black text-slate-100 tracking-tighter">03</span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">Immutable Hash</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Cryptographic digest stored on-chain for RSU verification.</p>

            <div className={`p-4 rounded-xl border transition-colors ${hash ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100"}`}>
               {hash ? (
                 <div className="space-y-2">
                   <div className="flex items-center gap-2 text-emerald-600">
                     <CheckCircle2 size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Hash Computed</span>
                   </div>
                   <p className="text-[11px] font-mono text-emerald-800 break-all">{hash}</p>
                 </div>
               ) : (
                 <p className="text-[11px] text-slate-400 italic">Awaiting credential signature...</p>
               )}
            </div>

            {hash && (
            <div className="mt-6 space-y-4">

              {/* 🔥 BLOCKCHAIN PROOF CARD */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-xl">
                
                <p className="text-[10px] uppercase tracking-widest text-blue-400 mb-4 font-bold">
                  Blockchain Proof
                </p>

                {/* PDA (shortened) */}
                <div className="mb-3">
                  <p className="text-[10px] text-slate-400">Vehicle Account</p>
                  <p className="text-[11px] font-mono text-blue-300">
                    {short(vehicleAddress)}
                  </p>
                </div>

                {/* TX (shortened) */}
                <div className="mb-4">
                  <p className="text-[10px] text-slate-400">Transaction</p>
                  <p className="text-[11px] font-mono text-emerald-400">
                    {short(tx)}
                  </p>
                </div>

                {/* 🔥 CLICKABLE BUTTONS */}
                <div className="flex gap-3 mt-3">

                  <button
                    onClick={() => window.open(explorerTx, "_blank")}
                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-95 text-[11px] font-bold transition"
                  >
                    View Transaction
                  </button>

                  <button
                    onClick={() => window.open(explorerAccount, "_blank")}
                    className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-[11px] font-bold transition"
                  >
                    View Account
                  </button>

                </div>

              </div>

              {/* NAV */}
              <Link
                href="/rsu"
                className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 text-xs font-bold hover:gap-4 transition-all group"
              >
                Proceed to RSU Authentication <ArrowRight size={14} />
              </Link>

            </div>
          )}
          </motion.div>

        </div>

        {/* LOG PANEL FOOTER */}
        <div className="mt-12 bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
              <Network size={16} className="text-blue-400" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Live Node Logs</h3>
            </div>
            <div className="font-mono text-[11px] space-y-1 opacity-70">
              {mounted && (
                <>
                  <p className="text-emerald-400">{`> [${new Date().toLocaleTimeString()}] OBU System Online`}</p>
                  {did && <p>{`> [${new Date().toLocaleTimeString()}] Identity generated: ${did.substring(0, 20)}...`}</p>}
                  {vc && <p className="text-blue-400">{`> [${new Date().toLocaleTimeString()}] Credential received and verified`}</p>}
                  {hash && <p className="text-emerald-400">{`> [${new Date().toLocaleTimeString()}] Security hash broadcasted to ledger`}</p>}
                </>
              )}
            </div>
        </div>

      </div>
    </div>
  );
}