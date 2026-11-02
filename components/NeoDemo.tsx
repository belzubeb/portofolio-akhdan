"use client";
import { useEffect, useState } from "react";

const KPI: [string, number][] = [["Open work orders", 24], ["Pending PO", 8], ["Low stock", 5], ["Approved today", 17]];
const BARS = [40, 62, 48, 80, 66, 92, 74];
const STEPS = ["Draft", "Review", "Approved", "Done"];

// Rekonstruksi UI dengan data dummy. Sistem aslinya private.
export default function NeoDemo() {
  const [n, setN] = useState(KPI.map(() => 0));
  const [grow, setGrow] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v.map((x, i) => Math.min(KPI[i][1], x + Math.ceil(KPI[i][1] / 24)))), 40);
    const g = setTimeout(() => setGrow(true), 200);
    const s = setInterval(() => setStep((v) => (v + 1) % 5), 1100);
    return () => { clearInterval(t); clearTimeout(g); clearInterval(s); };
  }, []);
  return (
    <>
      <div className="fr"><div className="tb"><i /><i /><i /></div>
        <div className="dm">
          <aside><b>● Ops</b><span className="a">Dashboard</span><span>Work Orders</span><span>Purchase Orders</span><span>Stock</span><span>Reports</span></aside>
          <main>
            <div className="k">{KPI.map(([l], i) => <div key={l}><small>{l}</small><b>{n[i]}</b></div>)}</div>
            <div className="g2">
              <div className="pn"><small>Output this week</small>
                <div className="ch">{BARS.map((h, i) => <i key={i} style={{ height: grow ? `${h}%` : 0 }} />)}</div></div>
              <div className="pn"><small>PO-2041 approval</small>
                <div className="st">{STEPS.map((_, m) => (
                  <span key={m} style={{ display: "contents" }}>
                    <span className={step < 4 && m <= step ? "d" : ""}>{m + 1}</span>
                    {m < 3 && <u className={step < 4 && m < step ? "d" : ""} />}
                  </span>))}
                </div>
                <div className="lb">{STEPS.map((s) => <span key={s}>{s}</span>)}</div></div>
            </div>
            <div className="pn"><table><tbody>
              <tr><td>WO-0412</td><td>Panel assembly</td><td><span className="tg">In progress</span></td></tr>
              <tr><td>WO-0413</td><td>Cable harness</td><td><span className="tg w">Waiting material</span></td></tr>
              <tr><td>WO-0414</td><td>QC inspection</td><td><span className="tg">Passed</span></td></tr>
            </tbody></table></div>
          </main>
        </div>
      </div>
      <p className="soon" style={{ color: "inherit", opacity: 0.55 }}>Interface recreation with dummy data. The real system is private.</p>
    </>
  );
}
