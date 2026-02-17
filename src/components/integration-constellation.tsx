"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ReadingMode = "dark" | "sepia";

interface Integration {
  name: string;
  icon: React.ReactNode;
  status: "live" | "coming";
  color: string;
  bg: string;
  border: string;
}

interface Props {
  integrations: Integration[];
  readingMode: ReadingMode;
}

// Spread nodes across the full width, organic molecular layout
// Coordinates are percentages (0-100) of the container
function generateNodePositions(count: number) {
  // Keep nodes 12-88% so circles + labels don't clip at edges
  const positions: { x: number; y: number }[] = [
    { x: 12, y: 24 },  // far left
    { x: 30, y: 12 },  // top left-center
    { x: 50, y: 8 },   // top center
    { x: 70, y: 12 },  // top right-center
    { x: 88, y: 24 },  // far right
    { x: 83, y: 55 },  // right mid
    { x: 68, y: 78 },  // bottom right
    { x: 50, y: 86 },  // bottom center
    { x: 32, y: 78 },  // bottom left
    { x: 17, y: 55 },  // left mid
    { x: 38, y: 40 },  // inner left
  ];

  while (positions.length < count) {
    const idx = positions.length;
    const angle = (idx / count) * Math.PI * 2;
    positions.push({
      x: 50 + 42 * Math.cos(angle),
      y: 50 + 40 * Math.sin(angle),
    });
  }

  return positions.slice(0, count);
}

// Molecular bonds — connect nearby nodes + all to center
function generateConnections(nodePositions: { x: number; y: number }[]) {
  const connections: { from: number; to: number }[] = [];

  // Every node connects to center
  for (let i = 0; i < nodePositions.length; i++) {
    connections.push({ from: -1, to: i });
  }

  // Connect nearby nodes (triangular mesh)
  for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
      const dx = nodePositions[i].x - nodePositions[j].x;
      const dy = nodePositions[i].y - nodePositions[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 32) {
        connections.push({ from: i, to: j });
      }
    }
  }

  return connections;
}

// Animated starfield canvas
function Starfield({ readingMode }: { readingMode: ReadingMode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Generate stars — more for the wider canvas
    const stars: { x: number; y: number; size: number; speed: number; brightness: number; phase: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * 2000,
        y: Math.random() * 800,
        size: Math.random() * 2 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        brightness: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.006;

      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = height + 2;
          star.x = Math.random() * width;
        }

        const twinkle = Math.sin(time * 1.8 + star.phase) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;

        ctx.fillStyle =
          readingMode === "sepia"
            ? `rgba(180, 140, 80, ${alpha * 0.5})`
            : `rgba(255, 255, 255, ${alpha})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [readingMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: readingMode === "sepia" ? 0.5 : 0.8 }}
    />
  );
}

export function IntegrationConstellation({ integrations, readingMode }: Props) {
  const centerX = 50;
  const centerY = 50;

  const nodePositions = useMemo(
    () => generateNodePositions(integrations.length),
    [integrations.length]
  );

  const connections = useMemo(
    () => generateConnections(nodePositions),
    [nodePositions]
  );

  const floatParams = useMemo(
    () =>
      integrations.map((_, i) => ({
        dx: Math.sin(i * 1.3) * 8 + 4,   // 4-12px horizontal drift
        dy: Math.cos(i * 0.9) * 8 + 4,   // 4-12px vertical drift
        duration: 5 + (i % 5) * 1.2,      // 5-11s cycle
        delay: (i * 0.4) % 3,
      })),
    [integrations.length]
  );

  const lineColor =
    readingMode === "sepia"
      ? "rgba(180, 140, 80, 0.12)"
      : "rgba(255, 255, 255, 0.07)";

  const lineColorBright =
    readingMode === "sepia"
      ? "rgba(180, 140, 80, 0.25)"
      : "rgba(255, 255, 255, 0.15)";

  return (
    <>
      {/* Desktop — full-width constellation */}
      <div className="hidden md:block">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            readingMode === "sepia" ? "bg-amber-950/50" : "bg-black/50"
          )}
          style={{ height: "clamp(400px, 45vw, 600px)" }}
        >
          <Starfield readingMode={readingMode} />

          {/* SVG connections — use wider viewBox to avoid stroke distortion */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            {connections.map((conn, i) => {
              // Scale x coords to 0-200 range, y stays 0-100
              const fromX = (conn.from === -1 ? centerX : nodePositions[conn.from].x) * 2;
              const fromY = conn.from === -1 ? centerY : nodePositions[conn.from].y;
              const toX = nodePositions[conn.to].x * 2;
              const toY = nodePositions[conn.to].y;
              const isCenter = conn.from === -1;

              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={isCenter ? lineColorBright : lineColor}
                  strokeWidth={isCenter ? 0.3 : 0.18}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.03 }}
                />
              );
            })}
          </svg>

          {/* Center node — l4yercak3 */}
          <motion.div
            className="absolute z-20"
            style={{ top: `${centerY}%`, left: `${centerX}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", damping: 15 }}
          >
            <motion.div
              animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "-translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex items-center justify-center border-2 shadow-2xl backdrop-blur-sm",
                readingMode === "sepia"
                  ? "bg-amber-100/90 border-amber-400/60 shadow-amber-300/30"
                  : "bg-primary/15 border-primary/50 shadow-primary/30"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-full animate-pulse",
                  readingMode === "sepia"
                    ? "shadow-[0_0_40px_rgba(180,140,80,0.3)]"
                    : "shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                )}
              />
              <span
                className={cn(
                  "font-mono text-base font-bold tracking-tight relative z-10",
                  readingMode === "sepia" ? "text-amber-800" : "text-primary"
                )}
              >
                l4yercak3
              </span>
            </motion.div>
          </motion.div>

          {/* Integration nodes — spread across full width */}
          {integrations.map((integration, i) => {
            const pos = nodePositions[i];
            const fp = floatParams[i];
            return (
              <motion.div
                key={integration.name}
                className="absolute z-10"
                style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.07,
                  type: "spring",
                  damping: 12,
                }}
              >
                <motion.div
                  animate={{
                    y: [-fp.dy, fp.dy, -fp.dy],
                    x: [-fp.dx, fp.dx, -fp.dx],
                  }}
                  transition={{
                    duration: fp.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: fp.delay,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={cn(
                      "relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-default group"
                    )}
                  >
                    {/* Circle */}
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border backdrop-blur-sm transition-all duration-300",
                        integration.bg,
                        integration.border,
                        false
                      )}
                      style={{
                        boxShadow:
                          readingMode === "sepia"
                            ? "0 0 14px rgba(180,140,80,0.15)"
                            : "0 0 14px rgba(0,0,0,0.4)",
                      }}
                    >
                      <span className={cn("transition-colors duration-300", integration.color)}>
                        {integration.icon}
                      </span>
                    </div>
                    {/* Name — always visible */}
                    <span
                      className={cn(
                        "text-[11px] font-medium whitespace-nowrap pointer-events-none leading-none",
                        readingMode === "sepia" ? "text-amber-400/80" : "text-white/60",
                        false
                      )}
                    >
                      {integration.name}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile — full-width compact constellation */}
      <div className="md:hidden">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            readingMode === "sepia" ? "bg-amber-950/50" : "bg-black/50"
          )}
          style={{ height: "380px" }}
        >
          <Starfield readingMode={readingMode} />

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-sm",
                readingMode === "sepia"
                  ? "bg-amber-100/90 border-amber-400/60"
                  : "bg-primary/15 border-primary/50"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] font-bold",
                  readingMode === "sepia" ? "text-amber-800" : "text-primary"
                )}
              >
                l4yercak3
              </span>
            </div>
          </div>

          {/* SVG lines for mobile */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {integrations.map((_, i) => {
              const total = integrations.length;
              const angleDeg = (i / total) * 360 - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = 50 + 36 * Math.cos(angleRad);
              const y = 50 + 36 * Math.sin(angleRad);
              return (
                <line
                  key={`m-${i}`}
                  x1={50}
                  y1={50}
                  x2={x}
                  y2={y}
                  stroke={lineColorBright}
                  strokeWidth={0.3}
                />
              );
            })}
          </svg>

          {/* Nodes in ring */}
          {integrations.map((integration, i) => {
            const total = integrations.length;
            const angleDeg = (i / total) * 360 - 90;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radius = 36;
            const x = 50 + radius * Math.cos(angleRad);
            const y = 50 + radius * Math.sin(angleRad);
            return (
              <motion.div
                key={integration.name}
                className="absolute z-10"
                style={{ top: `${y}%`, left: `${x}%` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-sm",
                      integration.bg,
                      integration.border,
                      integration.status === "coming" && "opacity-60"
                    )}
                  >
                    <span className={cn("transition-colors duration-300 [&>svg]:w-5 [&>svg]:h-5", integration.color)}>
                      {integration.icon}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-medium whitespace-nowrap leading-none",
                      readingMode === "sepia" ? "text-amber-400/70" : "text-white/50",
                      integration.status === "coming" && "opacity-70"
                    )}
                  >
                    {integration.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
