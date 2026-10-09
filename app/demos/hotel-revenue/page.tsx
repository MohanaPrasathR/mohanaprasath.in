'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp, { EASE } from '@/components/demos/CountUp';

type BookingStatus = 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';

interface Booking {
  id: number;
  hotelName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  bookingStatus: BookingStatus;
  totalRevenue: number;
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

const HOTELS = ['Grand Horizon Resort', 'Starlight Palace Hotel', 'Royal Palm Haven', 'Azure Bay Suites'];
const ROOM_TYPES = ['SINGLE', 'DOUBLE', 'DELUXE', 'SUITE', 'PRESIDENTIAL'];

const STATUS: Record<BookingStatus, { label: string; color: string }> = {
  CONFIRMED: { label: 'Confirmed', color: '#2F5D8A' },
  CHECKED_IN: { label: 'In house', color: '#2E7D5B' },
  CHECKED_OUT: { label: 'Checked out', color: '#9A9282' },
  CANCELLED: { label: 'Cancelled', color: '#B4483A' },
};
const STATUS_ORDER: BookingStatus[] = ['CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'];

const EMPTY_FORM = {
  hotelName: 'Grand Horizon Resort',
  guestName: '',
  checkInDate: '2026-10-01',
  checkOutDate: '2026-10-07',
  roomType: 'DELUXE',
  guests: 2,
  bookingStatus: 'CONFIRMED',
  totalRevenue: 1450.00,
};

const SERIF = { fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" };
const usd = (n: number, digits = 0) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const monthName = (ym: string) => new Date(`${ym}-01T00:00:00`).toLocaleString('en-US', { month: 'short' });
const shortDate = (d: string) => new Date(`${d}T00:00:00`).toLocaleString('en-US', { month: 'short', day: 'numeric' });

function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

const CARD = 'rounded-[20px] bg-[#FBF8F2] border border-[#1C2B26]/10 shadow-[0_1px_0_rgba(28,43,38,0.04),0_18px_40px_-28px_rgba(28,43,38,0.35)]';
const FIELD = 'w-full px-3.5 py-2.5 bg-white border border-[#1C2B26]/15 rounded-xl text-sm text-[#1C2B26] placeholder-[#1C2B26]/35 focus:outline-none focus:border-[#A9772B] focus:ring-2 focus:ring-[#A9772B]/20 transition';
const LABEL = 'block text-[11px] uppercase tracking-[0.14em] text-[#1C2B26]/55 mb-1.5';

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function HotelRevenueDemo() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [formError, setFormError] = useState('');
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

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

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsModalOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

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
  const monthlyTrends = Object.keys(monthlyMap)
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
  const hotelList = Object.keys(hotelMap)
    .map((name) => ({ hotelName: name, totalRevenue: hotelMap[name].rev, bookingCount: hotelMap[name].count }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);
  const topHotel = hotelList[0] || { hotelName: 'N/A', totalRevenue: 0, bookingCount: 0 };

  const statusCounts = STATUS_ORDER.map((s) => ({
    status: s,
    count: bookings.filter((b) => b.bookingStatus === s).length,
  }));

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
      setFormError(`Check-out (${formData.checkOutDate}) must be after check-in (${formData.checkInDate}).`);
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
      bookingStatus: formData.bookingStatus as BookingStatus,
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
    setFormData(EMPTY_FORM);
  };

  const handleDelete = (id: number) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (isLiveApi) {
      fetch(`http://localhost:8080/api/bookings/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  // Chart geometry
  const W = 640;
  const H = 240;
  const PAD = { l: 16, r: 16, t: 28, b: 34 };
  const n = monthlyTrends.length;
  const xAt = (i: number) => (n === 1 ? W / 2 : PAD.l + 30 + (i * (W - PAD.l - PAD.r - 60)) / (n - 1));
  const yAt = (v: number) => PAD.t + (1 - v / maxMonthRev) * (H - PAD.t - PAD.b);
  const points: [number, number][] = monthlyTrends.map((m, i) => [xAt(i), yAt(m.totalRevenue)]);
  const line = smoothPath(points);
  const area = line ? `${line} L${points[n - 1][0]},${H - PAD.b} L${points[0][0]},${H - PAD.b} Z` : '';

  // Donut geometry
  const R = 54;
  const CIRC = 2 * Math.PI * R;
  let acc = 0;
  const arcs = statusCounts.map((s) => {
    const frac = bookings.length > 0 ? s.count / bookings.length : 0;
    const arc = { ...s, frac, offset: acc };
    acc += frac;
    return arc;
  });

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#1C2B26] selection:bg-[#A9772B] selection:text-white">
      {/* Soft morning light behind the page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(60% 45% at 85% 0%, rgba(169,119,43,0.16), transparent 70%), radial-gradient(50% 40% at 0% 10%, rgba(46,125,91,0.10), transparent 70%)',
        }}
      />

      <header className="sticky top-0 z-40 bg-[#F4EFE6]/80 backdrop-blur-xl border-b border-[#1C2B26]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/#projects" className="text-xs text-[#1C2B26]/55 hover:text-[#1C2B26] transition-colors whitespace-nowrap">
              ← Portfolio
            </Link>
            <div className="h-5 w-px bg-[#1C2B26]/15" />
            <div className="flex items-baseline gap-2.5">
              <span className="text-[26px] leading-none font-semibold tracking-tight" style={SERIF}>
                Stay<span className="italic text-[#A9772B]">Pulse</span>
              </span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] text-[#1C2B26]/45">
                Revenue intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1C2B26]/[0.12] text-[11px] text-[#1C2B26]/70">
              <span className="relative flex h-2 w-2">
                {isLiveApi && <span className="absolute inset-0 rounded-full bg-[#2E7D5B] animate-ping opacity-60" />}
                <span className={`relative h-2 w-2 rounded-full ${isLiveApi ? 'bg-[#2E7D5B]' : 'bg-[#A9772B]'}`} />
              </span>
              {isLiveApi ? 'Live API · :8080' : 'Sample data'}
            </div>
            {isLiveApi && (
              <a
                href="http://localhost:8080/swagger-ui/index.html"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline px-3 py-1.5 rounded-full border border-[#1C2B26]/[0.12] text-[11px] text-[#1C2B26]/70 hover:bg-[#1C2B26]/5 transition-colors"
              >
                Swagger ↗
              </a>
            )}
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#1C2B26] text-[#F4EFE6] text-xs font-medium shadow-[0_10px_24px_-12px_rgba(28,43,38,0.7)] hover:bg-[#24382F] transition-colors"
            >
              + New reservation
            </motion.button>
          </div>
        </div>
      </header>

      <motion.main
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6"
      >
        <motion.div variants={rise} className="flex flex-wrap items-end justify-between gap-4 pb-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#A9772B] mb-2">Portfolio of four properties</p>
            <h1 className="text-4xl sm:text-6xl leading-[0.95] font-medium tracking-tight" style={SERIF}>
              The house, <span className="italic">at a glance.</span>
            </h1>
          </div>
          <p className="text-sm text-[#1C2B26]/60 max-w-xs">
            Revenue counts every reservation that wasn&apos;t cancelled. Add or remove a booking and the figures follow.
          </p>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={rise} className="col-span-2 rounded-[20px] p-6 bg-[#1C2B26] text-[#F4EFE6] relative overflow-hidden">
            <motion.div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#A9772B]/30 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#F4EFE6]/60">Gross revenue</div>
              <div className="mt-3 text-5xl sm:text-6xl font-medium tracking-tight tabular-nums" style={SERIF}>
                <CountUp value={totalRevenue} format={(v) => usd(v)} duration={1.4} />
              </div>
              <div className="mt-3 text-sm text-[#F4EFE6]/65">
                from <span className="text-[#E3C48C]">{activeBookings.length}</span> active reservations
              </div>
            </div>
          </motion.div>

          <motion.div variants={rise} className={`${CARD} p-5`}>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#1C2B26]/50">Average booking</div>
            <div className="mt-3 text-3xl sm:text-4xl font-medium tabular-nums" style={SERIF}>
              <CountUp value={avgTicket} format={(v) => usd(v)} duration={1.2} />
            </div>
            <div className="mt-2 text-xs text-[#1C2B26]/55">per active stay</div>
          </motion.div>

          <motion.div variants={rise} className={`${CARD} p-5`}>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#1C2B26]/50">Top property</div>
            <div className="mt-3 text-2xl leading-tight font-medium" style={SERIF}>{topHotel.hotelName}</div>
            <div className="mt-2 text-xs text-[#1C2B26]/55">{usd(topHotel.totalRevenue)} across {topHotel.bookingCount} stays</div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={rise} className={`${CARD} lg:col-span-2 p-6`}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-2xl font-medium" style={SERIF}>Revenue by month</h2>
                <p className="text-xs text-[#1C2B26]/55 mt-0.5">Grouped by check-in month</p>
              </div>
              <div className="text-right min-h-[40px]">
                <AnimatePresence mode="wait">
                  {hoverMonth !== null && monthlyTrends[hoverMonth] && (
                    <motion.div
                      key={hoverMonth}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="text-xl font-medium tabular-nums" style={SERIF}>{usd(monthlyTrends[hoverMonth].totalRevenue)}</div>
                      <div className="text-[11px] text-[#1C2B26]/55">
                        {monthName(monthlyTrends[hoverMonth].yearMonth)} · {monthlyTrends[hoverMonth].bookingCount} stays
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {n === 0 ? (
              <div className="h-60 grid place-items-center text-sm text-[#1C2B26]/45">No active reservations yet.</div>
            ) : (
              <svg key={n} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Monthly revenue chart">
                <defs>
                  <linearGradient id="sp-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A9772B" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#A9772B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 0.5, 1].map((t) => (
                  <line key={t} x1={PAD.l} x2={W - PAD.r} y1={yAt(maxMonthRev * t)} y2={yAt(maxMonthRev * t)} stroke="#1C2B26" strokeOpacity="0.08" strokeDasharray="3 5" />
                ))}
                {area && (
                  <motion.path fill="url(#sp-area)" initial={{ d: area, opacity: 0 }} animate={{ opacity: 1, d: area }} transition={{ duration: 0.8, ease: EASE }} />
                )}
                {line && (
                  <motion.path
                    fill="none"
                    stroke="#A9772B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ d: line, pathLength: 0 }}
                    animate={{ pathLength: 1, d: line }}
                    transition={{ pathLength: { duration: 1.6, ease: EASE, delay: 0.3 }, d: { duration: 0.6, ease: EASE } }}
                  />
                )}
                {monthlyTrends.map((m, i) => (
                  <g key={m.yearMonth} onMouseEnter={() => setHoverMonth(i)} onMouseLeave={() => setHoverMonth(null)}>
                    <rect x={xAt(i) - 34} y={0} width={68} height={H} fill="transparent" />
                    <motion.line
                      x1={xAt(i)} x2={xAt(i)} y1={H - PAD.b}
                      initial={{ y2: H - PAD.b }}
                      animate={{ y2: yAt(m.totalRevenue), strokeOpacity: hoverMonth === i ? 0.5 : 0.14 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.08 }}
                      stroke="#1C2B26"
                    />
                    <motion.circle
                      cx={xAt(i)}
                      initial={{ cy: H - PAD.b, r: 4.5, opacity: 0 }}
                      animate={{ cy: yAt(m.totalRevenue), opacity: 1, r: hoverMonth === i ? 7 : 4.5 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.08 }}
                      fill="#FBF8F2"
                      stroke="#A9772B"
                      strokeWidth="2.5"
                    />
                    <text x={xAt(i)} y={H - 10} textAnchor="middle" fontSize="12" fill="#1C2B26" fillOpacity={hoverMonth === i ? 0.95 : 0.5}>
                      {monthName(m.yearMonth)}
                    </text>
                  </g>
                ))}
              </svg>
            )}
          </motion.div>

          <motion.div variants={rise} className={`${CARD} p-6`}>
            <h2 className="text-2xl font-medium" style={SERIF}>Where guests are</h2>
            <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-4">Every booking by lifecycle stage</p>

            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <svg viewBox="0 0 140 140" className="w-32 h-32 -rotate-90">
                  <circle cx="70" cy="70" r={R} fill="none" stroke="#1C2B26" strokeOpacity="0.07" strokeWidth="14" />
                  {arcs.map((a) => (
                    <motion.circle
                      key={a.status}
                      cx="70" cy="70" r={R} fill="none"
                      stroke={STATUS[a.status].color}
                      strokeWidth="14"
                      strokeDasharray={CIRC}
                      initial={{ strokeDashoffset: CIRC, rotate: 0 }}
                      animate={{ strokeDashoffset: CIRC * (1 - a.frac), rotate: a.offset * 360 }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
                      style={{ transformOrigin: '70px 70px' }}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="text-3xl font-medium leading-none tabular-nums" style={SERIF}>
                      <CountUp value={bookings.length} />
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#1C2B26]/50 mt-1">bookings</div>
                  </div>
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 text-sm">
                {arcs.map((a) => (
                  <li key={a.status} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-[#1C2B26]/75">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS[a.status].color }} />
                      {STATUS[a.status].label}
                    </span>
                    <span className="tabular-nums font-medium">
                      {a.count} <span className="text-[#1C2B26]/40 font-normal text-xs">{Math.round(a.frac * 100)}%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div variants={rise} className={`${CARD} p-6`}>
          <h2 className="text-2xl font-medium" style={SERIF}>Property leaderboard</h2>
          <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-5">Ranked by gross revenue</p>
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {hotelList.map((h, i) => {
                const share = totalRevenue > 0 ? h.totalRevenue / totalRevenue : 0;
                return (
                  <motion.div
                    key={h.hotelName}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ layout: { duration: 0.6, ease: EASE } }}
                    className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 gap-y-1.5"
                  >
                    <span className={`text-2xl italic ${i === 0 ? 'text-[#A9772B]' : 'text-[#1C2B26]/35'}`} style={SERIF}>{i + 1}</span>
                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-medium truncate">{h.hotelName}</span>
                        <span className="text-xs text-[#1C2B26]/50 whitespace-nowrap">{h.bookingCount} stays · {Math.round(share * 100)}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-[#1C2B26]/[0.08] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: i === 0 ? '#A9772B' : '#1C2B26' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${share * 100}%` }}
                          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <span className="text-xl font-medium tabular-nums text-right" style={SERIF}>{usd(h.totalRevenue)}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Reservations */}
        <motion.div variants={rise} className={`${CARD} p-6`}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-2xl font-medium" style={SERIF}>Reservations</h2>
              <p className="text-xs text-[#1C2B26]/55 mt-0.5">{filteredBookings.length} of {bookings.length} shown</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex flex-wrap gap-1 p-1 rounded-full bg-[#1C2B26]/[0.06]">
                {['ALL', ...STATUS_ORDER].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`relative px-3 py-1.5 text-xs rounded-full transition-colors ${statusFilter === s ? 'text-[#F4EFE6]' : 'text-[#1C2B26]/65 hover:text-[#1C2B26]'}`}
                  >
                    {statusFilter === s && (
                      <motion.span layoutId="sp-filter" className="absolute inset-0 rounded-full bg-[#1C2B26]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">{s === 'ALL' ? 'All' : STATUS[s as BookingStatus].label}</span>
                  </button>
                ))}
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hotel or guest"
                aria-label="Search hotel or guest"
                className={`${FIELD} sm:w-56 !rounded-full !py-2`}
              />
            </div>
          </div>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.14em] text-[#1C2B26]/45">
                <tr>
                  <th className="py-2.5 px-2 font-normal">Guest</th>
                  <th className="py-2.5 px-2 font-normal">Property</th>
                  <th className="py-2.5 px-2 font-normal">Stay</th>
                  <th className="py-2.5 px-2 font-normal">Room</th>
                  <th className="py-2.5 px-2 font-normal">Status</th>
                  <th className="py-2.5 px-2 font-normal text-right">Revenue</th>
                  <th className="py-2.5 px-2" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filteredBookings.map((b) => (
                    <motion.tr
                      key={b.id}
                      initial={{ opacity: 0, backgroundColor: 'rgba(169,119,43,0.18)' }}
                      animate={{ opacity: 1, backgroundColor: 'rgba(169,119,43,0)' }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="group border-t border-[#1C2B26]/[0.08] hover:!bg-[#1C2B26]/[0.035]"
                    >
                      <td className="py-3 px-2">
                        <div className="font-medium">{b.guestName}</div>
                        <div className="text-[11px] text-[#1C2B26]/45">#{b.id} · {b.guests} guest{b.guests === 1 ? '' : 's'}</div>
                      </td>
                      <td className="py-3 px-2 text-[#1C2B26]/75">{b.hotelName}</td>
                      <td className="py-3 px-2 text-[#1C2B26]/75 whitespace-nowrap">{shortDate(b.checkInDate)} → {shortDate(b.checkOutDate)}</td>
                      <td className="py-3 px-2 text-xs tracking-wide text-[#1C2B26]/60">{b.roomType.charAt(0) + b.roomType.slice(1).toLowerCase()}</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: STATUS[b.bookingStatus]?.color }}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {STATUS[b.bookingStatus]?.label ?? b.bookingStatus}
                        </span>
                      </td>
                      <td className={`py-3 px-2 text-right text-lg tabular-nums ${b.bookingStatus === 'CANCELLED' ? 'line-through text-[#1C2B26]/35' : ''}`} style={SERIF}>
                        {usd(Number(b.totalRevenue), 2)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => handleDelete(b.id)}
                          aria-label={`Delete booking ${b.id}`}
                          className="h-7 w-7 rounded-full text-[#1C2B26]/35 hover:text-white hover:bg-[#B4483A] sm:opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <p className="text-center text-sm text-[#1C2B26]/45 py-10">No reservations match that search.</p>
            )}
          </div>
        </motion.div>

        <motion.p variants={rise} className="text-center text-[11px] text-[#1C2B26]/45 pb-4">
          Spring Boot 3 · JPA / MySQL · Angular · FastAPI forecasting service —{' '}
          <a href="https://github.com/MohanaPrasathR/hotel-revenue-analytics" target="_blank" rel="noreferrer" className="underline hover:text-[#1C2B26]">
            source on GitHub
          </a>
        </motion.p>
      </motion.main>

      {/* New reservation */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#1C2B26]/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="New reservation"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="bg-[#FBF8F2] rounded-t-[24px] sm:rounded-[24px] w-full max-w-lg p-6 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#A9772B]">Front desk</p>
                  <h3 className="text-3xl font-medium" style={SERIF}>New reservation</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} aria-label="Close" className="h-8 w-8 rounded-full hover:bg-[#1C2B26]/[0.08] text-[#1C2B26]/60">
                  ✕
                </button>
              </div>

              <AnimatePresence>
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', x: [0, -6, 6, -3, 0] }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 p-3 rounded-xl bg-[#B4483A]/10 border border-[#B4483A]/30 text-[#B4483A] text-sm">{formError}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleAddBooking} className="space-y-4">
                <div>
                  <label className={LABEL} htmlFor="sp-hotel">Property</label>
                  <select id="sp-hotel" value={formData.hotelName} onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })} className={FIELD}>
                    {HOTELS.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>

                <div>
                  <label className={LABEL} htmlFor="sp-guest">Guest name</label>
                  <input id="sp-guest" type="text" required autoFocus placeholder="e.g. Marcus Vance" value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className={FIELD} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL} htmlFor="sp-in">Check-in</label>
                    <input id="sp-in" type="date" required value={formData.checkInDate} onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} className={FIELD} />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="sp-out">Check-out</label>
                    <input id="sp-out" type="date" required value={formData.checkOutDate} onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })} className={FIELD} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={LABEL} htmlFor="sp-room">Room</label>
                    <select id="sp-room" value={formData.roomType} onChange={(e) => setFormData({ ...formData, roomType: e.target.value })} className={FIELD}>
                      {ROOM_TYPES.map((r) => <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="sp-guests">Guests</label>
                    <input id="sp-guests" type="number" min="1" max="10" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })} className={FIELD} />
                  </div>
                  <div>
                    <label className={LABEL} htmlFor="sp-status">Status</label>
                    <select id="sp-status" value={formData.bookingStatus} onChange={(e) => setFormData({ ...formData, bookingStatus: e.target.value })} className={FIELD}>
                      {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS[s].label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={LABEL} htmlFor="sp-rev">Total revenue ($)</label>
                  <input id="sp-rev" type="number" step="0.01" min="1" required value={formData.totalRevenue} onChange={(e) => setFormData({ ...formData, totalRevenue: Number(e.target.value) })} className={FIELD} />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-full text-sm text-[#1C2B26]/70 hover:bg-[#1C2B26]/[0.06]">
                    Cancel
                  </button>
                  <motion.button whileTap={{ scale: 0.97 }} type="submit" className="px-6 py-2.5 rounded-full bg-[#1C2B26] text-[#F4EFE6] text-sm font-medium hover:bg-[#24382F] transition-colors">
                    Create booking
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
