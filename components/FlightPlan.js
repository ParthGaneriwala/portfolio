import React, { useEffect, useRef, useState } from "react";

// A flight plan down the right edge: each section is a waypoint, and a small
// aircraft marker follows the scroll along the route. Transform and opacity only.
const waypoints = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Work", "work"],
  ["Publications", "publications"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function FlightPlan() {
  const marker = useRef(null);
  const done = useRef(null);
  const [pos, setPos] = useState(waypoints.map(() => 0));
  const [active, setActive] = useState(0);

  useEffect(() => {
    const max = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const measure = () =>
      setPos(
        waypoints.map(([, id]) => {
          const el = document.getElementById(id);
          return el ? Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY - 80) / max())) : 0;
        })
      );
    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 1) {
        marker.current?.classList.toggle("up", y < lastY);
        lastY = y;
      }
      const p = Math.min(1, y / max());
      if (marker.current) marker.current.style.transform = `translateY(${p * 100}cqh)`;
      if (done.current) done.current.style.transform = `scaleY(${p})`;
      let idx = 0;
      waypoints.forEach(([, id], i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const t = setTimeout(measure, 1200); // images settle layout
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav className="flightplan" aria-label="Flight plan: jump to a section">
      <div className="fp-track">
        <div className="fp-line" />
        <div className="fp-done" ref={done} />
        {waypoints.map(([label, id], i) => (
          <a
            key={id}
            href={`#${id}`}
            className={`fp-wp${i === active ? " on" : ""}`}
            style={{ top: `${pos[i] * 100}%` }}
            aria-label={label}
            aria-current={i === active ? "true" : undefined}
          >
            <span className="fp-label">{label}</span>
          </a>
        ))}
        <div className="fp-marker" ref={marker} aria-hidden="true">
          <svg viewBox="0 0 12 14" width="14" height="16">
            <path d="M6 14 L0 0 L6 4 L12 0 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
