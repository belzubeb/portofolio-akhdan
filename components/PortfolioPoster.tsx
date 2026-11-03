"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Anton, DM_Sans } from "next/font/google";
import { projects as P } from "@/data/projects";
import { SITE } from "@/lib/site";
import NeoDemo from "./NeoDemo";
import s from "./PortfolioPoster.module.css";

// font di-load lewat next/font, jadi gak nambah request ke Google Fonts dari <head>
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--pz-d", display: "swap" });
const dm = DM_Sans({ weight: ["500", "700"], subsets: ["latin"], variable: "--pz-f", display: "swap" });

const WORK_A = ["Networking", "Servers", "NAS", "Asset management", "ERP support"];
const WORK_B = ["Next.js", "React", "Laravel", "TypeScript", "PHP", "WordPress", "Tailwind CSS", "MySQL", "PostgreSQL", "Firebase", "Git", "Figma"];
const XP = [
  { t: "Present", h: "Supervisor", o: "PT Starion Wooin", now: true, l: ["Run the company network, servers and NAS.", "Build and maintain in-house web apps for daily operations.", "Manage hardware and software assets, and support the ERP and its users."] },
  { t: "Aug – Dec 2024", h: "Frontend Web Dev Intern (Team Lead)", o: "UPN “Veteran” Jakarta", l: ["Led a 4-person team to deliver a Virtual Museum web app on time using Laravel & MySQL.", "Owned system architecture and sprint planning, reducing rework by aligning specs early with stakeholders.", "Built a company profile site alongside the museum system, both shipped within a single semester."] },
  { t: "Jan – Dec 2024", h: "Head of Social & Politics Division", o: "HIMA D3 SI", l: ["Initiated and executed 4 campus programs on social and political awareness, coordinating 10+ members."] },
  { t: "Aug 2023 – Sep 2025", h: "Administrative Staff", o: "PAUDQU AR-RIDHO", l: ["Maintained student data records and official documentation using internal systems and Microsoft Office."] },
];
const T1 = "Web developer ★ IT supervisor ★ Networks ★ Servers ★ Next.js ★ Laravel ★ ".repeat(14);
const T2 = "Starion Wooin ★ Open to collabs ★ Say hi ★ Ship it ★ ".repeat(16);

export default function PortfolioPoster() {
  const root = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLSpanElement>(null);
  const t2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const S = Array.from(el.querySelectorAll<HTMLElement>("[data-sec]"));
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    S.forEach((x, i) => { x.style.zIndex = String(i + 1); });

    // tiap section nempel di bawah layar, section berikutnya naik nimpa
    const pin = () => {
      const vh = innerHeight;
      S.slice(0, -1).forEach((x) => { x.style.top = Math.min(0, vh - x.offsetHeight) + "px"; });
    };
    // posisi bola = progres scroll, putaran = jarak gelinding / radius
    const upd = () => {
      const b = ball.current;
      if (!b) return;
      const mx = document.documentElement.scrollHeight - innerHeight;
      const p = mx > 0 ? Math.min(1, scrollY / mx) : 0;
      const d = b.offsetWidth;
      const x = p * (innerWidth - d);
      b.style.transform = `translateX(${x}px) rotate(${((x / (d / 2)) * 57.3).toFixed(1)}deg)`;
      if (!rm) {
        if (t1.current) t1.current.style.transform = `translateX(${-scrollY * 0.7}px)`;
        if (t2.current) t2.current.style.transform = `translateX(${scrollY * 0.7 - 1200}px)`;
      }
    };
    const both = () => { pin(); upd(); };

    // sticky bikin anchor biasa gak jalan, jadi scroll manual ke posisi section di flow normal
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const i = S.findIndex((x) => "#" + x.id === a.getAttribute("href"));
      if (i < 0) return;
      e.preventDefault();
      scrollTo({ top: S.slice(0, i).reduce((t, x) => t + x.offsetHeight, 0), behavior: rm ? "auto" : "smooth" });
    };

    // gambar lazy-load bikin tinggi section berubah, jadi pantau ukuran tiap section
    const ro = new ResizeObserver(both);
    S.forEach((x) => ro.observe(x));
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", both);
    el.addEventListener("click", onClick);
    document.fonts?.ready.then(both);
    both();
    return () => {
      ro.disconnect();
      removeEventListener("scroll", upd);
      removeEventListener("resize", both);
      el.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={root} className={`${anton.variable} ${dm.variable} ${s.root}`}>
      <div role="navigation" aria-label="Sections" className={s.nav}>
        <a href="#hi">Hi</a><a href="#work">Work</a><a href="#p0">Projects</a><a href="#xp">Experience</a><a href="#ct">Contact</a>
      </div>
      <div ref={ball} className={s.ball} aria-hidden="true" />

      <main>
        <header data-sec id="hi" className={`${s.sec} ${s.hi}`}>
          <div className={s.w}>
            <h1><span>Akhdan</span><span>Najib</span></h1>
            <p className={s.sub}>Web developer and IT supervisor at PT Starion Wooin.</p>
            <div className={s.bt}><a className={`${s.b} ${s.p}`} href="#p0">See my projects</a><a className={s.b} href="#ct">Say hi</a></div>
          </div>
          <div className={`${s.rb} ${s.a}`} aria-hidden="true"><span ref={t1} className={s.tk}>{T1}</span></div>
          <div className={`${s.rb} ${s.c}`} aria-hidden="true"><span ref={t2} className={s.tk}>{T2}</span></div>
        </header>

        <section data-sec id="work" className={`${s.sec} ${s.work}`}>
          <div className={s.w}>
            <h2>Two jobs,<br />one brain.</h2>
            <div className={s.two}>
              <div className={s.pn} style={{ background: "var(--cy)" }}>
                <h3>I keep it running.</h3>
                <p>The company’s network, servers and NAS, every hardware and software asset, and ERP support for the people who use it.</p>
                <ul className={s.ch}>{WORK_A.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className={s.pn} style={{ background: "var(--ly)" }}>
                <h3>I build on top.</h3>
                <p>In-house web apps for daily operations, plus event, booking and internal platforms.</p>
                <ul className={s.ch}>{WORK_B.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
            <p className={s.edu}>Diploma of Information Systems, UPN “Veteran” Jakarta, 2022 – 2026. GPA 3.86.</p>
          </div>
        </section>

        {P.map((p, i) => (
          <section data-sec key={p.slug} id={`p${i}`} className={`${s.sec} ${s.pc}`} style={{ "--zbg": p.bg, "--zfg": p.fg } as CSSProperties}>
            <div className={s.w}>
              <div className={s.top}>
                <h3>{p.title}</h3>
                <div className={s.mt}><span>{p.year}</span><span>{p.platform}</span></div>
              </div>
              <div className={s.pg}>
                <div className={s.bw}>
                  <div className={s.bar}><i /><i /><i /><span>{p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "private project"}</span></div>
                  {p.cover && <img src={p.cover} alt={`${p.title} cover`} loading="lazy" decoding="async" />}
                </div>
                <div>
                  <p className={s.ct}>{p.category}</p>
                  <p>{p.description}</p>
                  <div className={s.st}>{p.highlights.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
                  <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <ul className={s.ch}>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  {p.link
                    ? <a className={s.b} href={p.link} target="_blank" rel="noopener noreferrer">{p.link.includes("github.com") ? "View on GitHub" : "Visit live site"}</a>
                    : <p className={s.ct} style={{ marginTop: 14 }}>Private project</p>}
                </div>
              </div>
              <div className={`${s.gl} ${p.device === "phone" ? s.ph : ""}`} style={{ "--n": p.gallery.length } as CSSProperties}>
                {p.gallery.map((g, j) => <img key={g} src={g} alt={`${p.title} screenshot ${j + 1}`} loading="lazy" decoding="async" />)}
              </div>
              {p.demo === "neo" && <div className={s.demo}><NeoDemo /></div>}
            </div>
          </section>
        ))}

        <section data-sec id="xp" className={`${s.sec} ${s.xp}`}>
          <div className={s.w}>
            <h2>Where I’ve<br />worked.</h2>
            {XP.map((x) => (
              <div key={x.h} className={`${s.rw} ${x.now ? s.now : ""}`}>
                <time>{x.t}</time>
                <div><h3>{x.h}</h3><p className={s.o}>{x.o}</p><ul>{x.l.map((l) => <li key={l}>{l}</li>)}</ul></div>
              </div>
            ))}
          </div>
        </section>

        <section data-sec id="ct" className={`${s.sec} ${s.ct2}`}>
          <div className={s.w}>
            <h2>Let’s build<br />something.</h2>
            {SITE.contactUrl && (
              <a
                className={s.mail}
                href={SITE.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s talk ↗
              </a>
            )}
            <div className={s.bt}>
              <a className={s.b} href="https://github.com/belzubeb" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className={s.b} href="https://linkedin.com/in/akhdannajib" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className={s.foot}>© {new Date().getFullYear()} Muhamad Akhdan Najib</div>
          </div>
        </section>
      </main>
    </div>
  );
}
