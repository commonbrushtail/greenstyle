"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

// Animated organic blob
function AnimatedBlob({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      // Slow rotation
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={2}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.25}
      />
    </Sphere>
  );
}

// Floating particles (representing nature/environment)
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#86efac"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#86efac" />

      {/* Animated organic blobs */}
      <AnimatedBlob position={[-2, 0, -2]} color="#86efac" speed={0.8} />
      <AnimatedBlob position={[2, 1, -1]} color="#bbf7d0" speed={1.2} />
      <AnimatedBlob position={[0, -1, -3]} color="#fed7aa" speed={1} />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Subtle camera movement - disabled to prevent motion sickness */}
      {/* <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} /> */}
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-primary-400 opacity-20">Loading 3D...</div>
    </div>
  );
}

// Main component
export default function ThreeBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("ThreeBackground mounted!");
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) {
    console.log("ThreeBackground: Not mounted yet");
    return null;
  }

  console.log("ThreeBackground: Rendering canvas");

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]} // Device pixel ratio for performance
        performance={{ min: 0.5 }} // Auto-adjust quality
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
