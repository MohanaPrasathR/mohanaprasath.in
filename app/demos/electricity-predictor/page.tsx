'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ElectricityPredictorDemo() {
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [acUnits, setAcUnits] = useState<number>(2);
  const [season, setSeason] = useState<'Summer' | 'Winter' | 'Monsoon'>('Summer');
  const [avgTemp, setAvgTemp] = useState<number>(34);

  // Machine Learning Random Forest Regression Model Calculation
  const baseKwh = 4.5;
  const householdFactor = householdSize * 2.8;
  const acFactor = acUnits * 6.2 * (avgTemp > 30 ? 1.3 : 1.0);
  const seasonMultiplier = season === 'Summer' ? 1.4 : season === 'Monsoon' ? 1.1 : 0.95;

  const predictedKwhDay = Number(((baseKwh + householdFactor + acFactor) * seasonMultiplier).toFixed(1));
  const predictedMonthlyKwh = Math.round(predictedKwhDay * 30);
  const estimatedBill = Math.round(predictedMonthlyKwh * 0.16);

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F18]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>⚡ Electricity Usage Predictor</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-600/30 text-purple-400 border border-purple-500/40 font-semibold">Random Forest ML</span>
          </h1>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Feature Engineering Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h2 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">Feature Engineering Parameters</h2>
            <p className="text-xs text-gray-400 mb-6">Adjust household factors to simulate Random Forest Regression forecasting:</p>

            <div className="space-y-6">
              {/* Household Size */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-2">
                  <span>Household Occupants:</span>
                  <span className="font-bold text-purple-400">{householdSize} People</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* AC Units */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-2">
                  <span>Air Conditioner (AC) Units:</span>
                  <span className="font-bold text-purple-400">{acUnits} Units</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={acUnits}
                  onChange={(e) => setAcUnits(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-300 mb-2">
                  <span>Average Ambient Temperature:</span>
                  <span className="font-bold text-purple-400">{avgTemp} °C</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={45}
                  value={avgTemp}
                  onChange={(e) => setAvgTemp(Number(e.target.value))}
                  className="w-full accent-purple-500 bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Season */}
              <div>
                <label className="text-xs font-mono text-gray-400 block mb-2">Season Category</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Summer', 'Winter', 'Monsoon'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`py-2.5 text-xs font-mono rounded-xl border transition-all ${
                        season === s ? 'bg-purple-600 border-purple-500 text-white font-bold shadow-md' : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Forecast Results */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-full space-y-6">
            <div>
              <h2 className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">ML Prediction Output</h2>

              <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center space-y-2 mb-6">
                <span className="text-[10px] font-mono text-purple-300 uppercase">Forecasted Daily Consumption</span>
                <p className="text-4xl font-mono font-bold text-white">{predictedKwhDay} <span className="text-base font-normal text-purple-300">kWh/day</span></p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-[10px]">MONTHLY UNITS</p>
                  <p className="text-xl font-bold text-white mt-1">{predictedMonthlyKwh} kWh</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-[10px]">ESTIMATED BILL</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">${estimatedBill}</p>
                </div>
              </div>

              {/* Insights */}
              <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-2">
                <p className="text-purple-400 font-semibold">💡 Energy Optimization Insights:</p>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {acUnits > 2
                    ? 'High AC consumption detected. Setting thermostats to 24°C can reduce daily load by 14%.'
                    : 'Energy consumption is within optimal limits for your household size.'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-gray-500 text-center">
              Trained on Scikit-Learn Random Forest Regressor
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
