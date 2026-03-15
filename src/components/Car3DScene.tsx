import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CarBody() {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e8500a",
    roughness: 0.3,
    metalness: 0.7,
    emissive: "#e8500a",
    emissiveIntensity: 0.15,
  }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#b8400a",
    roughness: 0.4,
    metalness: 0.6,
    emissive: "#e8500a",
    emissiveIntensity: 0.1,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#3b82f6",
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.5,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.15, 0]} material={mat}>
        <boxGeometry args={[1.6, 0.3, 0.7]} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.1, 0.42, 0]} material={darkMat}>
        <boxGeometry args={[0.8, 0.25, 0.6]} />
      </mesh>
      {/* Windshield */}
      <mesh position={[-0.28, 0.42, 0]} rotation={[0, 0, 0.3]} material={glassMat}>
        <boxGeometry args={[0.3, 0.22, 0.58]} />
      </mesh>
      {/* Hood */}
      <mesh position={[-0.55, 0.22, 0]} material={mat}>
        <boxGeometry args={[0.5, 0.15, 0.68]} />
      </mesh>
      {/* Spoiler */}
      <mesh position={[0.75, 0.38, 0]} material={darkMat}>
        <boxGeometry args={[0.15, 0.04, 0.75]} />
      </mesh>
      <mesh position={[0.7, 0.28, -0.28]} material={darkMat}>
        <boxGeometry args={[0.06, 0.18, 0.06]} />
      </mesh>
      <mesh position={[0.7, 0.28, 0.28]} material={darkMat}>
        <boxGeometry args={[0.06, 0.18, 0.06]} />
      </mesh>
      {/* Wheels */}
      {[[-0.5, -0.02, 0.38], [-0.5, -0.02, -0.38], [0.45, -0.02, 0.38], [0.45, -0.02, -0.38]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
        </mesh>
      ))}
      {/* Headlights glow */}
      <pointLight position={[-0.85, 0.2, 0.25]} intensity={0.4} distance={1.5} color="#fbbf24" />
      <pointLight position={[-0.85, 0.2, -0.25]} intensity={0.4} distance={1.5} color="#fbbf24" />
    </group>
  );
}

function GridFloor() {
  return (
    <group position={[0, -0.15, 0]}>
      <gridHelper args={[6, 12, "#e8500a", "#1c1008"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0a0f18" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export function Car3DScene() {
  return (
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(232,80,10,0.08) 0%, transparent 70%)" }}>
      <Canvas camera={{ position: [2.5, 1.5, 2.5], fov: 35 }}>
        <ambientLight intensity={0.25} color="#fbbf24" />
        <directionalLight position={[3, 4, 2]} intensity={0.7} color="#fff" />
        <pointLight position={[-2, 2, -1]} intensity={0.3} color="#e8500a" />
        <fog attach="fog" args={["#0a0f18", 4, 9]} />
        <CarBody />
        <GridFloor />
      </Canvas>
    </div>
  );
}
