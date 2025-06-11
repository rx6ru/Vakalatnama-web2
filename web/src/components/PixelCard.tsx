"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { JSX } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    this.isReverse = this.size >= this.maxSize ? true : this.size <= this.minSize ? false : this.isReverse;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

function getEffectiveSpeed(value: number, reducedMotion: boolean) {
  const throttle = 0.001;
  return reducedMotion || value <= 0 ? 0 : value >= 100 ? 100 * throttle : value * throttle;
}

interface VariantConfig {
  activeColor: string;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}

const VARIANTS: Record<string, VariantConfig> = {
  default: {
    activeColor: "#ffffff",
    gap: 10,
    speed: 50,
    colors: "#f8fafcbf,#f1f5f9bf,#cbd5e1bf",
    noFocus: false,
  },
  blue: {
    activeColor: "#3042ff",
    gap: 10,
    speed: 50,
    colors: "#e0f2febf,#7dd3fcbf,#0ea5e9bf",
    noFocus: false,
  },
  yellow: {
    activeColor: "#fff200",
    gap: 10,
    speed: 50,
    colors: "#fef08abf,#fde047bf,#eab308bf",
    noFocus: false,
  },
  pink: {
    activeColor: "#ff0000",
    gap: 10,
    speed: 50,
    colors: "#fecdd3bf,#ff0000,#e11d48bf",
    noFocus: true,
  },
};

interface PixelCardProps {
  variant?: keyof typeof VARIANTS;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children: React.ReactNode;
  hoverDelayMs?: number;
}

export default function PixelCard({
  variant = "default",
  gap,
  speed,
  colors,
  noFocus,
  className = "",
  children,
  hoverDelayMs = 0,
}: PixelCardProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timePreviousRef = useRef(performance.now());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track hover

  const variantCfg = VARIANTS[variant];
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;

  const borderStyle = { borderColor: variantCfg.activeColor };
  // New style for dynamic hover shadow
  const hoverShadowStyle = isHovered
    ? { boxShadow: `0 25px 50px -12px ${variantCfg.activeColor}20` } // Adjust opacity here (40 for 25% opacity)
    : {};

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(",");
    const pxs: Pixel[] = [];
    const effectiveSpeed = getEffectiveSpeed(finalSpeed, reducedMotion);

    for (let x = 0; x < width; x += finalGap) {
      for (let y = 0; y < height; y += finalGap) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const dx = x - width / 2;
        const dy = y - height / 2;
        const delay = reducedMotion ? 0 : Math.sqrt(dx * dx + dy * dy);
        pxs.push(new Pixel(canvasRef.current!, ctx, x, y, color, effectiveSpeed, delay));
      }
    }
    pixelsRef.current = pxs;
  }, [finalGap, finalSpeed, finalColors, reducedMotion]);

  const doAnimate = useCallback((fnName: keyof Pixel) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    let allIdle = true;
    for (const pixel of pixelsRef.current) {
      // Only call appear, disappear, shimmer, or draw methods
      if (
        (fnName === "appear" || fnName === "disappear" || fnName === "shimmer" || fnName === "draw") &&
        typeof pixel[fnName] === "function"
      ) {
        (pixel[fnName] as () => void).call(pixel);
      }
      if (!pixel.isIdle) allIdle = false;
    }
    if (allIdle && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleAnimation = useCallback((name: keyof Pixel) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(() => doAnimate(name));
  }, [doAnimate]);

  const onMouseEnter = () => {
    setIsHovered(true); // Set hover state to true
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => handleAnimation("appear"), hoverDelayMs);
  };

  const onMouseLeave = () => {
    setIsHovered(false); // Set hover state to false
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = null;
    handleAnimation("disappear");
  };

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) handleAnimation("appear");
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) handleAnimation("disappear");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  useEffect(() => {
    initPixels();
    const timeoutId = setTimeout(() => {
      const observer = new ResizeObserver(() => initPixels());
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initPixels]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden grid place-items-center border rounded-[10px] isolate transform transition-all duration-300 ease-out hover:scale-[1.05] select-none ${className}`}
      style={{ ...borderStyle, ...hoverShadowStyle }} 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
    >
      <canvas className="block w-full h-full" ref={canvasRef} />
      {children}
    </div>
  );
}