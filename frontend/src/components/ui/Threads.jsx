"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Flowmap, Mesh, Program } from "ogl";

export default function Threads({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer, gl, camera, scene, flowmap, mesh, program;

    try {
      renderer = new Renderer({ canvas, dpr: 2, alpha: true });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 5);

      scene = new Transform();

      // Create flowmap for mouse interaction
      flowmap = new Flowmap(gl, {
        falloff: 0.2,
        dissipation: 0.95,
        alpha: 0.5,
      });

      // Vertex shader
      const vertex = /* glsl */ `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
        }
      `;

      // Fragment shader
      const fragment = /* glsl */ `
        precision highp float;
        precision highp int;
        uniform sampler2D tWater;
        uniform float uTime;
        uniform float uAmplitude;
        uniform float uDistance;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Sample the flowmap
          vec4 water = texture2D(tWater, uv);

          // Create thread-like patterns
          float pattern = sin(uv.x * 10.0 + uTime * 0.5 + water.x * uAmplitude) *
                         sin(uv.y * 10.0 + uTime * 0.3 + water.y * uAmplitude);

          // Add some variation
          pattern += sin(uv.x * 5.0 - uTime * 0.2) * sin(uv.y * 7.0 + uTime * 0.4) * 0.5;

          // Create thread lines
          float threads = smoothstep(0.98 - uDistance, 1.0, abs(pattern));

          // Color with a subtle green tint to match your theme
          vec3 color = vec3(0.2, 0.6, 0.3); // Green color

          gl_FragColor = vec4(color * threads, threads * 0.15);
        }
      `;

      const geometry = {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
      };

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uDistance: { value: distance },
          tWater: { value: flowmap.uniform.value },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);

      // Handle resize
      const resize = () => {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.perspective({
          aspect: canvas.offsetWidth / canvas.offsetHeight,
        });

        const a = canvas.offsetWidth / canvas.offsetHeight;
        mesh.program.uniforms.uResolution = {
          value: [canvas.offsetWidth, canvas.offsetHeight],
        };
        mesh.program.uniforms.uAspect = { value: a };
      };
      resize();

      window.addEventListener("resize", resize);

      // Mouse interaction
      const mouse = { x: 0, y: 0 };
      const updateMouse = (e) => {
        if (!enableMouseInteraction) return;

        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;

        flowmap.aspect = canvas.offsetWidth / canvas.offsetHeight;
        flowmap.mouse.set(mouse.x, mouse.y);

        if (!e.type.includes("move")) {
          flowmap.velocity.set(0, 0);
        }
      };

      canvas.addEventListener("mousemove", updateMouse);
      canvas.addEventListener("touchmove", (e) => {
        updateMouse(e.touches[0]);
      });

      // Animation loop
      let animationId;
      const animate = (t) => {
        animationId = requestAnimationFrame(animate);

        if (program && program.uniforms) {
          program.uniforms.uTime.value = t * 0.001;
        }

        if (flowmap) {
          flowmap.update();
        }

        if (renderer && scene && camera) {
          renderer.render({ scene, camera });
        }
      };

      animate(0);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousemove", updateMouse);

        // Cleanup WebGL resources
        if (gl) {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      };
    } catch (error) {
      console.error("Error initializing Threads background:", error);
      return () => {}; // Return empty cleanup function
    }
  }, [amplitude, distance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
