import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ROADMAP } from '../../data/programData';

interface HelixRoadmap3DProps {
  activeMonth: number;
  onSelectMonth: (idx: number) => void;
}

const HELIX_RADIUS = 3;
const VERTICAL_SPACING = 2;
const NUM_NODES = 6;
const COILS = 1.5;

export default function HelixRoadmap3D({ activeMonth, onSelectMonth }: HelixRoadmap3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate helix slowly
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const nodes = useMemo(() => {
    return Array.from({ length: NUM_NODES }).map((_, i) => {
      // Calculate position along helix
      // Distribute nodes evenly along the total angle
      const t = i / (NUM_NODES - 1);
      const angle = t * Math.PI * 2 * COILS;
      
      const x = Math.cos(angle) * HELIX_RADIUS;
      const z = Math.sin(angle) * HELIX_RADIUS;
      const y = (t - 0.5) * (NUM_NODES * VERTICAL_SPACING); // Center around 0
      
      return new THREE.Vector3(x, y, z);
    });
  }, []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(nodes);
  }, [nodes]);

  const linePoints = useMemo(() => {
    return curve.getPoints(100);
  }, [curve]);

  return (
    <group ref={groupRef}>
      {/* The connecting path */}
      <Line
        points={linePoints}
        color="#38BDF8"
        lineWidth={3}
        transparent
        opacity={0.3}
      />
      
      {/* Particles along the path */}
      <Sparkles count={50} scale={[HELIX_RADIUS * 2.5, NUM_NODES * VERTICAL_SPACING, HELIX_RADIUS * 2.5]} size={2} speed={0.2} opacity={0.5} color="#818CF8" />

      {/* Nodes */}
      {nodes.map((pos, i) => {
        const isActive = activeMonth === i;
        const color = (ROADMAP && ROADMAP[i] && ROADMAP[i].color) ? ROADMAP[i].color : (isActive ? "#10B981" : "#38BDF8");
        
        return (
          <MilestoneNode
            key={i}
            position={pos}
            index={i}
            color={color}
            isActive={isActive}
            onClick={() => onSelectMonth(i)}
          />
        );
      })}
    </group>
  );
}

interface MilestoneNodeProps {
  position: THREE.Vector3;
  index: number;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

function MilestoneNode({ position, index, color, isActive, onClick }: MilestoneNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const baseColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (meshRef.current) {
      if (isActive) {
        // Pulsing effect
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
    
    if (materialRef.current) {
      const targetIntensity = isActive ? 2 : (hovered ? 1.5 : 0.5);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetIntensity,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            ref={materialRef}
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={isActive ? 2 : 0.5}
            toneMapped={false}
          />
        </mesh>
      </Float>

      <Html distanceFactor={15} center position={[0, 0.8, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: isActive ? color : 'rgba(15, 23, 42, 0.8)',
          color: isActive ? '#000' : '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          fontSize: '12px',
          border: `1px solid ${color}`,
          boxShadow: isActive ? `0 0 10px ${color}` : 'none',
          whiteSpace: 'nowrap'
        }}>
          M{index + 1}
        </div>
      </Html>
    </group>
  );
}
