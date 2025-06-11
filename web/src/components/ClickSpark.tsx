"use client";

import React, { useRef, useEffect, useCallback } from "react";

// ### Type Definitions ###
interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface Spark {
  id: string;
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

// ### Easing Functions ###
const easeFunctions = {
  linear: (t: number) => t,
  "ease-in": (t: number) => t * t,
  "ease-out": (t: number) => 1 - Math.pow(1 - t, 2),
  "ease-in-out": (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
};

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#ffffff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
  className = "",
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number | null>(null);

  // ### Memoized Easing Function ###
  const easeFunc = useCallback((t: number): number => {
    const clampedT = Math.max(0, Math.min(1, t));
    return easeFunctions[easing](clampedT);
  }, [easing]);

  // ### Animation Loop ###
  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) {
        return false;
      }

      const progress = elapsed / duration;
      const eased = easeFunc(progress);

      const distance = eased * sparkRadius * extraScale;
      const lineLength = Math.max(0, sparkSize * (1 - eased));
      const alpha = 1 - eased;

      const cosAngle = Math.cos(spark.angle);
      const sinAngle = Math.sin(spark.angle);

      const x1 = spark.x + distance * cosAngle;
      const y1 = spark.y + distance * sinAngle;
      const x2 = spark.x + (distance + lineLength) * cosAngle;
      const y2 = spark.y + (distance + lineLength) * sinAngle;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = sparkColor;
      ctx.lineWidth = Math.max(1, 2 * (1 - eased * 0.5));
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();

      return true;
    });

    if (sparksRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(draw);
    } else {
      animationIdRef.current = null;
    }
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  // ### Event Handler ###
  const fireSpark = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const now = performance.now();
    const validSparkCount = Math.max(1, Math.min(50, sparkCount));

    const newSparks: Spark[] = Array.from({ length: validSparkCount }, (_, i) => ({
      id: `${now}-${i}`,
      x,
      y,
      angle: (2 * Math.PI * i) / validSparkCount,
      startTime: now,
    }));

    sparksRef.current.push(...newSparks);

    if (!animationIdRef.current) {
      animationIdRef.current = requestAnimationFrame(draw);
    }
  }, [disabled, sparkCount, draw]);

  // ### Resize Handling ###
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const { width, height } = rect;

      if (width > 0 && height > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${disabled ? 'pointer-events-none' : ''} ${className}`}
      onClick={fireSpark}
      onTouchStart={fireSpark}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Click to create spark effect"
      aria-disabled={disabled}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ touchAction: 'none', userSelect: 'none' }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;