import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import '../Assets/styles/cubeField.css';
import { FBM } from '../../node_modules/three-noise/build/three-noise.module.js';
import Cube from './Cubes.jsx';
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

const CubesField = ({scroll}) => {
  console.log("Scroll::", scroll)
  console.log("Aqui andamos con la altura: ",window.innerHeight)
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
        <Cube key={`${x}-${z}`} position={[x * 1.1, height * 3, z * 1.1]} isActive={isActive} scroll={scroll}/>
      );
      cubeIndex++;
    }
  }

  return <>{cubes}</>;
};



export default CubesField