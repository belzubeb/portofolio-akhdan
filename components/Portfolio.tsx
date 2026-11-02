"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { projects as P, type Project } from "@/data/projects";
import { SITE } from "@/lib/site";
import NeoDemo from "./NeoDemo";

const STACK = ["Next.js", "React", "Laravel", "WordPress", "Tailwind CSS", "REST API", "Firebase", "Android", "MySQL"];
const pad = (n: number) => String(n).padStart(2, "0");

function Cover({ p }: { p: Project }) {
  if (p.cover) return <img src={p.cover} alt="" />;
  return (
    <div className="blk" style={{ background: p.bg, color: p.fg }}>
      <small>{p.category}</small><b>{p.title}</b>
    </div>
  );
}

function reveal(root: Element | null, scope: ParentNode) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { root, threshold: 0.1 },
  );
  scope.querySelectorAll(".rv").forEach((el) => io.observe(el));
  return io;
}

export default function Portfolio() {
  const [cur, setCur] = useState<string | null>(null); // slug yang lagi kebuka
  const [last, setLast] = useState<Project>(P[0]);      // isi scene (tetap ada pas animasi tutup)
  const [hover, setHover] = useState<Project | null>(null);
  const scene = useRef<HTMLDivElement>(null);
  const pv = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const pos = useRef({ tx: 0, ty: 0, px: 0, py: 0 });

  const open = useCallback((slug: string, e?: MouseEvent) => {
    const p = P.find((x) => x.slug === slug);
    if (!p) return;
    if (e && scene.current) {
      scene.current.style.setProperty("--cx", e.clientX + "px");
      scene.current.style.setProperty("--cy", e.clientY + "px");
    }
    setLast(p); setCur(slug); setHover(null);
    if (location.hash !== "#" + slug) history.replaceState(null, "", "#" + slug);
  }, []);
  const close = useCallback(() => {
    setCur(null);
    history.replaceState(null, "", location.pathname + location.search);
  }, []);

  // hash <-> scene (plain #slug)
  useEffect(() => {
    const sync = () => {
      const s = location.hash.slice(1);
      P.some((p) => p.slug === s) ? open(s) : setCur(null);
    };
    sync();
    addEventListener("hashchange", sync);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", esc);
    return () => { removeEventListener("hashchange", sync); removeEventListener("keydown", esc); };
  }, [open, close]);

  // kursor: glow hero + preview ngikutin kursor
  useEffect(() => {
    const move = (e: globalThis.MouseEvent) => {
      pos.current.tx = e.clientX; pos.current.ty = e.clientY;
      hero.current?.style.setProperty("--mx", e.clientX + "px");
      hero.current?.style.setProperty("--my", e.clientY + "px");
    };
    addEventListener("mousemove", move);
    let raf = 0;
    const loop = () => {
      const s = pos.current;
      s.px += (s.tx - s.px) * 0.14; s.py += (s.ty - s.py) * 0.14;
      if (pv.current) { pv.current.style.left = s.px + "px"; pv.current.style.top = s.py + "px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  // scroll reveal (home + scene)
  useEffect(() => { const io = reveal(null, document.getElementById("home")!); return () => io.disconnect(); }, []);
  useEffect(() => {
    document.body.style.overflow = cur ? "hidden" : "";
    if (!cur || !scene.current) return;
    scene.current.scrollTop = 0;
    const io = reveal(scene.current, scene.current);
    return () => io.disconnect();
  }, [cur, last]);

  const go = (id: string) => { close(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const toggleTheme = () => {
    const r = document.documentElement;
    const dark = getComputedStyle(r).getPropertyValue("--bg").trim() === "#08080b";
    r.dataset.theme = dark ? "light" : "dark";
  };

  const i = P.findIndex((p) => p.slug === last.slug);
  const nx = P[(i + 1) % P.length];

  return (
    <>
      <nav><div className="wrap"><b>{SITE.name}</b>
        <div className="r">
          <button onClick={() => go("work")}>Work</button>
          <button onClick={() => go("about")}>About</button>
          <button onClick={() => go("contact")}>Contact</button>
          <button onClick={toggleTheme} aria-label="Toggle theme">◐</button>
        </div></div></nav>

      <main id="home">
        <header id="hero" ref={hero}>
          <div className="wrap" style={{ position: "relative" }}>
            <h1 className="d">
              <span className="ln"><span>Web products,</span></span>
              <span className="ln"><span>built end to end.</span></span>
            </h1>
            <div className="sub">
              <p>Interfaces, flows and systems for events, reservations, internal operations and company sites. Shipped with Next.js, React, Laravel and WordPress.</p>
              <p>Web Developer · {SITE.since} – now</p>
            </div>
          </div>
          <div className="mq"><div>{Array(4).fill(0).map((_, k) => STACK.map((s) => <span key={k + s}>{s}<i>✦</i></span>))}</div></div>
        </header>

        <section className="s" id="work"><div className="wrap">
          <div className="sh rv"><h2 className="d">Selected Work</h2>
            <p>Hover to preview, click to open a project. Six builds, from live products to private systems.</p></div>
          <div id="list" onMouseLeave={() => setHover(null)}>
            {P.map((p, k) => (
              <div key={p.slug}>
                <div className="row rv" onMouseEnter={() => setHover(p)} onClick={(e) => open(p.slug, e)}>
                  <span className="n">{pad(k + 1)}</span><h3>{p.title}</h3>
                  <span className="c">{p.category}<em>{p.tags.join(" · ")}</em></span><span className="y">{p.year}</span>
                </div>
                <div className="mcov" onClick={(e) => open(p.slug, e)}><Cover p={p} /></div>
              </div>
            ))}
          </div>
        </div></section>

        <section className="s" id="about"><div className="wrap ab">
          <p className="rv">I build the parts people actually touch: fast interfaces, clear flows, and the integrations that make them work.</p>
          <ul className="rv">
            <li>Frontend<span>Next.js · React · Tailwind CSS</span></li><li>Backend<span>Laravel · REST API · MySQL</span></li>
            <li>CMS<span>WordPress</span></li><li>Mobile<span>Android · Firebase</span></li>
          </ul></div></section>

        <section className="s ct" id="contact">
          <div className="wrap rv"><small style={{ color: "var(--mut)" }}>Have a project in mind?</small><br />
            <a className="d" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          <div className="wrap"><footer><span>© {new Date().getFullYear()} {SITE.name}</span>
            <button onClick={() => go("hero")}>Back to top ↑</button></footer></div>
        </section>
      </main>

      <div id="pv" ref={pv} className={hover ? "on" : ""}>{hover && <><Cover p={hover} /><span className="cap">{hover.category} · {hover.year}</span></>}</div>

      <div id="scene" ref={scene} className={cur ? "open" : ""} style={{ "--sbg": last.bg, "--sfg": last.fg } as CSSProperties}>
        <div key={last.slug}>
          <div className="bar"><button onClick={close}>← All work</button><span>{pad(i + 1)} / {pad(P.length)}</span></div>
          <div className="wrap sc" style={{ paddingBottom: 0 }}>
            <h1 className="d">{last.title}</h1>
            <div className="meta">
              <div><small>Role</small>Web Developer</div><div><small>Year</small>{last.year}</div>
              <div><small>Platform</small>{last.platform}</div><div><small>Stack</small>{last.tags.join(", ")}</div>
            </div>
            <p className="desc">{last.description}</p>
            {last.link
              ? <a className="btn" href={last.link} target="_blank" rel="noopener noreferrer">{last.link.includes("github") ? "View source" : "Visit live site"} ↗</a>
              : <span className="btn off">Private project</span>}
            {last.demo === "neo" && <NeoDemo />}
            {last.gallery.length > 0 && (last.device === "phone"
              ? <div className="phones">{last.gallery.map((g) => <div className="phone rv" key={g}><img src={g} alt={`${last.title} screen`} /></div>)}</div>
              : last.gallery.map((g) => <div className="fr rv" key={g}><div className="tb"><i /><i /><i /></div><img src={g} alt={last.title} /></div>))}
          </div>
          <a className="nx" style={{ "--nbg": nx.bg, "--nfg": nx.fg } as CSSProperties} onClick={(e) => open(nx.slug, e)}>
            <div className="wrap"><small>Next project</small><h2 className="d">{nx.title}</h2></div>
          </a>
        </div>
      </div>
    </>
  );
}