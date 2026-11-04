import React, { useEffect, useRef } from "react";

// A primary flight display, drawn in SVG: airspeed tape, attitude indicator and
// altitude tape. It drifts like an aircraft in light turbulence, banks and
// pitches with the page scroll, and the altitude climbs as you read down.
// The altitude tape is a control: drag it (or use the arrow keys) to climb or
// descend; the horizon pitches with you, then the aircraft settles back.
const INK = "#f2f3f3";
const speeds = Array.from({ length: 31 }, (_, i) => i * 10);
const alts = Array.from({ length: 121 }, (_, i) => i * 100);
const MAX_ALT = 12000;

function Tape({ side, values, step, unit, tapeRef, readRef }) {
  const x = side === "left" ? -200 : 120;
  return (
    <g>
      <clipPath id={`clip-${side}`}>
        <rect x={x} y="-80" width="80" height="160" />
      </clipPath>
      <rect x={x} y="-80" width="80" height="160" fill="#16181b" />
      <g clipPath={`url(#clip-${side})`}>
        <g ref={tapeRef}>
          {values.map((v) => (
            <g key={v} transform={`translate(0 ${-(v / step) * 16})`}>
              <rect x={side === "left" ? x + 70 : x} y="-0.75" width="10" height="1.5" fill={INK} />
              <text x={side === "left" ? x + 62 : x + 18} y="3.5" fontSize="10" fontWeight="500" fill={INK} textAnchor={side === "left" ? "end" : "start"}>
                {v}
              </text>
            </g>
          ))}
        </g>
      </g>
      <rect x={x + (side === "left" ? 8 : 0)} y="-9" width="62" height="18" fill="var(--field)" />
      <text ref={readRef} x={x + (side === "left" ? 66 : 62)} y="5" fontSize="13" fontWeight="900" fill="#0c0c0d" textAnchor="end">
        0
      </text>
      <text x={x + 40} y="-86" fontSize="7" fill="var(--muted)" textAnchor="middle">{unit}</text>
    </g>
  );
}

export default function Attitude() {
  const svg = useRef(null);
  const horizon = useRef(null);
  const pointer = useRef(null);
  const speedTape = useRef(null);
  const altTape = useRef(null);
  const speedRead = useRef(null);
  const altRead = useRef(null);
  const vsRead = useRef(null);
  const hit = useRef(null);
  const api = useRef({});

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Interactive state: altitude offset (ft), its velocity (ft/s), drag flag.
    const st = { offset: 0, vel: 0, dragging: false, lastY: 0, lastT: 0, idleSince: 0, pitch: 0 };
    let raf = 0;
    let running = false;
    const t0 = performance.now();
    let prev = t0;

    const frame = (t) => {
      const dt = Math.min(0.05, (t - prev) / 1000);
      prev = t;
      const s = (t - t0) / 1000;
      const y = Math.min(window.scrollY, 2400);

      if (!st.dragging) {
        st.offset += st.vel * dt;
        st.vel *= Math.exp(-2.5 * dt); // coast after release
        if (Math.abs(st.vel) < 2) st.vel = 0;
        // after a pause, the aircraft settles back to where the scroll puts it
        if (!reduced && st.vel === 0 && t - st.idleSince > 2500) st.offset -= st.offset * (1 - Math.exp(-0.9 * dt));
      }
      const base = 3200 + (reduced ? 0 : Math.sin(s * 0.3) * 40) + y * 1.4;
      const alt = Math.min(MAX_ALT, Math.max(0, base + st.offset));
      if (alt === 0 || alt === MAX_ALT) st.vel = 0;

      // pitch follows the climb rate, eased
      const target = Math.max(-10, Math.min(10, st.vel / 60));
      st.pitch += (target - st.pitch) * (1 - Math.exp(-6 * dt));

      const roll = reduced ? 0 : Math.sin(s * 0.55) * 7 + y * 0.03;
      const pitch = (reduced ? 0 : Math.sin(s * 0.37) * 5 - y * 0.012) - st.pitch;
      const speed = 118 + (reduced ? 0 : Math.sin(s * 0.4) * 4) - Math.abs(st.pitch) * 0.6;

      horizon.current?.setAttribute("transform", `rotate(${-roll}) translate(0 ${pitch * 2})`);
      pointer.current?.setAttribute("transform", `rotate(${-roll})`);
      speedTape.current?.setAttribute("transform", `translate(0 ${(speed / 10) * 16})`);
      altTape.current?.setAttribute("transform", `translate(0 ${(alt / 100) * 16})`);
      if (speedRead.current) speedRead.current.textContent = Math.round(speed);
      if (altRead.current) altRead.current.textContent = Math.round(alt / 10) * 10;
      if (vsRead.current) {
        const fpm = Math.round(Math.max(-6000, Math.min(6000, st.vel * 4)) / 50) * 50; // drag speed scaled to a believable climb rate
        vsRead.current.textContent = fpm === 0 ? "" : `${fpm > 0 ? "▲" : "▼"} ${Math.abs(fpm)} fpm`;
      }
      hit.current?.setAttribute("aria-valuenow", Math.round(alt));

      const settled = reduced && !st.dragging && st.vel === 0 && Math.abs(target - st.pitch) < 0.05;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };
    api.current = { st, start };
    start();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  // px of screen per 100 ft of tape
  const pxPer100 = () => 16 * (svg.current.getBoundingClientRect().height / 200);

  const down = (e) => {
    e.preventDefault(); // no text selection or native drag while using the tape
    const { st, start } = api.current;
    st.dragging = true;
    st.vel = 0;
    st.lastY = e.clientY;
    st.lastT = performance.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {
      /* capture is a nicety; dragging still works inside the tape */
    }
    e.currentTarget.style.cursor = "grabbing";
    start();
  };
  const move = (e) => {
    const { st } = api.current;
    if (!st.dragging) return;
    const now = performance.now();
    const dFt = ((e.clientY - st.lastY) / pxPer100()) * 100; // drag the tape down to climb
    st.offset += dFt;
    const dt = Math.max(0.008, (now - st.lastT) / 1000);
    st.vel = Math.max(-1500, Math.min(1500, st.vel * 0.6 + (dFt / dt) * 0.4));
    st.lastY = e.clientY;
    st.lastT = now;
  };
  const up = (e) => {
    const { st, start } = api.current;
    st.dragging = false;
    st.idleSince = performance.now();
    st.vel = Math.max(-1500, Math.min(1500, st.vel));
    e.currentTarget.style.cursor = "grab";
    start();
  };
  const key = (e) => {
    const { st, start } = api.current;
    const d = { ArrowUp: 100, ArrowDown: -100, PageUp: 500, PageDown: -500 }[e.key];
    if (!d) return;
    e.preventDefault();
    st.offset += d;
    st.vel = d * 2; // a short kick so the horizon pitches
    st.idleSince = performance.now();
    start();
  };

  const ladder = [-40, -30, -20, -10, 10, 20, 30, 40];
  const bank = [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60];

  return (
    <svg ref={svg} viewBox="-210 -100 420 200" role="group" aria-label="Animated primary flight display: airspeed, attitude and altitude" data-ui>
      <defs>
        <clipPath id="adi-clip">
          <circle r="86" />
        </clipPath>
      </defs>
      <Tape side="left" values={speeds} step={10} unit="KT" tapeRef={speedTape} readRef={speedRead} />
      <Tape side="right" values={alts} step={100} unit="FT · DRAG" tapeRef={altTape} readRef={altRead} />
      <text ref={vsRead} x="182" y="24" fontSize="7" fontWeight="500" fill={INK} textAnchor="end" />
      <g clipPath="url(#adi-clip)">
        <g ref={horizon}>
          <rect x="-400" y="-400" width="800" height="400" fill="#2f74c9" />
          <rect x="-400" y="0" width="800" height="400" fill="#6a4a2e" />
          <rect x="-400" y="-1" width="800" height="2" fill={INK} />
          {ladder.map((p) => {
            const w = Math.abs(p) % 20 === 0 ? 34 : 18;
            return (
              <g key={p}>
                <rect x={-w / 2} y={p * 2 - 0.75} width={w} height="1.5" fill={INK} />
                {Math.abs(p) % 20 === 0 && (
                  <text x={w / 2 + 4} y={p * 2 + 3} fontSize="8" fill={INK} fontWeight="500">
                    {Math.abs(p)}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </g>
      <circle r="90" fill="none" stroke="var(--ink)" strokeWidth="8" />
      {bank.map((a) => (
        <rect key={a} x="-1" y="-99" width="2" height={a % 30 === 0 ? 9 : 5} fill="var(--ink)" transform={`rotate(${a})`} />
      ))}
      <g ref={pointer}>
        <path d="M0 -84 L7 -72 L-7 -72 Z" fill="var(--field)" />
      </g>
      <path d="M-46 0 H-16 V8 M46 0 H16 V8" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="square" />
      <rect x="-3" y="-3" width="6" height="6" fill={INK} />

      {/* the altitude tape is a control */}
      <rect
        ref={hit}
        className="alt-hit"
        x="120"
        y="-80"
        width="80"
        height="160"
        fill="transparent"
        role="slider"
        tabIndex={0}
        aria-label="Altitude. Drag, or use the arrow keys, to climb and descend"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={MAX_ALT}
        aria-valuenow={3200}
        style={{ touchAction: "none", cursor: "grab" }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={key}
      />
    </svg>
  );
}
