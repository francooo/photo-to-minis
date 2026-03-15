import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitalRing({ radius, y, speed, opacity }: { radius: number; y: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 48]} />
      <meshStandardMaterial color="#8b9cf7" transparent opacity={opacity} emissive="#7c6ef0" emissiveIntensity={0.5} />
    </mesh>
  );
}

function Figure() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c4b5fd", roughness: 0.3, metalness: 0.6, emissive: "#7c3aed", emissiveIntensity: 0.15,
  }), []);
  const headMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ddd6fe", roughness: 0.2, metalness: 0.7, emissive: "#8b5cf6", emissiveIntensity: 0.2,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]} scale={0.85}>
      <mesh position={[0, 1.65, 0]} material={headMat}><sphereGeometry args={[0.3, 24, 24]} /></mesh>
      <mesh position={[0, 1.3, 0]} material={bodyMat}><cylinderGeometry args={[0.08, 0.1, 0.12, 12]} /></mesh>
      <mesh position={[0, 0.85, 0]} material={bodyMat}><boxGeometry args={[0.42, 0.65, 0.22]} /></mesh>
      <mesh position={[0, 0.85, 0.12]}><boxGeometry args={[0.04, 0.5, 0.015]} /><meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.8} transparent opacity={0.6} /></mesh>
      <pointLight position={[0, 0.8, 0.2]} intensity={0.4} distance={0.8} color="#8b5cf6" />
      <mesh position={[-0.3, 0.88, 0]} rotation={[0, 0, 0.12]} material={bodyMat}><boxGeometry args={[0.1, 0.48, 0.12]} /></mesh>
      <mesh position={[0.3, 0.88, 0]} rotation={[0, 0, -0.12]} material={bodyMat}><boxGeometry args={[0.1, 0.48, 0.12]} /></mesh>
      <mesh position={[-0.1, -0.05, 0]} material={bodyMat}><boxGeometry args={[0.12, 0.7, 0.13]} /></mesh>
      <mesh position={[0.1, -0.05, 0]} material={bodyMat}><boxGeometry args={[0.12, 0.7, 0.13]} /></mesh>
      <OrbitalRing radius={0.55} y={1.35} speed={0.8} opacity={0.35} />
      <OrbitalRing radius={0.45} y={0.8} speed={-0.6} opacity={0.25} />
      <OrbitalRing radius={0.5} y={0.2} speed={0.5} opacity={0.2} />
      <mesh position={[0, -0.45, 0]}><cylinderGeometry args={[0.32, 0.36, 0.06, 24]} /><meshStandardMaterial color="#4c1d95" roughness={0.4} metalness={0.8} emissive="#7c3aed" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, -0.41, 0]}><torusGeometry args={[0.34, 0.015, 12, 24]} /><meshStandardMaterial color="#e9d5ff" emissive="#a78bfa" emissiveIntensity={1} /></mesh>
    </group>
  );
}

function GridFloor() {
  return (
    <group position={[0, -0.25, 0]}>
      <gridHelper args={[6, 12, "#2e1065", "#1e1b4b"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0c0a1a" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

export function MiniPerson3DScene() {
  return (
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)" }}>
      <Canvas camera={{ position: [2, 1.5, 2.5], fov: 35 }}>
        <ambientLight intensity={0.3} color="#c4b5fd" />
        <directionalLight position={[3, 4, 2]} intensity={0.6} color="#e9d5ff" />
        <pointLight position={[-2, 2, -1]} intensity={0.3} color="#8b5cf6" />
        <fog attach="fog" args={["#0c0a1a", 4, 9]} />
        <Figure />
        <GridFloor />
      </Canvas>
    </div>
  );
}
