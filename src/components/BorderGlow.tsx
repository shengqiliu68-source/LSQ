import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import "./BorderGlow.css";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

type GlowStyle = CSSProperties & Record<string, string | number | undefined>;

const gradientPositions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const gradientKeys = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

const parseHsl = (value: string) => {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
};

const buildGlowVars = (glowColor: string, intensity: number) => {
  const { h, s, l } = parseHsl(glowColor);
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const values: GlowStyle = {};

  opacities.forEach((opacity, index) => {
    values[`--glow-color${keys[index]}`] = `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`;
  });
  return values;
};

const buildGradientVars = (colors: string[]) => {
  const palette = colors.length > 0 ? colors : ["#ff2c1f"];
  const values: GlowStyle = {};

  gradientKeys.forEach((key, index) => {
    const color = palette[Math.min(colorMap[index], palette.length - 1)];
    values[key] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`;
  });
  values["--gradient-base"] = `linear-gradient(${palette[0]} 0 100%)`;
  return values;
};

function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "12 100 62",
  backgroundColor = "#0d0f14",
  borderRadius = 4,
  glowRadius = 32,
  glowIntensity = 0.85,
  coneSpread = 25,
  animated = false,
  colors = ["#ff2c1f", "#ff5a18", "#ff9d2a"],
  fillOpacity = 0.38,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getCenter = useCallback((element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2] as const;
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const [centerX, centerY] = getCenter(card);
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const scaleX = deltaX === 0 ? Infinity : centerX / Math.abs(deltaX);
      const scaleY = deltaY === 0 ? Infinity : centerY / Math.abs(deltaY);
      const edge = Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1);
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;

      card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [getCenter],
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!animated || !card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    card.classList.add("sweep-active");
    card.style.setProperty("--edge-proximity", "100");
    card.style.setProperty("--cursor-angle", "110deg");

    const finish = window.setTimeout(() => {
      card.style.setProperty("--edge-proximity", "0");
      card.style.setProperty("--cursor-angle", "465deg");
      card.classList.remove("sweep-active");
    }, 1800);

    return () => window.clearTimeout(finish);
  }, [animated]);

  const style: GlowStyle = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  };

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`.trim()}
      style={style}
      onPointerMove={handlePointerMove}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
