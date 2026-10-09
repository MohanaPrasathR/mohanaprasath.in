'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp, { EASE } from '@/components/ui/CountUp';

type Season = 'Summer' | 'Winter' | 'Monsoon';

const SEASONS: { id: Season; icon: string }[] = [
  { id: 'Summer', icon: '☀' },
  { id: 'Monsoon', icon: '☂' },
  { id: 'Winter', icon: '❄' },
];

// Illustrative shapes used to spread the daily estimate across 24 hours
const BASE_SHAPE = [0.45, 0.4, 0.38, 0.38, 0.4, 0.55, 0.9, 1.25, 1.15, 0.85, 0.75, 0.75, 0.8, 0.75, 0.7, 0.75, 0.9, 1.2, 1.6, 1.75, 1.65, 1.35, 0.95, 0.6];
const AC_SHAPE = [0.9, 0.8, 0.7, 0.55, 0.4, 0.25, 0.15, 0.1, 0.15, 0.3, 0.6, 0.95, 1.3, 1.55, 1.65, 1.55, 1.3, 1.05, 0.95, 1.0, 1.1, 1.15, 1.1, 1.0];
const sum = (a: number[]) => a.reduce((s, v) => s + v, 0);
const BASE_SUM = sum(BASE_SHAPE);
const AC_SUM = sum(AC_SHAPE);

const YELLOW = '#FFD60A';
const CYAN = '#38E1FF';
const DISPLAY = { fontFamily: "var(--font-bebas), 'Bebas Neue', 'Oswald', sans-serif" };

const W = 720;
const H = 260;
const PAD = { l: 34, r: 12, t: 20, b: 28 };
const Y_MAX = 7;
const MAX_DAILY = 95;

const xAt = (h: number) => PAD.l + (h * (W - PAD.l - PAD.r)) / 23;
const yAt = (v: number) => PAD.t + (1 - Math.min(v, Y_MAX) / Y_MAX) * (H - PAD.t - PAD.b);

function smoothPath(values: number[]) {
  let d = `M${xAt(0)},${yAt(values[0])}`;
  for (let h = 1; h < values.length; h++) {
    const cx = (xAt(h - 1) + xAt(h)) / 2;
    d += ` C${cx},${yAt(values[h - 1])} ${cx},${yAt(values[h])} ${xAt(h)},${yAt(values[h])}`;
  }
  return d;
}

const RANGE =
  'w-full h-2 rounded-full appearance-none outline-none ' +
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FFD60A] [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(255,214,10,0.2),0_0_18px_rgba(255,214,10,0.8)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110 ' +
  '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#FFD60A] ' +
  'focus-visible:ring-2 focus-visible:ring-[#FFD60A]/60';

function Slider({ id, label, value, unit, min, max, onChange }: { id: string; label: string; value: number; unit: string; min: number; max: number; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label htmlFor={id} className="text-sm text-white/70">{label}</label>
        <span className="text-3xl leading-none tabular-nums text-white" style={DISPLAY}>
          {value}
          <span className="text-sm text-white/40 ml-1.5 font-sans">{unit}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={RANGE}
        style={{ background: `linear-gradient(90deg, ${YELLOW} ${pct}%, rgba(255,255,255,0.1) ${pct}%)` }}
      />
    </div>
  );
}

export default function ElectricityPredictorDemo() {
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [acUnits, setAcUnits] = useState<number>(2);
  const [season, setSeason] = useState<Season>('Summer');
  const [avgTemp, setAvgTemp] = useState<number>(34);

  // Quick estimator (the trained models live in the VoltCast repository)
  const baseKwh = 4.5;
  const householdFactor = householdSize * 2.8;
  const acFactor = acUnits * 6.2 * (avgTemp > 30 ? 1.3 : 1.0);
  const seasonMultiplier = season === 'Summer' ? 1.4 : season === 'Monsoon' ? 1.1 : 0.95;

  const predictedKwhDay = Number(((baseKwh + householdFactor + acFactor) * seasonMultiplier).toFixed(1));
  const predictedMonthlyKwh = Math.round(predictedKwhDay * 30);
  const estimatedBill = Math.round(predictedMonthlyKwh * 0.16);

  const nonAcDaily = (baseKwh + householdFactor) * seasonMultiplier;
  const acDaily = acFactor * seasonMultiplier;
  const hourly = BASE_SHAPE.map((b, h) => (nonAcDaily * b) / BASE_SUM + (acDaily * AC_SHAPE[h]) / AC_SUM);
  const peakHour = hourly.indexOf(Math.max(...hourly));
  const line = smoothPath(hourly);
  const area = `${line} L${xAt(23)},${H - PAD.b} L${xAt(0)},${H - PAD.b} Z`;

  const load = Math.min(predictedKwhDay / MAX_DAILY, 1);
  const ARC = Math.PI * 90;
  const heavyAc = acUnits > 2;

  return (
    <div className="min-h-screen bg-[#070B16] text-white font-sans selection:bg-[#FFD60A] selection:text-black relative overflow-hidden">
      {/* Glow that brightens with the load */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: YELLOW }}
        animate={{ opacity: 0.05 + load * 0.16, scale: 0.9 + load * 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <div aria-hidden className="pointer-events-none fixed -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full blur-[130px] opacity-[0.12]" style={{ background: CYAN }} />

      <header className="sticky top-0 z-50 bg-[#070B16]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="text-xs text-white/50 hover:text-white transition-colors whitespace-nowrap">
              ← Portfolio
            </Link>
            <div className="h-5 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <motion.svg viewBox="0 0 24 24" className="h-6 w-6" fill={YELLOW} animate={{ filter: [`drop-shadow(0 0 2px ${YELLOW})`, `drop-shadow(0 0 10px ${YELLOW})`, `drop-shadow(0 0 2px ${YELLOW})`] }} transition={{ duration: 2.4, repeat: Infinity }}>
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
              </motion.svg>
              <span className="text-2xl tracking-wide leading-none pt-0.5" style={DISPLAY}>
                VOLT<span style={{ color: YELLOW }}>CAST</span>
              </span>
            </div>
          </div>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] text-white/40">Household energy forecasting</span>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-end justify-between gap-5">
          <h1 className="text-5xl sm:text-7xl leading-[0.9] tracking-wide" style={DISPLAY}>
            How much power will
            <br />
            your home <span style={{ color: YELLOW }}>draw today?</span>
          </h1>
          <div className="flex gap-2 text-[11px]">
            {[
              ['2M', 'readings, UCI dataset'],
              ['−27%', 'error vs last-week baseline'],
            ].map(([big, small]) => (
              <div key={big} className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="text-2xl leading-none" style={{ ...DISPLAY, color: CYAN }}>{big}</div>
                <div className="text-white/45 mt-1">{small}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-white/45 max-w-2xl">
          This page is a quick estimator built on a simple formula, with an illustrative hourly profile. The trained pipeline
          (Ridge vs Random Forest vs Gradient Boosting, leak-free lag features) and its evaluation are in the{' '}
          <a href="https://github.com/MohanaPrasathR/Volt-cast" target="_blank" rel="noreferrer" className="underline decoration-[#FFD60A] underline-offset-2 hover:text-white">
            VoltCast repository
          </a>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }} className="lg:col-span-2 p-6 rounded-3xl bg-white/[0.04] border border-white/10 space-y-7">
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-white/45">Your household</h2>

            <Slider id="vc-people" label="People at home" value={householdSize} unit={householdSize === 1 ? 'person' : 'people'} min={1} max={8} onChange={setHouseholdSize} />
            <Slider id="vc-ac" label="Air conditioners" value={acUnits} unit={acUnits === 1 ? 'unit' : 'units'} min={0} max={5} onChange={setAcUnits} />
            <Slider id="vc-temp" label="Outside temperature" value={avgTemp} unit="°C" min={18} max={45} onChange={setAvgTemp} />

            <div>
              <div className="text-sm text-white/70 mb-3">Season</div>
              <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-black/30">
                {SEASONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeason(s.id)}
                    aria-pressed={season === s.id}
                    className={`relative py-2.5 text-sm rounded-xl transition-colors ${season === s.id ? 'text-black font-semibold' : 'text-white/60 hover:text-white'}`}
                  >
                    {season === s.id && (
                      <motion.span layoutId="vc-season" className="absolute inset-0 rounded-xl" style={{ background: YELLOW }} transition={{ type: 'spring', stiffness: 420, damping: 32 }} />
                    )}
                    <span className="relative">{s.icon} {s.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Forecast */}
          <div className="lg:col-span-3 space-y-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-6">
                <div className="relative w-56 mx-auto">
                  <svg viewBox="0 0 220 124" className="w-full">
                    <defs>
                      <linearGradient id="vc-gauge" x1="0" x2="1">
                        <stop offset="0%" stopColor={CYAN} />
                        <stop offset="60%" stopColor={YELLOW} />
                        <stop offset="100%" stopColor="#FF6B35" />
                      </linearGradient>
                    </defs>
                    <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
                    <motion.path
                      d="M20 110 A90 90 0 0 1 200 110"
                      fill="none"
                      stroke="url(#vc-gauge)"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={ARC}
                      initial={{ strokeDashoffset: ARC }}
                      animate={{ strokeDashoffset: ARC * (1 - load) }}
                      transition={{ type: 'spring', stiffness: 60, damping: 16 }}
                    />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 text-center">
                    <div className="text-6xl leading-none tabular-nums" style={DISPLAY}>
                      <CountUp value={predictedKwhDay} format={(v) => v.toFixed(1)} duration={0.6} />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">kWh / day</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Monthly units</div>
                    <div className="text-4xl mt-1 tabular-nums" style={DISPLAY}>
                      <CountUp value={predictedMonthlyKwh} format={(v) => Math.round(v).toLocaleString('en-US')} duration={0.6} />
                      <span className="text-sm text-white/40 ml-1.5 font-sans">kWh</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">Estimated bill</div>
                    <div className="text-4xl mt-1 tabular-nums" style={{ ...DISPLAY, color: YELLOW }}>
                      $<CountUp value={estimatedBill} format={(v) => Math.round(v).toLocaleString('en-US')} duration={0.6} />
                    </div>
                  </div>
                  <div className="col-span-2 min-h-[4.5rem] p-4 rounded-2xl border" style={{ borderColor: heavyAc ? 'rgba(255,107,53,0.4)' : 'rgba(56,225,255,0.25)', background: heavyAc ? 'rgba(255,107,53,0.07)' : 'rgba(56,225,255,0.05)' }}>
                    <AnimatePresence mode="wait">
                      <motion.p key={String(heavyAc)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="text-sm text-white/80 leading-relaxed">
                        {heavyAc
                          ? 'High AC consumption detected. Setting thermostats to 24°C can reduce daily load by 14%.'
                          : 'Energy consumption is within optimal limits for your household size.'}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.3 }} className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-[11px] uppercase tracking-[0.22em] text-white/45">Hour by hour · illustrative</h2>
                <span className="text-xs text-white/55">
                  peaks around <span style={{ color: YELLOW }} className="tabular-nums">{String(peakHour).padStart(2, '0')}:00</span>
                </span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Estimated hourly electricity use">
                <defs>
                  <linearGradient id="vc-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={YELLOW} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={YELLOW} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 2, 4, 6].map((v) => (
                  <g key={v}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={yAt(v)} y2={yAt(v)} stroke="white" strokeOpacity="0.07" />
                    <text x={PAD.l - 8} y={yAt(v) + 4} textAnchor="end" fontSize="11" fill="white" fillOpacity="0.35">{v}</text>
                  </g>
                ))}
                {[0, 6, 12, 18, 23].map((h) => (
                  <text key={h} x={xAt(h)} y={H - 8} textAnchor="middle" fontSize="11" fill="white" fillOpacity="0.35">{String(h).padStart(2, '0')}h</text>
                ))}
                <motion.path fill="url(#vc-area)" initial={{ d: area, opacity: 0 }} animate={{ d: area, opacity: 1 }} transition={{ duration: 0.6, ease: EASE }} />
                <motion.path
                  fill="none"
                  stroke={YELLOW}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ d: line, pathLength: 0 }}
                  animate={{ d: line, pathLength: 1 }}
                  transition={{ d: { duration: 0.6, ease: EASE }, pathLength: { duration: 1.6, ease: EASE, delay: 0.4 } }}
                  style={{ filter: `drop-shadow(0 0 8px ${YELLOW}99)` }}
                />
                <motion.g initial={false} animate={{ x: xAt(peakHour), y: yAt(hourly[peakHour]) }} transition={{ duration: 0.6, ease: EASE }}>
                  <motion.circle r="12" fill={YELLOW} animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.8, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <circle r="5" fill="#070B16" stroke={YELLOW} strokeWidth="3" />
                </motion.g>
              </svg>
              <p className="text-[11px] text-white/35 mt-1">kWh per hour · evening routines and afternoon cooling drive the peaks</p>
            </motion.div>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/35 pt-4">Python · Pandas · scikit-learn · FastAPI</p>
      </main>
    </div>
  );
}
