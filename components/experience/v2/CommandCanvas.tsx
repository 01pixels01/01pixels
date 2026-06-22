"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingCube({ position, size, color, speed, rotSpeed }: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  rotSpeed: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const initY = position[1];
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = initY + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.4;
    ref.current.rotation.x += rotSpeed[0];
    ref.current.rotation.y += rotSpeed[1];
    ref.current.rotation.z += rotSpeed[2];
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe={false}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = state.clock.elapsedTime * 0.07;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 16, 16]} />
      <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function DataRings() {
  const rings = useMemo(
    () =>
      [2, 3.2, 4.5].map((r, i) => ({
        radius: r,
        tilt: (i * Math.PI) / 3,
        speed: 0.3 + i * 0.15,
        color: ["#00E5FF", "#7C3AED", "#00FF88"][i],
      })),
    []
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    rings.forEach((ring, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      mesh.rotation.z = state.clock.elapsedTime * ring.speed;
    });
  });

  return (
    <>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          rotation={[ring.tilt, 0, 0]}
        >
          <torusGeometry args={[ring.radius, 0.015, 8, 80]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.25} />
        </mesh>
      ))}
    </>
  );
}

const cubes = [
  { position: [-3, 1, -2] as [number,number,number], size: 0.4, color: "#00E5FF", speed: 0.8, rotSpeed: [0.005, 0.008, 0.003] as [number,number,number] },
  { position: [3.5, -1, -1] as [number,number,number], size: 0.3, color: "#7C3AED", speed: 1.1, rotSpeed: [0.008, 0.004, 0.006] as [number,number,number] },
  { position: [-2, -2.5, 0] as [number,number,number], size: 0.5, color: "#00FF88", speed: 0.6, rotSpeed: [0.003, 0.007, 0.004] as [number,number,number] },
  { position: [2, 2.5, -3] as [number,number,number], size: 0.35, color: "#00E5FF", speed: 0.9, rotSpeed: [0.006, 0.005, 0.009] as [number,number,number] },
  { position: [0, -3, 1] as [number,number,number], size: 0.25, color: "#7C3AED", speed: 1.3, rotSpeed: [0.01, 0.006, 0.004] as [number,number,number] },
];

export function CommandCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00E5FF" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#7C3AED" />
      <WireframeSphere />
      <DataRings />
      {cubes.map((c, i) => (
        <FloatingCube key={i} {...c} />
      ))}
    </Canvas>
  );
}
