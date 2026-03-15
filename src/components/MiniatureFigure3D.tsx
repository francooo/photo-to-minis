import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function OrbitalRing({ radius, y, speed, opacity }: { radius: number; y: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x = 0.1 * Math.sin(Date.now() * 0.001 * speed);
    }
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 64]} />
      <meshStandardMaterial color="#8b9cf7" transparent opacity={opacity} emissive="#7c6ef0" emissiveIntensity={0.5} />
    </mesh>
  );
}

function HumanoidFigure() {
  const groupRef = useRef<THREE.Group>(null);

  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c4b5fd",
    roughness: 0.3,
    metalness: 0.6,
    emissive: "#7c3aed",
    emissiveIntensity: 0.15,
  }), []);

  const headMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ddd6fe",
    roughness: 0.2,
    metalness: 0.7,
    emissive: "#8b5cf6",
    emissiveIntensity: 0.2,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]} material={headMaterial}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.25, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.8, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.5, 0.75, 0.25]} />
      </mesh>
      {/* Torso detail - center line */}
      <mesh position={[0, 0.8, 0.13]}>
        <boxGeometry args={[0.06, 0.6, 0.02]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>
      {/* Core glow */}
      <mesh position={[0, 0.75, 0.1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 0.75, 0.2]} intensity={0.5} distance={1} color="#8b5cf6" />
      {/* Left arm */}
      <mesh position={[-0.35, 0.85, 0]} rotation={[0, 0, 0.15]} material={bodyMaterial}>
        <boxGeometry args={[0.12, 0.55, 0.14]} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.35, 0.85, 0]} rotation={[0, 0, -0.15]} material={bodyMaterial}>
        <boxGeometry args={[0.12, 0.55, 0.14]} />
      </mesh>
      {/* Hips */}
      <mesh position={[0, 0.35, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.4, 0.15, 0.22]} />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.12, -0.15, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.14, 0.85, 0.16]} />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.12, -0.15, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.14, 0.85, 0.16]} />
      </mesh>

      {/* Orbital rings */}
      <OrbitalRing radius={0.7} y={1.4} speed={0.8} opacity={0.4} />
      <OrbitalRing radius={0.55} y={0.8} speed={-0.6} opacity={0.3} />
      <OrbitalRing radius={0.65} y={0.2} speed={0.5} opacity={0.25} />
      <OrbitalRing radius={0.5} y={-0.3} speed={-0.7} opacity={0.3} />

      {/* Large outer orbit */}
      <mesh position={[0, 0.6, 0]} rotation={[0.3, 0, 0.2]}>
        <torusGeometry args={[1.4, 0.01, 16, 64]} />
        <meshStandardMaterial color="#6366f1" transparent opacity={0.2} emissive="#6366f1" emissiveIntensity={0.3} />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, -0.65, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 0.08, 32]} />
        <meshStandardMaterial color="#4c1d95" roughness={0.4} metalness={0.8} emissive="#7c3aed" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.42, 0.02, 16, 32]} />
        <meshStandardMaterial color="#e9d5ff" emissive="#a78bfa" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);
  return (
    <group position={[0, -0.7, 0]}>
      <gridHelper ref={gridRef} args={[10, 20, "#2e1065", "#1e1b4b"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0c0a1a" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#c4b5fd" />
      <directionalLight position={[3, 5, 2]} intensity={0.8} color="#e9d5ff" />
      <pointLight position={[-2, 3, -1]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[0, -1, 2]} intensity={0.3} color="#6366f1" />
      <fog attach="fog" args={["#0c0a1a", 4, 10]} />
      <HumanoidFigure />
      <GridFloor />
      <Environment preset="night" />
    </>
  );
}

export function MiniatureFigure3D() {
  return (
    <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at center, #1a103d 0%, #0c0a1a 70%)" }}>
      <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
