import { useState, useEffect, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#172445";
const PURPLE_LIGHT = "#4670B2";

const generateCreditData = () => {
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const data: any[] = [];
  let aaa = 45, aa = 85, a = 140, bbb = 210, volume = 2.1;
  [2023, 2024, 2025].forEach((year) => {
    months.forEach((month) => {
      aaa += (Math.random() - 0.52) * 8;
      aa += (Math.random() - 0.48) * 12;
      a += (Math.random() - 0.45) * 18;
      bbb += (Math.random() - 0.42) * 25;
      volume += (Math.random() - 0.3) * 0.4;
      data.push({ name: `${month} ${year}`, AAA: Math.max(20, Math.round(aaa)), AA: Math.max(50, Math.round(aa)), A: Math.max(90, Math.round(a)), BBB: Math.max(150, Math.round(bbb)), volume: Math.max(0.5, Math.round(volume * 10) / 10) });
    });
  });
  return data;
};

const issuanceData = [
  { name: "ABS", value: 14.2, color: PURPLE },
  { name: "CLO", value: 11.8, color: "#00c670" },
  { name: "MBS", value: 8.4, color: "#c8a96e" },
  { name: "CDO", value: 4.7, color: PURPLE_LIGHT },
  { name: "FIDC", value: 2.9, color: "#48c7c4" },
];

const trancheData = [
  { name: "Senior AAA", pct: 72, color: PURPLE },
  { name: "Mezzanine AA", pct: 15, color: PURPLE_LIGHT },
  { name: "Junior A", pct: 8, color: "#c8a96e" },
  { name: "Equity", pct: 5, color: "#00c670" },
];

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.round(start * 10) / 10);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{prefix}{count.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}{suffix}</span>;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl border p-3 text-xs min-w-[160px]" style={{ background: "rgba(10,10,20,0.95)", borderColor: "rgba(70,112,178,0.4)", borderRadius: 2 }}>
      <p className="text-white/40 mb-2 text-[0.6rem] tracking-[0.2em] uppercase">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex justify-between gap-6 py-0.5" style={{ color: p.color || p.stroke }}>
          <span className="text-white/60">{p.dataKey}</span>
          <span className="font-medium text-white/90">{typeof p.value === "number" ? p.value.toFixed(1) : p.value}{p.dataKey === "volume" ? "B" : "bps"}</span>
        </p>
      ))}
    </div>
  );
};

const tabs = [
  { id: "spreads", label: "Credit Spreads" },
  { id: "issuance", label: "Issuance" },
  { id: "tranches", label: "Tranches" },
];

const HeroChart = () => {
  const [creditData, setCreditData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("spreads");

  useEffect(() => {
    setCreditData(generateCreditData());
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabs.findIndex((t) => t.id === prev);
        return tabs[(idx + 1) % tabs.length].id;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full transition-opacity duration-1000 flex flex-col" style={{ opacity: visible ? 1 : 0 }}>
      <div className="flex items-center gap-1 mb-3 px-1">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="relative text-[0.58rem] tracking-[0.2em] uppercase px-3 py-1.5 border-none bg-transparent cursor-pointer transition-colors" style={{ color: activeTab === tab.id ? PURPLE_LIGHT : "rgba(255,255,255,0.25)" }}>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-px" style={{ background: PURPLE_LIGHT }} transition={{ duration: 0.3 }} />
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 mr-1">
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c670" }} />
          <span className="text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>LIVE</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeTab === "spreads" && (
            <motion.div key="spreads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={creditData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradAAA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={PURPLE} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={PURPLE} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBBB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c8a96e" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#c8a96e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(70,112,178,0.18)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8 }} axisLine={{ stroke: "rgba(70,112,178,0.35)" }} tickLine={false} interval={11} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="BBB" stroke="#c8a96e" strokeWidth={1.5} fill="url(#gradBBB)" dot={false} animationDuration={2500} />
                  <Area type="monotone" dataKey="A" stroke="rgba(255,255,255,0.15)" strokeWidth={1} fill="transparent" dot={false} animationDuration={2800} />
                  <Area type="monotone" dataKey="AA" stroke={PURPLE_LIGHT} strokeWidth={1} strokeDasharray="4 4" fill="transparent" dot={false} animationDuration={3000} />
                  <Area type="monotone" dataKey="AAA" stroke={PURPLE} strokeWidth={2} fill="url(#gradAAA)" dot={false} animationDuration={3200} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-1 px-2">
                {[
                  { color: PURPLE, label: "AAA" },
                  { color: PURPLE_LIGHT, label: "AA" },
                  { color: "rgba(255,255,255,0.3)", label: "A" },
                  { color: "#c8a96e", label: "BBB" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-0.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "issuance" && (
            <motion.div key="issuance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issuanceData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(70,112,178,0.18)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={{ stroke: "rgba(70,112,178,0.35)" }} tickLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8 }} axisLine={false} tickLine={false} unit="B" />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="backdrop-blur-xl border p-3 text-xs" style={{ background: "rgba(10,10,20,0.95)", borderColor: "rgba(70,112,178,0.4)", borderRadius: 2 }}>
                          <p className="text-white/40 mb-1 text-[0.6rem] tracking-[0.2em] uppercase">{label}</p>
                          <p className="text-white/90 font-medium">${payload[0].value}B</p>
                        </div>
                      );
                    }} />
                    <Bar dataKey="value" radius={[2, 2, 0, 0]} animationDuration={1500}>
                      {issuanceData.map((entry, i) => (<Cell key={i} fill={entry.color} fillOpacity={0.85} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-between px-2 mt-1">
                <span className="text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Total Volume 2025 YTD</span>
                <span className="font-['Cormorant_Garamond',serif] text-lg font-light" style={{ color: PURPLE_LIGHT }}>$<AnimatedCounter end={42} suffix="B" duration={2} /></span>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "tranches" && (
            <motion.div key="tranches" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex items-center">
              <div className="w-[45%] h-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={trancheData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="pct" stroke="rgba(0,0,0,0.3)" strokeWidth={1} animationDuration={2000} animationBegin={300}>
                      {trancheData.map((entry, i) => (<Cell key={i} fill={entry.color} fillOpacity={0.8} />))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="backdrop-blur-xl border p-2.5 text-xs" style={{ background: "rgba(10,10,20,0.95)", borderColor: "rgba(70,112,178,0.4)", borderRadius: 2 }}>
                          <p className="text-white/90">{payload[0].name}: {payload[0].value}%</p>
                        </div>
                      );
                    }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 flex flex-col gap-3 pr-4">
                {trancheData.map((t, i) => (
                  <motion.div key={t.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{t.name}</span>
                      <span className="text-[0.6rem] font-medium" style={{ color: t.color }}>{t.pct}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${t.pct}%` }} transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: "easeOut" }} className="h-full rounded-full" style={{ background: t.color }} />
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-[0.5rem] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Weighted Avg. Rating</span>
                  <span className="block font-['Cormorant_Garamond',serif] text-xl font-light mt-0.5" style={{ color: PURPLE_LIGHT }}>AA+</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroChart;
