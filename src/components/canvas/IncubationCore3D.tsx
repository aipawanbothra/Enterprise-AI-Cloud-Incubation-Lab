import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, Sphere, Grid, Trail } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Enterprise Neural Core Layer
// --------------------------------------------------------
const NeuralCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Inner Solid Core */}
        <Box args={[2, 2, 2]}>
          <meshStandardMaterial 
            color="#070B19" 
            metalness={0.9} 
            roughness={0.1}
            envMapIntensity={1}
          />
        </Box>

        {/* Wireframe Data Layer */}
        <Box args={[2.5, 2.5, 2.5]}>
          <meshBasicMaterial 
            color="#38BDF8" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </Box>

        {/* Pulsing Energy Field */}
        <Sphere args={[2.2, 32, 32]}>
          <meshStandardMaterial 
            color="#10B981" 
            emissive="#10B981"
            emissiveIntensity={0.2}
            transparent 
            opacity={0.1} 
            wireframe
          />
        </Sphere>
      </Float>
    </group>
  );
};

// --------------------------------------------------------
// Orbiting Data Streams (Satellites)
// --------------------------------------------------------
const DataStreams = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create 3 orbiting nodes with trails
  const nodes = [
    { color: '#38BDF8', radius: 4, speed: 1, offset: 0, y: 1 },
    { color: '#818CF8', radius: 5, speed: 0.8, offset: Math.PI * 0.6, y: -1 },
    { color: '#10B981', radius: 4.5, speed: 1.2, offset: Math.PI * 1.2, y: 0 },
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <OrbitingNode key={i} {...node} />
      ))}
    </group>
  );
};

const OrbitingNode = ({ color, radius, speed, offset, y }: { color: string, radius: number, speed: number, offset: number, y: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 2) * 0.5 + y;
    }
  });

  return (
    <Trail width={1.5} length={8} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// --------------------------------------------------------
// Floating Code Particles (Ascending Data)
// --------------------------------------------------------
const DataParticles = () => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = 150;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ),
        speed: 0.02 + Math.random() * 0.05,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      particle.position.y += particle.speed;
      if (particle.position.y > 8) particle.position.y = -8;
      
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <boxGeometry args={[0.04, 0.2, 0.04]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
    </instancedMesh>
  );
};

// --------------------------------------------------------
// Main Component
// --------------------------------------------------------
const IncubationCore3D: React.FC = () => {
  return (
    <group position={[0, -0.5, 0]}>
      <NeuralCore />
      <DataStreams />
      <DataParticles />
      
      {/* High-Tech Floor Grid */}
      <Grid 
        position={[0, -3.5, 0]} 
        args={[30, 30]} 
        cellSize={0.5} 
        cellThickness={1} 
        cellColor="#1E293B" 
        sectionSize={2.5} 
        sectionThickness={1.5} 
        sectionColor="#38BDF8" 
        fadeDistance={25}
        fadeStrength={1}
      />
    </group>
  );
};

export default IncubationCore3D;
