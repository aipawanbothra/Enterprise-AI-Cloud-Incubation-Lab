import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { POD_ROLES } from '../../data/programData';

interface PodVisualizer3DProps {
  activeRole: number;
  onSelectRole: (idx: number) => void;
}

const Node = ({ position, color, label, isActive, onClick, size = 1 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = isActive ? size * 1.5 : size;
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
      if (isActive) {
        meshRef.current.rotation.y += delta;
      }
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef} 
        onClick={(e) => { e.stopPropagation(); onClick(); }} 
        onPointerOver={() => document.body.style.cursor = 'pointer'} 
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isActive ? 1.5 : 0.5} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
      <Html position={[0, size * 1.5 + 0.5, 0]} center style={{ pointerEvents: 'none', transition: 'all 0.3s' }}>
        <div style={{
          background: isActive ? color : 'rgba(15, 23, 42, 0.8)',
          color: isActive ? '#070B19' : 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          border: `1px solid ${color}`,
          textTransform: 'uppercase',
          opacity: isActive ? 1 : 0.8,
          boxShadow: isActive ? `0 0 10px ${color}` : 'none'
        }}>
          {label}
        </div>
      </Html>
      {isActive && <Sparkles count={20} scale={3} size={2} color={color} speed={0.4} opacity={0.6} />}
    </group>
  );
};

const Connection = ({ start, end, color }: any) => {
  const distance = new THREE.Vector3(...start).distanceTo(new THREE.Vector3(...end));
  const position = new THREE.Vector3().addVectors(new THREE.Vector3(...start), new THREE.Vector3(...end)).multiplyScalar(0.5);
  
  const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...end), new THREE.Vector3(...start)).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.05, 0.05, distance, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

export default function PodVisualizer3D({ activeRole, onSelectRole }: PodVisualizer3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const radius = 4;
  const nodes = POD_ROLES.map((role: any, i: number) => {
    const angle = (i / Math.max(1, POD_ROLES.length)) * Math.PI * 2;
    return {
      position: [Math.cos(angle) * radius, Math.sin(angle * 2) * 0.5, Math.sin(angle) * radius] as [number, number, number],
      ...role
    };
  });

  const centerPosition: [number, number, number] = [0, 0, 0];
  const centerColor = '#F59E0B';

  return (
    <group ref={groupRef}>
      {/* Central Node (Pod Lead) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Node 
          position={centerPosition}
          color={centerColor}
          label="Pod Lead"
          isActive={activeRole === -1}
          onClick={() => onSelectRole(-1)}
          size={1.2}
        />
      </Float>

      {/* Branch Nodes and Connections */}
      {nodes.map((node: any, i: number) => (
        <group key={node.id || i}>
          <Connection start={centerPosition} end={node.position} color={node.color || '#38BDF8'} />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1} position={node.position}>
            <Node
              position={[0, 0, 0]}
              color={node.color || '#38BDF8'}
              label={node.title || `Role ${i+1}`}
              isActive={activeRole === i}
              onClick={() => onSelectRole(i)}
              size={0.8}
            />
          </Float>
        </group>
      ))}
      
      {/* Ambient particles */}
      <Sparkles count={50} scale={12} size={1} speed={0.2} opacity={0.2} color="#818CF8" />
    </group>
  );
}
