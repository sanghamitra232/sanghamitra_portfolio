'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AvatarGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group>
        {/* Main sphere - avatar body */}
        <mesh ref={meshRef}>
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial
              color="#7c3aed"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </mesh>
        {/* Orbit ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.6, 0.04, 16, 100]} />
          <meshStandardMaterial color="#a78bfa" metalness={1} roughness={0} emissive="#7c3aed" emissiveIntensity={0.5} />
        </mesh>
        {/* Small orbiting particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <OrbitingParticle key={i} index={i} />
        ))}
      </group>
    </Float>
  );
}

function OrbitingParticle({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 5) * Math.PI * 2;
  const radius = 2.2;
  const speed = 0.4 + index * 0.1;

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + angle;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={colors[index]} emissive={colors[index]} emissiveIntensity={1} />
    </mesh>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a78bfa" transparent opacity={0.6} />
    </points>
  );
}

export default function Avatar3D({ size = 'large' }: { size?: 'large' | 'small' }) {
  const height = size === 'large' ? '500px' : '200px';

  return (
    <div style={{ width: '100%', height }} className="relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />
        <AvatarGeometry />
        <ParticleField />
        <Stars radius={50} depth={50} count={500} factor={2} saturation={0} fade speed={1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
