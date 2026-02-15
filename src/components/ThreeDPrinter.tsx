
import { useRef, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// The object being printed
function PrintedObject({ progressRef }: { progressRef: MutableRefObject<number> }) {
    const meshRef = useRef<THREE.Mesh>(null);

    const clipPlane = useMemo(() => {
        const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -1);
        return plane;
    }, []);

    useFrame(() => {
        if (!progressRef.current) return;
        // Map progress (0 to 1) to height (-1.2 to 1.5 approx for TorusKnot)
        const height = -1.2 + progressRef.current * 2.5;
        clipPlane.constant = height;
    });

    return (
        <group>
            <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
                <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    roughness={0.2}
                    metalness={0.6}
                    clippingPlanes={[clipPlane]}
                    clipShadows={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

// The nozzle that moves with the print
function PrinterNozzle({ progressRef }: { progressRef: MutableRefObject<number> }) {
    const nozzleRef = useRef<THREE.Group>(null);
    const angleRef = useRef(0);

    useFrame((state, delta) => {
        if (!nozzleRef.current) return;

        const progress = progressRef.current;

        // Move nozzle to current print height
        const height = -1.2 + progress * 2.5;
        nozzleRef.current.position.y = height + 0.2;

        // Rotate nozzle to simulate printing action
        angleRef.current += delta * 5;
        const radius = 0.8; // Approximate radius of torus
        nozzleRef.current.position.x = Math.cos(angleRef.current) * radius;
        nozzleRef.current.position.z = Math.sin(angleRef.current) * radius;
    });

    return (
        <group ref={nozzleRef}>
            {/* Nozzle Tip */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.1, 0.3, 16]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Filament glowing bit */}
            <pointLight position={[0, -0.15, 0]} intensity={2} distance={1} color="#3b82f6" />

            {/* Moving Head Block */}
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
        </group>
    );
}

function Scene() {
    const progressRef = useRef(0);

    useFrame((state, delta) => {
        // Loop progress
        progressRef.current += delta * 0.2;
        if (progressRef.current > 1.2) {
            progressRef.current = 0; // Restart
        }
        // Clamp for display logic if needed, but here simple loop is fine.
    });

    return (
        <>
            <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
            <Environment preset="city" />

            <group position={[0, -0.5, 0]}>
                <PrintedObject progressRef={progressRef} />
                <PrinterNozzle progressRef={progressRef} />

                {/* Print Bed */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
                    <cylinderGeometry args={[2, 2, 0.1, 32]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
                </mesh>

                <ContactShadows position={[0, -1.3, 0]} opacity={0.5} scale={10} blur={1.5} far={4} />
            </group>
        </>
    );
}

export function ThreeDPrinter() {
    return (
        <div className="w-full h-full">
            <Canvas shadows camera={{ position: [4, 2, 4], fov: 45 }} gl={{ localClippingEnabled: true }}>
                <Scene />
            </Canvas>
        </div>
    );
}
