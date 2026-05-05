"use client";

import DotGrid from "./DotGrid";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <DotGrid
        dotSize={4}
        gap={18}
        baseColor="#cbd5f5"
        activeColor="#2563EB"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </div>
  );
}