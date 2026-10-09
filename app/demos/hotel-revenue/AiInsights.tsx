'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp, { EASE } from '@/components/demos/CountUp';
import snapshot from './ai-snapshot.json';

const SERIF = { fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif" };
const CARD = 'rounded-[20px] bg-[#FBF8F2] border border-[#1C2B26]/10 shadow-[0_1px_0_rgba(28,43,38,0.04),0_18px_40px_-28px_rgba(28,43,38,0.35)]';

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const compact = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2)} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1)} L` : inr(n);
const dayLabel = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
const weekdayShort = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short' });
const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const FEATURE_LABEL: Record<string, string> = {
  leadTime: 'Lead time',
  adr: 'Nightly rate',
  checkInMonth: 'Check-in month',
  roomTypeCode: 'Room type',
  nights: 'Length of stay',
  checkInWeekday: 'Check-in weekday',
  guests: 'Guests',
};

const ACTION_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  raise: { bg: 'rgba(46,125,91,0.14)', fg: '#2E7D5B', label: 'Raise' },
  hold: { bg: 'rgba(28,43,38,0.05)', fg: '#1C2B26', label: 'Hold' },
  lower: { bg: 'rgba(180,72,58,0.12)', fg: '#B4483A', label: 'Lower' },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Chart geometry
const W = 760;
const H = 280;
const PAD = { l: 14, r: 14, t: 20, b: 30 };

export default function AiInsights() {
  const { summary, forecast, risk, anomalies, pricing } = snapshot;
  const [hover, setHover] = useState<number | null>(null);

  const pts = forecast.points;
  const yMax = Math.max(...pts.map((p) => p.upper)) * 1.08;
  const xAt = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / (pts.length - 1);
  const yAt = (v: number) => PAD.t + (1 - v / yMax) * (H - PAD.t - PAD.b);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${xAt(i)},${yAt(p.forecast)}`).join(' ');
  const band =
    pts.map((p, i) => `${i ? 'L' : 'M'}${xAt(i)},${yAt(p.upper)}`).join(' ') +
    ' ' +
    [...pts].reverse().map((p, i) => `L${xAt(pts.length - 1 - i)},${yAt(p.lower)}`).join(' ') +
    ' Z';
  const barW = ((W - PAD.l - PAD.r) / pts.length) * 0.55;
  const shown = hover !== null ? pts[hover] : null;

  const backtest = [
    { label: 'Same weekday last week', value: forecast.backtest.seasonalNaiveMAPE },
    { label: 'Holt-Winters only', value: forecast.backtest.holtWintersOnlyMAPE },
    { label: 'Holt-Winters + pickup blend', value: forecast.backtest.modelMAPE, used: true },
  ];
  const worstMape = Math.max(...backtest.map((b) => b.value));
  const roomTypes = Object.keys(pricing.baseAdr) as (keyof typeof pricing.baseAdr)[];

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="space-y-6">
      <motion.p variants={rise} className="text-sm text-[#1C2B26]/65 max-w-3xl">
        These are real outputs of StayPulse&apos;s Python AI service, captured on {dayLabel(snapshot.generatedAt)}. The service
        ran on its synthetic two-year booking history ({snapshot.bookings.toLocaleString('en-IN')} bookings), so the figures
        show how the models behave, not how a real hotel performed.
      </motion.p>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={rise} className="col-span-2 lg:col-span-1 rounded-[20px] p-5 bg-[#1C2B26] text-[#F4EFE6]">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#F4EFE6]/60">Forecast · next 30 days</div>
          <div className="mt-3 text-4xl font-medium tabular-nums" style={SERIF}>
            <CountUp value={summary.forecastNext30DaysRevenue} format={compact} duration={1.3} />
          </div>
          <div className="mt-2 text-xs text-[#E3C48C]">
            {summary.forecastChangeVsLast30DaysPct >= 0 ? '▲' : '▼'} {Math.abs(summary.forecastChangeVsLast30DaysPct)}% vs the last 30 days
          </div>
        </motion.div>
        <motion.div variants={rise} className={`${CARD} p-5`}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#1C2B26]/50">Revenue at risk</div>
          <div className="mt-3 text-3xl font-medium tabular-nums text-[#B4483A]" style={SERIF}>
            <CountUp value={risk.expectedRevenueAtRisk} format={compact} duration={1.3} />
          </div>
          <div className="mt-2 text-xs text-[#1C2B26]/55">across {risk.upcomingBookings} upcoming bookings</div>
        </motion.div>
        <motion.div variants={rise} className={`${CARD} p-5`}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#1C2B26]/50">Bookings to review</div>
          <div className="mt-3 text-3xl font-medium tabular-nums" style={SERIF}>
            <CountUp value={anomalies.count} />
          </div>
          <div className="mt-2 text-xs text-[#1C2B26]/55">flagged as unusual</div>
        </motion.div>
        <motion.div variants={rise} className={`${CARD} p-5`}>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#1C2B26]/50">Forecast error</div>
          <div className="mt-3 text-3xl font-medium tabular-nums text-[#2E7D5B]" style={SERIF}>
            <CountUp value={summary.forecastBacktestMAPE} format={(v) => `${v.toFixed(1)}%`} />
          </div>
          <div className="mt-2 text-xs text-[#1C2B26]/55">MAPE in a {forecast.backtest.days}-day backtest</div>
        </motion.div>
      </div>

      {/* Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={rise} className={`${CARD} lg:col-span-2 p-6`}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
            <div>
              <h2 className="text-2xl font-medium" style={SERIF}>30-day revenue forecast</h2>
              <p className="text-xs text-[#1C2B26]/55 mt-0.5">{forecast.model}</p>
            </div>
            <div className="text-right min-h-[40px]">
              {shown ? (
                <>
                  <div className="text-xl font-medium tabular-nums" style={SERIF}>{inr(shown.forecast)}</div>
                  <div className="text-[11px] text-[#1C2B26]/55">
                    {weekdayShort(shown.date)} {dayLabel(shown.date)} · {inr(shown.booked)} already booked
                  </div>
                </>
              ) : (
                <div className="flex gap-4 text-[11px] text-[#1C2B26]/60 pt-2">
                  <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#A9772B]" />Forecast</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#1C2B26]/25" />On the books</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm bg-[#A9772B]/20" />95% band</span>
                </div>
              )}
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Thirty day revenue forecast with bookings already on the books" onMouseLeave={() => setHover(null)}>
            {[0.25, 0.5, 0.75, 1].map((t) => (
              <line key={t} x1={PAD.l} x2={W - PAD.r} y1={yAt(yMax * t * 0.92)} y2={yAt(yMax * t * 0.92)} stroke="#1C2B26" strokeOpacity="0.07" strokeDasharray="3 5" />
            ))}
            {pts.map((p, i) => (
              <motion.rect
                key={p.date}
                x={xAt(i) - barW / 2}
                width={barW}
                rx="2"
                fill="#1C2B26"
                initial={{ y: H - PAD.b, height: 0, fillOpacity: 0.18 }}
                animate={{ y: yAt(p.booked), height: H - PAD.b - yAt(p.booked), fillOpacity: hover === i ? 0.45 : 0.18 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.015 }}
              />
            ))}
            <motion.path d={band} fill="#A9772B" initial={{ fillOpacity: 0 }} animate={{ fillOpacity: 0.18 }} transition={{ duration: 0.8, delay: 0.7 }} />
            <motion.path
              d={line}
              fill="none"
              stroke="#A9772B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.4 }}
            />
            {shown && hover !== null && (
              <g>
                <line x1={xAt(hover)} x2={xAt(hover)} y1={PAD.t} y2={H - PAD.b} stroke="#1C2B26" strokeOpacity="0.3" />
                <circle cx={xAt(hover)} cy={yAt(shown.forecast)} r="6" fill="#FBF8F2" stroke="#A9772B" strokeWidth="2.5" />
              </g>
            )}
            {pts.map((p, i) => (
              <g key={p.date}>
                <rect x={xAt(i) - (W / pts.length) / 2} y={0} width={W / pts.length} height={H} fill="transparent" onMouseEnter={() => setHover(i)} />
                {i % 5 === 0 && (
                  <text x={xAt(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#1C2B26" fillOpacity="0.5">{dayLabel(p.date)}</text>
                )}
              </g>
            ))}
          </svg>
        </motion.div>

        <motion.div variants={rise} className={`${CARD} p-6`}>
          <h2 className="text-2xl font-medium" style={SERIF}>Does it beat a guess?</h2>
          <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-5">
            The forecast is re-run as if it were {forecast.backtest.days} days ago, then compared with what happened. Lower error is better.
          </p>
          <div className="space-y-4">
            {backtest.map((b, i) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={b.used ? 'font-medium' : 'text-[#1C2B26]/65'}>{b.label}</span>
                  <span className="tabular-nums font-medium" style={{ color: b.used ? '#2E7D5B' : undefined }}>{b.value.toFixed(1)}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#1C2B26]/[0.08] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: b.used ? '#2E7D5B' : '#1C2B26', opacity: b.used ? 1 : 0.35 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.value / worstMape) * 100}%` }}
                    transition={{ duration: 1, ease: EASE, delay: 0.4 + i * 0.12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Cancellation risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={rise} className={`${CARD} lg:col-span-2 p-6`}>
          <h2 className="text-2xl font-medium" style={SERIF}>Most likely to cancel</h2>
          <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-4">{risk.model}</p>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.14em] text-[#1C2B26]/45">
                <tr>
                  <th className="py-2 px-2 font-normal">Booking</th>
                  <th className="py-2 px-2 font-normal">Check-in</th>
                  <th className="py-2 px-2 font-normal">Booked ahead</th>
                  <th className="py-2 px-2 font-normal text-right">Value</th>
                  <th className="py-2 px-2 font-normal w-36">Risk</th>
                </tr>
              </thead>
              <tbody>
                {risk.items.map((r, i) => (
                  <tr key={r.bookingId} className="border-t border-[#1C2B26]/[0.08]">
                    <td className="py-2.5 px-2">
                      <div className="font-medium">{r.hotelName}</div>
                      <div className="text-[11px] text-[#1C2B26]/45">#{r.bookingId} · {titleCase(r.roomType)}</div>
                    </td>
                    <td className="py-2.5 px-2 text-[#1C2B26]/75 whitespace-nowrap">{dayLabel(r.checkInDate)}</td>
                    <td className="py-2.5 px-2 text-[#1C2B26]/75 tabular-nums">{r.leadTimeDays} days</td>
                    <td className="py-2.5 px-2 text-right tabular-nums" style={SERIF}>{inr(r.totalRevenue)}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#1C2B26]/[0.08] overflow-hidden">
                          <motion.div className="h-full rounded-full bg-[#B4483A]" initial={{ width: 0 }} animate={{ width: `${r.cancellationRisk * 100}%` }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.05 }} />
                        </div>
                        <span className="tabular-nums text-xs font-medium text-[#B4483A]">{Math.round(r.cancellationRisk * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={rise} className={`${CARD} p-6`}>
          <h2 className="text-2xl font-medium" style={SERIF}>What drives it</h2>
          <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-4">Feature importance in the cancellation model</p>
          <div className="space-y-2.5">
            {risk.featureImportance.map((f, i) => (
              <div key={f.feature} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-2 text-sm">
                <span className="text-[#1C2B26]/75 truncate">{FEATURE_LABEL[f.feature] ?? f.feature}</span>
                <div className="h-1.5 rounded-full bg-[#1C2B26]/[0.08] overflow-hidden">
                  <motion.div className="h-full rounded-full bg-[#A9772B]" initial={{ width: 0 }} animate={{ width: `${(f.importance / risk.featureImportance[0].importance) * 100}%` }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.06 }} />
                </div>
                <span className="text-right tabular-nums text-xs text-[#1C2B26]/55">{Math.round(f.importance * 100)}%</span>
              </div>
            ))}
          </div>
          <dl className="mt-5 pt-4 border-t border-[#1C2B26]/10 grid grid-cols-3 gap-2 text-center">
            {[
              ['ROC-AUC', risk.metrics.rocAuc.toFixed(2)],
              ['Precision', `${Math.round(risk.metrics.precision * 100)}%`],
              ['Recall', `${Math.round(risk.metrics.recall * 100)}%`],
            ].map(([k, v]) => (
              <div key={k}>
                <dd className="text-xl font-medium tabular-nums" style={SERIF}>{v}</dd>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-[#1C2B26]/50">{k}</dt>
              </div>
            ))}
          </dl>
          <p className="text-[11px] text-[#1C2B26]/45 mt-3">Held-out test set of {risk.metrics.testSize.toLocaleString('en-IN')} bookings.</p>
        </motion.div>
      </div>

      {/* Anomalies */}
      <motion.div variants={rise} className={`${CARD} p-6`}>
        <h2 className="text-2xl font-medium" style={SERIF}>Worth a second look</h2>
        <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-4">{anomalies.model} · top {anomalies.items.length} of {anomalies.count}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {anomalies.items.map((a, i) => (
            <motion.div
              key={a.bookingId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.05 }}
              className="p-4 rounded-2xl border border-[#1C2B26]/10 bg-white/50"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-snug">{a.reason}</p>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-[#B4483A]/10 text-[#B4483A]">{a.field}</span>
              </div>
              <p className="text-[11px] text-[#1C2B26]/50 mt-2">
                #{a.bookingId} · {a.hotelName} · {titleCase(a.roomType)} · {dayLabel(a.checkInDate)} · {inr(a.totalRevenue)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div variants={rise} className={`${CARD} p-6`}>
        <h2 className="text-2xl font-medium" style={SERIF}>Recommended nightly rates</h2>
        <p className="text-xs text-[#1C2B26]/55 mt-0.5 mb-4">{pricing.method}, limited to −15% / +25% of the usual rate</p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-[11px] uppercase tracking-[0.14em] text-[#1C2B26]/45">
              <tr>
                <th className="py-2 px-2 font-normal text-left">Date</th>
                <th className="py-2 px-2 font-normal text-left">Demand</th>
                {roomTypes.map((rt) => (
                  <th key={rt} className="py-2 px-2 font-normal text-right">{titleCase(rt)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.days.map((d) => {
                const style = ACTION_STYLE[d.action] ?? ACTION_STYLE.hold;
                return (
                  <tr key={d.date} className="border-t border-[#1C2B26]/[0.08]">
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span className="text-[#1C2B26]/45 inline-block w-9">{weekdayShort(d.date)}</span>
                      {dayLabel(d.date)}
                    </td>
                    <td className="py-2 px-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tabular-nums" style={{ background: style.bg, color: style.fg }}>
                        {style.label} · {d.demandIndex.toFixed(2)}×
                      </span>
                    </td>
                    {roomTypes.map((rt) => {
                      const rate = d.rates[rt];
                      const base = pricing.baseAdr[rt];
                      return (
                        <td key={rt} className="py-2 px-2 text-right tabular-nums" style={{ color: rate > base ? '#2E7D5B' : rate < base ? '#B4483A' : undefined }}>
                          {inr(rate)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#1C2B26]/20 text-[#1C2B26]/55">
                <td className="py-2 px-2" colSpan={2}>Usual rate</td>
                {roomTypes.map((rt) => (
                  <td key={rt} className="py-2 px-2 text-right tabular-nums">{inr(pricing.baseAdr[rt])}</td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
