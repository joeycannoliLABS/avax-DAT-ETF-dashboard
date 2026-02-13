"use client";

import { useState, useEffect, useCallback } from "react";

const DATS = [
  {
    id: "avax-one",
    name: "AVAX One",
    ticker: "AVX",
    exchange: "NASDAQ",
    avaxHoldings: 13800000,
    stakingPct: 90,
    sponsorFee: null,
    status: "Live",
    description: "First publicly traded Avalanche Treasury company. Pivoted from AgriFORCE in Nov 2025. Runs its own validator node.",
    highlights: [
      "Acquired 9.37M AVAX for $110M (Nov 2025)",
      "$40M share buyback authorized",
      "~$600K staking rewards earned through Dec 2025",
      "Expects ~180K AVAX staking rewards in Q1 2026",
      "Treasury analytics dashboard at avax-one.com"
    ],
    color: "#E84142",
    logo: "\u{1F3D4}\u{FE0F}"
  },
  {
    id: "deft",
    name: "DeFi Technologies",
    ticker: "DEFT",
    exchange: "NASDAQ",
    avaxHoldings: 398321,
    stakingPct: null,
    sponsorFee: null,
    status: "Live",
    description: "Fintech company bridging traditional capital markets with DeFi. Operates Valour (102 ETPs), Stillman execution desk, and holds a multi-asset digital treasury including AVAX.",
    highlights: [
      "398,321 AVAX held in treasury (~$7.3M at current prices)",
      "102 ETPs listed globally via Valour subsidiary",
      "$165.7M in cash + digital asset treasury (as of Q3 2025)",
      "$138.2M net inflows in 2025 (record year)",
      "~$80M revenue and $39M operating income through Q3 2025",
      "Expanded to Brazil (B3 exchange) in Dec 2025",
      "UK FCA approval for retail crypto ETPs (Jan 2026)",
      "Zero debt; $44M in venture investments"
    ],
    color: "#10B981",
    logo: "\u{1F4B9}"
  },
  {
    id: "avat-treasury",
    name: "Avalanche Treasury Co.",
    ticker: "AVAT (via MLAC)",
    exchange: "NASDAQ (Q1 2026)",
    avaxHoldings: null,
    aum: 460000000,
    sponsorFee: null,
    status: "SPAC Merger / Q1 2026 Listing",
    description: "$675M SPAC merger with Mountain Lake Acquisition Corp (MLAC). Initial $200M AVAX purchase at discount with 18-month priority rights from Avalanche Foundation. Targeting $1B+ in AVAX holdings post-listing.",
    highlights: [
      "$675M business combination with MLAC (Nasdaq)",
      "$200M initial AVAX purchased at 0.77x mNAV (23% discount)",
      "18-month priority on Avalanche Foundation sales to US DATs",
      "$460M in treasury assets at closing",
      "Target: $1B+ in AVAX holdings post-listing",
      "CEO: Bart Smith (ex-Susquehanna)",
      "Advisors: Emin Gun Sirer, Stani Kulechov (Aave), Haseeb Qureshi (Dragonfly)",
      "Backers: Dragonfly, ParaFi, VanEck, Galaxy Digital, Pantera, Kraken, CoinFund",
      "FalconX for execution; Monarq as asset manager",
      "3 pillars: protocol investments, enterprise partnerships, validator infrastructure"
    ],
    color: "#F59E0B",
    logo: "\u{1F3DB}\u{FE0F}"
  }
];

const ETFS = [
  {
    id: "vaneck-vavx",
    name: "VanEck Avalanche ETF",
    ticker: "VAVX",
    exchange: "NASDAQ",
    avaxHoldings: null,
    aum: 3730000,
    sponsorFee: 0.20,
    feeWaiver: "Waived until Feb 28, 2026 for first $500M",
    stakingMax: 70,
    status: "Live (Jan 26, 2026)",
    description: "First U.S.-listed spot AVAX ETF. Offers price exposure plus potential staking rewards via Coinbase Crypto Services.",
    highlights: [
      "First & only U.S.-listed AVAX spot ETP",
      "Staking via Coinbase (4% service fee)",
      "Anchorage Digital Bank as primary custodian",
      "~5.57% gross staking yield reported",
      "State Street as cash custodian & admin"
    ],
    color: "#0066FF",
    logo: "\u{1F4C8}"
  },
  {
    id: "grayscale-avax",
    name: "Grayscale Avalanche Trust",
    ticker: "AVAXFUN \u2192 GAVX",
    exchange: "OTC \u2192 NASDAQ",
    avaxHoldings: null,
    aum: 15000000,
    sponsorFee: 0.50,
    stakingMax: 85,
    status: "OTC Live / ETF Pending",
    description: "Existing trust launched Aug 2024, filed S-1 to convert to spot ETF on NASDAQ. Updated to allow staking up to 70-85% of holdings.",
    highlights: [
      "Launched Aug 2024 as private trust",
      "S-1 filed Aug 2025 for ETF conversion",
      "Up to 70-85% of AVAX may be staked",
      "Coinbase Custody + BNY Mellon admin",
      "Ticker to change to GAVX on NASDAQ"
    ],
    color: "#6B7280",
    logo: "\u{1F537}"
  },
  {
    id: "bitwise-bava",
    name: "Bitwise Avalanche ETF",
    ticker: "BAVA",
    exchange: "NYSE Arca (pending)",
    avaxHoldings: null,
    aum: null,
    sponsorFee: 0.34,
    feeWaiver: "1 month waiver on first $500M",
    stakingMax: 70,
    status: "S-1 Filed / Awaiting Approval",
    description: "Filed amended S-1 Nov 2025. First U.S. ETF proposal to include staking at launch. Plans to stake up to 70% of holdings.",
    highlights: [
      "Lowest fee at 0.34% among AVAX ETFs",
      "Staking up to 70% of holdings",
      "12% cut of staking rewards as expenses",
      "$2.5M seed investment (100K shares @ $25)",
      "Coinbase Custody + BNY Mellon"
    ],
    color: "#8B5CF6",
    logo: "\u26A1"
  }
];

function fmt(n) {
  if (n == null) return "N/A";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function fmtAvax(n) {
  if (n == null) return "\u2014";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
}

function StatusBadge({ status }) {
  var s = status.toLowerCase();
  var isLive = s.includes("live");
  var isPending = s.includes("pending") || s.includes("filed") || s.includes("awaiting");
  var bg = isLive
    ? { background: "#14532d", color: "#86efac", borderColor: "#15803d" }
    : isPending
    ? { background: "#713f12", color: "#fde047", borderColor: "#a16207" }
    : { background: "#1f2937", color: "#d1d5db", borderColor: "#4b5563" };
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 8px",
      borderRadius: 9999, border: "1px solid", whiteSpace: "nowrap",
      ...bg
    }}>
      {status}
    </span>
  );
}

function SectionHeader({ icon, title, subtitle, accent }) {
  return (
    <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "linear-gradient(135deg, " + accent + "33, " + accent + "11)",
        border: "1px solid " + accent + "44",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
      }}>
        {icon}
      </div>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );
}

function EntityCard({ e, price, isOpen, onToggle }) {
  var holdingsVal = e.avaxHoldings && price ? e.avaxHoldings * price : null;
  return (
    <div onClick={onToggle} style={{
      background: isOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      border: "1px solid " + (isOpen ? e.color + "66" : "rgba(255,255,255,0.08)"),
      borderRadius: 16, padding: 20, cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isOpen ? "0 0 24px " + e.color + "18" : "none"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 8 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>{e.logo}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.name}</div>
            <div style={{ fontSize: 12, color: e.color, fontWeight: 600 }}>{e.ticker} &bull; {e.exchange}</div>
          </div>
        </div>
        <StatusBadge status={e.status} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>AVAX Holdings</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: e.avaxHoldings ? e.color : "#64748b" }}>{fmtAvax(e.avaxHoldings)}</div>
          {holdingsVal ? <div style={{ fontSize: 11, color: "#94a3b8" }}>&asymp; {fmt(holdingsVal)}</div> : null}
          {!e.avaxHoldings && e.aum ? <div style={{ fontSize: 11, color: "#94a3b8" }}>AUM: {fmt(e.aum)}</div> : null}
        </div>
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>
            {e.sponsorFee != null ? "Sponsor Fee" : e.stakingPct ? "Staking" : "AUM"}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
            {e.sponsorFee != null ? e.sponsorFee + "%" : e.stakingPct ? e.stakingPct + "%" : e.aum ? fmt(e.aum) : "\u2014"}
          </div>
          {e.feeWaiver ? <div style={{ fontSize: 10, color: "#4ade80", lineHeight: 1.3 }}>{e.feeWaiver}</div> : null}
          {e.stakingPct && !e.sponsorFee ? <div style={{ fontSize: 10, color: "#4ade80" }}>of holdings staked</div> : null}
        </div>
      </div>
      <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, margin: "8px 0 4px" }}>{e.description}</p>
      {isOpen && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Key Details</div>
          {e.highlights.map(function(h, i) {
            return (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12, color: "#cbd5e1" }}>
                <span style={{ color: e.color, flexShrink: 0 }}>&bull;</span>
                <span>{h}</span>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{ fontSize: 11, color: "#64748b" }}>{isOpen ? "Click to collapse \u25B2" : "Click for details \u25BC"}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  var priceState = useState(null);
  var price = priceState[0];
  var setPrice = priceState[1];

  var changeState = useState(null);
  var priceChange = changeState[0];
  var setPriceChange = changeState[1];

  var capState = useState(null);
  var mktCap = capState[0];
  var setMktCap = capState[1];

  var volState = useState(null);
  var vol24 = volState[0];
  var setVol24 = volState[1];

  var loadState = useState(true);
  var loading = loadState[0];
  var setLoading = loadState[1];

  var errState = useState(null);
  var err = errState[0];
  var setErr = errState[1];

  var selState = useState(null);
  var selected = selState[0];
  var setSelected = selState[1];

  var updateState = useState(null);
  var lastUpdate = updateState[0];
  var setLastUpdate = updateState[1];

  useEffect(function() {
    function fetchPrice() {
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true")
        .then(function(r) { return r.json(); })
        .then(function(d) {
          var a = d["avalanche-2"];
          setPrice(a.usd);
          setPriceChange(a.usd_24h_change);
          setMktCap(a.usd_market_cap);
          setVol24(a.usd_24h_vol);
          setLastUpdate(new Date());
          setErr(null);
          setLoading(false);
        })
        .catch(function() {
          setPrice(8.86);
          setPriceChange(-1.5);
          setMktCap(3827000000);
          setVol24(261000000);
          setLastUpdate(new Date());
          setErr("Using cached data");
          setLoading(false);
        });
    }
    fetchPrice();
    var i = setInterval(fetchPrice, 60000);
    return function() { clearInterval(i); };
  }, []);

  var totalDATAvax = DATS.reduce(function(s, e) { return s + (e.avaxHoldings || 0); }, 0);
  var totalETFAum = ETFS.reduce(function(s, e) { return s + (e.aum || 0); }, 0);

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1025 50%, #0f1a2e 100%)",
      minHeight: "100vh", color: "#e2e8f0",
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <img src="/avalanche-logo.png" alt="Avalanche" style={{ height: 40 }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "4px 0 0" }}>Institutional Dashboard</h1>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Digital Asset Trusts &amp; ETFs holding $AVAX</p>
          {lastUpdate && (
            <p style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>
              Updated: {lastUpdate.toLocaleTimeString()}
              {err && <span style={{ color: "#fbbf24" }}> &bull; {err}</span>}
            </p>
          )}
        </div>

        {/* Price Banner */}
        <div style={{
          background: "rgba(232,65,66,0.08)", border: "1px solid rgba(232,65,66,0.2)",
          borderRadius: 16, padding: "18px 24px", marginBottom: 28,
          display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>AVAX / USD</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 34, fontWeight: 800, color: "#fff" }}>{loading ? "..." : "$" + (price ? price.toFixed(2) : "")}</span>
              {priceChange != null && (
                <span style={{ fontSize: 15, fontWeight: 600, color: priceChange >= 0 ? "#4ade80" : "#f87171" }}>
                  {priceChange >= 0 ? "\u25B2" : "\u25BC"} {Math.abs(priceChange).toFixed(2)}%
                </span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>Market Cap</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{fmt(mktCap)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>24h Volume</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{fmt(vol24)}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>DAT AVAX Holdings</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#E84142" }}>{fmtAvax(totalDATAvax)}</div>
              {price && <div style={{ fontSize: 10, color: "#94a3b8" }}>&asymp; {fmt(totalDATAvax * price)}</div>}
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>ETF Total AUM</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0066FF" }}>{fmt(totalETFAum)}</div>
            </div>
          </div>
        </div>

        {/* DAT Section */}
        <SectionHeader icon={"\u{1F3E6}"} title="Digital Asset Treasuries" subtitle="Publicly traded companies accumulating AVAX as a treasury asset" accent="#E84142" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 36 }}>
          {DATS.map(function(e) {
            return <EntityCard key={e.id} e={e} price={price} isOpen={selected === e.id} onToggle={function() { setSelected(selected === e.id ? null : e.id); }} />;
          })}
        </div>

        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", marginBottom: 36 }} />

        {/* ETF Section */}
        <SectionHeader icon={"\u{1F4CA}"} title="Exchange-Traded Funds" subtitle="Spot AVAX ETFs offering regulated exposure and staking rewards" accent="#0066FF" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 24 }}>
          {ETFS.map(function(e) {
            return <EntityCard key={e.id} e={e} price={price} isOpen={selected === e.id} onToggle={function() { setSelected(selected === e.id ? null : e.id); }} />;
          })}
        </div>

        {/* ETF Fee Comparison */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", marginTop: 8 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>{"\u2696\uFE0F"}</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "#fff" }}>ETF Fee Comparison</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Fund", "Ticker", "Exchange", "Sponsor Fee", "Max Staking", "Status"].map(function(h) {
                    return <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#94a3b8", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {ETFS.map(function(e) {
                  return (
                    <tr key={e.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "10px 16px", fontWeight: 600, color: "#fff" }}>{e.logo} {e.name}</td>
                      <td style={{ padding: "10px 16px", color: e.color, fontWeight: 700 }}>{e.ticker}</td>
                      <td style={{ padding: "10px 16px", color: "#94a3b8" }}>{e.exchange}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ color: "#fff", fontWeight: 700 }}>{e.sponsorFee}%</span>
                        {e.feeWaiver && <div style={{ fontSize: 10, color: "#4ade80" }}>{e.feeWaiver}</div>}
                      </td>
                      <td style={{ padding: "10px 16px", color: "#4ade80", fontWeight: 600 }}>{e.stakingMax}%</td>
                      <td style={{ padding: "10px 16px" }}><StatusBadge status={e.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 28, textAlign: "center", color: "#475569", fontSize: 11, lineHeight: 1.6 }}>
          <p>Data sourced from SEC filings, company announcements, and CoinGecko API. Not financial advice.</p>
          <p>Holdings based on latest public disclosures. ETF AUM changes daily. Price refreshes every 60s.</p>
        </div>
      </div>
    </div>
  );
}

