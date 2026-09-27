import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import IncubationCore3D from './IncubationCore3D';

interface CanvasContainerProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Main 3D canvas wrapper for the hero section.
 * Contains the central cybernetic core and high-end post-processing effects.
 */
export default function CanvasContainer({ className, style }: CanvasContainerProps) {
  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 1.5, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#070B19']} />
          <fog attach="fog" args={['#070B19', 5, 20]} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#38BDF8" />
          <pointLight position={[-10, -5, 5]} intensity={0.5} color="#818CF8" />
          <pointLight position={[0, -5, 0]} intensity={1.5} color="#10B981" />

          <IncubationCore3D />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going under the floor grid
            minPolarAngle={Math.PI / 3}
          />
          
          {/* High-end post-processing */}
          <EffectComposer enableNormalPass={false} multisampling={4}>
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
              mipmapBlur 
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
