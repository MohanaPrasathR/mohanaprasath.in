'use client';

import { useEffect, useReducer, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from '@/components/ui/CountUp';

type Policy = 'LRU' | 'FIFO' | 'LFU';

interface CacheBlock {
  address: string;
  insertedAt: number;
  lastUsed: number;
  frequency: number;
}

interface LogEntry {
  step: number;
  kind: 'hit' | 'miss' | 'evict';
  text: string;
}

interface SimState {
  cache: CacheBlock[];
  hits: number;
  misses: number;
  step: number;
  logs: LogEntry[];
  last: { index: number; kind: LogEntry['kind']; evicted?: string } | null;
}

type SimAction = { type: 'access'; address: string; policy: Policy; size: number } | { type: 'reset' };

const INITIAL: SimState = { cache: [], hits: 0, misses: 0, step: 0, logs: [], last: null };
const DEFAULT_TRACE = '0x1A 0x2B 0x3C 0x1A 0x4D 0x5E 0x1A 0x2B 0x6F 0x3C';

const POLICY_NOTE: Record<Policy, string> = {
  LRU: 'evicts the line untouched for the longest',
  FIFO: 'evicts the line that was loaded first',
  LFU: 'evicts the line with the fewest accesses',
};

// Index of the line `policy` would throw out next
function victimIndex(cache: CacheBlock[], policy: Policy) {
  const older = (a: CacheBlock, b: CacheBlock) => {
    if (policy === 'FIFO') return a.insertedAt < b.insertedAt;
    if (policy === 'LFU') return a.frequency < b.frequency || (a.frequency === b.frequency && a.lastUsed < b.lastUsed);
    return a.lastUsed < b.lastUsed;
  };
  return cache.reduce((min, b, idx, arr) => (older(b, arr[min]) ? idx : min), 0);
}

function reducer(state: SimState, action: SimAction): SimState {
  if (action.type === 'reset') return INITIAL;

  const { address, policy, size } = action;
  const step = state.step + 1;
  const hitIndex = state.cache.findIndex((b) => b.address === address);

  if (hitIndex !== -1) {
    return {
      ...state,
      step,
      hits: state.hits + 1,
      cache: state.cache.map((b, i) => (i === hitIndex ? { ...b, lastUsed: step, frequency: b.frequency + 1 } : b)),
      logs: [{ step, kind: 'hit', text: `HIT   ${address} found in line ${hitIndex}` }, ...state.logs],
      last: { index: hitIndex, kind: 'hit' },
    };
  }

  const fresh: CacheBlock = { address, insertedAt: step, lastUsed: step, frequency: 1 };

  if (state.cache.length < size) {
    return {
      ...state,
      step,
      misses: state.misses + 1,
      cache: [...state.cache, fresh],
      logs: [{ step, kind: 'miss', text: `MISS  ${address} loaded into line ${state.cache.length}` }, ...state.logs],
      last: { index: state.cache.length, kind: 'miss' },
    };
  }

  const victim = victimIndex(state.cache, policy);
  const evicted = state.cache[victim].address;
  const cache = [...state.cache];
  cache[victim] = fresh;
  return {
    ...state,
    step,
    misses: state.misses + 1,
    cache,
    logs: [{ step, kind: 'evict', text: `MISS  ${address} → line ${victim}, evicted ${evicted} (${policy})` }, ...state.logs],
    last: { index: victim, kind: 'evict', evicted },
  };
}

// "1a", "0x1A" and "0X1a" all become "0x1A"; anything non-hex is rejected
function normalise(raw: string) {
  const hex = raw.trim().replace(/^0x/i, '');
  return /^[0-9a-f]{1,8}$/i.test(hex) ? `0x${hex.toUpperCase()}` : null;
}

const GREEN = '#7CFF6B';
const RED = '#FF5A4F';
const AMBER = '#FFB000';
const KIND_COLOR = { hit: GREEN, miss: AMBER, evict: RED };

const PANEL = 'border border-[#7CFF6B]/15 bg-[#0D120D]/80 rounded-md';
const TITLE = 'text-[10px] uppercase tracking-[0.25em] text-[#7CFF6B]/60';

export default function CacheSimulatorDemo() {
  const [cacheSize, setCacheSize] = useState<number>(4);
  const [policy, setPolicy] = useState<Policy>('LRU');
  const [inputAddress, setInputAddress] = useState('0x10');
  const [inputError, setInputError] = useState(false);
  const [trace, setTrace] = useState(DEFAULT_TRACE);
  const [queue, setQueue] = useState<string[]>([]);
  const [sim, dispatch] = useReducer(reducer, INITIAL);

  const playing = queue.length > 0;

  // Replay the queued trace one access at a time
  useEffect(() => {
    if (queue.length === 0) return;
    const t = setTimeout(() => {
      dispatch({ type: 'access', address: queue[0], policy, size: cacheSize });
      setQueue((q) => q.slice(1));
    }, 650);
    return () => clearTimeout(t);
  }, [queue, policy, cacheSize]);

  const resetSimulator = () => {
    setQueue([]);
    dispatch({ type: 'reset' });
  };

  const accessMemory = () => {
    const address = inputAddress.trim()
      ? normalise(inputAddress)
      : `0x${Math.floor(Math.random() * 90 + 10).toString(16).toUpperCase()}`;
    if (!address) {
      setInputError(true);
      return;
    }
    setInputError(false);
    dispatch({ type: 'access', address, policy, size: cacheSize });
  };

  const traceAddresses = trace.split(/[\s,]+/).filter(Boolean).map(normalise);
  const traceValid = traceAddresses.length > 0 && traceAddresses.every(Boolean);
  const runTrace = () => {
    if (!traceValid) return;
    dispatch({ type: 'reset' });
    setQueue(traceAddresses as string[]);
  };

  const totalAccesses = sim.hits + sim.misses;
  const hitRate = totalAccesses > 0 ? (sim.hits / totalAccesses) * 100 : 0;
  const nextVictim = sim.cache.length === cacheSize ? victimIndex(sim.cache, policy) : -1;
  const lastColor = sim.last ? KIND_COLOR[sim.last.kind] : GREEN;

  return (
    <div className="min-h-screen bg-[#070A07] text-[#C9F5C2] font-mono selection:bg-[#7CFF6B] selection:text-black relative overflow-hidden">
      {/* PCB grid + slow scanline */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,255,107,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,255,107,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 75%)',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#7CFF6B]/[0.04] to-transparent"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />

      <header className="sticky top-0 z-50 bg-[#070A07]/85 backdrop-blur-md border-b border-[#7CFF6B]/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/#projects" className="text-[#7CFF6B]/50 hover:text-[#7CFF6B] transition-colors whitespace-nowrap">
              ← portfolio
            </Link>
            <span className="text-[#7CFF6B]/25">│</span>
            <span className="text-[#7CFF6B] truncate">
              cache-sim<span className="text-[#7CFF6B]/40">@l1</span>:~$
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], ease: 'linear' }} className="inline-block w-2 h-3.5 bg-[#7CFF6B] ml-1.5 align-middle" />
            </span>
          </div>
          <span className="hidden sm:inline text-[#7CFF6B]/45">{cacheSize} lines · fully associative · {policy}</span>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl sm:text-4xl font-medium text-white tracking-tight">
            Cache Memory <span style={{ color: GREEN, textShadow: `0 0 24px ${GREEN}66` }}>Simulator</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#C9F5C2]/55 mt-2 max-w-xl">
            Feed the CPU a stream of addresses and watch which ones are already cached, which miss, and what gets evicted.
          </p>
        </motion.div>

        {/* Data path */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className={`${PANEL} p-4 sm:p-5`}>
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
            <div className="shrink-0 px-3 sm:px-5 py-3 border border-[#7CFF6B]/40 rounded text-[#7CFF6B] text-center">
              CPU
              <div className="text-[9px] text-[#7CFF6B]/50 mt-0.5 tabular-nums">step {sim.step}</div>
            </div>

            <div className="relative flex-1 h-8">
              <div className="absolute top-1/2 inset-x-0 h-px bg-[#7CFF6B]/25" />
              {sim.last && (
                <motion.span
                  key={`a-${sim.step}`}
                  className="absolute top-1/2 -mt-1.5 h-3 w-3 rounded-full"
                  style={{ background: lastColor, boxShadow: `0 0 14px ${lastColor}` }}
                  initial={{ left: '0%', opacity: 1 }}
                  animate={sim.last.kind === 'hit' ? { left: ['0%', '100%', '0%'], opacity: [1, 1, 0] } : { left: '100%', opacity: [1, 1, 0] }}
                  transition={{ duration: sim.last.kind === 'hit' ? 0.55 : 0.3, ease: 'easeInOut' }}
                />
              )}
            </div>

            <motion.div
              key={`c-${sim.step}`}
              initial={{ boxShadow: `0 0 0px ${lastColor}00` }}
              animate={{ boxShadow: sim.last ? [`0 0 0px ${lastColor}00`, `0 0 26px ${lastColor}99`, `0 0 0px ${lastColor}00`] : undefined }}
              transition={{ duration: 0.6 }}
              className="shrink-0 px-3 sm:px-5 py-3 border rounded text-center"
              style={{ borderColor: sim.last ? lastColor : 'rgba(124,255,107,0.4)', color: sim.last ? lastColor : GREEN }}
            >
              L1 CACHE
              <div className="text-[9px] opacity-60 mt-0.5">{sim.last ? (sim.last.kind === 'hit' ? 'hit' : 'miss') : 'idle'}</div>
            </motion.div>

            <div className="relative flex-1 h-8">
              <div className="absolute top-1/2 inset-x-0 h-px border-t border-dashed border-[#7CFF6B]/25" />
              {sim.last && sim.last.kind !== 'hit' && (
                <motion.span
                  key={`b-${sim.step}`}
                  className="absolute top-1/2 -mt-1.5 h-3 w-3 rounded-full"
                  style={{ background: AMBER, boxShadow: `0 0 14px ${AMBER}` }}
                  initial={{ left: '0%', opacity: 0 }}
                  animate={{ left: ['0%', '100%', '0%'], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.5, delay: 0.25, ease: 'easeInOut' }}
                />
              )}
            </div>

            <div className="shrink-0 px-3 sm:px-5 py-3 border border-[#C9F5C2]/20 rounded text-[#C9F5C2]/60 text-center">
              RAM
              <div className="text-[9px] opacity-60 mt-0.5">slow path</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {/* Config + input */}
            <div className={`${PANEL} p-4 sm:p-5 space-y-5`}>
              <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                <div>
                  <div className={`${TITLE} mb-2`}>Lines</div>
                  <div className="flex gap-1.5">
                    {[4, 8, 12].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => { setCacheSize(sz); resetSimulator(); }}
                        className={`px-3 py-1.5 text-xs rounded border transition-colors ${cacheSize === sz ? 'bg-[#7CFF6B] border-[#7CFF6B] text-black font-bold' : 'border-[#7CFF6B]/25 text-[#C9F5C2]/70 hover:border-[#7CFF6B]/60'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={`${TITLE} mb-2`}>Replacement policy</div>
                  <div className="flex gap-1.5">
                    {(['LRU', 'FIFO', 'LFU'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPolicy(p); resetSimulator(); }}
                        className={`relative px-3 py-1.5 text-xs rounded border transition-colors ${policy === p ? 'border-[#7CFF6B] text-black font-bold' : 'border-[#7CFF6B]/25 text-[#C9F5C2]/70 hover:border-[#7CFF6B]/60'}`}
                      >
                        {policy === p && <motion.span layoutId="cs-policy" className="absolute inset-0 rounded-[3px] bg-[#7CFF6B]" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />}
                        <span className="relative">{p}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={resetSimulator} className="ml-auto px-3 py-1.5 text-xs rounded border border-[#FF5A4F]/40 text-[#FF5A4F] hover:bg-[#FF5A4F] hover:text-black transition-colors">
                  reset
                </button>
              </div>
              <p className="text-[11px] text-[#C9F5C2]/45">
                <span className="text-[#7CFF6B]">{policy}</span> {POLICY_NOTE[policy]}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="cs-addr" className={`${TITLE} block mb-2`}>Single access</label>
                  <form onSubmit={(e) => { e.preventDefault(); accessMemory(); }} className="flex gap-2">
                    <motion.input
                      id="cs-addr"
                      type="text"
                      placeholder="hex, e.g. 0x1A — blank = random"
                      value={inputAddress}
                      onChange={(e) => { setInputAddress(e.target.value); setInputError(false); }}
                      animate={inputError ? { x: [0, -5, 5, -3, 0] } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                      aria-invalid={inputError}
                      className={`min-w-0 flex-1 px-3 py-2 bg-black/60 border rounded text-xs text-white placeholder-[#C9F5C2]/25 focus:outline-none ${inputError ? 'border-[#FF5A4F]' : 'border-[#7CFF6B]/25 focus:border-[#7CFF6B]'}`}
                    />
                    <motion.button whileTap={{ scale: 0.95 }} type="submit" disabled={playing} className="px-4 py-2 bg-[#7CFF6B] text-black text-xs font-bold rounded disabled:opacity-40">
                      access
                    </motion.button>
                  </form>
                  {inputError && <p className="text-[11px] text-[#FF5A4F] mt-1.5">Not a hex address.</p>}
                </div>

                <div>
                  <label htmlFor="cs-trace" className={`${TITLE} block mb-2`}>Address trace</label>
                  <div className="flex gap-2">
                    <input
                      id="cs-trace"
                      type="text"
                      value={trace}
                      onChange={(e) => setTrace(e.target.value)}
                      aria-invalid={!traceValid}
                      className={`min-w-0 flex-1 px-3 py-2 bg-black/60 border rounded text-xs text-white focus:outline-none ${traceValid ? 'border-[#7CFF6B]/25 focus:border-[#7CFF6B]' : 'border-[#FF5A4F]'}`}
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={playing ? () => setQueue([]) : runTrace}
                      disabled={!playing && !traceValid}
                      className="px-4 py-2 border border-[#FFB000] text-[#FFB000] hover:bg-[#FFB000] hover:text-black text-xs font-bold rounded transition-colors disabled:opacity-40 whitespace-nowrap"
                    >
                      {playing ? `stop (${queue.length})` : '▶ run'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cache lines */}
            <div className={`${PANEL} p-4 sm:p-5`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={TITLE}>Cache lines</h2>
                <span className="text-[10px] text-[#C9F5C2]/40 tabular-nums">{sim.cache.length}/{cacheSize} valid</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: cacheSize }).map((_, idx) => {
                  const block = sim.cache[idx];
                  const touched = sim.last?.index === idx;
                  const flash = touched && sim.last ? KIND_COLOR[sim.last.kind] : GREEN;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`relative p-3 rounded border h-28 flex flex-col justify-between overflow-hidden ${block ? 'bg-[#7CFF6B]/[0.06] border-[#7CFF6B]/40' : 'border-dashed border-[#C9F5C2]/15'}`}
                    >
                      {touched && (
                        <motion.div
                          key={sim.step}
                          className="absolute inset-0 rounded"
                          initial={{ opacity: 0.7, boxShadow: `inset 0 0 0 2px ${flash}` }}
                          animate={{ opacity: 0 }}
                          transition={{ duration: 0.9 }}
                          style={{ background: `${flash}33` }}
                        />
                      )}
                      <div className="relative flex justify-between text-[9px] uppercase tracking-wider text-[#C9F5C2]/45">
                        <span>line {idx}</span>
                        <span className={idx === nextVictim ? 'text-[#FF5A4F]' : block ? 'text-[#7CFF6B]' : ''}>
                          {idx === nextVictim ? 'next out' : block ? 'valid' : 'empty'}
                        </span>
                      </div>

                      <div className="relative h-8 grid place-items-center overflow-hidden">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.p
                            key={block ? `${block.address}-${block.insertedAt}` : 'empty'}
                            initial={{ y: 18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -18, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`text-xl font-bold ${block ? 'text-white' : 'text-[#C9F5C2]/20'}`}
                          >
                            {block ? block.address : '····'}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      <div className="relative flex justify-between text-[9px] text-[#C9F5C2]/45 tabular-nums">
                        <span>used @{block ? block.lastUsed : '-'}</span>
                        <span>×{block ? block.frequency : '-'}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats + log */}
          <div className={`${PANEL} p-4 sm:p-5 flex flex-col gap-5`}>
            <div>
              <h2 className={`${TITLE} mb-3`}>Hit rate</h2>
              <div className="text-5xl font-bold tabular-nums" style={{ color: GREEN, textShadow: `0 0 28px ${GREEN}55` }}>
                <CountUp value={hitRate} format={(v) => v.toFixed(1)} duration={0.5} />
                <span className="text-xl text-[#7CFF6B]/50">%</span>
              </div>
              <div className="mt-3 h-2 rounded-sm bg-[#FF5A4F]/25 overflow-hidden">
                <motion.div className="h-full bg-[#7CFF6B]" animate={{ width: `${hitRate}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'hits', value: sim.hits, color: GREEN },
                { label: 'misses', value: sim.misses, color: RED },
                { label: 'total', value: totalAccesses, color: '#FFFFFF' },
              ].map((s) => (
                <div key={s.label} className="py-3 rounded border border-[#C9F5C2]/10 bg-black/40">
                  <motion.div key={s.value} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>
                    {s.value}
                  </motion.div>
                  <div className="text-[9px] uppercase tracking-widest text-[#C9F5C2]/45 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <h2 className={`${TITLE} mb-2`}>Trace log</h2>
              <div className="flex-1 min-h-[12rem] max-h-72 overflow-y-auto p-3 rounded bg-black/70 border border-[#C9F5C2]/10 text-[11px] leading-relaxed space-y-1">
                {sim.logs.length === 0 ? (
                  <p className="text-[#C9F5C2]/30">$ waiting for first access…</p>
                ) : (
                  <AnimatePresence initial={false}>
                    {sim.logs.map((log) => (
                      <motion.p key={log.step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="whitespace-pre-wrap break-words">
                        <span className="text-[#C9F5C2]/30">{String(log.step).padStart(3, '0')} </span>
                        <span style={{ color: KIND_COLOR[log.kind] }}>{log.text}</span>
                      </motion.p>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
