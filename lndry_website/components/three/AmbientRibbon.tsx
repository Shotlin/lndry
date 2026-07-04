"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Ribbon({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.1, 1.3, 0),
      new THREE.Vector3(-1.1, 0.2, 0.1),
      new THREE.Vector3(-0.9, -0.6, 0.05),
      new THREE.Vector3(-0.2, -1.0, 0),
      new THREE.Vector3(0.9, -0.85, -0.1),
      new THREE.Vector3(1.3, -0.3, 0),
    ]);
    return new THREE.TubeGeometry(curve, 120, 0.09, 24, false);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.35 + pointer.x * 0.25;
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.12 + pointer.y * 0.15;
    const s = 1 + Math.sin(t * 0.6) * 0.02;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0.2, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#6c63e8" roughness={0.35} metalness={0.08} />
      </mesh>
      <mesh position={[1.3, -0.3, 0]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#0fb5a6" roughness={0.25} />
      </mesh>
      <mesh position={[-1.1, 1.3, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#887cf6" roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Ambient hero accent — the logo's own L-seam extruded into 3D, not a generic decorative blob. No bloom/glow, per the brand's "No Halo Rule". */
export function AmbientRibbon({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 4, 2]} intensity={1.2} color="#eae8ff" />
      <directionalLight position={[2, -2, 3]} intensity={0.5} color="#887cf6" />
      <Ribbon reducedMotion={reducedMotion} />
    </Canvas>
  );
}
