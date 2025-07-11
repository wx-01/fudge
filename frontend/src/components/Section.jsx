import React from "react";

const Section = ({
  segments = 100,
  amplitude = 10,
  height = 200,
  width = 1440,
  stroke = "#66DCD3",
  strokeWidth = 2,
  animate = true,
}) => {
  const step = width / segments;
  const centerY = height / 2;

  // Generate the path string
  let d = `M0 ${centerY}`;

  for (let i = 0; i < segments; i++) {
    const startX = i * step;
    const endX = (i + 1) * step;

    const cp1X = startX + step / 3;
    const cp2X = startX + (2 * step) / 3;

    const cp1Y = centerY - amplitude;
    const cp2Y = centerY + amplitude;

    d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${centerY}`;
  }

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="overflow-hidden"
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={animate ? "motion-safe:animate-wave" : ""}
      />
    </svg>
  );
};

export default Section;
