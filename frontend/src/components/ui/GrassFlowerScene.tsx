"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Individual grass blade component
function GrassBlade({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      // Gentle swaying motion
      meshRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, 0]}>
      <coneGeometry args={[0.02, 0.4, 3]} />
      <meshStandardMaterial color="#4ade80" side={THREE.DoubleSide} />
    </mesh>
  );
}

// Flower component
function Flower({ position, delay }: { position: [number, number, number]; delay: number }) {
  const stemRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (stemRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      // Gentle bobbing motion
      stemRef.current.rotation.z = Math.sin(time * 0.6) * 0.1;
    }
  });

  return (
    <group ref={stemRef} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.015, 0.3, 8]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>

      {/* Flower petals - arranged in a circle */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 0.04;
        const z = Math.sin(angle) * 0.04;
        return (
          <mesh key={i} position={[x, 0.3, z]} rotation={[Math.PI / 2, 0, angle]}>
            <circleGeometry args={[0.03, 8]} />
            <meshStandardMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
        );
      })}

      {/* Flower center */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>
    </group>
  );
}

// Main grass field
function GrassField() {
  const grassBlades = useMemo(() => {
    const blades = [];
    const gridSize = 8;
    const spacing = 0.3;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Add some randomness to positions
        const x = (i - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.1;
        const z = (j - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.1;
        const y = -0.2;

        blades.push({
          position: [x, y, z] as [number, number, number],
          delay: Math.random() * 10,
          type: Math.random() > 0.85 ? 'flower' : 'grass', // 15% flowers, 85% grass
        });
      }
    }

    return blades;
  }, []);

  return (
    <>
      {grassBlades.map((blade, index) =>
        blade.type === 'flower' ? (
          <Flower key={index} position={blade.position} delay={blade.delay} />
        ) : (
          <GrassBlade key={index} position={blade.position} delay={blade.delay} />
        )
      )}
    </>
  );
}

// Floating butterflies/particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      // Gentle up and down motion
      particlesRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  const particlesCount = 20;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 1] = Math.random() * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#fbbf24"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GrassFlowerScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 3, -5]} intensity={0.4} color="#4ade80" />

        <GrassField />
        <FloatingParticles />

        {/* Ground plane (subtle) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#16a34a" opacity={0.1} transparent />
        </mesh>
      </Canvas>
    </div>
  );
}
