'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: number;
  hotelName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  bookingStatus: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  totalRevenue: number;
}

interface MonthlyTrend {
  yearMonth: string;
  totalRevenue: number;
  bookingCount: number;
}

interface HotelRevenue {
  hotelName: string;
  totalRevenue: number;
  bookingCount: number;
}

const INITIAL_BOOKINGS: Booking[] = [
  { id: 1, hotelName: 'Grand Horizon Resort', guestName: 'Alexander Wright', checkInDate: '2026-05-10', checkOutDate: '2026-05-15', guests: 2, roomType: 'DELUXE', bookingStatus: 'CHECKED_OUT', totalRevenue: 1250.00 },
  { id: 2, hotelName: 'Grand Horizon Resort', guestName: 'Sophia Martinez', checkInDate: '2026-05-18', checkOutDate: '2026-05-22', guests: 1, roomType: 'SINGLE', bookingStatus: 'CHECKED_OUT', totalRevenue: 600.00 },
  { id: 3, hotelName: 'Grand Horizon Resort', guestName: 'David Chen', checkInDate: '2026-06-01', checkOutDate: '2026-06-07', guests: 4, roomType: 'SUITE', bookingStatus: 'CHECKED_OUT', totalRevenue: 2400.00 },
  { id: 4, hotelName: 'Royal Palm Haven', guestName: 'Emma Watson', checkInDate: '2026-06-12', checkOutDate: '2026-06-15', guests: 2, roomType: 'DOUBLE', bookingStatus: 'CHECKED_OUT', totalRevenue: 900.00 },
  { id: 5, hotelName: 'Royal Palm Haven', guestName: 'Michael Brown', checkInDate: '2026-07-01', checkOutDate: '2026-07-05', guests: 2, roomType: 'DELUXE', bookingStatus: 'CHECKED_OUT', totalRevenue: 1500.00 },
  { id: 6, hotelName: 'Royal Palm Haven', guestName: 'Olivia Davis', checkInDate: '2026-07-10', checkOutDate: '2026-07-12', guests: 1, roomType: 'SINGLE', bookingStatus: 'CANCELLED', totalRevenue: 300.00 },
  { id: 7, hotelName: 'Starlight Palace Hotel', guestName: 'James Wilson', checkInDate: '2026-07-20', checkOutDate: '2026-07-27', guests: 2, roomType: 'PRESIDENTIAL', bookingStatus: 'CHECKED_OUT', totalRevenue: 5600.00 },
  { id: 8, hotelName: 'Starlight Palace Hotel', guestName: 'Isabella Garcia', checkInDate: '2026-08-01', checkOutDate: '2026-08-04', guests: 3, roomType: 'DELUXE', bookingStatus: 'CHECKED_IN', totalRevenue: 1100.00 },
  { id: 9, hotelName: 'Starlight Palace Hotel', guestName: 'Liam Miller', checkInDate: '2026-08-15', checkOutDate: '2026-08-20', guests: 2, roomType: 'SUITE', bookingStatus: 'CONFIRMED', totalRevenue: 1850.00 },
  { id: 10, hotelName: 'Azure Bay Suites', guestName: 'Ethan Taylor', checkInDate: '2026-08-22', checkOutDate: '2026-08-25', guests: 2, roomType: 'DOUBLE', bookingStatus: 'CONFIRMED', totalRevenue: 750.00 },
  { id: 11, hotelName: 'Azure Bay Suites', guestName: 'Charlotte Anderson', checkInDate: '2026-09-02', checkOutDate: '2026-09-08', guests: 2, roomType: 'SUITE', bookingStatus: 'CONFIRMED', totalRevenue: 2100.00 },
  { id: 12, hotelName: 'Azure Bay Suites', guestName: 'Benjamin Thomas', checkInDate: '2026-09-12', checkOutDate: '2026-09-14', guests: 1, roomType: 'SINGLE', bookingStatus: 'CONFIRMED', totalRevenue: 380.00 }
];

export default function HotelRevenueDemo() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [formError, setFormError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    hotelName: 'Grand Horizon Resort',
    guestName: '',
    checkInDate: '2026-10-01',
    checkOutDate: '2026-10-07',
    roomType: 'DELUXE',
    guests: 2,
    bookingStatus: 'CONFIRMED',
    totalRevenue: 1450.00,
  });

  // Attempt to fetch live from Spring Boot backend if available
  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await fetch('http://localhost:8080/api/bookings');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBookings(data);
            setIsLiveApi(true);
          }
        }
      } catch {
        // Fallback to initial seed data
        setIsLiveApi(false);
      }
    }
    checkBackend();
  }, []);

  // Compute Metrics
  const activeBookings = bookings.filter((b) => b.bookingStatus !== 'CANCELLED');
  const totalRevenue = activeBookings.reduce((sum, b) => sum + Number(b.totalRevenue), 0);
  const avgTicket = activeBookings.length > 0 ? totalRevenue / activeBookings.length : 0;

  // Monthly breakdown
  const monthlyMap: { [key: string]: number } = {};
  activeBookings.forEach((b) => {
    const month = b.checkInDate.substring(0, 7);
    monthlyMap[month] = (monthlyMap[month] || 0) + Number(b.totalRevenue);
  });
  const monthlyTrends: MonthlyTrend[] = Object.keys(monthlyMap)
    .sort()
    .map((ym) => ({
      yearMonth: ym,
      totalRevenue: monthlyMap[ym],
      bookingCount: activeBookings.filter((b) => b.checkInDate.startsWith(ym)).length,
    }));
  const maxMonthRev = Math.max(...monthlyTrends.map((m) => m.totalRevenue), 1);

  // Hotel property breakdown
  const hotelMap: { [key: string]: { rev: number; count: number } } = {};
  activeBookings.forEach((b) => {
    if (!hotelMap[b.hotelName]) hotelMap[b.hotelName] = { rev: 0, count: 0 };
    hotelMap[b.hotelName].rev += Number(b.totalRevenue);
    hotelMap[b.hotelName].count += 1;
  });
  const hotelList: HotelRevenue[] = Object.keys(hotelMap)
    .map((name) => ({
      hotelName: name,
      totalRevenue: hotelMap[name].rev,
      bookingCount: hotelMap[name].count,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  const topHotel = hotelList[0] || { hotelName: 'N/A', totalRevenue: 0 };

  // Status breakdown
  const statusCounts = {
    CONFIRMED: bookings.filter((b) => b.bookingStatus === 'CONFIRMED').length,
    CHECKED_IN: bookings.filter((b) => b.bookingStatus === 'CHECKED_IN').length,
    CHECKED_OUT: bookings.filter((b) => b.bookingStatus === 'CHECKED_OUT').length,
    CANCELLED: bookings.filter((b) => b.bookingStatus === 'CANCELLED').length,
  };

  // Filtered Bookings for Table
  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || b.bookingStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      setFormError(`Check-out date (${formData.checkOutDate}) must be strictly after check-in date (${formData.checkInDate})`);
      return;
    }

    const newBooking: Booking = {
      id: bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
      hotelName: formData.hotelName,
      guestName: formData.guestName,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      guests: Number(formData.guests),
      roomType: formData.roomType,
      bookingStatus: formData.bookingStatus as Booking['bookingStatus'],
      totalRevenue: Number(formData.totalRevenue),
    };

    // If live API is connected, dispatch POST
    if (isLiveApi) {
      try {
        const res = await fetch('http://localhost:8080/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setBookings((prev) => [created, ...prev]);
        } else {
          const err = await res.json();
          setFormError(err.message || 'Error creating booking on live server');
          return;
        }
      } catch {
        setBookings((prev) => [newBooking, ...prev]);
      }
    } else {
      setBookings((prev) => [newBooking, ...prev]);
    }

    setIsModalOpen(false);
    setFormData({
      hotelName: 'Grand Horizon Resort',
      guestName: '',
      checkInDate: '2026-10-01',
      checkOutDate: '2026-10-07',
      roomType: 'DELUXE',
      guests: 2,
      bookingStatus: 'CONFIRMED',
      totalRevenue: 1450.00,
    });
  };

  const handleDelete = (id: number) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (isLiveApi) {
      fetch(`http://localhost:8080/api/bookings/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#0A0F1D]/85 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/#projects" className="text-xs font-mono text-slate-400 hover:text-white transition-colors">
              ← Portfolio
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏨</span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-white">Hotel Revenue Analytics</h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    Spring Boot 3 · Java 22
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">Financial Yield & Reservation Intelligence</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
              <span className="text-slate-300">{isLiveApi ? 'API Connected (:8080)' : 'Interactive Mode'}</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              + New Reservation
            </button>

            <a
              href="http://localhost:8080/swagger-ui/index.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
            >
              Swagger API ↗
            </a>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Revenue */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Total Gross Revenue</div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 text-xs text-slate-400 font-mono">
              <span className="text-emerald-400 font-semibold">{activeBookings.length}</span> active reservations
            </div>
          </div>

          {/* Average Ticket Size */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Mean Ticket Size</div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight text-blue-400">
              ${avgTicket.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 text-xs text-slate-400 font-mono">Average yield per booking</div>
          </div>

          {/* Top Property */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Top Grossing Hotel</div>
            <div className="text-xl font-bold text-white tracking-tight truncate text-purple-400">{topHotel.hotelName}</div>
            <div className="mt-2 text-xs text-slate-400 font-mono">
              ${topHotel.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} revenue
            </div>
          </div>

          {/* Total Records */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Total Bookings</div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight text-amber-400">{bookings.length}</div>
            <div className="mt-2 text-xs text-slate-400 font-mono">Stored in database</div>
          </div>
        </div>

        {/* VISUAL CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Revenue Bar Chart */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📈</span> Monthly Revenue Yield
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Time-series financial trend (YYYY-MM)</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                Active Yield
              </span>
            </div>

            {/* Custom Interactive SVG / Bar Chart */}
            <div className="h-64 flex items-end gap-3 pt-6 pb-2 border-b border-white/10">
              {monthlyTrends.map((m) => {
                const heightPct = Math.round((m.totalRevenue / maxMonthRev) * 100);
                return (
                  <div key={m.yearMonth} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-[10px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${m.totalRevenue.toLocaleString()}
                    </div>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600/40 to-teal-400 border border-emerald-400/30 group-hover:from-emerald-500 group-hover:to-teal-300 transition-all duration-300 relative"
                      style={{ height: `${Math.max(heightPct, 12)}%` }}
                    />
                    <span className="text-[11px] font-mono text-slate-400 mt-1">{m.yearMonth}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Breakdown Donut / Breakdown */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <span>🎯</span> Operational Status
              </h2>
              <p className="text-xs text-slate-400 font-mono mb-6">Reservation lifecycle states</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'CONFIRMED', count: statusCounts.CONFIRMED, color: 'bg-blue-500' },
                { label: 'CHECKED_IN', count: statusCounts.CHECKED_IN, color: 'bg-emerald-500' },
                { label: 'CHECKED_OUT', count: statusCounts.CHECKED_OUT, color: 'bg-slate-400' },
                { label: 'CANCELLED', count: statusCounts.CANCELLED, color: 'bg-rose-500' },
              ].map((s) => {
                const pct = bookings.length > 0 ? Math.round((s.count / bookings.length) * 100) : 0;
                return (
                  <div key={s.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">{s.label}</span>
                      <span className="font-bold text-white">
                        {s.count} <span className="text-slate-500 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HOTEL PROPERTY LEADERBOARD */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🏆</span> Property Performance Leaderboard
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Ranked by gross cumulative income</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelList.map((h, i) => {
              const pct = totalRevenue > 0 ? Math.round((h.totalRevenue / totalRevenue) * 100) : 0;
              const rankIcon = ['🥇', '🥈', '🥉', '4️⃣'][i] || `#${i + 1}`;
              return (
                <div key={h.hotelName} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5 truncate">
                      <span>{rankIcon}</span>
                      <span className="truncate">{h.hotelName}</span>
                    </span>
                  </div>
                  <div className="text-lg font-mono font-extrabold text-emerald-400">
                    ${h.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{h.bookingCount} reservations</span>
                    <span>{pct}% share</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESERVATIONS DATA TABLE */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>📋</span> Reservations Table
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Search and filter active guest records</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hotel or guest..."
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-48 sm:w-60"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CHECKED_IN">CHECKED_IN</option>
                <option value="CHECKED_OUT">CHECKED_OUT</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Hotel Property</th>
                  <th className="py-3 px-4">Guest Name</th>
                  <th className="py-3 px-4">Check-In / Out</th>
                  <th className="py-3 px-4">Room Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-400">#{b.id}</td>
                    <td className="py-3 px-4 font-sans font-medium text-white">{b.hotelName}</td>
                    <td className="py-3 px-4 text-slate-300">{b.guestName}</td>
                    <td className="py-3 px-4 text-[11px] text-slate-400">
                      {b.checkInDate} ➔ {b.checkOutDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300">
                        {b.roomType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          b.bookingStatus === 'CONFIRMED'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : b.bookingStatus === 'CHECKED_IN'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : b.bookingStatus === 'CHECKED_OUT'
                            ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      ${Number(b.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete booking"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* NEW RESERVATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] rounded-2xl w-full max-w-lg p-6 border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Create New Reservation</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddBooking} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Hotel Property</label>
                <select
                  value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Grand Horizon Resort">Grand Horizon Resort</option>
                  <option value="Starlight Palace Hotel">Starlight Palace Hotel</option>
                  <option value="Royal Palm Haven">Royal Palm Haven</option>
                  <option value="Azure Bay Suites">Azure Bay Suites</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Guest Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    required
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    required
                    value={formData.checkOutDate}
                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Room Type</label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="SINGLE">SINGLE</option>
                    <option value="DOUBLE">DOUBLE</option>
                    <option value="DELUXE">DELUXE</option>
                    <option value="SUITE">SUITE</option>
                    <option value="PRESIDENTIAL">PRESIDENTIAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.bookingStatus}
                    onChange={(e) => setFormData({ ...formData, bookingStatus: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CHECKED_IN">CHECKED_IN</option>
                    <option value="CHECKED_OUT">CHECKED_OUT</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Total Revenue ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  value={formData.totalRevenue}
                  onChange={(e) => setFormData({ ...formData, totalRevenue: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  Create Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
