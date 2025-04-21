import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import ModelPath from '../assets/3D/05.glb';

function StaticModel() {
  const { scene } = useGLTF(ModelPath);
  return <primitive object={scene} scale={0.5} />;
}

export default function ModelViewer() {
  return (
    <div className='home__model'>
      <Canvas camera={{ position: [140, 90, -95], fov: 40 }} orthographic={false}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 4, 5]} intensity={1} />
        <StaticModel />
      </Canvas>
    </div>
  );
}