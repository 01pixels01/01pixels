"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const count = 2800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 12;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) - 4;
      const t = Math.random();
      col[i * 3] = t * 0.486;
      col[i * 3 + 1] = 0.9 - t * 0.25;
      col[i * 3 + 2] = 1;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.012) * 0.08 + mouse.y * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const linePositions = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 60; i++) {
      nodes.push([
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 - 3,
      ]);
    }
    const pts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        if (dx * dx + dy * dy + dz * dz < 20) {
          pts.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00E5FF" transparent opacity={0.06} />
    </lineSegments>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 4,
        ] as [number, number, number],
        size: 0.06 + Math.random() * 0.1,
        speed: 0.3 + Math.random() * 0.7,
        offset: (i / 8) * Math.PI * 2,
        color: i % 2 === 0 ? "#00E5FF" : "#7C3AED",
      })),
    []
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    orbs.forEach((orb, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      mesh.position.y =
        orb.pos[1] + Math.sin(state.clock.elapsedTime * orb.speed + orb.offset) * 0.4;
      mesh.position.x =
        orb.pos[0] + Math.cos(state.clock.elapsedTime * orb.speed * 0.7 + orb.offset) * 0.2;
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={orb.pos}
        >
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 70 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ParticleNetwork />
      <NeuralLines />
      <FloatingOrbs />
    </Canvas>
  );
}
