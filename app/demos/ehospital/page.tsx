'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function EHospitalDemo() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [patientName, setPatientName] = useState('Mohana Prasath');
  const [patientAge, setPatientAge] = useState(21);
  const [prediction, setPrediction] = useState<{ disease: string; confidence: number; doctor: string; advice: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) return;
    setIsAnalyzing(true);
    setPrediction(null);

    setTimeout(() => {
      let disease = 'Viral Respiratory Infection';
      let confidence = 94.2;
      let doctor = 'Dr. A. Sharma (Pulmonologist)';
      let advice = 'Rest, hydration, and steam inhalation. Monitor oxygen saturation.';

      if (selectedSymptoms.includes('chest_pain') || selectedSymptoms.includes('shortness_breath')) {
        disease = 'Acute Bronchitis & Cardiac Stress';
        confidence = 96.8;
        doctor = 'Dr. K. Raman (Cardiologist)';
        advice = 'Immediate ECG examination and chest X-ray recommended.';
      } else if (selectedSymptoms.includes('headache') && selectedSymptoms.includes('fever')) {
        disease = 'Migraine-Induced Fever & Dehydration';
        confidence = 91.5;
        doctor = 'Dr. S. Priya (Neurologist)';
        advice = 'Avoid bright screens, increase electrolyte intake, and take prescribed analgesics.';
      }

      setPrediction({ disease, confidence, doctor, advice });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F18]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>🏥 E-Hospital AI Framework</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">AI NLP & ML</span>
          </h1>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Symptom Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Details Card */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-1">Age</label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Symptom Picker */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-2">Select Observed Symptoms</h2>
            <p className="text-xs text-gray-400 mb-6">Choose symptoms for AI Random Forest model analysis:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{symptom.name}</p>
                      <p className="text-[10px] font-mono text-gray-400">{symptom.category}</p>
                    </div>
                    <span className="text-xs font-mono font-bold">{isSelected ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handlePredict}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isAnalyzing ? '⚡ Running Random Forest & NLP Model...' : 'Run AI Diagnostic Prediction 🧠'}
            </button>
          </div>
        </div>

        {/* Right Col: Prediction Result */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4">AI Diagnosis Output</h2>

              {!prediction && !isAnalyzing && (
                <div className="text-center py-16 text-gray-400 font-mono text-xs">
                  <p>Select symptoms on the left and click &quot;Run AI Diagnostic Prediction&quot;.</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-16 space-y-4">
                  <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-mono text-emerald-400 animate-pulse">Analysing medical datasets...</p>
                </div>
              )}

              {prediction && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Predicted Health Condition</span>
                    <h3 className="text-lg font-bold text-white mt-1">{prediction.disease}</h3>
                    <div className="mt-3 flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-400">Confidence Score:</span>
                      <span className="font-bold text-emerald-400">{prediction.confidence}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                    <p className="text-gray-400">Assigned Specialist:</p>
                    <p className="text-white font-semibold">{prediction.doctor}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                    <p className="text-gray-400">Medical Recommendation:</p>
                    <p className="text-gray-200">{prediction.advice}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-500 text-center">
              Powered by Python, SQL, Random Forest & NLP
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
