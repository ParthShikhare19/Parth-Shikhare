import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function TechSphere({ tech, position, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
        {hovered && (
          <Html center distanceFactor={10}>
            <div className="bg-slate-900/90 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap pointer-events-none">
              {tech}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

function TechOrbit() {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const techs = [
    { name: 'React', color: '#61dafb', pos: [2, 0, 0] },
    { name: 'Node', color: '#68a063', pos: [-2, 0, 0] },
    { name: 'MongoDB', color: '#4db33d', pos: [0, 2, 0] },
    { name: 'Express', color: '#ffffff', pos: [0, -2, 0] },
    { name: 'Tailwind', color: '#38bdf8', pos: [1.5, 1.5, 0] },
  ];

  return (
    <group ref={groupRef}>
      {techs.map((tech, index) => (
        <TechSphere
          key={index}
          tech={tech.name}
          position={tech.pos}
          color={tech.color}
        />
      ))}
      {/* Center Core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading 3D...</p>
      </div>
    </div>
  );
}

export default function TechCube() {
  return (
    <div className="w-full h-[500px] relative">
      <Suspense fallback={<Loader />}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <TechOrbit />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            makeDefault
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-400 animate-pulse">
          🖱️ Drag to explore • Hover to interact
        </p>
      </div>
    </div>
  );
}
