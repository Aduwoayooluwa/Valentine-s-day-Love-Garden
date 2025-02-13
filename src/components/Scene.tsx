import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Float } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import { useStore } from '../store';

function Heart({ position, id, scale }: { position: [number, number, number]; id: string; scale: number }) {
  const mesh = useRef<Mesh>(null);
  const { scale: springScale } = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [scale, scale, scale] },
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const removeHeart = useStore(state => state.removeHeart);
  const incrementScore = useStore(state => state.incrementScore);
  const checkLevelUp = useStore(state => state.checkLevelUp);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      
      // Slowly decrease scale over time (decay effect)
      if (scale > 0.1) {
        mesh.current.scale.multiplyScalar(0.9999);
      } else {
        removeHeart(id);
      }
    }
  });

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    incrementScore(1);
    checkLevelUp();
    removeHeart(id);
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <animated.mesh 
        ref={mesh} 
        position={position} 
        scale={springScale}
        onPointerDown={handlePointerDown}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#ff1493" metalness={0.5} roughness={0.2} />
      </animated.mesh>
    </Float>
  );
}

function Obstacle({ position, id }: { position: [number, number, number]; id: string }) {
  const mesh = useRef<Mesh>(null);
  const removeObstacle = useStore(state => state.removeObstacle);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime();
      mesh.current.rotation.y = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerDown={() => removeObstacle(id)}
    >
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial color="#4a0404" wireframe />
    </mesh>
  );
}

function Scene() {
  const { hearts, obstacles, level } = useStore();
  const addObstacle = useStore(state => state.addObstacle);

  useEffect(() => {
    const interval = setInterval(() => {
      if (obstacles.length < level) {
        addObstacle();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [level, obstacles.length, addObstacle]);

  return (
    <group>
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} {...obstacle} />
      ))}
    </group>
  );
}

export default Scene;