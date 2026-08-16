'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CacheBlock {
  address: string;
  lastUsed: number;
  frequency: number;
}

export default function CacheSimulatorDemo() {
  const [cacheSize, setCacheSize] = useState<number>(4);
  const [policy, setPolicy] = useState<'LRU' | 'FIFO' | 'LFU'>('LRU');
  const [inputAddress, setInputAddress] = useState('0x10');
  const [cache, setCache] = useState<CacheBlock[]>([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const accessMemory = (addr: string) => {
    const formattedAddr = addr.trim().toUpperCase() || `0x${Math.floor(Math.random() * 90 + 10).toString(16)}`;
    const currentStep = step + 1;
    setStep(currentStep);

    setCache((prevCache) => {
      const existingIndex = prevCache.findIndex((b) => b.address === formattedAddr);

      if (existingIndex !== -1) {
        // Cache Hit!
        setHits((h) => h + 1);
        setLogs((l) => [`[STEP ${currentStep}] CACHE HIT! Address ${formattedAddr} found in block ${existingIndex}.`, ...l]);

        return prevCache.map((block, idx) =>
          idx === existingIndex ? { ...block, lastUsed: currentStep, frequency: block.frequency + 1 } : block
        );
      } else {
        // Cache Miss!
        setMisses((m) => m + 1);

        if (prevCache.length < cacheSize) {
          setLogs((l) => [`[STEP ${currentStep}] CACHE MISS. Inserted ${formattedAddr} into empty slot.`, ...l]);
          return [...prevCache, { address: formattedAddr, lastUsed: currentStep, frequency: 1 }];
        } else {
          // Replacement Policy
          let replaceIdx = 0;
          if (policy === 'LRU' || policy === 'FIFO') {
            replaceIdx = prevCache.reduce((minIdx, b, idx, arr) => (b.lastUsed < arr[minIdx].lastUsed ? idx : minIdx), 0);
          } else if (policy === 'LFU') {
            replaceIdx = prevCache.reduce((minIdx, b, idx, arr) => (b.frequency < arr[minIdx].frequency ? idx : minIdx), 0);
          }

          const evictedAddr = prevCache[replaceIdx].address;
          setLogs((l) => [`[STEP ${currentStep}] CACHE MISS. Evicted ${evictedAddr} via ${policy}. Inserted ${formattedAddr}.`, ...l]);

          const newCache = [...prevCache];
          newCache[replaceIdx] = { address: formattedAddr, lastUsed: currentStep, frequency: 1 };
          return newCache;
        }
      }
    });
  };

  const resetSimulator = () => {
    setCache([]);
    setHits(0);
    setMisses(0);
    setLogs([]);
    setStep(0);
  };

  const totalAccesses = hits + misses;
  const hitRate = totalAccesses > 0 ? ((hits / totalAccesses) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F18]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>⚡ Cache Memory Simulator</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-600/30 text-sky-400 border border-sky-500/40 font-semibold">LRU / FIFO / LFU</span>
          </h1>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Controls & Cache Blocks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Settings Bar */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">Cache Lines (Capacity)</label>
              <select
                value={cacheSize}
                onChange={(e) => {
                  setCacheSize(Number(e.target.value));
                  resetSimulator();
                }}
                className="px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-sky-500"
              >
                <option value={4} className="bg-slate-900">4 Blocks</option>
                <option value={8} className="bg-slate-900">8 Blocks</option>
                <option value={12} className="bg-slate-900">12 Blocks</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">Replacement Algorithm</label>
              <div className="flex gap-2">
                {(['LRU', 'FIFO', 'LFU'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPolicy(p);
                      resetSimulator();
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                      policy === p ? 'bg-sky-600 border-sky-500 text-white font-bold' : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={resetSimulator} className="px-4 py-2 bg-red-600/30 hover:bg-red-600 border border-red-500/40 text-white font-mono text-xs font-semibold rounded-lg transition-all">
              Reset Cache
            </button>
          </div>

          {/* Memory Access Input */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">Simulate CPU Memory Access</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Hex Address (e.g. 0x1A, 0x4F)"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                className="px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-sky-500 flex-1"
              />
              <button
                onClick={() => accessMemory(inputAddress)}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-lg"
              >
                Access Memory 🚀
              </button>
            </div>
          </div>

          {/* Cache Slots Grid */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-4">Cache Memory Blocks State</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: cacheSize }).map((_, idx) => {
                const block = cache[idx];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border font-mono text-xs transition-all flex flex-col justify-between h-28 ${
                      block
                        ? 'bg-sky-950/50 border-sky-500/50 text-white shadow-md'
                        : 'bg-white/[0.02] border-white/10 text-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-gray-400">
                      <span>Line {idx}</span>
                      <span>{block ? 'VALID' : 'EMPTY'}</span>
                    </div>

                    <div className="text-center my-2">
                      <p className="text-lg font-bold text-white">{block ? block.address : '---'}</p>
                    </div>

                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Used: #{block ? block.lastUsed : '-'}</span>
                      <span>Freq: {block ? block.frequency : '-'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Performance Analytics & Log Output */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-full space-y-6">
            <div>
              <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-4">Cache Analytics</h2>

              <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <p className="text-gray-400 text-[10px]">CACHE HITS</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{hits}</p>
                </div>
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30">
                  <p className="text-gray-400 text-[10px]">CACHE MISSES</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">{misses}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Hit Rate:</span>
                  <span className="font-bold text-sky-400">{hitRate}%</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Total Accesses:</span>
                  <span className="font-bold text-white">{totalAccesses}</span>
                </div>
              </div>

              {/* Event Logs */}
              <h3 className="text-xs font-mono text-gray-400 uppercase mb-2">Memory Trace Log</h3>
              <div className="p-3 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-gray-300 max-h-56 overflow-y-auto space-y-1.5">
                {logs.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No accesses yet.</p>
                ) : (
                  logs.map((log, i) => <p key={i} className="leading-tight">{log}</p>)
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
