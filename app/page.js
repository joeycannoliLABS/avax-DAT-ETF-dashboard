"use client";

import { useState, useEffect, useRef } from "react";

const DATS = [
  {
    id: "avax-one",
    name: "AVAX One",
    ticker: "AVX",
    exchange: "NASDAQ",
    avaxHoldings: 14145000,
    status: "Live",
    description: "AVAX One offers investors regulated access to Avalanche, one of the fastest-growing Layer 1 blockchain ecosystems. Combining the reliability of U.S. equity markets with the upside of next-gen finance, it\u2019s a modern strategy for a new financial era.",
    highlights: ["Acquired 9.37M AVAX for $110M (Nov 2025)","$40M share buyback authorized","~$600K staking rewards earned through Dec 2025","Expects ~180K AVAX staking rewards in Q1 2026","Treasury analytics dashboard at avax-one.com"],
    color: "#E84142",
    logoImg: "/avaxonelogo.png",
    xUrl: "https://x.com/avax_one",
    webUrl: "https://avax-one.com"
  },
  {
    id: "avat-treasury",
    name: "Avalanche Treasury Co.",
    ticker: "AVAT",
    exchange: "NASDAQ (Q1 '26)",
    avaxHoldings: 15300000,
    aum: 460000000,
    status: "Live",
    description: "The premiere way to get regulated AVAX exposure. We\u2019re the institutional growth engine for the Avalanche ecosystem, with an exclusive relationship with Avalanche itself. Funding builders. Accelerating technologies. Bringing institutions to AVAX.",
    highlights: ["$675M business combination with MLAC (Nasdaq)","~25M AVAX acquired via $200M discounted purchase from Avalanche Foundation","Purchased at 0.77x mNAV (23% discount to market)","18-month priority on Avalanche Foundation sales to US DATs","$460M in treasury assets at closing","Target: $1B+ in AVAX holdings post-listing"],
    color: "#F59E0B",
    logoImg: "/avatlogo.png",
    xUrl: "https://x.com/avat_co",
    webUrl: "https://avat.com/"
  },
  {
    id: "deft",
    name: "DeFi Technologies",
    ticker: "DEFT",
    exchange: "NASDAQ",
    avaxHoldings: 500000,
    status: "Live",
    description: "Fintech company bridging traditional capital markets with DeFi. Operates Valour (102 ETPs), Stillman execution desk, and holds a multi-asset digital treasury including AVAX.",
    highlights: ["398,321 AVAX held in treasury (~$7.3M at current prices)","102 ETPs listed globally via Valour subsidiary","$165.7M in cash + digital asset treasury (as of Q3 2025)","$138.2M net inflows in 2025 (record year)","~$80M revenue and $39M operating income through Q3 2025","Zero debt; $44M in venture investments"],
    color: "#10B981",
    logoImg: "/defitechlogo.png",
    logoInvert: true,
    xUrl: "https://x.com/DeFiTechGlobal",
    webUrl: "https://defi.tech"
  }
];

var ETFS_STATIC = [
  {
    id: "grayscale-avax",
    name: "Grayscale Avalanche Staking ETF",
    ticker: "GAVA",
    sponsor: "Grayscale",
    exchange: "NASDAQ",
    aum: 4731215,
    avaxHoldings: 627847,
    sponsorFee: 0.35,
    stakingPct: 80.46,
    navPerShare: 18.30,
    stakingMax: 85,
    status: "Live",
    description: "Converted from Grayscale Avalanche Trust to a spot staking ETF. Launched March 13, 2026 on NASDAQ. Allows staking up to 85% of AVAX holdings for yield generation.",
    highlights: ["Launched Mar 13, 2026 on NASDAQ (converted from trust)","Up to 85% of AVAX may be staked","Sponsor fee: 0.50%","Coinbase Custody + BNY Mellon admin","Originally launched Aug 2024 as private trust (ticker AVAXFUN)"],
    color: "#E84142",
    logoImg: "/grayscale.png",
    buyUrl: "https://www.grayscale.com/funds/grayscale-avalanche-trust"
  },
  {
    id: "bitwise-bava",
    name: "Bitwise Avalanche ETF",
    ticker: "BAVA",
    sponsor: "Bitwise",
    exchange: "NYSE Arca (pending)",
    aum: 19814789,
    avaxHoldings: 2631685,
    sponsorFee: 0.34,
    stakingPct: 58,
    navPerShare: 19.42,
    stakingMax: 70,
    status: "Live",
    description: "Filed amended S-1 Nov 2025. First U.S. ETF proposal to include staking at launch. Plans to stake up to 70% of holdings.",
    highlights: ["Lowest fee at 0.34% among AVAX ETFs","Staking up to 70% of holdings","12% cut of staking rewards as expenses","$2.5M seed investment (100K shares @ $25)","Coinbase Custody + BNY Mellon"],
    color: "#E84142",
    logoImg: "/bitwise.png",
    buyUrl: "https://bavaetf.com/"
  }
];

var NEWS_ITEMS = [
  { date: "Jan 28, 2026", title: "AVAX One provides strategic update on AVAX treasury and growth initiatives", source: "GlobeNewswire", url: "https://www.globenewswire.com/news-release/2026/01/28/3227665/0/en/AVAX-One-Provides-Strategic-Update-on-AVAX-Treasury-and-Ongoing-Growth-Initiatives.html" },
  { date: "Jan 26, 2026", title: "VanEck launches first U.S.-listed Avalanche spot ETF (VAVX)", source: "BusinessWire", url: "https://www.businesswire.com/news/home/20260126788202/en/VanEck-Introduces-Another-First-with-Launch-of-the-VanEck-Avalanche-ETF-VAVX" },
  { date: "Jan 21, 2026", title: "AVAX One launches validator infrastructure on Avalanche blockchain", source: "GlobeNewswire", url: "https://www.globenewswire.com/news-release/2026/01/21/3213750/0/en/" },
  { date: "Jan 6, 2026", title: "AVAX One launches institutional-grade Avalanche treasury dashboard", source: "GlobeNewswire", url: "https://www.globenewswire.com/news-release/2026/01/06/3213750/0/en/AVAX-One-Launches-Institutional-Grade-Avalanche-Treasury-Dashboard.html" },
  { date: "Jan 3, 2026", title: "Grayscale updates AVAX ETF filing to include staking rewards", source: "CryptoTimes", url: "https://www.cryptotimes.io/2026/01/03/grayscale-updates-avax-etf-filing-to-include-staking-rewards/" },
  { date: "Nov 27, 2025", title: "Bitwise becomes first to add staking to Avalanche ETF filing", source: "CoinDesk", url: "https://www.coindesk.com/business/2025/11/27/avalanche-etf-race-heats-up-as-bitwise-becomes-first-to-add-staking" },
  { date: "Nov 24, 2025", title: "AVAX One treasury holdings reach over 13.8 million AVAX", source: "PRNewswire", url: "https://www.prnewswire.com/news-releases/avax-ones-treasury-holdings-reach-over-13-8-million-avax-as-of-november-23--2025--302624238.html" },
  { date: "Oct 2, 2025", title: "Avalanche Treasury Co. announces $675M+ business combination with MLAC", source: "BusinessWire", url: "https://www.businesswire.com/news/home/20251002739600/en/" }
];

function fmt(n) {
  if (n == null) return "\u2014";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(2);
}

function fmt1(n) {
  if (n == null) return "N/A";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function fmtAvax(n) {
  if (n == null) return "\u2014";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
}

function fmtAvaxETF(n) {
  if (n == null) return "0.000 AVAX";
  if (n >= 1e6) return (n / 1e6).toFixed(3) + "M AVAX";
  if (n >= 1e3) return (n / 1e3).toFixed(3) + "K AVAX";
  return n.toLocaleString() + " AVAX";
}

function StatusBadge({ status }) {
  var s = status.toLowerCase();
  var isLive = s.includes("live") && !s.includes("pending") && !s.includes("otc");
  var isOTC = s.includes("otc") || (s.includes("live") && s.includes("pending"));
  var isFiled = s.includes("filed") || s.includes("awaiting");
  var bg = isLive
    ? { background: "rgba(34,197,94,0.1)", color: "#22c55e", borderColor: "rgba(34,197,94,0.3)" }
    : isOTC
    ? { background: "rgba(245,158,11,0.1)", color: "#f59e0b", borderColor: "rgba(245,158,11,0.3)" }
    : isFiled
    ? { background: "rgba(232,65,66,0.1)", color: "#E84142", borderColor: "rgba(232,65,66,0.3)" }
    : { background: "rgba(161,161,170,0.1)", color: "#a1a1aa", borderColor: "rgba(161,161,170,0.3)" };
  return (
    <span style={{ fontSize: 11, fontWeight: 500, padding: "2px 10px", borderRadius: 9999, border: "1px solid", whiteSpace: "nowrap", ...bg }}>
      {status}
    </span>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", margin: 0, letterSpacing: -0.3 }}>{title}</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>{subtitle}</p>
    </div>
  );
}

var DAT_HISTORY = [
  { date: "Sep 2025", avax: 0, label: "AVAX One announces DAT strategy" },
  { date: "Oct 2025", avax: 4400000, label: "AVAX One initial purchases + AVAT $200M buy" },
  { date: "Nov 2025", avax: 23478321, label: "AVAX One adds 9.37M + DEFT 398K" },
  { date: "Dec 2025", avax: 23478321, label: "Holdings steady, staking rewards accrue" },
  { date: "Jan 2026", avax: 23564321, label: "AVAX One staking rewards added" },
  { date: "Feb 2026", avax: 23564321, label: "Holdings steady" },
  { date: "Mar 2026", avax: 23598321, label: "Holdings steady" },
  { date: "Apr 2026", avax: 23598321, label: "Holdings steady" },
  { date: "May 2026", avax: 23598321, label: "Holdings steady" },
  { date: "Jun 2026", avax: 29410321, label: "AVAT treasury grows to 15M AVAX" },
  { date: "Jul 2026", avax: 29561000, label: "DeFi Tech increases to 500K AVAX" },
  { date: "Aug 2026", avax: 29945000, label: "Current holdings" }
];

var ETF_HISTORY = [
  { date: "Jan 2026", avax: 490000, label: "VAVX launches as first U.S. AVAX spot ETF" },
  { date: "Feb 2026", avax: 820000, label: "VAVX inflows grow, GAVA and BAVA file" },
  { date: "Mar 2026", avax: 1250000, label: "GAVA and BAVA launch" },
  { date: "Apr 2026", avax: 3200000, label: "Rapid inflows across all three ETFs" },
  { date: "May 2026", avax: 4842233, label: "Combined holdings surpass 4.8M AVAX" },
  { date: "Jun 2026", avax: 4912318, label: "Combined holdings surpass 4.9M AVAX" },
  { date: "Jul 2026", avax: 4898748, label: "Holdings steady near 4.9M AVAX" },
  { date: "Aug 2026", avax: 5081814, label: "Current combined ETF holdings" }
];

function HoldingsTimeChart({ history, currentTotal }) {
  var data = history.map(function(h) { return h; });
  if (currentTotal && data.length > 0) {
    data[data.length - 1] = Object.assign({}, data[data.length - 1], { avax: currentTotal });
  }
  var max = Math.max.apply(null, data.map(function(d) { return d.avax; }));
  var chartH = 180;
  var hoverS = useState(null), hovered = hoverS[0], setHovered = hoverS[1];
  var containerRef = useRef(null);
  var widthS = useState(600), chartW = widthS[0], setChartW = widthS[1];

  useEffect(function() {
    function measure() {
      if (containerRef.current) setChartW(containerRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return function() { window.removeEventListener("resize", measure); };
  }, []);

  function getX(i) { return data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2; }
  function getY(avax) { return max > 0 ? chartH - (avax / max) * (chartH - 20) - 10 : chartH; }

  var linePath = data.map(function(d, i) {
    return (i === 0 ? "M" : "L") + getX(i) + "," + getY(d.avax);
  }).join(" ");
  var areaPath = linePath + " L" + chartW + "," + chartH + " L0," + chartH + " Z";

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0, letterSpacing: -0.3 }}>Combined DAT Holdings Over Time</h3>
        {hovered !== null && data[hovered] && (
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#E84142" }}>{fmtAvax(data[hovered].avax)} AVAX</span>
            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>{data[hovered].date}</span>
          </div>
        )}
      </div>
      <div style={{ position: "relative", height: chartH + 40, width: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: chartH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtAvax(max)}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtAvax(max / 2)}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>0</span>
        </div>
        <div ref={containerRef} style={{ marginLeft: 50, height: chartH, position: "relative" }}>
          {[0, 0.5, 1].map(function(pct, i) {
            return <div key={i} style={{ position: "absolute", top: pct * chartH, left: 0, right: 0, height: 1, background: "var(--border)" }} />;
          })}
          <svg width={chartW} height={chartH} style={{ position: "absolute", top: 0, left: 0 }}>
            <path d={areaPath} fill="rgba(232,65,66,0.08)" />
            <path d={linePath} fill="none" stroke="#E84142" strokeWidth="1.5" />
            {data.map(function(d, i) {
              var a = hovered === i;
              return <circle key={i} cx={getX(i)} cy={getY(d.avax)} r={a ? 4 : 2.5} fill={a ? "#fff" : "#E84142"} stroke={a ? "#E84142" : "none"} strokeWidth={a ? 1.5 : 0} />;
            })}
          </svg>
          {data.map(function(d, i) {
            var left = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
            var w = data.length > 1 ? 100 / (data.length - 1) : 100;
            return (
              <div key={i} style={{ position: "absolute", top: 0, left: (left - w / 2) + "%", width: w + "%", height: chartH, cursor: "pointer", zIndex: 2 }}
                onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(null); }}>
                {hovered === i && <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: chartH, background: "rgba(232,65,66,0.2)", transform: "translateX(-50%)" }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 50, display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{data[0].date}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{data[data.length - 1].date}</span>
        </div>
      </div>
      {hovered !== null && data[hovered] && (
        <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10, fontSize: 11, color: "var(--sub)", display: "flex", gap: 8 }}>
          <span style={{ color: "#E84142", fontWeight: 600, flexShrink: 0 }}>{data[hovered].date}:</span>
          <span>{data[hovered].label ? data[hovered].label + " — " : ""}{fmtAvax(data[hovered].avax)} AVAX</span>
        </div>
      )}
    </div>
  );
}

function ETFHoldingsTimeChart({ history, currentTotal }) {
  var data = history.map(function(h) { return h; });
  if (currentTotal && data.length > 0) {
    data[data.length - 1] = Object.assign({}, data[data.length - 1], { avax: currentTotal });
  }
  var max = Math.max.apply(null, data.map(function(d) { return d.avax; })) * 1.1;
  var chartH = 180;
  var hoverS = useState(null), hovered = hoverS[0], setHovered = hoverS[1];
  var containerRef = useRef(null);
  var widthS = useState(600), chartW = widthS[0], setChartW = widthS[1];

  useEffect(function() {
    function measure() {
      if (containerRef.current) setChartW(containerRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return function() { window.removeEventListener("resize", measure); };
  }, []);

  function getX(i) { return data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2; }
  function getY(avax) { return max > 0 ? chartH - (avax / max) * (chartH - 20) - 10 : chartH; }

  var linePath = data.map(function(d, i) {
    return (i === 0 ? "M" : "L") + getX(i) + "," + getY(d.avax);
  }).join(" ");
  var areaPath = linePath + " L" + chartW + "," + chartH + " L0," + chartH + " Z";

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0, letterSpacing: -0.3 }}>Combined ETF AVAX Holdings Over Time</h3>
        {hovered !== null && data[hovered] && (
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#E84142" }}>{fmtAvax(data[hovered].avax)} AVAX</span>
            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>{data[hovered].date}</span>
          </div>
        )}
      </div>
      <div style={{ position: "relative", height: chartH + 40, width: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: chartH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtAvax(max)}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtAvax(max / 2)}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>0</span>
        </div>
        <div ref={containerRef} style={{ marginLeft: 50, height: chartH, position: "relative" }}>
          {[0, 0.5, 1].map(function(pct, i) {
            return <div key={i} style={{ position: "absolute", top: pct * chartH, left: 0, right: 0, height: 1, background: "var(--border)" }} />;
          })}
          <svg width={chartW} height={chartH} style={{ position: "absolute", top: 0, left: 0 }}>
            <path d={areaPath} fill="rgba(232,65,66,0.08)" />
            <path d={linePath} fill="none" stroke="#E84142" strokeWidth="1.5" />
            {data.map(function(d, i) {
              var a = hovered === i;
              return <circle key={i} cx={getX(i)} cy={getY(d.avax)} r={a ? 4 : 2.5} fill={a ? "#fff" : "#E84142"} stroke={a ? "#E84142" : "none"} strokeWidth={a ? 1.5 : 0} />;
            })}
          </svg>
          {data.map(function(d, i) {
            var left = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
            var w = data.length > 1 ? 100 / (data.length - 1) : 100;
            return (
              <div key={i} style={{ position: "absolute", top: 0, left: (left - w / 2) + "%", width: w + "%", height: chartH, cursor: "pointer", zIndex: 2 }}
                onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(null); }}>
                {hovered === i && <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: chartH, background: "rgba(232,65,66,0.2)", transform: "translateX(-50%)" }} />}
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 50, display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{data[0].date}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{data[data.length - 1].date}</span>
        </div>
      </div>
      {hovered !== null && data[hovered] && (
        <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10, fontSize: 11, color: "var(--sub)", display: "flex", gap: 8 }}>
          <span style={{ color: "#E84142", fontWeight: 600, flexShrink: 0 }}>{data[hovered].date}:</span>
          <span>{data[hovered].label ? data[hovered].label + " — " : ""}{fmtAvax(data[hovered].avax)} AVAX</span>
        </div>
      )}
    </div>
  );
}

function HoldingsDonutChart({ dats, price, circ }) {
  var total = dats.reduce(function(s, d) { return s + (d.avaxHoldings || 0); }, 0);
  var hoverS = useState(null), hovered = hoverS[0], setHovered = hoverS[1];
  var colors = ["#E84142", "#F59E0B", "#10B981"];
  var size = 120, cx = size / 2, cy = size / 2, outerR = 52, innerR = 34;
  var slices = [], angle = -90;
  dats.forEach(function(d, i) {
    var pct = total > 0 ? (d.avaxHoldings || 0) / total : 0;
    var sa = angle, ea = angle + pct * 360;
    slices.push({ dat: d, pct: pct, startAngle: sa, endAngle: ea, color: colors[i % colors.length], index: i });
    angle = ea;
  });
  function polarToCart(cx2, cy2, r, deg) { var rad = (deg * Math.PI) / 180; return { x: cx2 + r * Math.cos(rad), y: cy2 + r * Math.sin(rad) }; }
  function makeArc(sd, ed, oR, iR) {
    var s1 = polarToCart(cx, cy, oR, sd), e1 = polarToCart(cx, cy, oR, ed), s2 = polarToCart(cx, cy, iR, ed), e2 = polarToCart(cx, cy, iR, sd);
    var lg = ed - sd > 180 ? 1 : 0;
    return "M"+s1.x+","+s1.y+" A"+oR+","+oR+" 0 "+lg+" 1 "+e1.x+","+e1.y+" L"+s2.x+","+s2.y+" A"+iR+","+iR+" 0 "+lg+" 0 "+e2.x+","+e2.y+" Z";
  }
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, height: "100%" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 14px", letterSpacing: -0.3, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span>DAT Holdings Breakdown</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {price && <span style={{ fontSize: 12, fontWeight: 500, color: "var(--dim)" }}>&asymp; {fmt(total * price)}</span>}
          {circ && <span style={{ fontSize: 10, color: "#E84142", fontWeight: 600, background: "rgba(232,65,66,0.1)", padding: "2px 8px", borderRadius: 4 }}>{(total / circ * 100).toFixed(2)}% of supply</span>}
        </div>
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
          <svg width={size} height={size}>
            {slices.map(function(s) {
              var a = hovered === s.index, oR = a ? outerR + 3 : outerR, iR = a ? innerR - 1 : innerR;
              return <path key={s.index} d={makeArc(s.startAngle, s.endAngle, oR, iR)} fill={s.color} style={{ opacity: hovered !== null && !a ? 0.3 : 1, transition: "all 0.15s", cursor: "pointer" }} onMouseEnter={function() { setHovered(s.index); }} onMouseLeave={function() { setHovered(null); }} />;
            })}
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            {hovered !== null && slices[hovered] ? <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{(slices[hovered].pct * 100).toFixed(1)}%</div></div>
            : <div><div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{fmtAvax(total)}</div><div style={{ fontSize: 8, color: "var(--muted)" }}>AVAX</div></div>}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {slices.map(function(s) {
            var a = hovered === s.index, val = s.dat.avaxHoldings && price ? s.dat.avaxHoldings * price : null;
            return (
              <div key={s.index} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, marginBottom: 2, background: a ? "rgba(255,255,255,0.04)" : "transparent", transition: "all 0.15s", cursor: "pointer" }} onMouseEnter={function() { setHovered(s.index); }} onMouseLeave={function() { setHovered(null); }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0, opacity: hovered !== null && !a ? 0.3 : 1, transition: "opacity 0.15s" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: a ? 700 : 600, color: a ? "var(--text)" : "var(--sub)", transition: "all 0.15s" }}>{s.dat.name}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>{fmtAvax(s.dat.avaxHoldings)}{val ? " \u2022 " + fmt(val) : ""}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: a ? s.color : "var(--text)", transition: "color 0.15s", flexShrink: 0 }}>{(s.pct * 100).toFixed(1)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Approximate historical circulating supply per DAT_HISTORY period (AVAX circ ~395M–432M)
var CIRC_APPROX = [395000000, 408000000, 418000000, 422000000, 428000000, 432000000, 433000000, 434000000, 435000000, 436000000, 437000000, 438000000];

function DATCircSupplyChart({ history, currentTotal, circ }) {
  var data = history.map(function(h) { return h; });
  if (currentTotal && data.length > 0) {
    data[data.length - 1] = Object.assign({}, data[data.length - 1], { avax: currentTotal });
  }

  var liveCirc = circ || 432000000;
  var pctData = data.map(function(d, i) {
    var c = i === data.length - 1 ? liveCirc : (CIRC_APPROX[i] || liveCirc);
    return { date: d.date, label: d.label, pct: d.avax > 0 ? (d.avax / c) * 100 : 0 };
  });

  var max = Math.max.apply(null, pctData.map(function(d) { return d.pct; })) * 1.15 || 10;
  var chartH = 180;
  var hoverS = useState(null), hovered = hoverS[0], setHovered = hoverS[1];
  var containerRef = useRef(null);
  var widthS = useState(400), chartW = widthS[0], setChartW = widthS[1];

  useEffect(function() {
    function measure() {
      if (containerRef.current) setChartW(containerRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return function() { window.removeEventListener("resize", measure); };
  }, []);

  function getX(i) { return pctData.length > 1 ? (i / (pctData.length - 1)) * chartW : chartW / 2; }
  function getY(pct) { return max > 0 ? chartH - (pct / max) * (chartH - 20) - 10 : chartH; }

  var linePath = pctData.map(function(d, i) {
    return (i === 0 ? "M" : "L") + getX(i) + "," + getY(d.pct);
  }).join(" ");
  var areaPath = linePath + " L" + chartW + "," + chartH + " L0," + chartH + " Z";

  var currentPct = pctData.length > 0 ? pctData[pctData.length - 1].pct : 0;

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0, letterSpacing: -0.3 }}>
          Percent of Circulating Supply Held by DATs
        </h3>
        {hovered !== null && pctData[hovered] ? (
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#E84142" }}>{pctData[hovered].pct.toFixed(2)}%</span>
            <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 8 }}>{pctData[hovered].date}</span>
          </div>
        ) : (
          <span style={{ fontSize: 14, fontWeight: 700, color: "#E84142" }}>{currentPct.toFixed(2)}%</span>
        )}
      </div>

      <div style={{ position: "relative", height: chartH + 32, width: "100%" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: chartH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{max.toFixed(2)}%</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{(max / 2).toFixed(2)}%</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>0%</span>
        </div>

        <div ref={containerRef} style={{ marginLeft: 44, height: chartH, position: "relative" }}>
          {[0, 0.5, 1].map(function(pct, i) {
            return <div key={i} style={{ position: "absolute", top: pct * chartH, left: 0, right: 0, height: 1, background: "var(--border)" }} />;
          })}
          <svg width={chartW} height={chartH} style={{ position: "absolute", top: 0, left: 0 }}>
            <path d={areaPath} fill="rgba(232,65,66,0.08)" />
            <path d={linePath} fill="none" stroke="#E84142" strokeWidth="1.5" />
            {pctData.map(function(d, i) {
              var a = hovered === i;
              return (
                <circle key={i}
                  cx={getX(i)} cy={getY(d.pct)}
                  r={a ? 4 : 2.5}
                  fill={a ? "#fff" : "#E84142"}
                  stroke={a ? "#E84142" : "none"}
                  strokeWidth={a ? 1.5 : 0}
                />
              );
            })}
          </svg>
          {pctData.map(function(d, i) {
            var left = pctData.length > 1 ? (i / (pctData.length - 1)) * 100 : 50;
            var w = pctData.length > 1 ? 100 / (pctData.length - 1) : 100;
            return (
              <div key={i}
                style={{ position: "absolute", top: 0, left: (left - w / 2) + "%", width: w + "%", height: chartH, cursor: "pointer", zIndex: 2 }}
                onMouseEnter={function() { setHovered(i); }}
                onMouseLeave={function() { setHovered(null); }}>
                {hovered === i && (
                  <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: chartH, background: "rgba(232,65,66,0.2)", transform: "translateX(-50%)" }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginLeft: 44, display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{pctData[0].date}</span>
          <span style={{ fontSize: 10, color: "var(--dim)" }}>{pctData[pctData.length - 1].date}</span>
        </div>
      </div>

      {hovered !== null && pctData[hovered] && pctData[hovered].label && (
        <div style={{ marginTop: 10, borderTop: "1px solid var(--border)", paddingTop: 10, fontSize: 11, color: "var(--sub)", display: "flex", gap: 8 }}>
          <span style={{ color: "#E84142", flexShrink: 0 }}>{pctData[hovered].date}:</span>
          <span>{pctData[hovered].label}</span>
        </div>
      )}
    </div>
  );
}

function NewsFeed({ liveNews }) {
  var articles = liveNews && liveNews.length > 0 ? liveNews : NEWS_ITEMS;
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: "0 0 14px", letterSpacing: -0.3 }}>Latest Institutional News</h3>
      {articles.map(function(n, i) {
        return (
          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "10px 0", borderBottom: i < articles.length - 1 ? "1px solid var(--border)" : "none", textDecoration: "none", transition: "opacity 0.15s" }} onMouseEnter={function(ev) { ev.currentTarget.style.opacity = "0.7"; }} onMouseLeave={function(ev) { ev.currentTarget.style.opacity = "1"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500, lineHeight: 1.4 }}>{n.title}</span>
              <span style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap", flexShrink: 0 }}>{n.date}</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--dim)" }}>{n.source}</span>
          </a>
        );
      })}
    </div>
  );
}

function EntityCard({ e, price, circ, isOpen, onToggle }) {
  var holdingsVal = e.avaxHoldings && price ? e.avaxHoldings * price : null;
  return (
    <div onClick={onToggle} style={{
      background: isOpen ? "rgba(255,255,255,0.04)" : "var(--card)",
      border: "1px solid " + (isOpen ? "rgba(232,65,66,0.3)" : "var(--border)"),
      borderRadius: 12, padding: 20, cursor: "pointer", transition: "all 0.15s ease"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, gap: 8 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
          <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", width: 40, height: 40 }}>
            {e.logoImg ? <img src={e.logoImg} alt="" style={{ maxHeight: 40, maxWidth: 40, objectFit: "contain", filter: e.logoInvert ? "brightness(0) invert(1)" : "none" }} /> : null}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 6 }}>
              {e.name}
              {e.xUrl && <a href={e.xUrl} target="_blank" rel="noopener noreferrer" onClick={function(ev) { ev.stopPropagation(); }} style={{ display: "inline-flex", flexShrink: 0, opacity: 0.4, transition: "opacity 0.15s" }} onMouseEnter={function(ev) { ev.currentTarget.style.opacity = "1"; }} onMouseLeave={function(ev) { ev.currentTarget.style.opacity = "0.4"; }}><svg viewBox="0 0 24 24" style={{ width: 13, height: 13 }} fill="var(--text)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>}
              {e.webUrl && <a href={e.webUrl} target="_blank" rel="noopener noreferrer" onClick={function(ev) { ev.stopPropagation(); }} style={{ display: "inline-flex", flexShrink: 0, opacity: 0.4, transition: "opacity 0.15s" }} onMouseEnter={function(ev) { ev.currentTarget.style.opacity = "1"; }} onMouseLeave={function(ev) { ev.currentTarget.style.opacity = "0.4"; }}><svg viewBox="0 0 24 24" style={{ width: 13, height: 13 }} fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></a>}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{e.ticker} &bull; {e.exchange}</div>
          </div>
        </div>
        <StatusBadge status={e.status} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        <div style={{ background: "var(--metric-bg)", borderRadius: 8, padding: "10px 12px", border: "1px solid var(--metric-border)" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>AVAX Holdings</div>
          <div title={e.avaxHoldings ? e.avaxHoldings.toLocaleString() + " AVAX" : ""} style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", cursor: "default" }}>{fmtAvax(e.avaxHoldings)}</div>
        </div>
        <div style={{ background: "var(--metric-bg)", borderRadius: 8, padding: "10px 12px", border: "1px solid var(--metric-border)" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Holdings Value</div>
          <div title={holdingsVal ? "$" + holdingsVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""} style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", cursor: "default" }}>{holdingsVal ? fmt(holdingsVal) : "\u2014"}</div>
        </div>
        <div style={{ background: "var(--metric-bg)", borderRadius: 8, padding: "10px 12px", border: "1px solid var(--metric-border)" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>% of Circ. Supply</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: "var(--text)" }}>{e.avaxHoldings && circ ? (e.avaxHoldings / circ * 100).toFixed(3) + "%" : "\u2014"}</div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6, margin: "0 0 4px" }}>{e.description}</p>
      {isOpen && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Key Details</div>
          {e.highlights.map(function(h, i) {
            return <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12, color: "var(--sub)" }}><span style={{ color: "#E84142", flexShrink: 0 }}>&bull;</span><span>{h}</span></div>;
          })}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <span style={{ fontSize: 11, color: "var(--dim)" }}>{isOpen ? "Click to collapse \u25B2" : "Click for details \u25BC"}</span>
      </div>
    </div>
  );
}

var RWA_MANUAL = {
  distributed: 1665999316,
  represented: 11404881341,
  stablecoinMcap: 1373000000
};
var RWA_WEEKLY = [
  { date: "Aug 2024", distributed: 120000000, represented: 180000000 },
  { date: "Sep 2024", distributed: 155000000, represented: 220000000 },
  { date: "Oct 2024", distributed: 200000000, represented: 270000000 },
  { date: "Nov 2024", distributed: 250000000, represented: 310000000 },
  { date: "Dec 2024", distributed: 295000000, represented: 360000000 },
  { date: "Jan 2025", distributed: 320000000, represented: 400000000 },
  { date: "Feb 2025", distributed: 340000000, represented: 420000000 },
  { date: "Mar 2025", distributed: 365000000, represented: 445000000 },
  { date: "Apr 2025", distributed: 390000000, represented: 470000000 },
  { date: "May 2025", distributed: 420000000, represented: 500000000 },
  { date: "Jun 2025", distributed: 450000000, represented: 530000000 },
  { date: "Jul 2025", distributed: 480000000, represented: 560000000 },
  { date: "Aug 2025", distributed: 510000000, represented: 580000000 },
  { date: "Sep 2025", distributed: 540000000, represented: 610000000 },
  { date: "Oct 2025", distributed: 560000000, represented: 635000000 },
  { date: "Nov 2025", distributed: 570000000, represented: 650000000 },
  { date: "Dec 2025", distributed: 570000000, represented: 655000000 },
  { date: "Jan 2026", distributed: 575000000, represented: 670000000 },
  { date: "Feb 2026", distributed: 581290000, represented: 678650000 },
  { date: "Mar 2026", distributed: 628700000, represented: 678650000 },
  { date: "Apr 2026", distributed: 640744983, represented: 678646842 },
  { date: "May 2026", distributed: 808984839, represented: 678646842 },
  { date: "Jun 2026", distributed: 720290163, represented: 678646842 },
  { date: "Jul 2026", distributed: 1589680745, represented: 678646842 },
  { date: "Aug 2026", distributed: 1665999316, represented: 11404881341 }
];

var RWA_SUMMARY = {
  distributed: RWA_MANUAL.distributed,
  represented: RWA_MANUAL.represented,
  rwaCount: 1252,
  holders: 8036,
  stablecoinMcap: RWA_MANUAL.stablecoinMcap,
  source: "RWA.xyz",
  lastUpdated: "Apr 3, 2026"
};

var RWA_FALLBACK_SUMMARY = RWA_SUMMARY;
var RWA_FALLBACK_WEEKLY = RWA_WEEKLY;

function fmtRwa(n) {
  if (n == null) return "\u2014";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function RWASection({ rwaLive }) {
  var viewS = useState("total"), view = viewS[0], setView = viewS[1];
  var hoverS = useState(null), hovered = hoverS[0], setHovered = hoverS[1];
  var containerRef = useRef(null);
  var widthS = useState(600), chartW = widthS[0], setChartW = widthS[1];
  var chartH = 200;

  useEffect(function() {
    function measure() {
      if (containerRef.current) setChartW(containerRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return function() { window.removeEventListener("resize", measure); };
  }, []);

  var summary = {
    distributed: RWA_MANUAL.distributed,
    represented: RWA_MANUAL.represented,
    rwaCount: rwaLive && rwaLive.rwaCount ? rwaLive.rwaCount : RWA_SUMMARY.rwaCount,
    holders: rwaLive && rwaLive.holders ? rwaLive.holders : RWA_SUMMARY.holders,
    stablecoinMcap: RWA_MANUAL.stablecoinMcap
  };

  var isLive = rwaLive && rwaLive.source === 'RWA.xyz API v4';
  var rawTS = RWA_WEEKLY;

  var data = rawTS.map(function(d) {
    return { date: d.date, distributed: d.distributed || 0, represented: d.represented || 0, total: (d.distributed || 0) + (d.represented || 0) };
  });

  function getValue(d) {
    if (view === "distributed") return d.distributed;
    if (view === "represented") return d.represented;
    return d.total;
  }

  var max = Math.max.apply(null, data.map(function(d) { return getValue(d); })) * 1.1;

  function getX(i) { return data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2; }
  function getY(val) { return max > 0 ? chartH - (val / max) * (chartH - 20) - 10 : chartH; }

  var lineColor = view === "distributed" ? "#22c55e" : view === "represented" ? "#f59e0b" : "#E84142";
  var areaColor = view === "distributed" ? "rgba(34,197,94,0.08)" : view === "represented" ? "rgba(245,158,11,0.08)" : "rgba(232,65,66,0.08)";

  var linePath = data.map(function(d, i) {
    return (i === 0 ? "M" : "L") + getX(i) + "," + getY(getValue(d));
  }).join(" ");
  var areaPath = linePath + " L" + chartW + "," + chartH + " L0," + chartH + " Z";

  var totalVal = summary.distributed + summary.represented;

  var viewLabels = [
    { key: "total", label: "Total RWA", color: "#E84142" },
    { key: "distributed", label: "Distributed", color: "#22c55e" },
    { key: "represented", label: "Represented", color: "#f59e0b" }
  ];

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Distributed Value</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#22c55e", letterSpacing: -0.5 }}>{fmtRwa(summary.distributed)}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>Onchain, transferable assets</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Represented Value</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f59e0b", letterSpacing: -0.5 }}>{fmtRwa(summary.represented)}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>Recordkeeping &amp; transparency</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Total RWA Value</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#E84142", letterSpacing: -0.5 }}>{fmtRwa(totalVal)}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>Distributed + Represented</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>RWA Count</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{summary.rwaCount}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>{summary.holders ? summary.holders.toLocaleString() + " holders" : ""}{isLive ? " \u2022 Live" : ""}</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Stablecoin Market Cap</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{fmtRwa(summary.stablecoinMcap)}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", marginTop: 2 }}>On Avalanche</div>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", margin: 0, letterSpacing: -0.3 }}>Avalanche RWA Value Over Time</h3>
            <div style={{ fontSize: 11, color: "var(--dim)", marginTop: 2 }}>Source: RWA.xyz{isLive ? " (live)" : " \u2022 Monthly totals"}</div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {viewLabels.map(function(v) {
              var isActive = view === v.key;
              return (
                <button key={v.key} onClick={function() { setView(v.key); }}
                  style={{
                    background: isActive ? v.color : "transparent",
                    color: isActive ? "#fff" : "var(--muted)",
                    border: "1px solid " + (isActive ? v.color : "var(--border)"),
                    borderRadius: 6, padding: "5px 12px", fontSize: 11, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s"
                  }}>
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ position: "relative", height: chartH + 40, width: "100%" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: chartH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtRwa(max / 1.1)}</span>
            <span style={{ fontSize: 10, color: "var(--dim)" }}>{fmtRwa(max / 2.2)}</span>
            <span style={{ fontSize: 10, color: "var(--dim)" }}>$0</span>
          </div>
          <div ref={containerRef} style={{ marginLeft: 55, height: chartH, position: "relative" }}>
            {hovered !== null && data[hovered] && (
              <div style={{
                position: "absolute",
                left: Math.min(Math.max(getX(hovered) - 60, 0), chartW - 130),
                top: Math.max(getY(getValue(data[hovered])) - 56, 0),
                background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "6px 10px", pointerEvents: "none",
                zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.3)", minWidth: 120
              }}>
                <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 2 }}>{data[hovered].date}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: lineColor }}>
                  {fmtRwa(getValue(data[hovered]))}
                </div>
                {view === "total" && (
                  <div style={{ fontSize: 9, color: "var(--dim)", marginTop: 1 }}>
                    D: {fmtRwa(data[hovered].distributed)} &bull; R: {fmtRwa(data[hovered].represented)}
                  </div>
                )}
              </div>
            )}
            {[0, 0.5, 1].map(function(pct, i) {
              return <div key={i} style={{ position: "absolute", top: pct * chartH, left: 0, right: 0, height: 1, background: "var(--border)" }} />;
            })}
            <svg width={chartW} height={chartH} style={{ position: "absolute", top: 0, left: 0 }}>
              <path d={areaPath} fill={areaColor} />
              <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" />
              {data.map(function(d, i) {
                var a = hovered === i;
                return <circle key={i} cx={getX(i)} cy={getY(getValue(d))} r={a ? 4 : 2} fill={a ? "#fff" : lineColor} stroke={a ? lineColor : "none"} strokeWidth={a ? 2 : 0} />;
              })}
            </svg>
            {data.map(function(d, i) {
              var left = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
              var w = data.length > 1 ? 100 / (data.length - 1) : 100;
              return (
                <div key={i} style={{ position: "absolute", top: 0, left: (left - w / 2) + "%", width: w + "%", height: chartH, cursor: "pointer", zIndex: 2 }}
                  onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(null); }}>
                  {hovered === i && <div style={{ position: "absolute", left: "50%", top: 0, width: 1, height: chartH, background: lineColor.replace(")", ",0.2)").replace("rgb", "rgba"), transform: "translateX(-50%)" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ marginLeft: 55, display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {data.map(function(d, i) {
              if (i % 3 !== 0 && i !== data.length - 1) return <span key={i} style={{ flex: 1 }} />;
              return <span key={i} style={{ fontSize: 9, color: hovered === i ? lineColor : "var(--dim)", fontWeight: hovered === i ? 600 : 400, textAlign: "center", flex: 1, transition: "all 0.15s" }}>{d.date}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ETFTable({ etfs, price }) {
  var hovS = useState(null), hovered = hovS[0], setHovered = hovS[1];
  var expS = useState(null), expanded = expS[0], setExpanded = expS[1];
  var colCount = 11;
  var thStyle = { padding: "12px 10px", textAlign: "left", color: "var(--muted)", fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" };
  var thStyleR = Object.assign({}, thStyle, { textAlign: "right" });

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 40 }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={Object.assign({}, thStyle, { width: 70 })}>Ticker</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Sponsor</th>
              <th style={thStyleR}>AVAX Holdings</th>
              <th style={thStyleR}>USD Value</th>
              <th style={thStyleR}>AUM</th>
              <th style={thStyleR}>Staking %</th>
              <th style={thStyleR}>NAV/Share</th>
              <th style={thStyleR}>Expense Ratio</th>
              <th style={thStyleR}>Status</th>
              <th style={Object.assign({}, thStyle, { width: 32 })}></th>
            </tr>
          </thead>
          <tbody>
            {etfs.map(function(e, i) {
              var isHov = hovered === i;
              var isExp = expanded === e.id;
              var holdingsVal = e.avaxHoldings && price ? e.avaxHoldings * price : null;
              var tdBase = { padding: "14px 10px", borderBottom: isExp ? "none" : "1px solid var(--border)", transition: "background 0.15s", verticalAlign: "middle" };
              var tdR = Object.assign({}, tdBase, { textAlign: "right" });
              var rowBg = isExp ? "rgba(232,65,66,0.03)" : isHov ? "rgba(255,255,255,0.03)" : "transparent";

              return [
                <tr key={e.id} style={{ background: rowBg, cursor: "pointer" }}
                  onClick={function() { setExpanded(isExp ? null : e.id); }}
                  onMouseEnter={function() { setHovered(i); }} onMouseLeave={function() { setHovered(null); }}>
                  <td style={tdBase}><span style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{e.ticker}</span></td>
                  <td style={tdBase}><span style={{ color: "var(--sub)", fontWeight: 500 }}>{e.name}</span></td>
                  <td style={tdBase}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {e.logoImg ? <img src={e.logoImg} alt="" style={{ maxHeight: 20, maxWidth: 20, objectFit: "contain", filter: e.logoInvert ? "brightness(0) invert(1)" : "none" }} /> : null}
                      <span style={{ color: "var(--muted)", fontWeight: 500 }}>{e.sponsor}</span>
                    </div>
                  </td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{fmtAvaxETF(e.avaxHoldings)}</span></td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{holdingsVal ? fmt(holdingsVal) : "$0.00"}</span></td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{e.aum ? fmt(e.aum) : "$0.00"}</span></td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{e.stakingPct != null ? e.stakingPct.toFixed(1) + "%" : "0.0%"}</span></td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{e.navPerShare != null ? "$" + e.navPerShare.toFixed(2) : "$0.00"}</span></td>
                  <td style={tdR}><span style={{ color: "var(--text)", fontWeight: 500 }}>{e.sponsorFee != null ? e.sponsorFee.toFixed(2) + "%" : "\u2014"}</span></td>
                  <td style={Object.assign({}, tdR, { paddingRight: 8 })}><StatusBadge status={e.status} /></td>
                  <td style={Object.assign({}, tdBase, { textAlign: "center", width: 32 })}>
                    {e.buyUrl ? (
                      <a href={e.buyUrl} target="_blank" rel="noopener noreferrer"
                        onClick={function(ev) { ev.stopPropagation(); }}
                        style={{ color: "var(--dim)", transition: "color 0.15s", display: "inline-flex" }}
                        onMouseEnter={function(ev) { ev.currentTarget.style.color = "var(--text)"; }}
                        onMouseLeave={function(ev) { ev.currentTarget.style.color = "var(--dim)"; }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    ) : <span style={{ color: "var(--dim)", fontSize: 11 }}>\u2014</span>}
                  </td>
                </tr>,
                isExp && (
                  <tr key={e.id + "-detail"}>
                    <td colSpan={colCount} style={{ padding: 0, borderBottom: "1px solid var(--border)" }}>
                      <div style={{ background: "rgba(232,65,66,0.02)", padding: "20px 24px 20px 56px", borderTop: "1px solid rgba(232,65,66,0.1)" }}>
                        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Exchange</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{e.exchange}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Max Staking</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{e.stakingMax}%</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Sponsor Fee</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{e.sponsorFee != null ? e.sponsorFee.toFixed(2) + "%" : "\u2014"}</div>
                          </div>
                          {e.feeWaiver && (
                            <div>
                              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Fee Waiver</div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>{e.feeWaiver}</div>
                            </div>
                          )}
                        </div>
                        {e.description && (
                          <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6, margin: "0 0 14px", maxWidth: 700 }}>{e.description}</p>
                        )}
                        {e.highlights && e.highlights.length > 0 && (
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Key Details</div>
                            {e.highlights.map(function(h, j) {
                              return (
                                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12, color: "var(--sub)" }}>
                                  <span style={{ color: "#E84142", flexShrink: 0 }}>&bull;</span>
                                  <span>{h}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div style={{ marginTop: 12, fontSize: 11, color: "var(--dim)" }}>Click row to collapse \u25B2</div>
                      </div>
                    </td>
                  </tr>
                )
              ];
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Dashboard() {
  var ps = useState(null), price = ps[0], setPrice = ps[1];
  var cs = useState(null), priceChange = cs[0], setPriceChange = cs[1];
  var ms = useState(null), mktCap = ms[0], setMktCap = ms[1];
  var vs = useState(null), vol24 = vs[0], setVol24 = vs[1];
  var ls = useState(true), loading = ls[0], setLoading = ls[1];
  var es = useState(null), err = es[0], setErr = es[1];
  var ss = useState(null), selected = ss[0], setSelected = ss[1];
  var us = useState(null), lastUpdate = us[0], setLastUpdate = us[1];
  var crs = useState(null), circ = crs[0], setCirc = crs[1];
  var avxS = useState(14145000), avxHoldings = avxS[0], setAvxHoldings = avxS[1];
  var darkS = useState(true), isDark = darkS[0], setIsDark = darkS[1];
  var newsS = useState([]), liveNews = newsS[0], setLiveNews = newsS[1];
  var vavxS = useState(null), vavxData = vavxS[0], setVavxData = vavxS[1];
  var rwaS = useState(null), rwaLive = rwaS[0], setRwaLive = rwaS[1];
  var dashRef = useRef(null);

  useEffect(function() {
    function fetchData() {
      fetch("/api/avax-price")
        .then(function(r) { return r.json(); })
        .then(function(d) {
          if (d.price) { setPrice(d.price); setPriceChange(d.priceChange); setMktCap(d.marketCap); setVol24(d.volume24h); setCirc(d.circulatingSupply); }
          setLastUpdate(new Date()); setErr(null); setLoading(false);
        })
        .catch(function() {
          setPrice(8.86); setPriceChange(-1.5); setMktCap(3827000000); setVol24(261000000); setCirc(431770000);
          setLastUpdate(new Date()); setErr("Using cached data"); setLoading(false);
        });
      fetch("/api/avax-holdings").then(function(r) { return r.json(); }).then(function(d) { /* Blueprint override disabled - using manual value */ }).catch(function() {});
      fetch("/api/avax-news").then(function(r) { return r.json(); }).then(function(d) { if (d.articles && d.articles.length > 0) setLiveNews(d.articles); }).catch(function() {});
    }
    fetchData();
    var i = setInterval(fetchData, 60000);
    return function() { clearInterval(i); };
  }, []);

  useEffect(function() {
    function fetchVavx() {
      fetch("/api/vavx-data").then(function(r) { return r.json(); }).then(function(d) { setVavxData(d); }).catch(function() {});
    }
    fetchVavx();
    var i = setInterval(fetchVavx, 5 * 60 * 1000);
    return function() { clearInterval(i); };
  }, []);

  useEffect(function() {
    function fetchRwa() {
      fetch("/api/avax-rwa").then(function(r) { return r.json(); }).then(function(d) { setRwaLive(d); }).catch(function() {});
    }
    fetchRwa();
    var i = setInterval(fetchRwa, 30 * 60 * 1000);
    return function() { clearInterval(i); };
  }, []);

  var datsWithLive = DATS.map(function(e) {
    if (e.id === "avax-one") return Object.assign({}, e, { avaxHoldings: avxHoldings });
    return e;
  });

  var feeWaiverActive = vavxData ? vavxData.feeWaiverActive : (new Date() < new Date("2026-02-28"));
  var feeWaiverDaysLeft = feeWaiverActive ? Math.max(0, Math.ceil((new Date("2026-02-28") - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  var vaneckEntry = {
    id: "vaneck-vavx",
    name: "VanEck Avalanche ETF",
    ticker: "VAVX",
    sponsor: "VanEck",
    exchange: "NASDAQ",
    aum: 13720780,
    avaxHoldings: vavxData && vavxData.avaxHoldings ? vavxData.avaxHoldings : 1822282,
    sponsorFee: 0.20,
    feeWaiver: null,
    stakingPct: 80.20,
    navPerShare: vavxData && vavxData.navPrice ? vavxData.navPrice : 15.68,
    stakingMax: 70,
    status: "Live",
    description: "First U.S.-listed spot AVAX ETF. Offers price exposure plus potential staking rewards via Coinbase Crypto Services. Launched January 26, 2026.",
    highlights: [
      "First & only U.S.-listed AVAX spot ETP",
      "Staking via Coinbase (4% service fee)",
      "Anchorage Digital Bank as primary custodian",
      "~5.57% gross staking yield reported",
      "State Street as cash custodian & admin",
      feeWaiverActive ? "Sponsor fee waived through Feb 28, 2026 (first $500M)" : "Sponsor fee: 0.20%"
    ],
    color: "#E84142",
    logoImg: "/vaneck.png",
    buyUrl: "https://www.vaneck.com/us/en/investments/avalanche-etf-vavx/overview/"
  };

  var ETFS = [vaneckEntry].concat(ETFS_STATIC);

  var totalDATAvax = datsWithLive.reduce(function(s, e) { return s + (e.avaxHoldings || 0); }, 0);
  var totalETFHoldings = ETFS.reduce(function(s, e) { return s + (e.avaxHoldings || 0); }, 0);
  var datPctCirc = circ ? (totalDATAvax / circ * 100).toFixed(2) : null;
  var totalRWA = RWA_MANUAL.distributed + RWA_MANUAL.represented;

  function handleShare() {
    var text = "Avalanche Institutional Dashboard\n\n";
    text += "AVAX Price: $" + (price ? price.toFixed(2) : "N/A") + "\n";
    text += "DAT AVAX Holdings: " + fmtAvax(totalDATAvax) + " (" + (datPctCirc || "?") + "% of circ. supply)\n\n";
    datsWithLive.forEach(function(d) {
      text += d.name + " (" + d.ticker + "): " + fmtAvax(d.avaxHoldings) + " AVAX";
      if (d.avaxHoldings && price) text += " | " + fmt(d.avaxHoldings * price);
      text += "\n";
    });
    text += "\nETF AVAX Holdings: " + fmtAvax(totalETFHoldings) + "\n";
    text += "\nhttps://avax-dat-etf-dashboard.vercel.app";
    window.open("https://x.com/intent/tweet?text=" + encodeURIComponent(text), "_blank");
  }

  var theme = isDark ? {
    "--bg": "#09090b", "--text": "#fafafa", "--sub": "#a1a1aa", "--muted": "#71717a", "--dim": "#52525b",
    "--card": "rgba(255,255,255,0.02)", "--border": "rgba(255,255,255,0.06)",
    "--metric-bg": "rgba(0,0,0,0.4)", "--metric-border": "rgba(255,255,255,0.04)",
    "--banner-bg": "rgba(255,255,255,0.02)", "--banner-border": "rgba(255,255,255,0.06)"
  } : {
    "--bg": "#ffffff", "--text": "#18181b", "--sub": "#52525b", "--muted": "#71717a", "--dim": "#a1a1aa",
    "--card": "rgba(0,0,0,0.02)", "--border": "rgba(0,0,0,0.08)",
    "--metric-bg": "rgba(0,0,0,0.03)", "--metric-border": "rgba(0,0,0,0.06)",
    "--banner-bg": "rgba(232,65,66,0.04)", "--banner-border": "rgba(232,65,66,0.12)"
  };

  return (
    <div ref={dashRef} style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)", fontFamily: "'Inter', -apple-system, system-ui, sans-serif", ...theme }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <img src="/avalanche-logo.png" alt="Avalanche" style={{ height: 38 }} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", margin: "6px 0 0", letterSpacing: -0.5 }}>Institutional Dashboard</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>Tracking institutional adoption of the Avalanche ecosystem</p>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 8 }}>
            <button onClick={function() { setIsDark(!isDark); }} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: "var(--text)", display: "flex", alignItems: "center", gap: 4 }}>
              {isDark ? "\u2600\uFE0F Light" : "\u{1F319} Dark"}
            </button>
            <button onClick={handleShare} style={{ background: "rgba(232,65,66,0.1)", border: "1px solid rgba(232,65,66,0.3)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: "#E84142", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              Share on X
            </button>
          </div>
          {lastUpdate && (
            <p style={{ color: "var(--dim)", fontSize: 11, marginTop: 8 }}>
              Updated: {lastUpdate.toLocaleTimeString()}
              {err && <span style={{ color: "#E84142" }}> &bull; {err}</span>}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
          <div style={{
            background: "var(--banner-bg)", border: "1px solid var(--banner-border)",
            borderRadius: 12, padding: "20px 24px", flex: "1 1 auto", minWidth: 0,
            display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>AVAX / USD</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{loading ? "..." : "$" + (price ? price.toFixed(2) : "")}</span>
                {priceChange != null && <span style={{ fontSize: 14, fontWeight: 500, color: priceChange >= 0 ? "#22c55e" : "#E84142" }}>{priceChange >= 0 ? "\u25B2" : "\u25BC"} {Math.abs(priceChange).toFixed(2)}%</span>}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Market Cap</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{fmt(mktCap)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Circulating Supply</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{circ ? (circ / 1e6).toFixed(1) + "M" : "---"}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>24h Volume</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{fmt1(vol24)}</div>
            </div>
          </div>

          <div style={{
            background: "var(--banner-bg)", border: "1px solid var(--banner-border)",
            borderRadius: 12, padding: "20px 24px", flexShrink: 0,
            display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center"
          }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>DAT AVAX Holdings</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#E84142", letterSpacing: -0.5 }}>{fmtAvax(totalDATAvax)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>ETF AVAX Holdings</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#E84142", letterSpacing: -0.5 }}>{fmtAvax(totalETFHoldings)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>RWA Total Value</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text)", letterSpacing: -0.5 }}>{fmtRwa(totalRWA)}</div>
            </div>
          </div>
        </div>

        <SectionHeader title="Digital Asset Treasuries" subtitle="Publicly traded companies accumulating AVAX as a treasury asset" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 12, marginBottom: 16 }}>
          {datsWithLive.map(function(e) {
            return <EntityCard key={e.id} e={e} price={price} circ={circ} isOpen={selected === e.id} onToggle={function() { setSelected(selected === e.id ? null : e.id); }} />;
          })}
        </div>

        {/* ── Donut + % Circ Supply chart side by side ── */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "stretch", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto", width: "calc(50% - 6px)", minWidth: 300 }}>
            <HoldingsDonutChart dats={datsWithLive} price={price} circ={circ} />
          </div>
          <DATCircSupplyChart history={DAT_HISTORY} currentTotal={totalDATAvax} circ={circ} />
        </div>

        <HoldingsTimeChart history={DAT_HISTORY} currentTotal={totalDATAvax} />

        <div style={{ height: 1, background: "var(--border)", margin: "24px 0 40px" }} />

        <SectionHeader title="Exchange-Traded Funds" subtitle="Spot AVAX ETFs offering regulated exposure and staking rewards" />
        <ETFTable etfs={ETFS} price={price} />
        <ETFHoldingsTimeChart history={ETF_HISTORY} currentTotal={totalETFHoldings} />

        <div style={{ height: 1, background: "var(--border)", margin: "24px 0 40px" }} />

        <SectionHeader title="Real World Assets" subtitle="Tokenized real-world assets on Avalanche. Live data from RWA.xyz" />
        <RWASection rwaLive={rwaLive} />

        <div style={{ height: 1, background: "var(--border)", margin: "24px 0 40px" }} />

        <SectionHeader title="Institutional News" subtitle="Latest developments in Avalanche institutional adoption" />
        <NewsFeed liveNews={liveNews} />

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <img src="/avalanche-logo.png" alt="Avalanche" style={{ height: 24 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
            <a href="https://x.com/avax" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", opacity: 0.5, transition: "opacity 0.15s" }} onMouseEnter={function(ev) { ev.currentTarget.style.opacity = "1"; }} onMouseLeave={function(ev) { ev.currentTarget.style.opacity = "0.5"; }}>
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }} fill="var(--muted)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.avax.network/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", opacity: 0.5, transition: "opacity 0.15s" }} onMouseEnter={function(ev) { ev.currentTarget.style.opacity = "1"; }} onMouseLeave={function(ev) { ev.currentTarget.style.opacity = "0.5"; }}>
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }} fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
          </div>
          <div style={{ color: "var(--dim)", fontSize: 11, lineHeight: 1.6 }}>
            <p>Data sourced from SEC filings, company announcements, CoinGecko API, and Yahoo Finance. Not financial advice.</p>
            <p>Holdings based on latest public disclosures. ETF AUM changes daily. AVAX price refreshes every 60s. VAVX data refreshes every 5 min.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
