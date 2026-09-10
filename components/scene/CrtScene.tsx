"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffb000"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Ambient amber particle field, sitting behind the terminal window.
 * Purely decorative — import with `next/dynamic(() => import(...), { ssr: false })`
 * and drop <CrtScene /> anywhere behind the terminal if you want the extra depth.
 * Skipped entirely on prefers-reduced-motion.
 */
export function CrtScene() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
