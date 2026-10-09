'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp, { EASE } from '@/components/demos/CountUp';

interface Symptom {
  id: string;
  name: string;
  category: string;
}

const SYMPTOMS: Symptom[] = [
  { id: 'fever', name: 'High Fever', category: 'General' },
  { id: 'cough', name: 'Persistent Cough', category: 'Respiratory' },
  { id: 'fatigue', name: 'Chronic Fatigue', category: 'General' },
  { id: 'headache', name: 'Severe Headache', category: 'Neurological' },
  { id: 'shortness_breath', name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'chest_pain', name: 'Chest Tightness', category: 'Cardiovascular' },
  { id: 'joint_pain', name: 'Joint Pain & Stiffness', category: 'Musculoskeletal' },
  { id: 'nausea', name: 'Nausea & Dizziness', category: 'Gastrointestinal' },
];

type Urgency = 'urgent' | 'soon' | 'routine';

interface Prediction {
  disease: string;
  confidence: number;
  doctor: string;
  advice: string;
  urgency: Urgency;
}

const URGENCY: Record<Urgency, { label: string; color: string; bg: string; queue: number }> = {
  urgent: { label: 'Priority — seen first', color: '#C2412D', bg: '#FDECE8', queue: 1 },
  soon: { label: 'Soon — same day', color: '#B7791F', bg: '#FDF4E3', queue: 3 },
  routine: { label: 'Routine', color: '#0E8A7D', bg: '#E4F5F2', queue: 5 },
};

const STEPS = ['Reading symptoms', 'Scoring conditions', 'Matching a specialist'];

const CARD = 'rounded-3xl bg-white border border-[#0F2A33]/[0.08] shadow-[0_24px_60px_-40px_rgba(15,42,51,0.45)]';
const FIELD = 'w-full px-4 py-3 bg-[#F3F8F8] border border-transparent rounded-2xl text-sm text-[#0F2A33] focus:outline-none focus:bg-white focus:border-[#0E8A7D] focus:ring-4 focus:ring-[#0E8A7D]/10 transition';

const ECG = 'M0,30 H60 L68,30 L74,12 L82,48 L90,22 L96,30 H160 L168,30 L174,12 L182,48 L190,22 L196,30 H260 L268,30 L274,12 L282,48 L290,22 L296,30 H360';

function Pulse({ className = '', color = '#0E8A7D' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 360 60" className={className} fill="none" aria-hidden>
      <path d={ECG} stroke={color} strokeOpacity="0.15" strokeWidth="2" />
      <motion.path
        d={ECG}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="0.22 1"
        animate={{ strokeDashoffset: [0.22, -1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}

export default function EHospitalDemo() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [patientName, setPatientName] = useState('Mohana Prasath');
  const [patientAge, setPatientAge] = useState(21);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [queuePos, setQueuePos] = useState(0);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    setPrediction(null);
    setStepIdx(0);

    setTimeout(() => setStepIdx(1), 450);
    setTimeout(() => setStepIdx(2), 900);
    setTimeout(() => {
      let result: Prediction = {
        disease: 'Viral Respiratory Infection',
        confidence: 94.2,
        doctor: 'Dr. A. Sharma (Pulmonologist)',
        advice: 'Rest, hydration, and steam inhalation. Monitor oxygen saturation.',
        urgency: 'routine',
      };

      if (selectedSymptoms.includes('chest_pain') || selectedSymptoms.includes('shortness_breath')) {
        result = {
          disease: 'Acute Bronchitis & Cardiac Stress',
          confidence: 96.8,
          doctor: 'Dr. K. Raman (Cardiologist)',
          advice: 'Immediate ECG examination and chest X-ray recommended.',
          urgency: 'urgent',
        };
      } else if (selectedSymptoms.includes('headache') && selectedSymptoms.includes('fever')) {
        result = {
          disease: 'Migraine-Induced Fever & Dehydration',
          confidence: 91.5,
          doctor: 'Dr. S. Priya (Neurologist)',
          advice: 'Avoid bright screens, increase electrolyte intake, and take prescribed analgesics.',
          urgency: 'soon',
        };
      }

      setPrediction(result);
      setQueuePos(URGENCY[result.urgency].queue);
      setIsAnalyzing(false);
    }, 1400);
  };

  // Simulated queue: the patient ahead is called every few seconds
  useEffect(() => {
    if (!prediction || queuePos <= 1) return;
    const t = setTimeout(() => setQueuePos((p) => p - 1), 3500);
    return () => clearTimeout(t);
  }, [prediction, queuePos]);

  const reset = () => {
    setPrediction(null);
    setSelectedSymptoms([]);
  };

  const urgency = prediction ? URGENCY[prediction.urgency] : null;
  const RING = 2 * Math.PI * 34;
  const firstName = patientName.trim().split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-[#EEF5F5] text-[#0F2A33] selection:bg-[#0E8A7D] selection:text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(55% 40% at 100% 0%, rgba(14,138,125,0.14), transparent 70%), radial-gradient(45% 35% at 0% 100%, rgba(56,132,196,0.10), transparent 70%)' }}
      />

      <header className="sticky top-0 z-50 bg-[#EEF5F5]/80 backdrop-blur-xl border-b border-[#0F2A33]/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="text-xs text-[#0F2A33]/55 hover:text-[#0F2A33] transition-colors whitespace-nowrap">
              ← Portfolio
            </Link>
            <div className="h-5 w-px bg-[#0F2A33]/[0.12]" />
            <div className="flex items-center gap-2.5">
              <motion.span
                className="grid place-items-center h-8 w-8 rounded-xl bg-[#0E8A7D] text-white text-lg font-semibold leading-none"
                animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                +
              </motion.span>
              <span className="text-lg font-semibold tracking-tight">MediTriage</span>
            </div>
          </div>
          <Pulse className="hidden sm:block h-8 w-44" />
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="mb-8 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0E8A7D] mb-3">Symptom check · Step {prediction ? 2 : 1} of 2</p>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Hi {firstName}, tell us <span className="text-[#0E8A7D]">how you&apos;re feeling.</span>
          </h1>
          <p className="mt-4 text-sm text-[#0F2A33]/60 leading-relaxed">
            This preview uses simplified rules and illustrative scores — it is not medical advice. The full app (OTP login, NLP +
            Random Forest classifier, live clinic queue) is in the{' '}
            <a href="https://github.com/MohanaPrasathR/E-HOSPITAL" target="_blank" rel="noreferrer" className="underline decoration-[#0E8A7D] underline-offset-2 hover:text-[#0E8A7D]">
              MediTriage repository
            </a>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Intake */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }} className={`${CARD} lg:col-span-3 p-6 sm:p-8 space-y-8`}>
            <section>
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="grid place-items-center h-6 w-6 rounded-full bg-[#0E8A7D]/10 text-[#0E8A7D] text-xs">1</span>
                About you
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label htmlFor="mt-name" className="text-xs text-[#0F2A33]/55 block mb-1.5">Full name</label>
                  <input id="mt-name" type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className={FIELD} />
                </div>
                <div>
                  <label htmlFor="mt-age" className="text-xs text-[#0F2A33]/55 block mb-1.5">Age</label>
                  <input id="mt-age" type="number" min={0} max={120} value={patientAge} onChange={(e) => setPatientAge(Number(e.target.value))} className={FIELD} />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-[#0E8A7D]/10 text-[#0E8A7D] text-xs">2</span>
                  What are you experiencing?
                </h2>
                <AnimatePresence>
                  {selectedSymptoms.length > 0 && (
                    <motion.span
                      key={selectedSymptoms.length}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#0E8A7D] text-white"
                    >
                      {selectedSymptoms.length} selected
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SYMPTOMS.map((symptom, i) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <motion.button
                      key={symptom.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleSymptom(symptom.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.04 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-colors ${
                        isSelected ? 'bg-[#E4F5F2] border-[#0E8A7D]' : 'bg-white border-[#0F2A33]/10 hover:border-[#0E8A7D]/50'
                      }`}
                    >
                      <span>
                        <span className="block text-sm font-medium">{symptom.name}</span>
                        <span className="block text-xs text-[#0F2A33]/50 mt-0.5">{symptom.category}</span>
                      </span>
                      <span className={`grid place-items-center h-6 w-6 rounded-full border shrink-0 transition-colors ${isSelected ? 'bg-[#0E8A7D] border-[#0E8A7D]' : 'border-[#0F2A33]/20'}`}>
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                          <motion.path
                            d="M3.5 8.5l3 3 6-7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{ pathLength: isSelected ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                          />
                        </svg>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            <motion.button
              onClick={handlePredict}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              whileHover={selectedSymptoms.length > 0 && !isAnalyzing ? { y: -2 } : undefined}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-[#0E8A7D] text-white text-sm font-semibold shadow-[0_16px_30px_-16px_rgba(14,138,125,0.9)] disabled:opacity-40 disabled:shadow-none transition-opacity"
            >
              {isAnalyzing ? 'Checking…' : selectedSymptoms.length === 0 ? 'Select at least one symptom' : 'Check my symptoms →'}
            </motion.button>
          </motion.div>

          {/* Result */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className={`${CARD} lg:col-span-2 p-6 sm:p-8 lg:sticky lg:top-24 min-h-[26rem] flex flex-col`}>
            <AnimatePresence mode="wait">
              {!prediction && !isAnalyzing && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
                  <div className="relative h-24 w-24">
                    {[0, 1].map((i) => (
                      <motion.span
                        key={i}
                        className="absolute inset-0 rounded-full border border-[#0E8A7D]/40"
                        animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
                      />
                    ))}
                    <span className="absolute inset-0 grid place-items-center rounded-full bg-[#E4F5F2] text-[#0E8A7D] text-3xl font-light">+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Your assessment appears here</p>
                    <p className="text-sm text-[#0F2A33]/55 mt-1 max-w-[16rem]">Pick your symptoms and we&apos;ll suggest a likely condition and the right specialist.</p>
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div key="busy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center gap-6 py-8">
                  <Pulse className="w-full h-16" />
                  <ul className="space-y-3">
                    {STEPS.map((s, i) => (
                      <li key={s} className={`flex items-center gap-3 text-sm transition-colors ${i <= stepIdx ? 'text-[#0F2A33]' : 'text-[#0F2A33]/30'}`}>
                        <span className={`h-2 w-2 rounded-full ${i < stepIdx ? 'bg-[#0E8A7D]' : i === stepIdx ? 'bg-[#0E8A7D] animate-pulse' : 'bg-[#0F2A33]/15'}`} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {prediction && urgency && (
                <motion.div
                  key="result"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  variants={{ show: { transition: { staggerChildren: 0.09 } } }}
                  className="flex-1 flex flex-col gap-4"
                >
                  <motion.span
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    className="self-start text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ color: urgency.color, background: urgency.bg }}
                  >
                    ● {urgency.label}
                  </motion.span>

                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0">
                      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#0F2A33" strokeOpacity="0.08" strokeWidth="7" />
                        <motion.circle
                          cx="40" cy="40" r="34" fill="none" stroke={urgency.color} strokeWidth="7" strokeLinecap="round"
                          strokeDasharray={RING}
                          initial={{ strokeDashoffset: RING }}
                          animate={{ strokeDashoffset: RING * (1 - prediction.confidence / 100) }}
                          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                        />
                      </svg>
                      <span className="absolute inset-0 grid place-items-center text-sm font-semibold tabular-nums">
                        <span><CountUp value={prediction.confidence} format={(v) => v.toFixed(0)} duration={1.2} />%</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-[#0F2A33]/50">Likely condition · illustrative score</p>
                      <h3 className="text-xl font-semibold leading-snug mt-0.5">{prediction.disease}</h3>
                    </div>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="p-4 rounded-2xl bg-[#F3F8F8]">
                    <p className="text-xs text-[#0F2A33]/50 mb-1">What to do</p>
                    <p className="text-sm leading-relaxed">{prediction.advice}</p>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="p-4 rounded-2xl border border-[#0F2A33]/10">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-[#0F2A33]/50 mb-1">Your specialist</p>
                        <p className="text-sm font-semibold">{prediction.doctor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#0F2A33]/50 mb-1">Queue</p>
                        <AnimatePresence mode="popLayout">
                          <motion.p key={queuePos} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="text-sm font-semibold tabular-nums" style={{ color: urgency.color }}>
                            {queuePos <= 1 ? "You're next" : `#${queuePos} in line`}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <AnimatePresence initial={false}>
                        {Array.from({ length: queuePos }).map((_, i) => (
                          <motion.span
                            key={queuePos - i}
                            layout
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="h-2.5 rounded-full"
                            style={{ width: i === queuePos - 1 ? 28 : 10, background: i === queuePos - 1 ? urgency.color : 'rgba(15,42,51,0.18)' }}
                          />
                        ))}
                      </AnimatePresence>
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-[#0F2A33]/35">simulated queue</span>
                    </div>
                  </motion.div>

                  <motion.button
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                    onClick={reset}
                    className="mt-auto text-sm text-[#0F2A33]/55 hover:text-[#0E8A7D] transition-colors self-center pt-2"
                  >
                    ↺ Start a new check
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="text-center text-[11px] text-[#0F2A33]/40 mt-10">Flask · SQLAlchemy · scikit-learn · Server-Sent Events</p>
      </main>
    </div>
  );
}
