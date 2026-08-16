'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Seat {
  id: string;
  row: string;
  num: number;
  price: number;
  status: 'available' | 'selected' | 'booked';
}

export default function StadiumDemo() {
  const [selectedSection, setSelectedSection] = useState('VIP Box');
  const [seats, setSeats] = useState<Seat[]>([
    { id: 'A1', row: 'A', num: 1, price: 150, status: 'available' },
    { id: 'A2', row: 'A', num: 2, price: 150, status: 'booked' },
    { id: 'A3', row: 'A', num: 3, price: 150, status: 'available' },
    { id: 'A4', row: 'A', num: 4, price: 150, status: 'available' },
    { id: 'B1', row: 'B', num: 1, price: 100, status: 'available' },
    { id: 'B2', row: 'B', num: 2, price: 100, status: 'booked' },
    { id: 'B3', row: 'B', num: 3, price: 100, status: 'available' },
    { id: 'B4', row: 'B', num: 4, price: 100, status: 'available' },
    { id: 'C1', row: 'C', num: 1, price: 60, status: 'available' },
    { id: 'C2', row: 'C', num: 2, price: 60, status: 'available' },
    { id: 'C3', row: 'C', num: 3, price: 60, status: 'booked' },
    { id: 'C4', row: 'C', num: 4, price: 60, status: 'available' },
  ]);

  const toggleSeat = (id: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          if (s.status === 'booked') return s;
          return { ...s, status: s.status === 'selected' ? 'available' : 'selected' };
        }
        return s;
      })
    );
  };

  const selectedSeats = seats.filter((s) => s.status === 'selected');
  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const confirmBooking = () => {
    setSeats((prev) =>
      prev.map((s) => (s.status === 'selected' ? { ...s, status: 'booked' } : s))
    );
    alert(`Booking Confirmed! Reserved ${selectedSeats.length} seats for $${totalPrice}. SQL Database Table Updated.`);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-sans selection:bg-amber-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0F18]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>🏟️ Stadium Management System</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-600/30 text-amber-400 border border-amber-500/40">DBMS & SQL</span>
          </h1>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Stadium Map & Seat Grid */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pitch Visualization */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-4">Stadium Layout & Ground Field</h2>
            <div className="h-28 rounded-xl bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-sm font-mono text-emerald-300 font-bold shadow-inner">
              ⚽ MAIN MATCH PITCH & PLAYING FIELD 🏟️
            </div>
          </div>

          {/* Section Selector */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest">Select Seating Tier</h2>
              <span className="text-xs font-mono text-gray-400">Green = Available · Red = Selected · Gray = Booked</span>
            </div>

            <div className="flex gap-2 mb-6">
              {['VIP Box', 'North Stand', 'South Pavilion'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all ${
                    selectedSection === sec ? 'bg-amber-600 text-white border-amber-500 font-bold' : 'bg-white/5 border-white/10 text-gray-300'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Seat Matrix */}
            <div className="grid grid-cols-4 gap-4 p-6 rounded-xl bg-black/40 border border-white/10">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.id)}
                  disabled={seat.status === 'booked'}
                  className={`p-4 rounded-xl font-mono text-xs font-bold border flex flex-col items-center justify-center gap-1 transition-all ${
                    seat.status === 'booked'
                      ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                      : seat.status === 'selected'
                      ? 'bg-red-600 border-red-500 text-white shadow-lg scale-105'
                      : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
                  }`}
                >
                  <span>Seat {seat.id}</span>
                  <span className="text-[10px] font-normal">${seat.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Booking & Database Query Console */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-4">Ticket Reservation Summary</h2>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 mb-6">
                <div className="flex justify-between text-xs font-mono text-gray-300">
                  <span>Selected Section:</span>
                  <span className="text-white font-bold">{selectedSection}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-300">
                  <span>Reserved Seats:</span>
                  <span className="text-white font-bold">
                    {selectedSeats.length > 0 ? selectedSeats.map((s) => s.id).join(', ') : 'None'}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-sm font-mono font-bold text-white">
                  <span>Total Cost:</span>
                  <span className="text-amber-400">${totalPrice}</span>
                </div>
              </div>

              <button
                onClick={confirmBooking}
                disabled={selectedSeats.length === 0}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-lg mb-6"
              >
                Confirm & Update Database 🎟️
              </button>

              {/* SQL Relational Query Terminal */}
              <div className="p-4 rounded-xl bg-black border border-white/15 text-[11px] font-mono text-emerald-400 space-y-2">
                <p className="text-gray-500">// Relational SQL Query Console</p>
                <p className="text-amber-300">
                  SELECT seat_id, tier, price FROM seats WHERE stadium_id = &apos;ST-402&apos; AND status = &apos;RESERVED&apos;;
                </p>
                <p className="text-gray-400">&gt; Executing Query... Returned {selectedSeats.length} records.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
