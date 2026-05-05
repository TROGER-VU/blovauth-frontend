"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, ShieldCheck, Network, ArrowRight, Terminal, Activity, ArrowUpRight, Layers, TrendingUp, Cpu, Scale, Fingerprint, ExternalLink } from "lucide-react";
import Stepper, { Step } from "@/components/Stepper";
import { generateDID, generateVC, verifyVC } from "@/lib/mockService";
import { AlertCircle, CheckCircle2, Zap, ShieldAlert, Database, Globe, ArrowRightLeft, Lock } from "lucide-react";

type VCType = {
  did: string;
  issuedAt: number;
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-sm">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <ShieldCheck className="text-white" size={18} />
          </div>
          <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">
            BIoV<span className="text-blue-600">Auth</span>
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["Architecture", "Performance", "Simulation"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/ayush" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">
            {/* <GitHub size={20} /> */}
          </a>
          <button className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-blue-600 transition-all active:scale-95">
            View Paper
          </button>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">
                BIoV<span className="text-blue-600">Auth</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-light">
              A decentralized authentication framework designed for the Internet of Vehicles, prioritizing sub-10ms latency and immutable trust management.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Members</h4>
              <ul className="space-y-2">
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">Alfaz Ahmed</li>
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">Ayush Gupta</li>
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">Nikhil Yadav</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Research Context</h4>
              <ul className="space-y-2">
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">VANET</li>
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">Trust Management System</li>
                <li className="text-xs text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors">Hyperledger Fabric</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-slate-600 font-medium group cursor-pointer">
                  LinkedIn <ExternalLink size={12} className="group-hover:text-blue-600" />
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-600 font-medium group cursor-pointer">
                  Portfolio <ExternalLink size={12} className="group-hover:text-blue-600" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 26_CS_4A_01 PSIT KANPUR
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-mono font-bold text-blue-600/50 uppercase">Next.js + Tailwind</span>
            <span className="text-[10px] font-mono font-bold text-blue-600/50 uppercase">TypeScript Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [did, setDid] = useState("");
  const [vc, setVc] = useState<VCType | null>(null);
  const [hash, setHash] = useState("");
  const [status, setStatus] = useState("");
  const [logs, setLogs] = useState<{ msg: string, time: string }[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ msg, time: timestamp }, ...prev].slice(0, 8));
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto flex flex-col items-center px-6 py-12 space-y-20">
        <Header/>

        {/* 1. HERO SECTION */}
        <header className="text-center max-w-6xl space-y-6 pt-10 mb-30">
          <div className="inline-flex items-center gap-2 px-3 py-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
            <Activity size={14} /> Active Research Project
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900 leading-tight">
            Blockchain Enable 
            <span className="block text-blue-600">AUTHENTICATION OF IOV</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            A decentralized framework for secure vehicle-to-infrastructure (V2I)
            communication using DIDs and Verifiable Credentials.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/vehicle" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
              Vehicle Dashboard <ArrowRight size={18} />
            </Link>
            <Link href="/rsu" className="border border-slate-200 bg-white px-6 py-3 rounded-full font-semibold text-slate-600 hover:bg-slate-50 transition-all">
              RSU Panel
            </Link>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400 animate-bounce">
    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Architecture</span>
    <div className="w-[1px] h-12 bg-gradient-to-b from-blue-600 to-transparent" />
  </div>
        </header>

        {/* 2.5 PROBLEM & SOLUTION SECTION */}
        <section className="w-full max-w-6xl px-6 relative">
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/20 blur-[120px] rounded-full -z-10" />

          <div className="text-center mb-7">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Comparison Study</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Architectural Evolution</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl">
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 bg-white border border-slate-200 rounded-full items-center justify-center z-10 shadow-xl font-bold text-slate-400 italic">
      vs
    </div>
            {/* Left: The Current Problem */}
            <div className="bg-white p-12 lg:p-16 relative">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldAlert size={12} /> Status Quo
                </div>
                
                <h2 className="text-4xl font-light text-slate-900">
                  The <span className="font-bold">Current Problem</span>
                </h2>
                
                <p className="text-slate-500 leading-relaxed text-lg font-light">
                  Legacy <span className="font-bold">Public Key Infrastructure (PKI)</span> relies on centralized bottlenecks that cannot keep pace with the sub-millisecond demands of high-mobility VANETs.
                </p>

                <div className="space-y-6 pt-4">
                  {[
                    { title: "Latency Spikes", desc: "Requests travel to a central TA, causing delays exceeding 50ms.", icon: <Zap /> },
                    { title: "Centralized Failure", desc: "A single point of failure compromises the entire network's integrity.", icon: <AlertCircle /> },
                    { title: "Privacy Concerns", desc: "Centralized data storage exposes vehicle metadata to tracking risks.", icon: <Database /> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1 text-red-400 group-hover:text-red-500 transition-colors">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Our Solution */}
            <div className="bg-slate-900 p-12 lg:p-16 relative overflow-hidden">
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest">
                  <Globe size={12} /> BIoVAuth Framework
                </div>

                <h2 className="text-4xl font-light text-white">
                  Our <span className="font-bold text-blue-600">Solution</span>
                </h2>

                <p className="text-slate-400 leading-relaxed text-lg font-light">
                  A decentralized, blockchain-backed ecosystem where trust is verified at the edge, ensuring absolute vehicle privacy and rapid authentication.
                </p>

                <div className="space-y-6 pt-4">
                  {[
                    { title: "Edge Authentication", desc: "RSUs verify credentials locally, reducing latency to <10ms.", icon: <CheckCircle2 /> },
                    { title: "Distributed Trust", desc: "Using Hyperledger Fabric to eliminate single points of failure.", icon: <CheckCircle2 /> },
                    { title: "Self-Sovereign Identity", desc: "W3C DIDs allow vehicles to manage their own identity metadata.", icon: <CheckCircle2 /> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1 text-blue-600 group-hover:text-emerald-400 transition-colors">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Call to Action integrated into the card */}
                <div className="pt-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest group cursor-pointer">
                    Explore the Architecture <ArrowRightLeft size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. CORE COMPONENTS */}
        <section className="relative w-full  mx-auto">
        {/* Soft background ambient blurs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/40 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-100/30 blur-[100px] rounded-full -z-10" />

        <div className="text-center mb-7">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">System Infrastructure</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">The <span className="text-blue-600">BIoVAuth</span> Ecosystem</h3>
          </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Vehicle (OBU)",
              id: "NODE_UNIT_V01",
              desc: "The intelligent edge node that generates unique DIDs and stores Verifiable Credentials securely within a hardware enclave.",
              icon: <Car size={24} />,
              stats: [{ label: "Auth", val: "ECDSA" }, { label: "Delay", val: "2.4ms" }],
              color: "text-blue-600",
              bg: "bg-blue-50"
            },
            {
              title: "Consensus Ledger",
              id: "BLOCK_NET_L02",
              desc: "A Hyperledger Fabric backbone providing a decentralized ledger for DID documents and trust management scores.",
              icon: <Network size={24} />,
              stats: [{ label: "Type", val: "Fabric" }, { label: "Nodes", val: "Multi-Org" }],
              color: "text-indigo-600",
              bg: "bg-indigo-50"
            },
            {
              title: "RSU Verifier",
              id: "EDGE_AUTH_R03",
              desc: "Performs rapid authentication of vehicles using hash comparison, ensuring sub-10ms latency for high-mobility environments.",
              icon: <ShieldCheck size={24} />,
              stats: [{ label: "Verify", val: "Local" }, { label: "Latency", val: "6.2ms" }],
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            }
          ].map((card, i) => (
            <div key={i} className="group relative">
              {/* Main Card Container */}
              <div className="relative flex flex-col h-full bg-white/80 backdrop-blur-md border border-slate-200 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:border-blue-300">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 ${card.bg} ${card.color} rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
                    {card.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">{card.id}</span>
                    <div className="flex items-center gap-1.5 mt-1 text-emerald-600">
                      <Activity size={10} className="animate-pulse" />
                      <span className="text-[9px] font-mono font-bold uppercase">Online</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-blue-600">
                      {card.title}
                    </h3>
                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Metadata Footer */}
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                    {card.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{stat.label}</p>
                        <p className="text-xs font-mono text-slate-700 font-semibold">{stat.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
        {/* 5. ARCHITECTURE RATIONALE - CLINICAL GLASS */}
        <section id="architecture" className="w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            {/* Standardized Header Style */}
            <div className="space-y-4">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">Strategic Necessity</h2>
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Why Blockchain for <br /> the <span className="text-blue-600">Internet of Vehicles?</span>
              </h3>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                Traditional centralized PKI systems face scalability and single-point-of-failure challenges in high-mobility VANET environments. This project utilizes **Decentralized Identifiers (DIDs)** to provide:
              </p>
            </div>

            {/* Feature List using Subtle Card Aesthetics */}
            <ul className="space-y-4">
              {[
                { 
                  title: "Privacy-Preserving Identity", 
                  desc: "Vehicles maintain control over their metadata without a central authority.", 
                  icon: <Fingerprint size={18} /> 
                },
                { 
                  title: "Immutable Trust Scores", 
                  desc: "Behavioral history is stored on-chain, preventing reputation tampering.", 
                  icon: <ShieldAlert size={18} /> 
                },
                { 
                  title: "Edge-Verified Credentials", 
                  desc: "RSUs verify credentials locally using hashes for sub-10ms latency.", 
                  icon: <Zap size={18} /> 
                }
              ].map((item, i) => (
                <li key={i} className="group flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-sm hover:border-blue-100">
                  <div className="mt-0.5 text-blue-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">{item.title}</span>
                    <span className="text-slate-500 text-xs leading-normal">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Reserved for your Image */}
          <div className="relative group">
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-blue-100/40 blur-[100px] rounded-full -z-10 transition-opacity group-hover:opacity-60" />
          
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] aspect-square flex flex-col items-center justify-between overflow-hidden">
            
            {/* The Architecture Image */}
            <div className="flex-grow flex items-center justify-center w-full">
              <img 
                src="/architecture-diagram.png" 
                alt="BIoVAuth Architecture"
                className="w-full h-full" 
              />
            </div>

            {/* The Caption - Positioned at the bottom of the glass card */}
            <div className="mt-1 pt-1 border-t border-slate-100 w-full flex justify-center">
              <p className="text-[11px] text-slate-400 italic max-w-[280px] text-center leading-relaxed">
                Visual representation of Decentralized ID flow across OBUs, RSUs, and Hyperledger Fabric.
              </p>
            </div>

          </div>
        </div>
        </section>

        {/* 3. TRUST MANAGEMENT SYSTEM - CLINICAL GLASS */}
        <section className="relative w-full max-w-6xl mx-auto px-6">
          {/* Standardized Header Style */}
          <div className="text-center mb-7">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Trust Logic Layer</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Trust Management System</h3>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
            
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 blur-[80px] rounded-full -z-10 opacity-50" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Narrative & Core Logic */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-slate-500 text-lg font-light leading-relaxed">
                    Beyond initial authentication, the framework evaluates continuous vehicle behavior using a <span className="font-bold text-slate-800">decentralized reputation model</span>. Trust scores are dynamically computed to filter out malicious actors in real-time.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Reputation Scoring", desc: "Dynamic adjustment based on the accuracy of shared traffic data.", icon: <TrendingUp size={18}/> },
                    { title: "Immutable History", desc: "Every trust update is hashed and anchored to the ledger.", icon: <Lock size={18}/> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-md hover:border-blue-100">
                      <div className="text-blue-500 mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 leading-normal mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: The Data Pipeline Visual */}
              <div className="relative group">
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  {[
                    { 
                      step: "01", 
                      label: "Local Trust Evaluation", 
                      sub: "Vehicle-to-Vehicle (V2V) Interaction History",
                      icon: <Activity size={20} className="text-blue-500" />
                    },
                    { 
                      step: "02", 
                      label: "RSU Aggregation", 
                      sub: "Edge nodes compute regional trust coefficients",
                      icon: <Layers size={20} className="text-indigo-500" />
                    },
                    { 
                      step: "03", 
                      label: "Blockchain Anchoring", 
                      sub: "Hyperledger Fabric ensures global consistency",
                      icon: <Database size={20} className="text-emerald-500" />
                    }
                  ].map((node, idx) => (
                    <div key={idx} className="relative flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm transition-all duration-500 hover:translate-x-2 hover:border-blue-200">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-mono text-sm font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        {node.step}
                      </div>
                      <div className="flex-grow">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Process Step</p>
                        <h4 className="text-slate-900 font-bold text-sm">{node.label}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{node.sub}</p>
                      </div>
                      <div className="p-2">
                        {node.icon}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Animated connecting line for the pipeline */}
                <div className="absolute left-12 top-10 bottom-10 w-[2px] bg-gradient-to-b from-blue-100 via-indigo-100 to-emerald-100 z-0" />
              </div>

            </div>
          </div>
        </section>


        {/* 4. PERFORMANCE COMPARISON - CLINICAL GLASS */}
        <section id="performance" className="relative w-full mx-auto">
          {/* Standardized Header */}
          <div className="text-center mb-7">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Network Benchmarking</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Hyperledger Fabric vs. Solana</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Central Comparison Badge */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-slate-200 rounded-2xl items-center justify-center z-10 shadow-xl shadow-slate-200/50">
              <Scale className="text-slate-400" size={24} />
            </div>

            {/* Card 1: Hyperledger Fabric (The BIoVAuth Choice) */}
            <div className="group relative bg-white/70 backdrop-blur-md border border-blue-200 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)]">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                  <ShieldCheck size={28} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded-md">Selected Platform</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-2">Hyperledger Fabric</h4>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  A <span className="font-bold">permissioned</span> framework ideal for the Internet of Vehicles (IoV), where identity privacy and organizational control are paramount.
                </p>

                <div className="space-y-3">
                  {[
                    { label: "Privacy", val: "Private Channels / MSP", icon: <Lock size={14}/> },
                    { label: "Latency", val: "Sub-10ms (Local RSU Auth)", icon: <Zap size={14}/> },
                    { label: "Throughput", val: "3,000+ TPS (Modular)", icon: <Activity size={14}/> },
                    { label: "Cost", val: "Zero Gas (Enterprise)", icon: <Cpu size={14}/> }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center gap-2.5 text-slate-400">
                        {stat.icon}
                        <span className="text-[11px] font-bold uppercase tracking-tight">{stat.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Solana (Public High-Throughput) */}
            <div className="group relative bg-white/70 backdrop-blur-md border border-slate-200 rounded-[2.5rem] p-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                  <Globe size={28} />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-md">Public Comparison</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-2">Solana</h4>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  A <span className="font-bold">permissionless</span> ledger optimized for massive throughput and low global latency via Proof of History (PoH).
                </p>

                <div className="space-y-3">
                  {[
                    { label: "Privacy", val: "Public Ledger (Pseudo)", icon: <Lock size={14}/> },
                    { label: "Latency", val: "400ms Block Times", icon: <Zap size={14}/> },
                    { label: "Throughput", val: "65,000+ TPS", icon: <Activity size={14}/> },
                    { label: "Cost", val: "Per-TX Gas Fees", icon: <Cpu size={14}/> }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center gap-2.5 text-slate-400">
                        {stat.icon}
                        <span className="text-[11px] font-bold uppercase tracking-tight">{stat.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-700">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Summary Footer */}
          <div className="mt-12 p-8 bg-blue-50/30 border border-blue-100 rounded-3xl">
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              <span className="font-black uppercase tracking-widest mr-2">The BIoVAuth Verdict:</span>
              While Solana offers higher raw TPS, <span className="font-bold">Hyperledger Fabric</span> was chosen for its support of <span className="font-bold">Private Channels</span> and its ability to integrate with <span className="font-bold">Roadside Units (RSUs)</span> for sub-10ms edge authentication, which is critical for safety-related vehicle messaging.
            </p>
          </div>
        </section>
        
        {/* 3. INTERACTIVE DEMO & MONITOR */}
        <section id="simulation" className="relative w-full mx-auto px-6">
          
          {/* Standardized Header Style */}
          <div className="text-center mb-7">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Real-time Verification</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Interactive Protocol Simulation</h3>
            <p className="mt-4 text-slate-500 text-lg font-light max-w-2xl mx-auto">
              Test the decentralized authentication handshake between the Vehicle, Trusted Authority, and RSU edge nodes.
            </p>
          </div>

          <div className="w-full grid lg:grid-cols-3 gap-8 items-start">
            
            {/* STEPPER CARD */}
            <div className="lg:col-span-2 bg-gray-100 backdrop-blur-xl rounded-[3rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
              <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-6 text-center">
                <h4 className="text-xl font-bold text-slate-800">Live BIoVAuth Simulation</h4>
                <p className="text-slate-500 text-xs tracking-wide uppercase mt-1">Experience the end-to-end authentication methodology</p>
              </div>

              {/* Stepper Container */}
              <div className="p-0">
                <Stepper
                  initialStep={1}
                  onFinalStepCompleted={() => console.log("Demo Complete")}
                  backButtonText="Back"
                  nextButtonText="Next Phase"
                >
                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-slate-900">🚗 Phase 1: Identity Generation</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        The vehicle generates a Decentralized Identifier (DID) linked to a public/private key pair.
                      </p>
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <button
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all"
                          onClick={() => {
                            const newDiD = generateDID();
                            setDid(newDiD);
                            addLog(`✅ DID Generated: ${newDiD.substring(0, 15)}...`);
                          }}
                        >
                          Generate DID
                        </button>
                        {did && (
                          <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Current DID</p>
                            <p className="text-xs font-mono text-slate-600 break-all bg-white p-3 border border-slate-200 rounded mt-1">{did}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-slate-900">📄 Phase 2: Credential Issuance</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">A trusted authority verifies claims and issues a Verifiable Credential (VC).</p>
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <button
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                          disabled={!did}
                          onClick={() => {
                            const { vc, hash } = generateVC(did);
                            setVc(vc); setHash(hash);
                            addLog("📄 Authority issued VC");
                            addLog(`🔐 VC Hash: ${hash.substring(0, 20)}...`);
                          }}
                        >
                          Issue VC
                        </button>
                        {hash && (
                          <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Signed Hash (XVC)</p>
                            <p className="text-[10px] font-mono text-slate-600 break-all bg-white p-3 border border-slate-200 rounded mt-1">{hash}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-slate-900">⛓️ Decentralized Storage</h2>
                      <p className="text-slate-500 text-sm">The VC hash is published to the blockchain ledger.</p>
                      <div className="p-6 bg-slate-900 rounded-xl shadow-inner">
                        <p className="text-emerald-400 font-mono text-[10px] mb-2 tracking-tighter">&gt; Publishing to Ledger...</p>
                        <div className="h-[2px] w-full bg-slate-800 mb-3">
                          <div className="h-full bg-blue-500 animate-pulse w-[70%]" />
                        </div>
                        <p className="text-slate-400 font-mono text-[10px] break-all">{hash || "0x..."}</p>
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4 text-center">
                      <h2 className="text-xl font-bold text-slate-900">📡 Phase 3: RSU Authentication</h2>
                      <p className="text-slate-500 text-sm">RSU verifies the credential hash against the ledger.</p>
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <button
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md"
                          disabled={!vc}
                          onClick={() => {
                            const valid = verifyVC(vc!, hash);
                            setStatus(valid ? "AUTHORIZED" : "REJECTED");
                            addLog(valid ? "🟢 RSU: Authenticated Successfully" : "🔴 RSU: Failed");
                          }}
                        >
                          Authenticate Vehicle
                        </button>
                        {status && (
                          <div className={`mt-6 p-4 rounded-lg inline-block border-2 animate-bounce ${status === "AUTHORIZED" ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-red-50 border-red-500 text-red-700"}`}>
                            <span className="font-black tracking-widest text-xl">{status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </div>
            </div>

            {/* NETWORK MONITOR */}
            <aside className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl h-fit sticky top-24 border border-slate-800">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <Terminal size={18} className="text-blue-400" />
                <h3 className="font-bold text-xs uppercase tracking-widest">Network Monitor</h3>
              </div>
              <div className="space-y-4 min-h-[300px]">
                {logs.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">Waiting for protocol initiation...</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-left-2">
                      <p className="text-[10px] text-blue-400 font-mono">[{log.time}]</p>
                      <p className="text-[11px] font-mono text-slate-300 leading-relaxed">{log.msg}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">System Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 text-[10px] font-bold uppercase">Node Syncing</span>
                </div>
              </div>
            </aside>

          </div>
        </section>

      </div>
        <Footer/>
    </div>
  );
}