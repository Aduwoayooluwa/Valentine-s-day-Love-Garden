import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Scene from './components/Scene';
import UI from './components/UI';
import { Heart } from 'lucide-react';

function App() {
  return (
    <div className="w-full h-screen relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls 
          enablePan={false} 
          maxDistance={20} 
          minDistance={10}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          // touchAction="none"
        />
        <color attach="background" args={['#ff69b4']} />
        <fog attach="fog" args={['#ff69b4', 5, 30]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <EffectComposer>
          <Bloom luminanceThreshold={0.5} intensity={2} />
        </EffectComposer>
      </Canvas>
      
      <div className="absolute top-0 left-0 w-full p-4">
        <UI />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white flex items-center gap-2">
        <Heart className="text-white animate-pulse" />
        <span className="font-bold">Valentine's Day Love Garden</span>
      </div>
    </div>
  );
}

export default App;