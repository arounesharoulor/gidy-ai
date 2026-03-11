"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   RING — single glowing orbit ring
═══════════════════════════════════════════════════════════ */
function Ring({
  size,
  delay,
  color,
  duration,
  rotateX = 0,
  rotateZ = 0,
}: {
  size: number;
  delay: number;
  color: string;
  duration: number;
  rotateX?: number;
  rotateZ?: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}`,
        rotateX: `${rotateX}deg`,
        rotateZ: `${rotateZ}deg`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.05, 1],
        opacity: [0, 0.9, 0.5, 0],
        rotateZ: rotateZ + 360,
      }}
      transition={{
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.3, 0.7, 1],
        rotateZ: { duration: duration * 3, ease: "linear", repeat: Infinity },
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   SCANLINE  — horizontal reveal sweep
═══════════════════════════════════════════════════════════ */
function ScanLine({ delay }: { delay: number }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.8) 30%, rgba(129,140,248,1) 50%, rgba(99,102,241,0.8) 70%, transparent 100%)",
        boxShadow: "0 0 20px rgba(99,102,241,0.8), 0 0 60px rgba(99,102,241,0.4)",
        zIndex: 10,
      }}
      initial={{ top: "0%", opacity: 0 }}
      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{
        delay,
        duration: 1.2,
        ease: "linear",
        times: [0, 0.05, 0.9, 1],
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   GRID DISSOLVE  — animated reveal grid
═══════════════════════════════════════════════════════════ */
function GridDissolve({ onComplete }: { onComplete: () => void }) {
  const cols = 8;
  const rows = 5;
  const cells = Array.from({ length: cols * rows }, (_, i) => i);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        zIndex: 5,
        pointerEvents: "none",
      }}
      onAnimationComplete={onComplete}
    >
      {cells.map((i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const delay = (col * 0.04 + row * 0.06) + 2.2;
        return (
          <motion.div
            key={i}
            style={{ background: "rgba(5,8,22,1)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay,
              duration: 0.4,
              ease: "easeIn",
            }}
          />
        );
      })}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GLITCH TEXT
═══════════════════════════════════════════════════════════ */
function GlitchText({ text, delay }: { text: string; delay: number }) {
  const chars = text.split("");
  return (
    <motion.div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#818cf8",
        display: "flex",
        gap: "0.02em",
        position: "relative",
      }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════════════ */
function ProgressBar({ delay, duration }: { delay: number; duration: number }) {
  return (
    <div
      style={{
        width: "280px",
        height: "2px",
        background: "rgba(99,102,241,0.15)",
        borderRadius: "99px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #4f46e5, #818cf8, #a78bfa, #06b6d4)",
          backgroundSize: "200% 100%",
          borderRadius: "99px",
          boxShadow: "0 0 12px rgba(99,102,241,0.8)",
        }}
        initial={{ width: "0%", backgroundPosition: "0% center" }}
        animate={{ width: "100%", backgroundPosition: "200% center" }}
        transition={{ delay, duration, ease: "easeInOut" }}
      />
      {/* Shimmer dot at tip */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          width: "8px",
          height: "8px",
          background: "#a78bfa",
          borderRadius: "50%",
          boxShadow: "0 0 12px #a78bfa, 0 0 24px #a78bfa",
          transform: "translateY(-50%)",
        }}
        initial={{ left: "0%" }}
        animate={{ left: "calc(100% - 8px)" }}
        transition={{ delay, duration, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NODE GRID  — orbiting nodes
═══════════════════════════════════════════════════════════ */
function NodeGrid() {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const r = 160;
    return {
      id: i,
      cx: Math.cos(angle) * r,
      cy: Math.sin(angle) * r,
      delay: 0.3 + i * 0.05,
    };
  });
  return (
    <motion.div
      style={{ position: "absolute", width: 0, height: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, ease: "linear", repeat: Infinity }}
    >
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #818cf8, #a78bfa)",
            boxShadow: "0 0 10px #818cf8",
            left: n.cx - 3,
            top: n.cy - 3,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.6] }}
          transition={{ delay: n.delay, duration: 0.5 }}
        />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN INTRO COMPONENT
═══════════════════════════════════════════════════════════ */
export function PageIntro({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"rings" | "logo" | "dissolve" | "done">("rings");
  const [gridDone, setGridDone] = useState(false);

  // Advance phases
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"),     800);
    const t2 = setTimeout(() => setPhase("dissolve"), 2800);
    // Hard guarantee: always finish after 4.2 s
    const t3 = setTimeout(() => onFinish(),           4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When grid completely dissolves, signal done (earlier path)
  useEffect(() => {
    if (gridDone) {
      const t = setTimeout(onFinish, 200);
      return () => clearTimeout(t);
    }
  }, [gridDone, onFinish]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050816",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1200px",
        overflow: "hidden",
      }}
      initial={{ opacity: 1 }}
    >
      {/* ── Scanline sweeps ── */}
      <ScanLine delay={0.1} />
      <ScanLine delay={0.5} />

      {/* ── Grid dissolve exit ── */}
      <GridDissolve onComplete={() => setGridDone(true)} />

      {/* ── 3D ring system ── */}
      <motion.div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: [0, 12, 0], rotateY: [0, -8, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        <Ring size={420} delay={0.0} color="rgba(99,102,241,0.4)"  duration={2} rotateX={70} rotateZ={0}   />
        <Ring size={320} delay={0.15} color="rgba(124,58,237,0.5)"  duration={2} rotateX={60} rotateZ={45}  />
        <Ring size={230} delay={0.3}  color="rgba(6,182,212,0.55)"  duration={2} rotateX={50} rotateZ={-30} />
        <Ring size={140} delay={0.45} color="rgba(129,140,248,0.7)" duration={2} rotateX={75} rotateZ={90}  />

        {/* Orbiting nodes */}
        <NodeGrid />

        {/* Core glow sphere */}
        <motion.div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129,140,248,0.9) 0%, rgba(99,102,241,0.4) 50%, transparent 100%)",
            boxShadow: "0 0 40px rgba(99,102,241,0.8), 0 0 80px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.2)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* ── Logo & text (phase 2) ── */}
      <AnimatePresence>
        {phase !== "rings" && (
          <motion.div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              zIndex: 20,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: "20deg" }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: "0deg" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Monogram badge */}
            <motion.div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 900,
                color: "white",
                fontFamily: "Inter, sans-serif",
                boxShadow: "0 0 40px rgba(99,102,241,0.5), 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                letterSpacing: "-0.04em",
              }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(99,102,241,0.5), 0 20px 40px rgba(0,0,0,0.5)",
                  "0 0 60px rgba(124,58,237,0.7), 0 20px 40px rgba(0,0,0,0.5)",
                  "0 0 30px rgba(99,102,241,0.5), 0 20px 40px rgba(0,0,0,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              &lt;/&gt;
            </motion.div>

            {/* Glitch name text */}
            <GlitchText text="Dev Portfolio" delay={0.15} />

            {/* Tagline */}
            <motion.p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                color: "#475569",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Initializing...
            </motion.p>

            {/* Progress bar */}
            <ProgressBar delay={0.3} duration={1.8} />

            {/* Percentage counter */}
            <PercentCounter delay={0.3} duration={1.8} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Background star field ── */}
      <StarField />
    </motion.div>
  );
}

/* ────── Percentage counter ────── */
function PercentCounter({ delay, duration }: { delay: number; duration: number }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const start = Date.now() + delay * 1000;
    const end   = start + duration * 1000;
    const tick = () => {
      const now = Date.now();
      if (now < start) { requestAnimationFrame(tick); return; }
      const progress = Math.min((now - start) / (end - start), 1);
      setPct(Math.round(progress * 100));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [delay, duration]);

  return (
    <motion.span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.8rem",
        color: "#6366f1",
        letterSpacing: "0.1em",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      {pct}%
    </motion.span>
  );
}

/* ────── Static star field ────── */
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    dur: 2 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
          }}
          animate={{ opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
