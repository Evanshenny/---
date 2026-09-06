"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./StrokeText.css";

type StrokeTextProps = {
  text: string;
  strokeColor?: string;
  fillColor?: string;
  gradientStops?: string[];
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  className?: string;
  style?: CSSProperties;
};

export default function StrokeText({
  text,
  strokeColor = "#c7a36b",
  fillColor = "#715942",
  gradientStops,
  strokeWidth = 1.15,
  drawDuration = 1.35,
  fillDelay = 0.05,
  stagger = 0.07,
  ease = "power2.out",
  fontSize = 138,
  fontWeight = 400,
  letterSpacing = 19.3,
  className = "",
  style = {},
}: StrokeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wipeId = `stroke-text-wipe-${rawId}`;
  const gradientId = `stroke-text-gradient-${rawId}`;
  const characters = useMemo(() => Array.from(text), [text]);
  const dash = Math.max(fontSize * 7, 200);
  const fontStyle = useMemo<CSSProperties>(
    () => ({
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return;

    let cancelled = false;
    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      try {
        const bbox = strokeTextRef.current.getBBox();
        if (!bbox.width) return;
        const pad = Math.max(strokeWidth, fontSize * 0.08);
        setBox({
          x: bbox.x - pad,
          y: bbox.y - pad,
          width: bbox.width + pad * 2,
          height: bbox.height + pad * 2,
        });
      } catch {
        // The next font-ready pass will measure the SVG once it is available.
      }
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !box) return;

    const strokes = gsap.utils.toArray<SVGElement>(root.querySelectorAll("[data-stroke-char]"));
    const fills = gsap.utils.toArray<SVGElement>(root.querySelectorAll("[data-fill-char]"));
    const wipe = wipeRectRef.current;
    const targets = [...strokes, ...fills, ...(wipe ? [wipe] : [])];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: 1 });
      if (wipe) gsap.set(wipe, { attr: { width: box.width } });
      return () => gsap.killTweensOf(targets);
    }

    gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
    gsap.set(fills, { opacity: 1 });
    if (wipe) gsap.set(wipe, { attr: { width: 0 } });

    const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
    timeline.to(strokes, {
      strokeDashoffset: 0,
      duration: drawDuration,
      ease,
      stagger,
    });
    if (wipe) {
      timeline.to(
        wipe,
        { attr: { width: box.width }, duration: 0.85, ease: "power2.inOut" },
        Math.max(0.45, drawDuration * 0.62) + fillDelay,
      );
    }
    timeline.to(strokes, { opacity: 0.48, duration: 0.5, ease: "power1.out" }, "-=0.3");

    return () => {
      timeline.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, ease, fillDelay, stagger]);

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-fontSize} 760 ${fontSize * 1.3}`;
  const fill = gradientStops?.length ? `url(#${gradientId})` : fillColor;

  return (
    <span ref={rootRef} className={`stroke-text ${className}`.trim()} style={style} role="img" aria-label={text}>
      <svg className="stroke-text__svg" viewBox={viewBox} preserveAspectRatio="xMinYMid meet" aria-hidden="true">
        <defs>
          <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
            <rect ref={wipeRectRef} x={box?.x ?? 0} y={box?.y ?? -fontSize} width="0" height={box?.height ?? fontSize * 1.3} />
          </clipPath>
          {gradientStops?.length ? (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {gradientStops.map((color, index) => (
                <stop key={color} offset={`${(index / Math.max(1, gradientStops.length - 1)) * 100}%`} stopColor={color} />
              ))}
            </linearGradient>
          ) : null}
        </defs>

        <text ref={strokeTextRef} x="0" y="0" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" style={fontStyle}>
          {characters.map((character, index) => (
            <tspan data-stroke-char key={`stroke-${index}`}>{character}</tspan>
          ))}
        </text>
        <text x="0" y="0" fill={fill} stroke="none" style={fontStyle} clipPath={`url(#${wipeId})`}>
          {characters.map((character, index) => (
            <tspan data-fill-char key={`fill-${index}`}>{character}</tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}
