"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FlowingWaves() {
  const linesRef = useRef<THREE.Group>(null);
  const lineCount = 8;

  // Create multiple flowing wave lines
  const lines = useMemo(() => {
    const linesArray = [];

    for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
      const points = [];
      const segmentCount = 60;

      for (let i = 0; i < segmentCount; i++) {
        const x = (i / segmentCount) * 12 - 6; // Extended from -6 to +6
        const y = (lineIndex - lineCount / 2) * 0.8;
        const z = 0;
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      linesArray.push({
        geometry,
        offset: lineIndex * 0.5,
      });
    }

    return linesArray;
  }, [lineCount]);

  // Animate the waves
  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();

      linesRef.current.children.forEach((line, lineIndex) => {
        const mesh = line as THREE.Line;
        const positions = mesh.geometry.attributes.position;
        const offset = lineIndex * 0.5;

        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const originalY = (lineIndex - lineCount / 2) * 0.8;

          // Create flowing wave motion
          const wave = Math.sin(x * 0.5 + time * 0.8 + offset) * 0.5;
          const wave2 = Math.cos(x * 0.3 + time * 0.5 + offset) * 0.3;

          positions.setY(i, originalY + wave + wave2);
          positions.setZ(i, Math.sin(x * 0.4 + time * 0.6 + offset) * 0.3);
        }

        positions.needsUpdate = true;
      });

      // Gentle overall rotation
      linesRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => (
        <line key={index} geometry={line.geometry}>
          <lineBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.4}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  );
}

function FloatingCircles() {
  const groupRef = useRef<THREE.Group>(null);
  const circleCount = 5;

  const circles = useMemo(() => {
    const circlesArray = [];

    for (let i = 0; i < circleCount; i++) {
      const radius = 0.15 + Math.random() * 0.15;
      const geometry = new THREE.RingGeometry(radius, radius + 0.015, 32);
      circlesArray.push({
        geometry,
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
        ],
        speed: 0.5 + Math.random() * 0.5,
      });
    }

    return circlesArray;
  }, [circleCount]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      groupRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        const speed = circles[index].speed;

        // Floating motion
        mesh.position.y = circles[index].position[1] + Math.sin(time * speed) * 0.3;
        mesh.position.x = circles[index].position[0] + Math.cos(time * speed * 0.5) * 0.2;

        // Gentle rotation
        mesh.rotation.z = time * 0.2 * speed;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {circles.map((circle, index) => (
        <mesh
          key={index}
          geometry={circle.geometry}
          position={circle.position as [number, number, number]}
        >
          <meshBasicMaterial
            color="#16a34a"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <FlowingWaves />
      </Canvas>
    </div>
  );
}
