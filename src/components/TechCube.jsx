import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';

const CODE_LINES = [
  { text: 'const parth = {', color: '#c792ea' },
  { text: '  name: "Parth Shikhare",', color: '#80cbc4' },
  { text: '  role: "Full Stack Dev",', color: '#80cbc4' },
  { text: '  stack: [', color: '#c792ea' },
  { text: '    "React", "Node.js",', color: '#c3e88d' },
  { text: '    "Python", "Django",', color: '#c3e88d' },
  { text: '    "MongoDB", "MySQL"', color: '#c3e88d' },
  { text: '  ],', color: '#c792ea' },
  { text: '  passion: "Building 🚀",', color: '#80cbc4' },
  { text: '};', color: '#c792ea' },
];

function LaptopScreen({ visible }) {
  return (
    <Html
      position={[0, 0.08, 0.065]}
      transform
      distanceFactor={10}
      style={{ width: '310px', pointerEvents: 'none', userSelect: 'none' }}
    >
      <div
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '11px',
          lineHeight: '1.75',
          padding: '10px 14px',
          background: 'transparent',
          minHeight: '140px',
        }}
      >
        {CODE_LINES.slice(0, visible).map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px' }}>
            <span style={{ color: '#4b5563', fontSize: '8px', minWidth: '12px', textAlign: 'right', paddingTop: '2px' }}>
              {i + 1}
            </span>
            <span style={{ color: line.color }}>{line.text}</span>
          </div>
        ))}
        {visible < CODE_LINES.length && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ color: '#4b5563', fontSize: '8px', minWidth: '12px', textAlign: 'right' }}>
              {visible + 1}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '12px',
                background: '#3b82f6',
                verticalAlign: 'middle',
              }}
            />
          </div>
        )}
      </div>
    </Html>
  );
}

function Laptop() {
  const groupRef = useRef();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < CODE_LINES.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
      i++;
      if (i >= CODE_LINES.length) clearInterval(timer);
    }, 380);
    return () => clearInterval(timer);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.22;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, -0.4, 0]}>
        {/* Laptop base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.4, 0.12, 2.3]} />
          <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Keyboard area surface */}
        <mesh position={[0, 0.065, -0.15]}>
          <boxGeometry args={[3.0, 0.01, 1.7]} />
          <meshStandardMaterial color="#253044" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.065, 0.7]}>
          <boxGeometry args={[1.1, 0.01, 0.65]} />
          <meshStandardMaterial color="#2d3f57" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Screen assembly (tilted back) */}
        <group position={[0, 0.06, -1.02]} rotation={[-Math.PI * 0.24, 0, 0]}>
          {/* Screen bezel */}
          <mesh>
            <boxGeometry args={[3.4, 2.25, 0.1]} />
            <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Screen glass */}
          <mesh position={[0, 0, 0.056]}>
            <boxGeometry args={[3.1, 1.95, 0.01]} />
            <meshStandardMaterial
              color="#050e1a"
              emissive="#0f2a4e"
              emissiveIntensity={0.6}
            />
          </mesh>

          {/* Top bar (title bar) */}
          <mesh position={[0, 0.88, 0.065]}>
            <boxGeometry args={[3.1, 0.18, 0.01]} />
            <meshStandardMaterial color="#1a2744" emissive="#1a2744" emissiveIntensity={0.3} />
          </mesh>

          {/* Title bar dots */}
          {[[-1.37, 0.88], [-1.22, 0.88], [-1.07, 0.88]].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.072]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshStandardMaterial
                color={['#ff5f57', '#febc2e', '#28c840'][i]}
                emissive={['#ff5f57', '#febc2e', '#28c840'][i]}
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}

          {/* Animated code */}
          <LaptopScreen visible={visibleLines} />

          {/* Screen glow light */}
          <pointLight position={[0, 0, 1.5]} intensity={0.6} color="#3b82f6" distance={4} />
        </group>

        {/* Hinge */}
        <mesh position={[0, 0.06, -1.04]}>
          <cylinderGeometry args={[0.07, 0.07, 3.3, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function TechBadge({ name, color, orbitRadius, startAngle, orbitSpeed, height }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const angle = state.clock.elapsedTime * orbitSpeed + startAngle;
    ref.current.position.x = Math.cos(angle) * orbitRadius;
    ref.current.position.z = Math.sin(angle) * orbitRadius;
    ref.current.position.y = height + Math.sin(state.clock.elapsedTime * 0.9 + startAngle) * 0.18;
    ref.current.rotation.y += 0.015;
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.27, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.0 : 0.35}
          metalness={0.85}
          roughness={0.1}
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={9}>
          <div
            style={{
              background: 'rgba(15,23,42,0.95)',
              color: '#fff',
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(59,130,246,0.5)',
              boxShadow: '0 0 12px rgba(59,130,246,0.3)',
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

const BADGES = [
  { name: 'React',    color: '#61dafb', orbitRadius: 2.9, startAngle: 0,              orbitSpeed: 0.42, height:  0.6 },
  { name: 'Node.js',  color: '#68a063', orbitRadius: 2.6, startAngle: Math.PI * 0.65, orbitSpeed: 0.36, height: -0.3 },
  { name: 'Python',   color: '#ffd43b', orbitRadius: 2.8, startAngle: Math.PI * 1.3,  orbitSpeed: 0.47, height:  0.1 },
  { name: 'Django',   color: '#44b78b', orbitRadius: 2.5, startAngle: Math.PI * 0.3,  orbitSpeed: 0.39, height: -0.7 },
  { name: 'MongoDB',  color: '#4db33d', orbitRadius: 2.7, startAngle: Math.PI * 1.0,  orbitSpeed: 0.44, height:  0.8 },
  { name: 'Tailwind', color: '#38bdf8', orbitRadius: 2.6, startAngle: Math.PI * 1.7,  orbitSpeed: 0.38, height:  0.0 },
];

function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading 3D...</p>
      </div>
    </div>
  );
}

export default function TechCube() {
  return (
    <div className="w-full h-[520px] relative">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 1.8, 7.5], fov: 48 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[8, 8, 8]} intensity={0.9} />
          <pointLight position={[-8, 4, -6]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[0, -4, 6]} intensity={0.3} color="#60a5fa" />

          <Laptop />
          {BADGES.map((badge, i) => (
            <TechBadge key={i} {...badge} />
          ))}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI * 0.62}
            minPolarAngle={Math.PI * 0.3}
          />
        </Canvas>
      </Suspense>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-sm text-gray-400 animate-pulse text-center">
          🖱️ Drag to rotate &bull; Hover badges for tech info
        </p>
      </div>
    </div>
  );
}
