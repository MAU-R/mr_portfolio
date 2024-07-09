import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import '../Assets/styles/cubeField.css';
import { FBM } from '../../node_modules/three-noise/build/three-noise.module.js';

// Create FBM instance on component mount
const fbm = new FBM({
  seed: Math.random(),
  scale: 8.06,
  octaves: 6,
  persistence: 0.5,
  lacunarity: 2,
  redistribution: 1,
  height: 0.0,
});



const Cube = ({ position, isActive, scroll }) => {
  const ref = useRef();
  const [offset] = useState(Math.random() * 2 * Math.PI); // Aleatorio para cada cubo
  const cycleDuration = 5 * Math.PI; // Duración del ciclo completo de la animación

  useFrame((state, delta) => {
    if (isActive) {
      const elapsedTime = state.clock.getElapsedTime();
      const cycleTime = (elapsedTime + offset) % cycleDuration;
      ref.current.position.y = position[1] + Math.sin(cycleTime)*0.3;
    } else {
      ref.current.position.y = position[1];
    }
    if(scroll>(window.innerHeight*0.40)){ 
      ref.current.position.y -= (scroll-(window.innerHeight*0.40)) * 0.05;
      ref.current.material.opacity = Math.max(1 - scroll * 0.001, 0);
      ref.current.material.transparent = true;}

  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const CubesField = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {

    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [activeCubes, setActiveCubes] = useState([]);
  const cubes = [];
  const totalCubes = 20 * 20; // 400 cubos
  const groupSize = 75;
  const duration = 30000; // Duración de cada grupo en milisegundos

  useEffect(() => {
    let intervalId;
    let usedIndices = new Set();
    const activateRandomCubes = () => {
      const newActiveCubes = [];
      while (newActiveCubes.length < groupSize) {
        const randomIndex = Math.floor(Math.random() * totalCubes);
        if (!usedIndices.has(randomIndex)) {
          newActiveCubes.push(randomIndex);
          usedIndices.add(randomIndex);
        }
      }
      setActiveCubes(newActiveCubes);
    };

    activateRandomCubes();
    intervalId = setInterval(() => {
      activateRandomCubes();
      usedIndices.clear(); // Limpiar el conjunto de índices usados después de cada ciclo
    }, duration);

    return () => clearInterval(intervalId);
  }, []);

  let cubeIndex = 0;
  for (let x = -10; x < 10; x++) {
    for (let z = -10; z < 10; z++) {
      const pos = new THREE.Vector2(x, z);
      const height = fbm.get2(pos);
      const isActive = activeCubes.includes(cubeIndex);
      cubes.push(
        <Cube key={`${x}-${z}`} position={[x * 1.1, height * 3, z * 1.1]} isActive={isActive} scroll={scroll} />
      );
      cubeIndex++;
    }
  }

  return <>{cubes}</>;
};

const HomePage = () => {
  return (
    <div className='main-canvas'>
    <Canvas  camera={{ position: [1, 1.75, 8], rotation:[0.22,0,0]}}>
      <ambientLight intensity={0} />
      <pointLight position={[1, 2, 1]} intensity={15} />
      <pointLight position={[1, 2, 8]} intensity={15} />
      <pointLight position={[1, 2, -8]} intensity={15} />
      <CubesField />
    </Canvas>
    </div>
  );
};

export default HomePage